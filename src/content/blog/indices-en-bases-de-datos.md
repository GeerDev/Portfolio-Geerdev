---
name: "Índices en bases de datos"
description: "Qué son los índices, cómo funcionan por dentro y cuándo usarlos para acelerar tus consultas y mejorar el rendimiento."
image: "/Index_database.png"
isActive: true
important: true
order: 2
category: ["Bases de Datos", "Rendimiento"]
highlights:
  - "Consultas más rápidas"
  - "Cómo funciona un índice"
  - "Buenas prácticas SQL"
url: ""
---

Si alguna vez una consulta ha tardado **varios segundos** en una tabla grande y no
sabías por qué, lo más probable es que faltara un índice. Vamos a ver qué son,
cómo funcionan por dentro y cuándo conviene (y cuándo no) usarlos.

## La analogía del libro

Imagina un libro de 800 páginas sin índice. Para encontrar dónde se habla de
"transacciones" tendrías que leerlo **entero**, página por página. Eso es justo
lo que hace una base de datos cuando no hay índice: un **full table scan**.

Un índice es ese apartado del final del libro que te dice: *"transacciones →
página 342"*. La base de datos salta directamente al dato sin recorrer el resto.

## Cómo funciona por dentro

La mayoría de motores (PostgreSQL, MySQL/InnoDB, SQL Server…) usan por defecto un
**árbol B+ (B+Tree)**: una estructura ordenada y equilibrada que permite buscar
en tiempo **logarítmico** en lugar de lineal.

| Sin índice (scan) | Con índice (B+Tree) |
| --- | --- |
| Revisa fila por fila | Salta por niveles del árbol |
| Coste `O(n)` | Coste `O(log n)` |
| 1.000.000 filas ≈ 1.000.000 lecturas | 1.000.000 filas ≈ ~20 lecturas |

> 💡 **Idea clave:** un índice no cambia *qué* datos hay, solo *cómo de rápido*
> los encuentra la base de datos.

## Creando un índice

Supongamos una tabla de usuarios sobre la que filtramos mucho por email:

```sql
-- Antes: esta consulta hace un full table scan
SELECT * FROM usuarios WHERE email = 'german@geerdev.tech';

-- Creamos el índice
CREATE INDEX idx_usuarios_email ON usuarios (email);

-- Después: la misma consulta usa el índice y vuela
```

Para comprobar si tu consulta **usa** el índice, antepón `EXPLAIN`:

```sql
EXPLAIN ANALYZE
SELECT * FROM usuarios WHERE email = 'german@geerdev.tech';
```

Si ves `Index Scan` en lugar de `Seq Scan`, ¡vas bien!

## Tipos de índice más comunes

1. **B-Tree** — el de propósito general (igualdad, rangos, `ORDER BY`).
2. **Hash** — solo igualdad (`=`), muy rápido pero sin rangos.
3. **Compuesto** — sobre varias columnas a la vez, p. ej. `(apellido, nombre)`.
4. **Único** — además de acelerar, garantiza que no haya duplicados.
5. **Parcial** — indexa solo un subconjunto: `WHERE activo = true`.

### El detalle de los índices compuestos

En un índice `(apellido, nombre)` **el orden importa**. Funciona para:

- `WHERE apellido = 'Fernández'` ✅
- `WHERE apellido = 'Fernández' AND nombre = 'Germán'` ✅
- `WHERE nombre = 'Germán'` ❌ *(no puede usar el índice eficientemente)*

Es la llamada **regla del prefijo izquierdo**.

## Cuándo NO usar un índice

Los índices **no son gratis**. Cada `INSERT`, `UPDATE` o `DELETE` tiene que
actualizar también los índices, y ocupan espacio en disco.

- ❌ Tablas muy pequeñas (el scan ya es instantáneo).
- ❌ Columnas con poquísimos valores distintos (p. ej. un booleano).
- ❌ Tablas con escritura masiva y poca lectura.
- ✅ Columnas usadas en `WHERE`, `JOIN`, `ORDER BY` sobre tablas grandes.

## Conclusión

Un índice bien puesto convierte una consulta de **segundos a milisegundos**; uno
de más, ralentiza las escrituras sin que lo notes. La regla práctica:

> Indexa lo que **lees mucho** y filtra de verdad; mide siempre con `EXPLAIN`
> antes y después. Los números mandan, no las intuiciones.
