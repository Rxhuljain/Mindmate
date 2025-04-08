export * from "./db/index"
import { journalEntries } from "@/lib/db/schema"; // or wherever your Drizzle schema is
import { eq } from "drizzle-orm";
