---
name: "Automatizar tareas con Bash"
description: "Cuándo un script de Bash te resuelve la vida y en qué momento conviene saltar a Python."
image: "/Bash.png"
isActive: true
important: false
order: 4
category: ["Linux", "Automatización"]
highlights:
  - "Scripts que ahorran tiempo"
  - "set -euo pipefail"
  - "Bash vs Python"
url: ""
---

Si haces la misma tarea en la terminal por tercera vez, automatízala.

## Empieza por Bash

Para encadenar comandos del sistema, Bash es imbatible por lo directo:

```bash
#!/usr/bin/env bash
set -euo pipefail

for log in /var/log/*.log; do
  gzip "$log"
done
```

Esa línea de `set -euo pipefail` es oro: corta el script al primer error en vez de seguir como si nada. Empezar siempre por ahí te evita desastres silenciosos.

## Cuándo saltar a Python

Bash brilla pegando comandos, pero se complica en cuanto hay **lógica de verdad**:

- Parsear JSON, llamadas HTTP, estructuras de datos → **Python**.
- Regla práctica: si el script pasa de ~50 líneas o necesitas `if` anidados, cámbiate.

## Y que corra solo

Una línea en `cron` y la tarea se ejecuta sin ti:

```bash
0 3 * * * /opt/scripts/rotar-logs.sh
```

> Bash para pegar comandos; Python cuando hay lógica. Automatiza lo repetitivo y recupera tu tiempo.
