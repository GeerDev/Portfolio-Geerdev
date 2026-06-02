// Tecnologías destacadas para el CV imprimible (PrintResume.astro), agrupadas por
// área. Es la FUENTE de la sección "Tecnologías" del CV: edita aquí lo que quieres
// mostrar (antes se derivaban de los skills de los proyectos). El orden de las
// claves es el orden en que se pintan los grupos.
export const technologies = {
  "Full Stack": [
    "JavaScript",
    "TypeScript",
    "React",
    "Node.js",
    "Astro",
    "HTML & CSS",
    "Tailwind",
    "Bases de datos",
    "APIs REST",
  ],
  "DevOps & Cloud": [
    "Linux",
    "Docker",
    "Kubernetes",
    "Terraform",
    "AWS",
    "CI/CD",
    "Bash",
    "Nginx",
    "Git",
    "Prometheus & Grafana",
  ],
  "IA": [
    "Integración de IA en el desarrollo",
    "APIs de LLMs (OpenAI · Claude)",
    "MCP (Model Context Protocol)",
    "Asistentes de código / agentes",
    "Prompt engineering",
  ],
} as const;

export default technologies;
