import curry from "ramda/es/curry";
import { ILink } from "./ILink";
import { ICategory } from "./ICategory";

export const contains = curry((value: string, label: string) => {
  const labelLower = label.toLocaleLowerCase();
  const valueLower = value.toLocaleLowerCase();
  const hasValue = labelLower.search(valueLower) !== -1;
  return hasValue;
});

export const withLabelOrHref = curry((value: string, link: ILink) => {
  const hasLabel = contains(value, link.label);
  const hasHref = contains(value, link.href);
  return hasLabel || hasHref;
});

export const reduceToOne = (acc: ICategory, y: ICategory) => ({
  title: acc.title,
  links: sortLinks([...acc.links, ...y.links])
});

export const sortLinks = (links: ILink[]) =>
  links.sort((x: ILink, y: ILink) => (x.label > y.label ? 1 : -1));
