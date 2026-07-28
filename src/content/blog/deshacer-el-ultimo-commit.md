---
name: "Deshacer el último commit"
description: "Te has equivocado en el último commit: qué comando usar según si ya has hecho push o no."
image: "/Git.png"
isActive: true
important: false
order: 6
category: ["Git", "Buenas prácticas"]
highlights:
  - "reset vs amend vs revert"
  - "Antes y después del push"
  - "Comandos listos para copiar"
url: ""
---

Commit hecho, mensaje mal escrito o un archivo de más. La pregunta no es *cómo* deshacerlo, sino **si ya has hecho push**.

## Si aún no has publicado

Para quitar el commit y **conservar los cambios** como modificaciones locales:

```bash
git reset --soft HEAD~1
```

Si además quieres tirar los cambios a la basura (⚠️ irreversible):

```bash
git reset --hard HEAD~1
```

## Si solo quieres corregirlo

`--amend` reescribe el último commit en lugar de crear uno nuevo. Perfecto para un mensaje mal puesto o un archivo olvidado:

```bash
git commit --amend -m "Mensaje correcto"

git add archivo.js
git commit --amend -m "Mensaje correcto"
```

## Si ya has hecho push

Aquí no se reescribe: se **añade** un commit que deshace al anterior. Es lo seguro cuando otras personas ya tienen ese historial.

```bash
git revert 74a1092
```

> Regla rápida: antes del push, `reset` o `--amend`; después del push, `revert`.

Basado en [este artículo de midudev](https://midu.dev/como-deshacer-el-ultimo-commit-git/).
