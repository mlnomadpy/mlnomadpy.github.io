import { dev } from "astro";

// Use Astro's foreground API so one parent process owns both servers, including
// when the CLI would otherwise detect an agent and detach into the background.
const server = await dev({
  root: new URL("./", import.meta.url),
  server: { host: "127.0.0.1", port: 4321 },
});
let stopping = false;
async function stop() {
  if (stopping) return;
  stopping = true;
  await server.stop();
}
process.on("SIGINT", stop);
process.on("SIGTERM", stop);
