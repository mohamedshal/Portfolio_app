import { useState } from "react";
import emailjs from "emailjs-com";
import { FaGithub, FaLinkedin, FaWhatsapp, FaEnvelope, FaCheck } from "../icons";
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

  const socials = [
    {
      l: "GitHub",
      Icon: FaGithub,
      a: "https://github.com/mohamedshal",
    },
    {
      l: "LinkedIn",
      Icon: FaLinkedin,
      a: "https://www.linkedin.com/in/mohamed-shalaby-306a40223/",
    },
    {
      l: "WhatsApp",
      Icon: FaWhatsapp,
      a: "https://wa.me/201016409206",
    },
    {
      l: "Email",
      Icon: FaEnvelope,
      a: "mailto:mohamedshelby682@gmail.com",
    },
  ];

  return (
    <section id="contact" className="section contact-section">
      <div className="container contact-inner">
        <div className="section-head section-head--center reveal">
          <h2 className="section-title">Get In Touch</h2>
        </div>

        <form className="contact-card reveal reveal-d1" onSubmit={onSubmit}>
          <div className="field">
            <label className="field-label" htmlFor="contact-name">Name</label>
            <input
              id="contact-name"
              className="input"
              placeholder="Name"
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="contact-email">Email</label>
            <input
              id="contact-email"
              className="input"
              placeholder="Email"
              type="email"
              value={form.email}
              onChange={(e) => onChange("email", e.target.value)}
            />
          </div>

          <div className="field">
            <label className="field-label" htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              className="input input--area"
              rows={5}
              placeholder="Message"
              value={form.message}
              onChange={(e) => onChange("message", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`send-btn${loading ? " is-loading" : sent ? " is-sent" : ""}`}
            disabled={loading}
          >
            {loading ? (
              "Sending..."
            ) : sent ? (
              <span className="send-btn__sent">
                <FaCheck aria-hidden="true" /> Message Sent!
              </span>
            ) : (
              "Send Message  →"
            )}
          </button>
        </form>

        <div className="social-row reveal reveal-d2">
          {socials.map(({ l, Icon, a }) => (
            <a
              key={l}
              href={a}
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn social-tile"
            >
              <span className="social-icon" aria-hidden="true">
                <Icon />
              </span>
              <span className="social-label">{l}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
