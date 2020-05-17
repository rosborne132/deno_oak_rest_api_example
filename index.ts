import { Application, Router } from 'https://deno.land/x/oak/mod.ts'

import { getTodos } from './src/controllers'

export const router = new Router()

router.get('/', context => {
    context.response.body = 'Hello'
})
router.get('/todos', getTodos)
//     .get('/book', context => {
//         context.response.body = Array.from(books.values())
//     })
//     .get('/book/:id', context => {
//         if (
//             context.params &&
//             context.params.id &&
//             books.has(context.params.id)
//         ) {
//             context.response.body = books.get(context.params.id)
//         }
//     })

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())
await app.listen({ port: 8000 })
