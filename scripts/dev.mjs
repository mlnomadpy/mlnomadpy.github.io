import { spawn } from "node:child_process";
import { resolve } from "node:path";
const children = [
  spawn(process.execPath, [resolve("writing/dev.mjs")], {
    stdio: "inherit",
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: "1" },
  }),
  spawn(
    process.execPath,
    [resolve("node_modules/vite/bin/vite.js"), ...process.argv.slice(2)],
    { stdio: "inherit" },
  ),
];
let stopping = false;
function stop(code = 0) {
  if (stopping) return;
  stopping = true;
  children.forEach((child) => child.kill("SIGTERM"));
  process.exitCode = code;
}
process.on("SIGINT", () => stop());
process.on("SIGTERM", () => stop());
children.forEach((child) => {
  child.on("error", () => stop(1));
  child.on("exit", (code) => stop(code || 0));
});
