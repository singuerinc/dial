import axios from "axios";
import { TaskEither, tryCatch } from "fp-ts/lib/TaskEither";

export const fetch = <T>(url: string): TaskEither<Error, T> => {
  return tryCatch(
    () => axios.get(url).then(({ data }) => data),
    reason => new Error(String(reason))
  );
};
