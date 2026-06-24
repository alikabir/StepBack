import { useEffect, useRef, useState } from "react";

const MAX_SECONDS = 30;

export default function CheckIn({ api, sessionId, onSubmitted, onOfflineSubmit }) {
  const [recording, setRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [text, setText] = useState("");
  const [cravingScore, setCravingScore] = useState(5);
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [micError, setMicError] = useState("");
  const recorderRef = useRef(null);
  const chunksRef = useRef([]);
  const streamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    return () => {
      window.clearInterval(timerRef.current);
      if (audioUrl) URL.revokeObjectURL(audioUrl);
      streamRef.current?.getTracks().forEach((track) => track.stop());
    };
  }, [audioUrl]);

  async function startRecording() {
    if (recording || submitting) return;
    setMicError("");
    setStatus("");
    setRecordingSeconds(0);

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const recorder = new MediaRecorder(stream, {
        mimeType: MediaRecorder.isTypeSupported("audio/webm") ? "audio/webm" : undefined,
      });

      chunksRef.current = [];
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        setAudioBlob(blob);
        if (audioUrl) URL.revokeObjectURL(audioUrl);
        setAudioUrl(URL.createObjectURL(blob));
        setStatus("Voice note ready.");
        stream.getTracks().forEach((track) => track.stop());
      };

      recorderRef.current = recorder;
      recorder.start();
      setRecording(true);
      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((current) => {
          if (current + 1 >= MAX_SECONDS) {
            stopRecording();
            return MAX_SECONDS;
          }
          return current + 1;
        });
      }, 1000);
    } catch (err) {
      setMicError("Microphone access is not available. You can still check in with text.");
    }
  }

  function stopRecording() {
    window.clearInterval(timerRef.current);
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      recorderRef.current.stop();
    }
    setRecording(false);
  }

  async function submitCheckIn(event) {
    event.preventDefault();
    if (!audioBlob && !text.trim()) {
      setStatus("Add a voice note or a few words first.");
      return;
    }

    setSubmitting(true);
    setStatus("Holding this for a moment...");
    try {
      const formData = new FormData();
      formData.append("session_id", sessionId);
      formData.append("text", text);
      formData.append("craving_score", String(cravingScore));
      if (audioBlob) {
        formData.append("audio", audioBlob, "stepback-checkin.webm");
      }

      await api.post("/checkin", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const dashboard = await api.get(`/dashboard/${sessionId}`);
      setText("");
      setAudioBlob(null);
      setAudioUrl("");
      setStatus("Checked in. Nice and steady.");
      onSubmitted(dashboard.data);
    } catch (err) {
      const dashboard = onOfflineSubmit?.(text, cravingScore);
      setText("");
      setAudioBlob(null);
      setAudioUrl("");
      setStatus("Checked in on this phone.");
      onSubmitted(dashboard);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="checkin-screen" aria-labelledby="checkin-title">
      <div className="checkin-copy">
        <p className="eyebrow">One small pause</p>
        <h1 id="checkin-title">How are things right now?</h1>
        <p>
          Hold the button, say what feels true, and add anything in writing if that
          feels easier.
        </p>
      </div>

      <form className="checkin-panel" onSubmit={submitCheckIn}>
        <button
          className={`mic-button ${recording ? "is-recording" : ""}`}
          type="button"
          onPointerDown={startRecording}
          onPointerUp={stopRecording}
          onPointerCancel={stopRecording}
          onPointerLeave={() => {
            if (recording) stopRecording();
          }}
          onKeyDown={(event) => {
            if (event.key === " " || event.key === "Enter") startRecording();
          }}
          onKeyUp={(event) => {
            if (event.key === " " || event.key === "Enter") stopRecording();
          }}
          aria-pressed={recording}
          aria-label="Hold to record a short voice note"
        >
          <span className="mic-core" />
          <strong>{recording ? `${recordingSeconds}s` : "Hold"}</strong>
          <small>{recording ? "release to save" : "to record"}</small>
        </button>

        {audioUrl ? (
          <div className="audio-preview">
            <span>Voice note saved</span>
            <audio src={audioUrl} controls />
            <button
              className="text-button"
              type="button"
              onClick={() => {
                setAudioBlob(null);
                setAudioUrl("");
                setStatus("");
              }}
            >
              Clear
            </button>
          </div>
        ) : null}

        {micError ? <p className="helper warning">{micError}</p> : null}

        <label className="field">
          <span>Add anything in writing too</span>
          <textarea
            value={text}
            onChange={(event) => setText(event.target.value)}
            rows={5}
            placeholder="A few words are enough."
          />
        </label>

        <label className="field slider-field">
          <span>Craving intensity</span>
          <div className="slider-row">
            <input
              type="range"
              min="1"
              max="10"
              value={cravingScore}
              onChange={(event) => setCravingScore(Number(event.target.value))}
            />
            <strong>{cravingScore}</strong>
          </div>
        </label>

        <button className="primary-button" disabled={submitting} type="submit">
          {submitting ? "Checking in..." : "Submit check-in"}
        </button>

        {status ? <p className="helper">{status}</p> : null}
      </form>
    </section>
  );
}
