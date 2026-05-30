export const blog = [
  {
    "name": "MCP + Playwright",
    "isActive": true,
    "category": ["IA", "Testing"],
    "important": true,
    "description": "Cómo combinar el Model Context Protocol (MCP) con Playwright para automatizar pruebas de navegador asistidas por IA.",
    "highlights": [
      "Tests con IA",
      "Automatización de navegador",
      "MCP + Playwright"
    ],
    "image": "/MCP_Playwright.png",
    "url": ""
  },
  {
    "name": "Índices en bases de datos",
    "isActive": true,
    "category": ["Bases de Datos", "Rendimiento"],
    "important": true,
    "description": "Qué son los índices, cómo funcionan por dentro y cuándo usarlos para acelerar tus consultas y mejorar el rendimiento.",
    "highlights": [
      "Consultas más rápidas",
      "Cómo funciona un índice",
      "Buenas prácticas SQL"
    ],
    "image": "/Index_database.png",
    "url": ""
  },
  {
    "name": "Microservicios",
    "isActive": true,
    "category": ["Infraestructura"],
    "important": true,
    "description": "Introducción a la arquitectura de microservicios: sus ventajas, sus retos y cuándo merece la pena frente a un monolito.",
    "highlights": [
      "Arquitectura escalable",
      "Monolito vs microservicios",
      "Despliegue independiente"
    ],
    "image": "/Microservices.png",
    "url": ""
  }
] as const;

export default blog;
