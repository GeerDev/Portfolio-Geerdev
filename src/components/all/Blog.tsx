import { useMemo, useState } from "react";

interface Article {
  name: string;
  description: string;
  url: string;
  image: string;
  category: readonly string[];
  highlights: readonly string[];
}

interface Props {
  articles: Article[];
}

export const Blog = ({ articles }: Props) => {
  const [active, setActive] = useState<string>("all");

  // Categorías reales derivadas de los datos (así nunca se desincronizan).
  const categories = useMemo(() => {
    const set = new Set<string>();
    articles.forEach((article) => article.category.forEach((c) => set.add(c)));
    return ["all", ...set];
  }, [articles]);

  const visible =
    active === "all"
      ? articles
      : articles.filter((article) => article.category.includes(active));

  return (
    <section className="flex flex-col items-center gap-6 p-5">
      <p className="text-[#666] text-center max-w-2xl">
        Aquí comparto los artículos que voy escribiendo, puedes filtrarlos por categoría.
      </p>

      <ul className="flex flex-wrap items-center justify-center gap-2 text-sm">
        {categories.map((category) => {
          const isActive = active === category;
          const label = category === "all" ? "Todos" : category;
          return (
            <li key={category}>
              <button
                onClick={() => setActive(category)}
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

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full max-w-3xl">
        {visible.map(({ url, description, highlights, name, image, category }, index) => (
          <li
            key={`${index}-${name}`}
            className="group flex flex-col rounded-xl border border-[#eee] overflow-hidden shadow-sm transition duration-300 hover:shadow-xl hover:-translate-y-1"
          >
            <a
              href={url || "#"}
              target={url ? "_blank" : undefined}
              rel="noopener noreferrer"
              title={`Leer ${name}`}
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

                <div className="flex flex-wrap gap-1.5">
                  {category.map((item) => (
                    <span
                      key={item}
                      className="rounded-full bg-[#e8e8e8] px-2.5 py-0.5 text-xs font-semibold text-[#555]"
                    >
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-sm text-[#666] leading-relaxed">{description}</p>

                <footer className="mt-auto pt-2 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-[#555]">
                  {highlights.map((highlight, i) => (
                    <span key={i} className="inline-flex items-center gap-1.5">
                      <span className="text-[#44495A]" aria-hidden="true">▹</span>
                      {highlight}
                    </span>
                  ))}
                </footer>
              </article>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};
