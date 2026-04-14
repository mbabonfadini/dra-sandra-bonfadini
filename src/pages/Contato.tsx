import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nome é obrigatório").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(20).optional(),
  message: z.string().trim().min(1, "Mensagem é obrigatória").max(2000),
});

const Contato = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        if (issue.path[0]) fieldErrors[issue.path[0] as string] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      message: parsed.data.message,
    });
    setLoading(false);

    if (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.");
      return;
    }

    toast.success("Mensagem enviada com sucesso! Entraremos em contato em breve.");
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              Fale Conosco
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-4">
              Contato
            </h1>
            <div className="w-16 h-0.5 bg-secondary mx-auto" />
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
                Envie sua mensagem
              </h2>
              <p className="font-body text-muted-foreground mb-8">
                Preencha o formulário abaixo e retornaremos o mais breve possível.
              </p>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Nome *</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Seu nome completo"
                    className="w-full bg-card border border-input px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                  {errors.name && <p className="font-body text-xs text-destructive mt-1">{errors.name}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">Email *</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="seu@email.com"
                      className="w-full bg-card border border-input px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                    {errors.email && <p className="font-body text-xs text-destructive mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block font-body text-sm font-medium text-foreground mb-2">Telefone</label>
                    <input
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="(19) 99618-1360"
                      className="w-full bg-card border border-input px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-body text-sm font-medium text-foreground mb-2">Mensagem *</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Descreva brevemente como podemos ajudá-la..."
                    rows={5}
                    className="w-full bg-card border border-input px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                  />
                  {errors.message && <p className="font-body text-xs text-destructive mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 font-body text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  <Send size={16} />
                  {loading ? "Enviando..." : "Enviar Mensagem"}
                </button>
              </form>
            </motion.div>

            {/* Contact Info + WhatsApp */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
                Informações de contato
              </h2>

              <div className="space-y-6 mb-10">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-foreground mb-1">Telefone</h4>
                    <p className="font-body text-sm text-muted-foreground">(19) 99618-1360</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 shrink-0">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-foreground mb-1">Email</h4>
                    <p className="font-body text-sm text-muted-foreground">contato@drasandrabonfadini.com.br</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 flex items-center justify-center bg-primary/10 shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-body text-sm font-semibold text-foreground mb-1">Endereço</h4>
                    <p className="font-body text-sm text-muted-foreground">Av. João Pessoa, 947 - Jardim Europa, Nova Odessa - SP, 13460-000</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-card border border-border p-8">
                <h3 className="font-heading text-xl text-foreground mb-3">Atendimento rápido</h3>
                <p className="font-body text-sm text-muted-foreground mb-6">
                  Prefere conversar diretamente? Fale conosco pelo WhatsApp para um atendimento ágil e personalizado.
                </p>
                <a
                  href="https://wa.me/5500000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-[hsl(142,70%,35%)] text-white px-8 py-3.5 font-body text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity"
                >
                  <MessageCircle size={20} />
                  Chamar no WhatsApp
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
