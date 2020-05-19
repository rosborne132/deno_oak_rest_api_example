import { v4 } from "https://deno.land/std/uuid/mod.ts";

import { Todos } from "../model/Todos.ts";
import { Todo } from "../types/Todo.ts";

// Helper functions
const findTodo = (todoId: string): Todo | undefined =>
  Todos.find(({ id }) => id === todoId);

const isMissing = (value: any) => value === null || value === undefined;

// Route functions
export const getTodos = ({ response }: { response: any }) => {
  response.status = 200;
  response.body = { msg: "Todos fetched!", data: Todos };
  return;
};

export const getTodo = async ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  const todo: Todo | undefined = findTodo(params.id);

  if (isMissing(todo)) {
    response.body = { msg: "Todo not found!" };
    response.status = 404;
    return;
  }

  response.body = { msg: "Todo fetched!", data: todo };
  response.status = 200;
};

export const addTodo = async ({
  request,
  response,
}: {
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const { name } = await JSON.parse(body.value);

  if (isMissing(name)) {
    response.body = { msg: "Name is missing from the request body" };
    response.status = 400;
    return;
  }

  const newTodo: Todo = {
    id: v4.generate(),
    name,
    isComplete: false,
  };

  Todos.push(newTodo);

  response.body = { msg: "Todo added!", data: newTodo };
  response.status = 200;
};

export const updateTodo = async ({
  params,
  request,
  response,
}: {
  params: any;
  request: any;
  response: any;
}) => {
  const body = await request.body();
  const { isComplete } = await JSON.parse(body.value);

  if (isMissing(isComplete)) {
    response.body = { msg: "isComplete is missing from the request body" };
    response.status = 400;
    return;
  }

  const todo: Todo | undefined = findTodo(params.id);
  const updatedTodo: any = { ...todo, isComplete };
  const newTodos = Todos.map((todo) =>
    todo.id === updatedTodo.id ? updatedTodo : todo
  );

  Todos.splice(0, Todos.length);
  Todos.push(...newTodos);

  response.body = { msg: "Todo updated!", data: updatedTodo };
  response.status = 200;
};

export const deleteTodo = async ({
  params,
  response,
}: {
  params: any;
  response: any;
}) => {
  const newTodos = Todos.filter((todo) => todo.id !== params.id);

  Todos.splice(0, Todos.length);
  Todos.push(...newTodos);

  response.body = { msg: "Todo deleted!", data: newTodos };
  response.status = 200;
};
