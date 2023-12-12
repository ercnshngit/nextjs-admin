export interface UserRegisterDto {
  email: string;
  first_name?: string;
  last_name?: string;
  password: string;
  role_id?: 0;
}

export interface UserLoginDto {
  email: string;
  password: string;
}

export interface UserChangePasswordDto {
  email?: string;
  old_password?: string;
  new_password?: string;
}
