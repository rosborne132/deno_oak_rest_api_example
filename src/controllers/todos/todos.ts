import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { Todos } from "../../model/index.ts";
import { Todo } from "../../types/index.ts";

export const getTodos = ({ response }: { response: any }) => {
  response.status = 200;
  response.body = Todos;
  return;
};

export const addTodo = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const { name, folderId } = await JSON.parse(body.value);

  const todo: Todo = {
    id: v4.generate(),
    name,
    isComplete: false,
    folderId,
  };

  Todos.push(todo);

  response.body = { msg: "Todo added!" };
  response.status = 200;
};
