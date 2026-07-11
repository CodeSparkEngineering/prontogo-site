// Ícone de traço (stroke) no padrão do design — recebe o conteúdo interno do SVG.
//
// O conteúdo é injetado via dangerouslySetInnerHTML, por isso só é aceite
// markup que passe na allowlist abaixo (formas SVG estáticas com atributos
// geométricos/estéticos). Isto protege contra XSS caso os ícones passem a
// vir de uma fonte externa (CMS, API) em vez de lib/content.ts.
const FORMA_SEGURA =
  /^(<(path|circle|rect|line|polyline|polygon)(\s+(d|cx|cy|r|rx|ry|x|y|x1|y1|x2|y2|width|height|points|fill|stroke|stroke-width|stroke-linecap|stroke-linejoin|opacity)="[^"<>]*")*\s*\/>)+$/;

export default function Icon({
  d,
  size = 24,
  strokeWidth = 2,
}: {
  d: string;
  size?: number;
  strokeWidth?: number;
}) {
  if (!FORMA_SEGURA.test(d)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn("Icon: conteúdo SVG rejeitado pela allowlist:", d);
    }
    return null;
  }
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: d }}
    />
  );
}
