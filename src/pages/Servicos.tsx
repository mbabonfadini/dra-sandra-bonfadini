import { motion } from "framer-motion";
import { Scale } from "lucide-react";
import Layout from "@/components/Layout";
import { getServices } from "@/lib/servicesStore";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const Servicos = () => {
  const services = getServices();

  return (
    <Layout>
      {/* Hero Banner */}
      <section className="bg-primary py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <p className="font-body text-xs tracking-[0.3em] uppercase text-secondary mb-4">
              Áreas de Atuação
            </p>
            <h1 className="font-heading text-4xl md:text-5xl text-primary-foreground mb-4">
              Nossos Serviços
            </h1>
            <div className="w-16 h-0.5 bg-secondary mx-auto" />
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={{
                  ...fadeUp,
                  visible: { ...fadeUp.visible, transition: { ...fadeUp.visible.transition, delay: i * 0.1 } },
                }}
                className="bg-card border border-border group hover:shadow-lg transition-shadow duration-300"
              >
                {service.imageUrl ? (
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-48 object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-48 bg-primary/5 flex items-center justify-center">
                    <Scale className="w-12 h-12 text-secondary/40" />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-heading text-xl text-foreground mb-3 group-hover:text-primary transition-colors">
                    {service.title}
                  </h3>
                  <p className="font-body text-sm text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-card border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4">
            Não encontrou o que procura?
          </h2>
          <p className="font-body text-muted-foreground mb-8 max-w-md mx-auto">
            Entre em contato e converse diretamente com a Dra. Sandra sobre o seu caso.
          </p>
          <a
            href="https://wa.me/5500000000000"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-primary text-primary-foreground px-10 py-3.5 font-body text-sm tracking-widest uppercase font-semibold hover:opacity-90 transition-opacity"
          >
            Fale Conosco
          </a>
        </div>
      </section>
    </Layout>
  );
};

export default Servicos;
