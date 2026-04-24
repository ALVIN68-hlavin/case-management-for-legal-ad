import { PERMISSIONS } from "../config/roles.js";

export function requirePermission(permission) {
  return (req, res, next) => {
    const userRole = req.user.role;

    const allowed = PERMISSIONS[userRole] || [];

    if (!allowed.includes(permission)) {
      return res.status(403).json({ error: "Forbidden" });
    }

    next();
  };
}