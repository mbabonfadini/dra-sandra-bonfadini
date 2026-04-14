export interface Service {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
}

const STORAGE_KEY = "sb_services";

const defaultServices: Service[] = [
    {
        id: "1",
        title: "Direito de Família",
        description: "Atuação especializada em divórcio, guarda de filhos, pensão alimentícia, regulamentação de visitas e partilha de bens. Atendimento humanizado com foco na proteção dos seus direitos.",
        imageUrl: "",
    },
    {
        id: "2",
        title: "Violência Doméstica",
        description: "Assessoria jurídica completa para mulheres vítimas de violência doméstica. Medidas protetivas, acompanhamento processual e suporte integral para garantir sua segurança.",
        imageUrl: "",
    },
    {
        id: "3",
        title: "Pensão Alimentícia",
        description: "Ações de fixação, revisão e execução de pensão alimentícia. Defesa dos interesses dos filhos e do cônjuge com agilidade e competência.",
        imageUrl: "",
    },
    {
        id: "4",
        title: "Guarda e Regulamentação de Visitas",
        description: "Orientação e representação jurídica em questões de guarda compartilhada, unilateral e regulamentação do direito de convivência familiar.",
        imageUrl: "",
    },
    {
        id: "5",
        title: "Divórcio Judicial e Extrajudicial",
        description: "Condução de processos de divórcio consensual e litigioso, com atenção especial à partilha de bens e proteção patrimonial.",
        imageUrl: "",
    },
    {
        id: "6",
        title: "Assessoria Jurídica para Mulheres",
        description: "Consultoria jurídica especializada para mulheres em situação de vulnerabilidade. Orientação preventiva e acompanhamento em todas as esferas do direito de família.",
        imageUrl: "",
    },
];

export function getServices(): Service[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
        try {
            return JSON.parse(stored);
        } catch {
            return defaultServices;
        }
    }
    return defaultServices;
}

export function saveServices(services: Service[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(services));
}
