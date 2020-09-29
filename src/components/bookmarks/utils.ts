import { compose, curry, includes, prop, sortBy, toLower } from "lodash/fp";
import { ILink } from "./ILink";

export const withLabelOrHref = curry((value: string, link: ILink) => {
  const v = toLower(value);
  const l = toLower(link.label);
  const h = toLower(link.href);
  return includes(v, l) || includes(v, h);
});

export const sortByLabelCaseInsensitive = sortBy(compose(toLower, prop("label")));
