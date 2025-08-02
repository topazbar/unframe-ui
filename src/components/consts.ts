import type { DisplaySchema } from "./types";

export const DISPLAY_SCHEMA: DisplaySchema = {
  gmail: ["subject", "from", "date"],
  googleDrive: ["name", "modifiedTime"],
  trello: ["name"],
};

export const PAGE_SIZE = 5;
