export type Page = {
  id: number;
  title: string;
  slug: string;
  content: Content[];
  config_id: any;
  page_config: any;
  page_component: PageComponent[];
};

export type Content = {
  component_id: number;
  value: string;
};

export type PageComponent = {
  id: number;
  page_id: number;
  component_id: number;
  value: string;
  index: number;
  css: string;
};

export type Component = {
  id: number;
  title: string;
  type_id: number;
};

export type ComponentType = {
  id: number;
  name: string;
};

export type PageConfig = {
  id: number;
  title: string;
  css: string;
};

export type UpdatePage = {
  title: string;
  slug: string;
  content: Content[];
  config_id: number;
  description: string;
  image: string;
};

export type CreatePage = {
  title: string;
  slug: string;
  description: string;
  image: string;
  content: Content[];
  config_id: number;
};
