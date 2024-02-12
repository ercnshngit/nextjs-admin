export type MENU_ITEM = {
  id: number;
  title: string;
  type_id: number;
  slug: string;
  menu_belong_id: number;
  route: string;
  status: number;
  submenus: MENU_ITEM[] | [];
};
