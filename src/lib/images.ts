import type { ImageMetadata } from "astro";

// Importa (eager) todas las imágenes de src/assets/images. Astro optimiza los
// raster (WebP, dimensiones, etc.); los SVG se empaquetan/hashean (vectoriales,
// no se transcodifican).
const assets = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/images/**/*.{png,jpg,jpeg,webp,avif,gif,svg}",
  { eager: true }
);

// Mapa por nombre de archivo, para resolver desde rutas tipo "/me.webp" usadas en /data.
const byFilename: Record<string, ImageMetadata> = {};
for (const path in assets) {
  const filename = path.split("/").pop();
  if (filename) byFilename[filename] = assets[path].default;
}

/**
 * Resuelve una ruta de imagen guardada como string en /data:
 * - URL remota (http...) -> se devuelve tal cual (no optimizable en build).
 * - imagen raster en src/assets/images -> devuelve su ImageMetadata (optimizable).
 * - cualquier otra cosa (p. ej. una .svg en /public) -> devuelve el string original.
 */
export function resolveImage(src: string): ImageMetadata | string {
  if (!src) return src;
  if (src.startsWith("http")) return src;
  const filename = src.split("/").pop();
  return (filename && byFilename[filename]) || src;
}

/**
 * Devuelve siempre la URL (string) de una imagen, ya optimizada/hasheada si está
 * en src/assets. Útil para pasar imágenes a componentes de framework (React/Vue),
 * que no pueden usar el componente <Image /> de Astro. Pre-resuélvela en el `.astro`
 * padre y pásala como prop (patrón recomendado por la documentación de Astro).
 */
export function resolveImageSrc(src: string): string {
  const resolved = resolveImage(src);
  return typeof resolved === "string" ? resolved : resolved.src;
}
