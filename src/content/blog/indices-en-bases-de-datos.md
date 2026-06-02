---
name: "Índices en bases de datos"
description: "Qué son los índices y por qué convierten una consulta lenta en una instantánea (sin pasarte de la raya)."
image: "/Index_database.png"
isActive: true
important: true
order: 2
category: ["Bases de Datos", "Rendimiento"]
highlights:
  - "Consultas más rápidas"
  - "Cómo funciona un índice"
  - "Cuándo NO usarlo"
url: ""
---

Si una consulta tarda **segundos** en una tabla grande, lo más probable es que falte un índice.

## La idea, en una analogía

Un libro de 800 páginas **sin índice** te obliga a leerlo entero para encontrar algo: eso es un *full table scan*. El índice es el apartado del final —*"transacciones → página 342"*— que te lleva directo al dato.

## Cómo lo logra

La mayoría de motores usan un **B+Tree**: búsqueda en `O(log n)` en lugar de `O(n)`. Un millón de filas pasan de ~1.000.000 de lecturas a unas ~20.

```sql
CREATE INDEX idx_usuarios_email ON usuarios (email);
```

Comprueba que se usa con `EXPLAIN ANALYZE`: si ves **`Index Scan`** y no `Seq Scan`, vas bien.

## Pero no son gratis

Cada `INSERT`, `UPDATE` o `DELETE` también actualiza el índice, y ocupa disco. Indexa columnas que **lees y filtras mucho** en tablas grandes; evita booleanos y tablas diminutas.

> Regla práctica: indexa lo que lees mucho y mide con `EXPLAIN`. Los números mandan, no las intuiciones.
