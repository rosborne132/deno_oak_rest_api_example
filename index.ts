import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import { getFolders, getTodos } from "./src/controllers/index.ts";

const router = new Router();

router
  .get("/", (context) => {
    context.response.body = "Hello";
  })
  .get("/todos", getTodos)
  .get("/folders", getFolders);
//     .get('/book/:id', context => {
//         if (
//             context.params &&
//             context.params.id &&
//             books.has(context.params.id)
//         ) {
//             context.response.body = books.get(context.params.id)
//         }
//     })

const app = new Application();

app.use(router.routes());
app.use(router.allowedMethods());
await app.listen({ port: 8000 });
