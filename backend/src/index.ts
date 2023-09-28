import { Elysia } from "elysia";
import POST from "./POST";

const app = new Elysia();
app.post("/", () => POST);
app.get("/", () => POST);

app.listen(8000);
console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
