import { motion } from "framer-motion";
import { Award, Users, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import portraitImage from "@/assets/advogada-portrait.jpeg";
import officeImage from "@/assets/about-office.jpg";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Sobre = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              Quem Somos
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-4">
              Sobre Nós
            </h1>
            <div className="w-16 h-0.5 bg-secondary mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* About the Lawyer */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img
                src={portraitImage}
                alt="Dra. Sandra Bonfadini"
                className="w-full max-w-md mx-auto shadow-2xl"
                loading="lazy"
                width={800}
                height={1024}
              />
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
                A Advogada
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Dra. Sandra Bonfadini
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                A Dra. Sandra Bonfadini é advogada especializada em Direito de Família, com anos de experiência
                na defesa dos direitos das mulheres e crianças em situação de vulnerabilidade.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Formada em Direito, possui especializações em Direito de Família e Sucessões, além de
                formação complementar em mediação de conflitos familiares. Sua atuação é pautada pela ética,
                empatia e pela busca constante de justiça.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Ao longo de sua carreira, já atendeu centenas de mulheres em processos de divórcio,
                guarda, pensão alimentícia e medidas protetivas, sempre com atendimento personalizado
                e humanizado.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission / Values */}
      <section className="py-24 bg-card">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-4">
              Nossos Valores
            </h2>
            <div className="w-16 h-0.5 bg-secondary mx-auto" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Award,
                title: "Excelência Jurídica",
                desc: "Compromisso com a qualidade técnica e a atualização constante para oferecer a melhor defesa aos nossos clientes.",
              },
              {
                icon: Users,
                title: "Empatia e Acolhimento",
                desc: "Cada cliente é recebida com respeito e compreensão, porque entendemos que por trás de cada processo há uma história de vida.",
              },
              {
                icon: BookOpen,
                title: "Ética e Transparência",
                desc: "Atuação pautada pelos mais altos padrões éticos, com comunicação clara e honesta em todas as etapas do processo.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  ...fadeUp,
                  visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: i * 0.15 } },
                }}
                className="text-center"
              >
                <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center bg-primary">
                  <item.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="font-heading text-xl text-foreground mb-3">{item.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Office */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
                O Escritório
              </p>
              <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">
                Um espaço de acolhimento
              </h2>
              <p className="font-body text-muted-foreground leading-relaxed mb-4">
                Nosso escritório foi pensado para oferecer conforto e privacidade.
                Aqui, cada cliente encontra um ambiente seguro para compartilhar sua história
                e receber a orientação jurídica necessária.
              </p>
              <p className="font-body text-muted-foreground leading-relaxed">
                Localizado em região de fácil acesso, contamos com estrutura moderna
                e equipe preparada para atender com a excelência que você merece.
              </p>
            </motion.div>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <img
                src={officeImage}
                alt="Escritório Sandra Bonfadini"
                className="w-full shadow-2xl"
                loading="lazy"
                width={1200}
                height={800}
              />
            </motion.div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
