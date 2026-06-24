import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import logging
from dotenv import load_dotenv

load_dotenv(override=False)

logger = logging.getLogger(__name__)

def send_otp_email(receiver_email: str, otp: str):
    # â”€â”€ Always log OTP first so it's visible in HF Space logs â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    print(f"ðŸš¨ DEMO MODE: OTP for {receiver_email} is {otp} ðŸš¨", flush=True)
    logger.info(f"ðŸš¨ DEMO MODE: OTP for {receiver_email} is {otp} ðŸš¨")

    smtp_server   = os.environ.get("SMTP_SERVER")
    smtp_port     = os.environ.get("SMTP_PORT", 587)
    smtp_user     = os.environ.get("SMTP_USERNAME")
    smtp_password = os.environ.get("SMTP_PASSWORD")
    smtp_from     = os.environ.get("SMTP_FROM_EMAIL", smtp_user)

    # â”€â”€ If SMTP creds are absent, skip sending but don't crash â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
    if not smtp_server or not smtp_user or not smtp_password:
        print("âš ï¸  SMTP credentials not configured â€” email skipped. Use OTP from logs above.", flush=True)
        logger.warning("SMTP credentials missing â€” OTP email not sent, but OTP is printed in server logs.")
        return True  # Return success so the frontend flow continues normally

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Your MindBridge AI Password Reset OTP"
    msg["From"] = f"MindBridge AI <{smtp_from}>"
    msg["To"] = receiver_email

    html_content = f"""
    <html>
      <body style="font-family: Arial, sans-serif; background-color: #0b1114; color: #ffffff; padding: 20px; text-align: center;">
        <div style="max-width: 500px; margin: 0 auto; background-color: #0a1f18; padding: 30px; border-radius: 12px; border: 1px solid rgba(0,255,136,0.3);">
            <h2 style="color: #7dd3fc; margin-bottom: 10px;">MindBridge AI</h2>
            <h3 style="color: #ffffff;">Password Reset Request</h3>
            <p style="color: #cbd5e1; font-size: 14px;">You requested a password reset. Use the OTP below to proceed. It is valid for 10 minutes.</p>
            <div style="margin: 30px 0; padding: 15px; background: rgba(0,0,0,0.4); border-radius: 8px; letter-spacing: 5px; font-size: 24px; font-weight: bold; color: #7dd3fc;">
                {otp}
            </div>
            <p style="color: #94a3b8; font-size: 12px;">If you didn't request this, please ignore this email.</p>
        </div>
      </body>
    </html>
    """
    msg.attach(MIMEText(html_content, "html"))

    # â”€â”€ Attempt to send â€” log failures silently, never raise to frontend â”€â”€â”€â”€
    try:
        server = smtplib.SMTP(smtp_server, int(smtp_port))
        server.starttls()
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_from, receiver_email, msg.as_string())
        server.quit()
        logger.info(f"âœ… OTP email sent successfully to {receiver_email}")
    except Exception as e:
        # SMTP failed (likely port blocked on HF free tier) â€” log and continue
        print(f"âš ï¸  SMTP send failed: {e}. OTP is still available in the logs above.", flush=True)
        logger.error(f"âŒ Failed to send OTP email to {receiver_email}: {e}")
        # Do NOT re-raise â€” frontend receives a clean success response

    return True


