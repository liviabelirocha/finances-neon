import "server-only";

import {
  createCipheriv,
  createDecipheriv,
  createHash,
  randomBytes,
} from "crypto";

const ALGORITHM = "aes-256-gcm";

const getKey = () => {
  const secret = process.env.INTEGRATIONS_ENCRYPTION_KEY;

  if (!secret) throw new Error("INTEGRATIONS_ENCRYPTION_KEY is not set");

  return createHash("sha256").update(secret).digest();
};

export const encrypt = (plain: string) => {
  const iv = randomBytes(12);
  const cipher = createCipheriv(ALGORITHM, getKey(), iv);
  const encrypted = Buffer.concat([
    cipher.update(plain, "utf8"),
    cipher.final(),
  ]);
  const tag = cipher.getAuthTag();

  return [iv, tag, encrypted].map((part) => part.toString("base64")).join(".");
};

export const decrypt = (payload: string) => {
  const [iv, tag, encrypted] = payload
    .split(".")
    .map((part) => Buffer.from(part, "base64"));

  const decipher = createDecipheriv(ALGORITHM, getKey(), iv);
  decipher.setAuthTag(tag);

  return Buffer.concat([decipher.update(encrypted), decipher.final()]).toString(
    "utf8",
  );
};
