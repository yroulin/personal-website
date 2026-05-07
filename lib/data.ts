interface Interest {
    name: string;
    icon: string;
}

interface Technology {
    name: string;
    category: string;
}

interface Project {
    title: string;
    description: string;
    tags: string[];
    link: string;
    image: string;
}

interface Content {
    role: string;
    desc: string;
    connect: string;
    contactBtn: string;
    about: string;
    aboutDesc: string;
    interests: string;
    techTitle: string;
    projectsTitle: string;
    viewProject: string;
    contactTitle: string;
    talkTitle: string;
    talkDesc: string;
    tipTitle: string;
    tipDesc: string;
    footer: string;
    lightningAddress: string;
    interestList: Interest[];
    techList: Technology[];
    projectsList: Project[];
}

export const contentData: Record<"en" | "es", Content> = {
    en: {
        role: "Front End Developer • AEM Specialist",
        desc: "Specialist in modern user interfaces and digital experiences with extensive experience in Adobe Experience Manager. Passionate about technology, open source, and digital sovereignty.",
        connect: "Connect on LinkedIn",
        contactBtn: "Contact Me",
        about: "About Me",
        aboutDesc: "As a Front End developer, I focus on building scalable architectures and captivating designs. My experience in complex AEM projects has provided me with a unique perspective on the intersection between corporate design and technical flexibility.",
        interests: "Interests & Hobbies",
        techTitle: "Technologies",
        projectsTitle: "Featured Projects",
        viewProject: "View Project",
        contactTitle: "Contact",
        talkTitle: "Let's Talk!",
        talkDesc: "Always open to new opportunities and open source collaborations.",
        tipTitle: "Support my work",
        tipDesc: "Scan the QR code to send a Lightning tip.",
        footer: "",
        lightningAddress: "yroulin@strike.me",
        interestList: [
            { name: "Gaming", icon: "gaming" },
            { name: "Music", icon: "music" },
            { name: "Self-Hosting", icon: "server" },
            { name: "Home Labs", icon: "home" },
            { name: "Technology", icon: "cpu" },
            { name: "Blockchain", icon: "globe" },
            { name: "Bitcoin", icon: "bitcoin" },
            { name: "Open Source Software", icon: "code" },
            { name: "Finance", icon: "wallet" },
            { name: "Cooking", icon: "utensils" },
            { name: "Yoga", icon: "heart" },
            { name: "Pilates", icon: "heart" },
            { name: "Exercise", icon: "heart" },
            { name: "Cooking with my son", icon: "users" },
            { name: "Family Time", icon: "users" },
        ],
        techList: [
            { name: "React", category: "Frontend" },
            { name: "Next.js", category: "Frontend" },
            { name: "TypeScript", category: "Languages" },
            { name: "Adobe Experience Manager (AEM)", category: "CMS" },
            { name: "Tailwind CSS", category: "Styling" },
            { name: "Framer Motion", category: "Animation" },
            { name: "Node.js", category: "Backend" },
            { name: "GraphQL", category: "API" },
            { name: "Git", category: "Tools" },
            { name: "Docker", category: "Infrastructure" },
        ],
        projectsList: [
            {
                title: "AEM Core Components Extension",
                description: "A comprehensive library of custom AEM components designed for high-traffic corporate environments, focusing on performance and accessibility.",
                tags: ["AEM", "Java", "HTL", "SCSS"],
                link: "#",
                image: "/projects/aem-components.webp"
            },
            {
                title: "Lightning Tip Dashboard",
                description: "A decentralized payment dashboard that allows creators to receive Bitcoin Lightning tips directly, featuring real-time QR code generation.",
                tags: ["Next.js", "LNURL", "Tailwind"],
                link: "#",
                image: "/projects/lightning-tips.webp"
            },
            {
                title: "Personal Portfolio v2",
                description: "A high-performance portfolio featuring smooth parallax effects, glassmorphism UI, and dark mode support, built with modern web standards.",
                tags: ["React", "Framer Motion", "Shadcn"],
                link: "#",
                image: "/projects/portfolio.webp"
            }
        ]
    },
    es: {
        role: "Desarrollador Front End • Especialista en AEM",
        desc: "Especialista en interfaces de usuario modernas y experiencias digitales con amplia experiencia en Adobe Experience Manager. Apasionado por la tecnología, el código abierto y la soberanía digital.",
        connect: "Conectar en LinkedIn",
        contactBtn: "Contáctame",
        about: "Sobre Mí",
        aboutDesc: "Como desarrollador Front End, me enfoco en crear arquitecturas escalables y diseños que cautivan. Mi trayectoria en proyectos complejos de AEM me ha dado una perspectiva única sobre la intersección entre el diseño corporativo y la flexibilidad técnica.",
        interests: "Gustos e Intereses",
        techTitle: "Tecnologías",
        projectsTitle: "Proyectos Destacados",
        viewProject: "Ver Proyecto",
        contactTitle: "Contacto",
        talkTitle: "¡Hablemos!",
        talkDesc: "Siempre abierto a nuevas oportunidades y colaboraciones en Open Source.",
        tipTitle: "Apoya mi trabajo",
        tipDesc: "Escanea el código QR para enviar una propina Lightning.",
        footer: "Construido con amor ❤️",
        lightningAddress: "yroulin@strike.me",
        interestList: [
            { name: "Gaming", icon: "gaming" },
            { name: "Música", icon: "music" },
            { name: "Self-Hosting", icon: "server" },
            { name: "Home Labs", icon: "home" },
            { name: "Tecnología", icon: "cpu" },
            { name: "Blockchain", icon: "globe" },
            { name: "Bitcoin", icon: "bitcoin" },
            { name: "Software Open Source", icon: "code" },
            { name: "Finanzas", icon: "wallet" },
            { name: "Cocinar", icon: "utensils" },
            { name: "Yoga", icon: "heart" },
            { name: "Pilates", icon: "heart" },
            { name: "Ejercicio", icon: "heart" },
            { name: "Cocinar con mi hijo", icon: "users" },
            { name: "Pasar tiempo en familia", icon: "users" },
        ],
        techList: [
            { name: "React", category: "Frontend" },
            { name: "Next.js", category: "Frontend" },
            { name: "TypeScript", category: "Lenguajes" },
            { name: "Adobe Experience Manager (AEM)", category: "CMS" },
            { name: "Tailwind CSS", category: "Estilos" },
            { name: "Framer Motion", category: "Animación" },
            { name: "Node.js", category: "Backend" },
            { name: "GraphQL", category: "API" },
            { name: "Git", category: "Herramientas" },
            { name: "Docker", category: "Infraestructura" },
        ],
        projectsList: [
            {
                title: "Extensión de Componentes Core AEM",
                description: "Una biblioteca completa de componentes AEM personalizados diseñados para entornos corporativos de alto tráfico, enfocados en rendimiento y accesibilidad.",
                tags: ["AEM", "Java", "HTL", "SCSS"],
                link: "#",
                image: "/projects/aem-components.webp"
            },
            {
                title: "Dashboard de Propinas Lightning",
                description: "Un panel de pagos descentralizado que permite a los creadores recibir propinas de Bitcoin Lightning directamente, con generación de códigos QR en tiempo real.",
                tags: ["Next.js", "LNURL", "Tailwind"],
                link: "#",
                image: "/projects/lightning-tips.webp"
            },
            {
                title: "Portafolio Personal v2",
                description: "Un portafolio de alto rendimiento con efectos de paralaje suaves, UI de glassmorphism y soporte para modo oscuro, construido con estándares web modernos.",
                tags: ["React", "Framer Motion", "Shadcn"],
                link: "#",
                image: "/projects/portfolio.webp"
            }
        ]
    }
};

