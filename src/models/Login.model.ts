import { Login } from "@types";

export const loginModel = (data?:Partial<Login>): Login => ({
  email: data?.email || '',
  password: data?.password || '',
})
