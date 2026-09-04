export type Role = "admin" | "member";

export const ROLE_ROUTES = {
  admin: "/admin/dashboard",
  member: "/member/dashboard",
} satisfies Record<Role, string>;
