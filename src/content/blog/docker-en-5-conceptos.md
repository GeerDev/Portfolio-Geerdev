---
name: "Docker en 5 conceptos"
description: "Las cinco ideas que necesitas para entender Docker de verdad. Con esto, el resto encaja solo."
image: "/Docker.png"
isActive: true
important: true
order: 5
category: ["Docker", "Contenedores"]
highlights:
  - "Imagen vs contenedor"
  - "Dockerfile y capas"
  - "Volúmenes"
url: ""
---

Docker se entiende con cinco ideas. Domínalas y todo lo demás encaja.

## Los 5 conceptos

1. **Imagen** — una plantilla inmutable con tu app y sus dependencias. Es *la receta*.
2. **Contenedor** — una instancia en ejecución de una imagen. Es *el plato servido*.
3. **Dockerfile** — las instrucciones para construir la imagen, paso a paso.
4. **Capas** — cada instrucción del Dockerfile es una capa **cacheada**. Por eso, si no cambias nada, el siguiente build vuela.
5. **Volúmenes** — los contenedores son **efímeros**; los volúmenes guardan los datos que deben sobrevivir.

## En la práctica

Construir una imagen y arrancar un contenedor es esto:

```bash
docker build -t miapp .
docker run -d -p 8080:80 miapp
```

> Imagen = receta, contenedor = plato servido. Con esas dos ya estás pensando en Docker.
