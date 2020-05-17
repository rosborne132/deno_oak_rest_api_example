// import { v4 } from 'https://deno.land/std/uuid/mod.ts'

import { Todos } from "../../model/index.ts";

export const getTodos = ({ response }: { response: any }) => {
  // Generate a v4 uuid
  //const myUUID = v4.generate()

  response.body = Todos;
};
