import { Application, Router } from "https://deno.land/x/oak/mod.ts";

import { getFolders, addTodo, getTodos } from "./src/controllers/index.ts";

const router = new Router();
const port = 3000;

router
  .get("/", (context) => {
    context.response.body = "Hello";
  })
  .get("/todos", getTodos)
  .post("/todos", addTodo)
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

// Logger
app.use(async (ctx, next) => {
  await next();
  const rt = ctx.response.headers.get("X-Response-Time");
  console.log(`${ctx.request.method} ${ctx.request.url} - ${rt}`);
});

console.log(`Listening on port ${port}...`);

await app.listen({ port });
