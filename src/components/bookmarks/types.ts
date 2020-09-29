export interface ILink {
  label: string;
  href: string;
}

export type ICategory = {
  links: ILink[];
  title: string;
  className?: string;
};
