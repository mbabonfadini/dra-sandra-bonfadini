import { useState, useEffect } from "react";
import { Plus, Trash2, Save, ArrowLeft, ImageIcon, LogOut, BarChart3, MessageSquare, Settings, Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { getServices, saveServices, Service } from "@/lib/servicesStore";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";

type Tab = "dashboard" | "messages" | "services";

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  read: boolean;
  created_at: string;
}

interface PageViewStats {
  page_path: string;
  count: number;
}

const Admin = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState<Tab>("dashboard");
  const [services, setServices] = useState<Service[]>(getServices());
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [pageViews, setPageViews] = useState<PageViewStats[]>([]);
  const [totalViews, setTotalViews] = useState(0);
  const [todayViews, setTodayViews] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (!user) return;
    fetchMessages();
    fetchAnalytics();
  }, [user]);

  const fetchMessages = async () => {
    const { data } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) {
      setMessages(data as ContactMessage[]);
      setUnreadCount(data.filter((m: ContactMessage) => !m.read).length);
    }
  };

  const fetchAnalytics = async () => {
    const { data: allViews } = await supabase.from("page_views").select("*");
    if (allViews) {
      setTotalViews(allViews.length);

      const today = new Date().toISOString().split("T")[0];
      setTodayViews(allViews.filter((v) => v.created_at.startsWith(today)).length);

      const grouped: Record<string, number> = {};
      allViews.forEach((v) => {
        grouped[v.page_path] = (grouped[v.page_path] || 0) + 1;
      });
      setPageViews(
        Object.entries(grouped)
          .map(([page_path, count]) => ({ page_path, count }))
          .sort((a, b) => b.count - a.count)
      );
    }
  };

  const toggleRead = async (msg: ContactMessage) => {
    await supabase.from("contact_messages").update({ read: !msg.read }).eq("id", msg.id);
    fetchMessages();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  // Services handlers
  const handleAdd = () => {
    setServices([...services, { id: Date.now().toString(), title: "", description: "", imageUrl: "" }]);
  };

  const handleUpdate = (id: string, field: keyof Service, value: string) => {
    setServices(services.map((s) => (s.id === id ? { ...s, [field]: value } : s)));
  };

  const handleDelete = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => handleUpdate(id, "imageUrl", e.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleSave = () => {
    saveServices(services);
    toast.success("Serviços salvos com sucesso!");
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="font-body text-muted-foreground">Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  const tabs: { id: Tab; label: string; icon: React.ElementType }[] = [
    { id: "dashboard", label: "Dashboard", icon: BarChart3 },
    { id: "messages", label: "Mensagens", icon: MessageSquare },
    { id: "services", label: "Serviços", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link to="/" className="hover:opacity-80 transition-opacity">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="font-heading text-xl md:text-2xl">Painel Administrativo</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 font-body text-xs tracking-wider uppercase hover:opacity-80 transition-opacity"
          >
            <LogOut size={16} /> Sair
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="container mx-auto px-4 flex gap-0">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2 px-6 py-3.5 font-body text-xs tracking-widest uppercase border-b-2 transition-colors ${
                tab === t.id
                  ? "border-primary text-primary font-semibold"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              }`}
            >
              <t.icon size={16} />
              {t.label}
              {t.id === "messages" && unreadCount > 0 && (
                <span className="bg-destructive text-destructive-foreground text-[10px] px-1.5 py-0.5 font-bold">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Dashboard Tab */}
        {tab === "dashboard" && (
          <div className="space-y-8">
            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { label: "Total de Acessos", value: totalViews, color: "bg-primary" },
                { label: "Acessos Hoje", value: todayViews, color: "bg-secondary" },
                { label: "Mensagens", value: messages.length, color: "bg-primary" },
                { label: "Não Lidas", value: unreadCount, color: "bg-destructive" },
              ].map((card) => (
                <div key={card.label} className="bg-card border border-border p-6">
                  <p className="font-body text-xs tracking-widest uppercase text-muted-foreground mb-2">
                    {card.label}
                  </p>
                  <p className="font-heading text-3xl text-foreground">{card.value}</p>
                </div>
              ))}
            </div>

            {/* Page Views Chart */}
            <div className="bg-card border border-border p-6">
              <h3 className="font-heading text-lg text-foreground mb-6">Páginas mais acessadas</h3>
              {pageViews.length === 0 ? (
                <p className="font-body text-sm text-muted-foreground">Nenhum dado de acesso ainda.</p>
              ) : (
                <div className="space-y-4">
                  {pageViews.map((pv) => {
                    const maxCount = pageViews[0]?.count || 1;
                    const pct = Math.round((pv.count / maxCount) * 100);
                    return (
                      <div key={pv.page_path}>
                        <div className="flex justify-between font-body text-sm mb-1">
                          <span className="text-foreground">{pv.page_path}</span>
                          <span className="text-muted-foreground">{pv.count} acessos</span>
                        </div>
                        <div className="w-full h-2 bg-muted/30 overflow-hidden">
                          <div
                            className="h-full bg-secondary transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Messages Tab */}
        {tab === "messages" && (
          <div className="space-y-4">
            {messages.length === 0 ? (
              <div className="bg-card border border-border p-12 text-center">
                <MessageSquare className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
                <p className="font-body text-muted-foreground">Nenhuma mensagem recebida.</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`bg-card border p-6 ${msg.read ? "border-border" : "border-secondary"}`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-body text-sm font-semibold text-foreground">{msg.name}</h4>
                        {!msg.read && (
                          <span className="bg-secondary text-secondary-foreground text-[10px] px-2 py-0.5 font-bold uppercase">
                            Nova
                          </span>
                        )}
                      </div>
                      <p className="font-body text-xs text-muted-foreground mb-1">
                        {msg.email} {msg.phone && `· ${msg.phone}`}
                      </p>
                      <p className="font-body text-sm text-foreground/80 mt-3 whitespace-pre-wrap">
                        {msg.message}
                      </p>
                      <p className="font-body text-xs text-muted-foreground mt-3">
                        {new Date(msg.created_at).toLocaleString("pt-BR")}
                      </p>
                    </div>
                    <button
                      onClick={() => toggleRead(msg)}
                      className="text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      aria-label={msg.read ? "Marcar como não lida" : "Marcar como lida"}
                    >
                      {msg.read ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Services Tab */}
        {tab === "services" && (
          <>
            <div className="flex justify-end mb-6">
              <button
                onClick={handleSave}
                className="flex items-center gap-2 bg-secondary text-secondary-foreground px-6 py-2.5 font-body text-sm tracking-wider uppercase font-semibold hover:opacity-90 transition-opacity"
              >
                <Save size={16} /> Salvar
              </button>
            </div>

            <div className="space-y-6">
              {services.map((service, index) => (
                <div key={service.id} className="bg-card border border-border p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-body text-xs tracking-widest uppercase text-muted-foreground">
                      Serviço {index + 1}
                    </span>
                    <button
                      onClick={() => handleDelete(service.id)}
                      className="text-destructive hover:opacity-70 transition-opacity"
                      aria-label="Remover serviço"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1">
                      <label className="block font-body text-sm font-medium text-foreground mb-2">Imagem</label>
                      {service.imageUrl ? (
                        <div className="relative group">
                          <img src={service.imageUrl} alt={service.title} className="w-full h-40 object-cover border border-border" />
                          <button
                            onClick={() => handleUpdate(service.id, "imageUrl", "")}
                            className="absolute top-2 right-2 bg-destructive text-destructive-foreground p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ) : (
                        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-border cursor-pointer hover:border-secondary transition-colors">
                          <ImageIcon size={24} className="text-muted-foreground mb-2" />
                          <span className="font-body text-xs text-muted-foreground">Clique para enviar</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) handleImageUpload(service.id, file);
                            }}
                          />
                        </label>
                      )}
                    </div>

                    <div className="lg:col-span-2 space-y-4">
                      <div>
                        <label className="block font-body text-sm font-medium text-foreground mb-2">Título</label>
                        <input
                          type="text"
                          value={service.title}
                          onChange={(e) => handleUpdate(service.id, "title", e.target.value)}
                          placeholder="Ex: Direito de Família"
                          className="w-full bg-background border border-input px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block font-body text-sm font-medium text-foreground mb-2">Descrição</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleUpdate(service.id, "description", e.target.value)}
                          placeholder="Descreva o serviço..."
                          rows={3}
                          className="w-full bg-background border border-input px-4 py-2.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring resize-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={handleAdd}
              className="mt-6 flex items-center gap-2 border-2 border-dashed border-border px-6 py-3 font-body text-sm text-muted-foreground hover:border-secondary hover:text-secondary transition-colors w-full justify-center"
            >
              <Plus size={18} /> Adicionar Serviço
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Admin;
