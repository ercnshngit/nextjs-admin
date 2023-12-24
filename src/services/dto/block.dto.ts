export interface BlockDto {
  id: number;
  title: string;
  type_id: number;
  description?: string;
  image_url?: string;
  background_image_url?: string;
  created_at?: string;
  updated_at?: string;
  slug?: string;
  status?: number;
}
