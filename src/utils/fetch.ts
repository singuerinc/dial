import axios from "axios";

export const fetch = (url: string) => {
  return axios.get(url).then(({ data }) => data);
};
