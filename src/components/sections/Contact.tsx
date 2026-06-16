"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import emailjs from "@emailjs/browser";
import SectionWrapper from "@/components/SectionWrapper";
import { Input, Textarea } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Send, CheckCircle, AlertCircle, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const SERVICE_ID           = "service_dfuheb5";
const TEMPLATE_ID          = "template_fz8syc3";
const AUTO_REPLY_TEMPLATE_ID = "template_ivdkwoj";
const PUBLIC_KEY           = "E6JO-uj8R8fbgMQ0y";

const socialLinks = [
  { icon: FaGithub,   label: "GitHub",   href: "https://github.com/surajchi" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/surajchinkate" },
  { icon: Mail,     label: "Email",    href: "mailto:chinkatesuraj@gmail.com" },
];

interface FormState {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [form, setForm]       = useState<FormState>({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError]     = useState("");
  const { ref, inView }       = useInView({ triggerOnce: true, threshold: 0.1 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const templateParams = {
      from_name:  form.name,
      from_email: form.email,
      message:    form.message,
      reply_to:   form.email,
    };

    try {
      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      await emailjs.send(SERVICE_ID, AUTO_REPLY_TEMPLATE_ID, templateParams, PUBLIC_KEY);
      setSuccess(true);
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("EmailJS error:", err);
      setError("Something went wrong. Please try again or email me directly.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SectionWrapper title="Contact Me" id="contact">
      <div ref={ref} className="grid md:grid-cols-2 gap-12 items-start max-w-4xl mx-auto">
        {/* Left: Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        >
          <h3 className="font-display text-2xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Let&apos;s build something great together
          </h3>
          <p className="text-sm leading-relaxed mb-8" style={{ color: "var(--text-secondary)" }}>
            Whether you have a project idea, want to collaborate, or just want to say hi —
            my inbox is always open. I&apos;ll get back to you as soon as possible.
          </p>

          <div className="flex flex-col gap-3">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("mailto:") ? undefined : "_blank"}
                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                whileHover={{ x: 6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-3 group"
                style={{ color: "var(--text-secondary)" }}
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
                  style={{
                    background: "var(--bg-card)",
                    border: "1px solid var(--border-color)",
                  }}
                >
                  <Icon size={15} style={{ color: "var(--accent-color)" }} />
                </div>
                <span
                  className="text-sm font-medium transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {label}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>

        {/* Right: Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.23, 1, 0.32, 1] }}
        >
          <Card className="p-7">
            <CardContent className="p-0">
              {success ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 gap-4"
                >
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center"
                    style={{
                      background: "var(--accent-soft)",
                      border: "1px solid var(--accent-border)",
                    }}
                  >
                    <CheckCircle size={26} style={{ color: "var(--accent-color)" }} />
                  </div>
                  <h4 className="font-semibold" style={{ color: "var(--text-primary)" }}>
                    Message sent!
                  </h4>
                  <p className="text-xs text-center" style={{ color: "var(--text-muted)" }}>
                    I&apos;ll get back to you soon. Check your inbox for a confirmation.
                  </p>
                  <button
                    type="button"
                    onClick={() => setSuccess(false)}
                    className="text-xs underline"
                    style={{ color: "var(--accent-color)" }}
                  >
                    Send another
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="you@example.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  {error && (
                    <div
                      className="flex items-start gap-2 p-3 rounded-xl text-xs"
                      style={{
                        background: "rgba(239,68,68,0.1)",
                        border: "1px solid rgba(239,68,68,0.25)",
                        color: "#ef4444",
                      }}
                    >
                      <AlertCircle size={13} className="mt-0.5 shrink-0" />
                      {error}
                    </div>
                  )}

                  <motion.div whileHover={{ scale: 1.02, y: -1 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      variant="gold"
                      className="w-full rounded-xl py-3.5 gap-2"
                    >
                      {loading ? (
                        <>
                          <motion.div
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={14} />
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
