import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Scale, Heart, Shield, ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import heroImage from "@/assets/hero-office.jpg";
import portraitImage from "@/assets/advogada-portrait.jpeg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" as const } },
};

const Index = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[90vh] min-h-[600px] flex items-center">
        <div className="absolute inset-0">
          <img src={heroImage} alt="Escritório de advocacia" className="w-full h-full object-cover" width={1920} height={1080} />
          <div className="absolute inset-0 bg-gradient-to-r from-foreground/90 via-foreground/70 to-foreground/40" />
        </div>
        <div className="relative container mx-auto px-4">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="max-w-2xl"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-muted mb-4">
              Sandra Bonfadini · Advogada
            </p>
            <h1 className="font-heading text-4xl md:text-6xl leading-tight text-primary-foreground mb-6">
              Advocacia com <br />
              <span className="text-secondary">sensibilidade</span> e excelência
            </h1>
            <p className="font-body text-base md:text-lg text-muted leading-relaxed mb-8 max-w-lg">
              Especializada em Direito de Família e na defesa dos direitos das mulheres.
              Atendimento humanizado e comprometido com a sua causa.
            </p>
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/5519996181360"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground px-8 py-3 font-body text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity"
              >
                Agende uma Consulta
              </a>
              <Link
                to="/servicos"
                className="border border-muted text-muted px-8 py-3 font-body text-sm tracking-widest uppercase font-semibold hover:bg-muted/10 transition-colors"
              >
                Nossos Serviços
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Por que nos escolher
            </h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Scale,
                title: "Experiência",
                desc: "Anos de atuação em Direito de Família, com profundo conhecimento das varas de família e seus procedimentos.",
              },
              {
                icon: Heart,
                title: "Atendimento Humanizado",
                desc: "Cada caso é tratado com empatia e dedicação, respeitando a singularidade de cada história.",
              },
              {
                icon: Shield,
                title: "Proteção",
                desc: "Compromisso com a defesa dos direitos das mulheres em situação de vulnerabilidade e violência.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  ...fadeUp,
                  visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: i * 0.15 } },
                }}
                className="text-center group"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center border border-secondary/30 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                  <item.icon className="w-7 h-7 text-secondary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <img
                src={portraitImage}
                alt="Dra. Sandra Bonfadini"
                className="w-full max-w-md mx-auto object-cover shadow-2xl"
                loading="lazy"
                width={800}
                height={1024}
              />
            </motion.div>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
                Conheça a Dra. Sandra
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6 leading-tight">
                Compromisso com a justiça e a dignidade da mulher
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Com vasta experiência em Direito de Família, a Dra. Sandra Bonfadini dedica sua carreira à defesa dos direitos das mulheres,
                atuando com ética, sensibilidade e determinação em cada caso.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                Seu escritório é referência no atendimento de casos de divórcio, guarda, pensão alimentícia
                e violência doméstica, sempre buscando as melhores soluções para suas clientes.
              </p>
              <Link
                to="/sobre"
                className="inline-flex items-center gap-2 font-body text-sm tracking-widest uppercase font-semibold text-primary hover:text-secondary transition-colors"
              >
                Saiba Mais <ArrowRight size={16} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
          >
            <h2 className="font-heading text-3xl md:text-4xl text-primary-foreground mb-4">
              Precisa de orientação jurídica?
            </h2>
            <p className="font-body text-primary-foreground/80 max-w-lg mx-auto mb-8">
              Entre em contato e agende uma consulta. Estamos prontos para ouvir sua história e defender seus direitos.
            </p>
            <a
              href="https://wa.me/5519996181360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-secondary text-secondary-foreground px-10 py-3.5 font-body text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity"
            >
              Fale Conosco
            </a>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
