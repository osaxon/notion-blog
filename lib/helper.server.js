import { createHash } from "node:crypto";

export const getSessionId = (req) => {
  const ipAddress = req.headers["x-forwarded-for"] || "0.0.0.0";
  const currentUserId = createHash("md5")
    .update(ipAddress + process.env.IP_SALT, "utf-8")
    .digest("hex");
  console.log(currentUserId);
  return currentUserId;
};
