import { useAppSelector } from "./hooks";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "@/types/user";

// return user role
export function useUserRole() {
  const authToken = useAppSelector((state) => state.auth.token);

  if (!authToken) return null;

  return jwtDecode<JwtPayload>(authToken).role;
}

// return is user authorized
export function useAuth() {
  const authToken = useAppSelector((state) => state.auth.token);
  return !!authToken;
}
