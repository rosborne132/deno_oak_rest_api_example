import { Folders } from "../../model/index.ts";

export const getFolders = ({ response }: { response: any }) => {
  response.body = Folders;
};
