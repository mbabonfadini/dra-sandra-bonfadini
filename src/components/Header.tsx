import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "Início", path: "/" },
  { label: "Serviços", path: "/servicos" },
  { label: "Sobre Nós", path: "/sobre" },
  { label: "Contato", path: "/contato" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto flex items-center justify-between h-20 px-4">
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Dra. Sandra Bonfadini" className="h-14 w-auto" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`font-body text-sm tracking-widest uppercase transition-colors duration-300 ${location.pathname === item.path
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-primary"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav className="md:hidden bg-card border-b border-border px-4 pb-6 space-y-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`block font-body text-sm tracking-widest uppercase py-2 ${location.pathname === item.path
                ? "text-primary font-semibold"
                : "text-muted-foreground"
                }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
};

export default Header;
