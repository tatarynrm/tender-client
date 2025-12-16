// utils/access.ts
export type UserRoles = {
  is_admin?: boolean;
  is_manager?: boolean;
  is_director?: boolean;
  is_ict?: boolean;
};

export type PageType = "dashboard" | "admin" | "log";

export function hasAccess(page: PageType, user: UserRoles): boolean {
  if (!user) return false;

  switch (page) {
    case "admin":
      return !!user.is_admin;
    case "log":
      return true;
    case "dashboard":
      return true;
    default:
      return false;
  }
}
