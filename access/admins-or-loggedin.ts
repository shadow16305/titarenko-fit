import type { Access, AccessArgs } from "payload";

import type { User } from "@/payload-types";
import { checkRole } from "./check-role";

export const adminsOrLoggedIn: Access = ({
  req: { user },
}: AccessArgs<User>) => {
  if (user && checkRole(["admin"], user)) {
    return true;
  }

  return !!user;
};
