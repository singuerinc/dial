import axios from "axios";

export const fetch = <T>(url: string) => {
  return axios.get(url).then(({ data }) => data as T);
};
