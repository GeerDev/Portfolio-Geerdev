import { useMemo, useState } from "react";

interface Project {
  name: string;
  description: string;
  url: string;
  image: string;
  highlights: readonly string[];
  skills?: readonly string[];
}

interface Props {
  projects: Project[];
}

export const Projects = ({ projects }: Props) => {
  const [active, setActive] = useState<string>("all");

  // Tecnologías reales derivadas de los datos (así nunca se desincronizan).
  const techs = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((project) => project.skills?.forEach((s) => set.add(s)));
    return ["all", ...set];
  }, [projects]);

  const visible =
    active === "all"
      ? projects
      : projects.filter((project) => project.skills?.includes(active));

  return (
    <section className="flex flex-col items-center gap-6 p-5">
      <p className="text-[#666] text-center max-w-2xl leading-relaxed">
        Una selección de proyectos en los que he trabajado, del frontend a la
        infraestructura. Cada uno refleja algo que me gusta hacer: resolver
        problemas reales y construir cosas que funcionen. Filtra por tecnología
        para ver lo que te interese.
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-2 text-sm">
        {techs.map((tech) => {
          const isActive = active === tech;
          const label = tech === "all" ? "Todos" : tech;
          return (
            <li key={tech}>
              <button
                onClick={() => setActive(tech)}
                className={`rounded-full border px-3 py-1 transition duration-300 ${
                  isActive
                    ? "bg-[#44495A] text-white border-[#44495A]"
                    : "border-[#ddd] text-[#444] hover:bg-[#f5f5f5]"
                }`}
              >
                {label}
              </button>
            </li>
          );
        })}
      </ul>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl items-stretch">
        {visible.map(({ url, description, highlights, name, image, skills }, index) => (
          <li
            key={`${index}-${name}`}
            className="group flex flex-col rounded-xl border border-[#eee] overflow-hidden shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <a
              href={url || "#"}
              target={url ? "_blank" : undefined}
              rel="noopener noreferrer"
              title={`Ver el proyecto ${name}`}
              className="flex flex-col h-full"
            >
              <figure className="overflow-hidden">
                <img
                  src={image}
                  alt={name}
                  loading="lazy"
                  className="w-full aspect-video object-cover transition duration-500 group-hover:scale-105"
                />
              </figure>

              <article className="flex flex-col gap-2 flex-1 p-4">
                <h3 className="font-black text-lg group-hover:underline">{name}</h3>
                <p className="text-sm text-[#666] leading-relaxed">{description}</p>

                <main className="flex flex-col gap-1 text-sm text-[#555]">
                  {highlights.map((highlight, i) => (
                    <span key={i}>• {highlight}</span>
                  ))}
                </main>

                {skills && skills.length > 0 && (
                  <footer className="mt-auto pt-3 flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-lg bg-[#44495A] text-white text-sm px-1.5 py-0.5"
                      >
                        {skill}
                      </span>
                    ))}
                  </footer>
                )}
              </article>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
