#!/usr/bin/env node
import { createReadStream, existsSync, statSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src");
const args = process.argv.slice(2);
const portIndex = args.indexOf("--port");
const port = Number(portIndex >= 0 ? args[portIndex + 1] : process.env.PORT || 4173);

const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".otf": "font/otf",
  ".png": "image/png",
  ".webp": "image/webp",
};

const resolveRequest = (requestUrl) => {
  const pathname = decodeURIComponent(new URL(requestUrl, "http://local").pathname);
  const relative = pathname === "/" ? "index.html" : pathname.replace(/^\/+/, "");
  const candidate = path.resolve(source, relative);
  return candidate.startsWith(source + path.sep) || candidate === path.join(source, "index.html")
    ? candidate
    : null;
};

const server = createServer((request, response) => {
  if (!request.url || !["GET", "HEAD"].includes(request.method || "")) {
    response.writeHead(405, { Allow: "GET, HEAD" }).end();
    return;
  }

  let file = resolveRequest(request.url);
  if (!file || !existsSync(file) || statSync(file).isDirectory()) {
    const acceptsHtml = request.headers.accept?.includes("text/html");
    if (!acceptsHtml) {
      response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" }).end("Not found");
      return;
    }
    file = path.join(source, "index.html");
  }

  response.writeHead(200, {
    "Content-Type": types[path.extname(file)] || "application/octet-stream",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });

  if (request.method === "HEAD") {
    response.end();
    return;
  }

  createReadStream(file).pipe(response);
});

server.on("error", (error) => {
  console.error(error.message);
  process.exitCode = 1;
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Grupo Aguirre preview listening on port ${port}`);
});

for (const signal of ["SIGINT", "SIGTERM"]) {
  process.on(signal, () => server.close(() => process.exit(0)));
}
