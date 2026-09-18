import slugify from "slugify";

export function criarSlug(titulo) {
  return slugify(titulo, { lower: true });
}
