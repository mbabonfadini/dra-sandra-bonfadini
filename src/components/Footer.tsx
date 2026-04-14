import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <img src={logo} alt="Dra. Sandra Bonfadini" className="h-16 w-auto mb-4 brightness-200" />
            <p className="font-body text-sm leading-relaxed opacity-80">
              Advocacia especializada em Direito de Família com atendimento humanizado e focado na proteção dos direitos das mulheres.
            </p>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Navegação</h4>
            <ul className="space-y-2 font-body text-sm opacity-80">
              <li><a href="/" className="hover:opacity-100 transition-opacity">Início</a></li>
              <li><a href="/servicos" className="hover:opacity-100 transition-opacity">Serviços</a></li>
              <li><a href="/sobre" className="hover:opacity-100 transition-opacity">Sobre Nós</a></li>
              <li><a href="/contato" className="hover:opacity-100 transition-opacity">Contato</a></li>
              <li><a href="/login" className="hover:opacity-100 transition-opacity">Entrar</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-lg mb-4">Contato</h4>
            <ul className="space-y-2 font-body text-sm opacity-80">
              <li>contato@drasandrabonfadini.com.br</li>
              <li>(19) 99618-1360</li>
              <li>Av. João Pessoa, 947 - Jardim Europa, Nova Odessa - SP, 13460-000</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8 text-center font-body text-xs opacity-60">
          © {new Date().getFullYear()} Dra. Sandra Bonfadini. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
