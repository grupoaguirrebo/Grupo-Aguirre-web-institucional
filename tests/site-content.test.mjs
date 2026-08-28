import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const htmlPath = new URL("../src/index.html", import.meta.url);

test("la portada comunica la propuesta institucional y permite contactar por WhatsApp", async () => {
  const html = await readFile(htmlPath, "utf8");

  assert.match(html, /Simplificamos la compra por volumen\./);
  assert.match(html, /COMERCIALIZADORA DIGITAL/);
  assert.match(html, /Productos originales Tigre/);
  assert.match(html, /https:\/\/wa\.me\/59169715194/);
});

test("la navegación conduce a las cuatro secciones principales", async () => {
  const html = await readFile(htmlPath, "utf8");

  for (const section of ["nosotros", "productos", "cobertura", "contacto"]) {
    assert.match(html, new RegExp(`href="#${section}"`));
    assert.match(html, new RegExp(`id="${section}"`));
  }
});

test("la página pública no expone información comercial confidencial ni crea puentes", async () => {
  const html = await readFile(htmlPath, "utf8");
  const prohibited = [
    /distribuidor(?:es)? autorizad/iu,
    /proveedor(?:es)?/iu,
    /cartera de clientes/iu,
    /margen(?:es)?/iu,
    /\bNIT\b/u,
    /facturaci[oó]n/iu,
    /sin intermediarios/iu,
    /mejores precios del mercado/iu,
  ];

  for (const expression of prohibited) {
    assert.doesNotMatch(html, expression);
  }
});
