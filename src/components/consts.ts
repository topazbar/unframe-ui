import type { DisplaySchema } from "./types";

export const DISPLAY_SCHEMA: DisplaySchema = {
  gmail: ["subject", "from", "date"],
  googleDrive: ["name", "modifiedTime"],
  trello: ["name"],
};

export const PAGE_SIZE = 5;
export const LOGIN_URL = "http://localhost:3000/auth/googleGenerateUrlAuth";
export const VALID_TOKEN_ROUTE = "http://localhost:3000/auth/validToken";
