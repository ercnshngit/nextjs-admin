export interface MenuDto {
  id: number;
  title: string;
  slug: string;
  route?: string;
  menu_belong_id?: number;
  type_id: number;
  status: number;
  submenus?: MenuDto[];
}

export interface MenuOrderUpdateDto {
  first_menu_id: number;
  second_menu_id: number;
}
