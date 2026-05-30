import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

// FUENTE ÚNICA de proyectos y artículos. El frontmatter contiene los datos de la
// tarjeta; el cuerpo Markdown es el contenido detallado de la página de detalle.
// El nombre del archivo .md es el slug (la URL):
//   src/content/projects/proyecto-1.md     -> /project/proyecto-1
//   src/content/blog/microservicios.md     -> /article/microservicios

const projects = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    highlights: z.array(z.string()).default([]),
    skills: z.array(z.string()).default([]),
    url: z.string().optional(),
    github: z.string().optional(),
    isActive: z.boolean().default(true),
    order: z.number().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/blog" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    highlights: z.array(z.string()).default([]),
    category: z.array(z.string()).default([]),
    important: z.boolean().default(false),
    isActive: z.boolean().default(true),
    url: z.string().optional(),
    order: z.number().optional(),
  }),
});

export const collections = { projects, blog };
