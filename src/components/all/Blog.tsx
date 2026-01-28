
import { blog } from "@cv"
import { useState } from "react";

export const Blog = () => {

const [articles, setArticle] = useState(blog)

const chooseCategory = ( category:string ) => {
  setArticle(blog.filter(article => article.category === category))
}

return (
  <section className="flex items-center justify-center flex-col gap-5 p-5">
  <h2>Esta es la sección de blog donde se muestran todos los artículos que voy escribiendo, los puedes ver por categoría.</h2>

  <li className="flex items-center justify-center text-sm gap-5 my-5 flex-wrap">
    <button onClick={() => chooseCategory('all')} className="">Todos</button>

    <button onClick={() => chooseCategory('web')} className="relative group px-2">
      <span className="relative z-10 font-bold">Desarrollo web</span>
      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-black transition-all duration-300 group-hover:w-full"></span>
    </button>

    <button onClick={() => chooseCategory('security')} className="">Seguridad</button>
    <button onClick={() => chooseCategory('auto')} className="">Automatización de procesos</button>
    <button onClick={() => chooseCategory('infra')} className="">Infraestructura</button>
    <button onClick={() => chooseCategory('testing')} className="">Testing</button>
    <button onClick={() => chooseCategory('performance')} className="">Rendimiento</button>
    <button onClick={() => chooseCategory('team')} className="">Trabajo en equipo</button>
  </li>
  
  <ul className="-mx-3 flex flex-wrap gap-10 items-center justify-center w-full">
    {
      articles.map(
        ({ url, description, highlights, name, isActive, image }, index) => {
          return (
            <li
            key={`${index}-${name}`}
            >
              <a href={`/article/${name}`} className={`p-5 flex items-center justify-centerp-3 relative overflow-hidden group rounded-lg h-full gap-10 cursor-pointer animate-fade-in hover:shadow-lg transition-all duration-600 w-150 bg-[#f5f5f5] hover:bg-[#fff] hover:scale-105`}>
                <div className="absolute left-0 bottom-0 h-1/2 w-px bg-[#aaa] group-hover:h-full transition-all duration-600"></div>
                <div className="absolute left-0 bottom-0 h-px w-1/6 bg-[#aaa] group-hover:w-full transition-all duration-600"></div>
                <div className="absolute right-0 top-0 h-1/2 w-px bg-[#aaa] group-hover:h-full transition-all duration-600"></div>
                <div className="absolute right-0 top-0 h-px w-1/6 bg-[#aaa] group-hover:w-full transition-all duration-600"></div>
                <figure className="relative flex shrink-0 overflow-hidden rounded-xl size-35">
                  <img src={image} alt={name} className="aspect-square w-full h-full"/>
                </figure>
                <article>
                  <div className="flex flex-col gap-2">
                    <header>
                      <h3 className="flex justify-between items-center">
                        <div>
                          <a href={url} target="_blank" title={`Ver el proyecto ${name}`}>
                            {name}
                          </a>
                          {isActive && <span>•</span>}
                        </div>
                      </h3>
                      <p>{description}</p>
                    </header>
                    <footer className="flex flex-col">
                      {highlights.map((highlight, index) => {
                        return <span key={`${index}`}>- { highlight }</span>
                      })}
                    </footer>
                    {/* <Skills /> */}
                  </div>
                </article>
              </a>
            </li>
          )
        }
      )
    }
  </ul>
</section>
);
};
