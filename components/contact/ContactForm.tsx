"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import GlassCard from "@/components/ui/GlassCard";

type FormState = "idle" | "submitting" | "success";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    // Simulate network delay — replace with real endpoint
    await new Promise((r) => setTimeout(r, 1200));
    setState("success");
  }

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "var(--bg-primary)",
    border: "1px solid var(--glass-border)",
    borderRadius: "12px",
    padding: "12px 14px",
    fontSize: "0.9rem",
    color: "var(--text-primary)",
    outline: "none",
    transition: "border-color 0.2s",
  };

  if (state === "success") {
    return (
      <GlassCard padding="lg" className="flex flex-col items-center justify-center text-center" style={{ minHeight: 400 }}>
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center mb-4"
          style={{ background: "rgba(52,199,89,0.12)" }}
        >
          <CheckCircle size={32} style={{ color: "#34c759" }} />
        </div>
        <h2 className="text-xl font-bold mb-2" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>
          Message Sent!
        </h2>
        <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
          Thanks for reaching out. I&rsquo;ll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setState("idle"); setForm({ name: "", email: "", subject: "", message: "" }); }}
          className="mt-6 text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
          style={{ background: "var(--accent)", color: "#fff" }}
        >
          Send another
        </button>
      </GlassCard>
    );
  }

  return (
    <GlassCard padding="lg">
      <h2 className="text-lg font-bold mb-6" style={{ fontFamily: "var(--font-display, serif)", color: "var(--text-primary)" }}>
        Send a Message
      </h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
              Your Name <span style={{ color: "var(--accent)" }}>*</span>
            </label>
            <input
              type="text"
              name="name"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="Dipak Shaw"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
            />
          </div>
          <div>
            <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
              Email Address <span style={{ color: "var(--accent)" }}>*</span>
            </label>
            <input
              type="email"
              name="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              style={inputStyle}
              onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
              onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
            />
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
            Subject <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <select
            name="subject"
            required
            value={form.subject}
            onChange={handleChange}
            style={{ ...inputStyle, cursor: "pointer" }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
          >
            <option value="" disabled>Select a topic…</option>
            <option value="general">General question</option>
            <option value="collaboration">Collaboration / project</option>
            <option value="speaking">Speaking / workshop</option>
            <option value="feedback">Article feedback</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold block mb-1.5" style={{ color: "var(--text-tertiary)" }}>
            Message <span style={{ color: "var(--accent)" }}>*</span>
          </label>
          <textarea
            name="message"
            required
            rows={6}
            value={form.message}
            onChange={handleChange}
            placeholder="Tell me what's on your mind…"
            style={{ ...inputStyle, resize: "vertical", minHeight: 140 }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--glass-border)")}
          />
        </div>

        <button
          type="submit"
          disabled={state === "submitting"}
          className="flex items-center justify-center gap-2 px-6 py-3 rounded-full font-semibold text-white transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: "var(--accent)", boxShadow: "0 4px 16px rgba(0,122,255,0.3)" }}
        >
          {state === "submitting" ? (
            <>
              <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Sending…
            </>
          ) : (
            <>
              <Send size={15} />
              Send Message
            </>
          )}
        </button>
      </form>
    </GlassCard>
  );
}
