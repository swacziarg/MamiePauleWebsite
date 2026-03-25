export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000";

export const isDevAdminBypassEnabled =
  process.env.NODE_ENV !== "production" &&
  process.env.DEV_ADMIN_BYPASS !== "false";
