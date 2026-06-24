import { useState } from "react";
import { savePrivateProfile } from "../privacyStore.js";

const EMPTY_PROFILE = {
  name: "",
  age: "",
  gender: "",
  phone: "",
  consumesAlcohol: "no",
  consumesDrugs: "no",
  drugDetails: "",
  physicalHealth: "",
  reminderTime: "20:00",
};

export default function AccountSetup({ existingProfile, onComplete }) {
  const [profile, setProfile] = useState(existingProfile || EMPTY_PROFILE);

  function update(field, value) {
    setProfile((current) => ({ ...current, [field]: value }));
  }

  function submit(event) {
    event.preventDefault();
    const saved = savePrivateProfile(profile);
    onComplete(saved);
  }

  return (
    <section className="onboarding-screen" aria-labelledby="account-title">
      <div className="checkin-copy">
        <p className="eyebrow">Create account</p>
        <h1 id="account-title">Set up your private space.</h1>
        <p>
          Your name and phone stay on this phone. StepBack uses only anonymous
          health and behavior patterns for analysis.
        </p>
      </div>

      <form className="checkin-panel account-form" onSubmit={submit}>
        <div className="form-grid">
          <label className="field">
            <span>Name</span>
            <input
              value={profile.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="Your name"
              required
            />
          </label>
          <label className="field">
            <span>Age</span>
            <input
              type="number"
              min="13"
              max="120"
              value={profile.age}
              onChange={(event) => update("age", event.target.value)}
              placeholder="Age"
              required
            />
          </label>
        </div>

        <div className="form-grid">
          <label className="field">
            <span>Gender</span>
            <select
              value={profile.gender}
              onChange={(event) => update("gender", event.target.value)}
              required
            >
              <option value="">Select</option>
              <option value="woman">Woman</option>
              <option value="man">Man</option>
              <option value="non-binary">Non-binary</option>
              <option value="prefer not to say">Prefer not to say</option>
            </select>
          </label>
          <label className="field">
            <span>Phone number</span>
            <input
              value={profile.phone}
              onChange={(event) => update("phone", event.target.value)}
              placeholder="+230..."
              inputMode="tel"
            />
          </label>
        </div>

        <div className="choice-row">
          <span>Do you consume alcohol?</span>
          <button
            className={profile.consumesAlcohol === "yes" ? "is-selected" : ""}
            onClick={() => update("consumesAlcohol", "yes")}
            type="button"
          >
            Yes
          </button>
          <button
            className={profile.consumesAlcohol === "no" ? "is-selected" : ""}
            onClick={() => update("consumesAlcohol", "no")}
            type="button"
          >
            No
          </button>
        </div>

        <div className="choice-row">
          <span>Do you consume any drugs?</span>
          <button
            className={profile.consumesDrugs === "yes" ? "is-selected" : ""}
            onClick={() => update("consumesDrugs", "yes")}
            type="button"
          >
            Yes
          </button>
          <button
            className={profile.consumesDrugs === "no" ? "is-selected" : ""}
            onClick={() => update("consumesDrugs", "no")}
            type="button"
          >
            No
          </button>
        </div>

        {profile.consumesDrugs === "yes" ? (
          <label className="field">
            <span>If any, please specify</span>
            <input
              value={profile.drugDetails}
              onChange={(event) => update("drugDetails", event.target.value)}
              placeholder="Optional"
            />
          </label>
        ) : null}

        <label className="field">
          <span>Physical health or other factors</span>
          <textarea
            value={profile.physicalHealth}
            onChange={(event) => update("physicalHealth", event.target.value)}
            placeholder="Sleep, pain, medication, stress, appetite, anything relevant."
            rows={4}
          />
        </label>

        <label className="field">
          <span>Daily mood reminder time</span>
          <input
            type="time"
            value={profile.reminderTime}
            onChange={(event) => update("reminderTime", event.target.value)}
          />
        </label>

        <div className="privacy-card">
          <strong>Privacy promise</strong>
          <p>
            Identifying details stay on this device. Analysis uses an anonymous
            profile with age band, behavior tags, cravings, mood, and health signals.
          </p>
        </div>

        <button className="primary-button" type="submit">
          Continue
        </button>
      </form>
    </section>
  );
}
