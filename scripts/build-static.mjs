#!/usr/bin/env node
import { cpSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "src");
const client = path.join(root, "dist", "client");

rmSync(client, { recursive: true, force: true });
mkdirSync(client, { recursive: true });

cpSync(path.join(source, "index.html"), path.join(client, "index.html"));
cpSync(path.join(source, "styles.css"), path.join(client, "styles.css"));
cpSync(path.join(source, "main.js"), path.join(client, "main.js"));
cpSync(path.join(source, "assets"), path.join(client, "assets"), { recursive: true });

console.log("Built static client in dist/client");
