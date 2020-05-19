import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import {
  addTodo,
  deleteTodo,
  getTodo,
  getTodos,
  updateTodo,
} from "./src/controllers/todos.ts";

const router = new Router();
const port = 3000;

// Our routes
router
  .get("/todos", getTodos)
  .get("/todos/:id", getTodo)
  .delete("/todos/:id", deleteTodo)
  .patch("/todos/:id", updateTodo)
  .post("/todos", addTodo);

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());

console.log(`Listening on port ${port}...`);

await app.listen({ port });
