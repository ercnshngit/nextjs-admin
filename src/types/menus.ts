export type MENU_ITEM = {
  id: number;
  title: string;
  type_id: number;
  slug: string;
  menu_belong_id: number;
  route: string;
  status: number;
};

export type CREATE_MENU_ITEM = {
  title: string;
  type_id: number;
  menu_belong_id: number;
  page_belongs: [
    {
      id: number;
    }
  ];
  route: string;
  status: number;
};

export type UPDATE_MENU_ITEM = {
  id: number;
  data: Partial<CREATE_MENU_ITEM>;
};
