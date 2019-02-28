import compose from "ramda/es/compose";
import sortBy from "ramda/es/sortBy";
import prop from "ramda/es/prop";
import curry from "ramda/es/curry";
import includes from "ramda/es/includes";
import toLower from "ramda/es/toLower";
import { ICategory } from "./ICategory";
import { ILink } from "./ILink";

export const withLabelOrHref = curry((value: string, link: ILink) => {
  const v = toLower(value);
  const l = toLower(link.label);
  const h = toLower(link.href);
  return includes(v, l) || includes(v, h);
});

export const sortByLabelCaseInsensitive = sortBy(
  compose(
    toLower,
    prop("label")
  )
);

export const reduceToOne = (acc: ICategory, y: ICategory) => ({
  title: acc.title,
  links: sortByLabelCaseInsensitive([...acc.links, ...y.links])
});
