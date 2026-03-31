"use server";

import CONFIG from "@/config";
import crypto from "crypto";

export async function generateAuthToken() {
  const unixTimestamp = Math.floor(Date.now() / 1000).toString();

  const uniqTokenString = CONFIG.SECRET_KEY + unixTimestamp;

  const uniqTokenHash = crypto
    .createHash("sha256")
    .update(uniqTokenString, "ascii")
    .digest("hex");

  const rawToken = `${CONFIG.ACCESS_KEY};${unixTimestamp};${uniqTokenHash}`;
  const base64Token = Buffer.from(rawToken, "ascii").toString("base64");

  return Promise.resolve(base64Token);
}