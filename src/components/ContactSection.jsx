import { useState } from "react";
import emailjs from "emailjs-com";
import "./ContactSection.css";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.message) {
      alert("Please fill in all fields");
      return;
    }

    setLoading(true);

    const templateParams = {
      name: form.name,
      email: form.email,
      message: form.message,
      reply_to: form.email,
    };

    emailjs
      .send(
        "service_d9noirn",
        "template_pya0np5",
        templateParams,
        "R8fSoenyfB7Ewk2yy"
      )
      .then(
        (response) => {
          console.log("Email sent successfully:", response);
          setSent(true);
          setLoading(false);
          setTimeout(() => setSent(false), 3500);
          setForm({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error("Failed to send email:", error);
          alert("Failed to send message. Please try again.");
          setLoading(false);
        }
      );
  };

  return (
    <section id="contact" className="contact-section">
      <div className="mx-auto max-w-xl px-6 py-24">
        <h2 className="section-title text-center">Get In Touch</h2>

        <form className="contact-card mt-10 space-y-4" onSubmit={onSubmit}>
          <input
            className="input"
            placeholder="Name"
            value={form.name}
            onChange={(e) => onChange("name", e.target.value)}
          />

          <input
            className="input"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
          />

          <textarea
            className="input"
            rows={5}
            placeholder="Message"
            value={form.message}
            onChange={(e) => onChange("message", e.target.value)}
          />

          <button
            type="submit"
            className="send-btn"
            disabled={loading}
            style={{
              background: loading
                ? "#999"
                : sent
                ? "linear-gradient(135deg,#15803d,#22c55e)"
                : "linear-gradient(135deg,#d97706,#eab308)",
            }}
          >
            {loading
              ? "Sending..."
              : sent
              ? "✓  Message Sent!"
              : "Send Message  →"}
          </button>
        </form>

        <div className="flex justify-center gap-10 mt-12">
          {[
            {
              l: "GitHub",
              i: "💻",
              a: "https://github.com/mohamedshal",
            },
            {
              l: "LinkedIn",
              i: "🔗",
              a: "https://www.linkedin.com/in/mohamed-shalaby-306a40223/",
            },
            {
              l: "Whatsapp",
              i: "💬",
              a: "https://wa.me/201016409206",
            },
            {
              l: "Email",
              i: "📧",
              a: "mailto:mohamedshelby682@gmail.com",
            },
          ].map((s) => (
            <a
              key={s.l}
              href={s.a}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn flex flex-col items-center gap-2"
              style={{ color: "#4b5563" }}
            >
              <span style={{ fontSize: 22 }}>{s.i}</span>
              <span className="text-[9px] font-bold tracking-[3px] uppercase">
                {s.l}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}