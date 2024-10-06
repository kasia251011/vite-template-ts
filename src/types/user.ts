export interface UserBase {
  name: string;
  surname: string;
  email: string;
  phone?: string;
  role: UserRole;
  version?: number;
}

export interface User extends UserBase {
  id: string;
  banned: boolean;
  isActivated: boolean;
}

export type UserName = Pick<UserBase, "name">;
export type UserSurname = Pick<UserBase, "surname">;
export type UserEmail = Pick<UserBase, "email">;
export type UserPhone = Pick<UserBase, "phone">;

export type UserRole = "admin" | "auditor" | "client";

export interface JwtPayload extends Pick<User, "id" | "role" | "email"> {
  iat: number;
  exp: number;
}

export type ActivateTokenPayload = Omit<UserBase, "role" | "version">;

export type LoginSchema = Pick<UserBase, "email"> & { password: string };

export interface ActivateAccountSchema extends Pick<UserBase, "phone"> {
  password: string;
  activateToken: string;
}

//For forms

export interface ActivateAccountFormSchema extends Omit<UserBase, "role"> {
  password: string;
  confirmPassword: string;
}
