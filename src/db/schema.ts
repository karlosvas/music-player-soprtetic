import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const category = sqliteTable("category", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const songs = sqliteTable("songs", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull().unique(),
  category: text("category").notNull(),
  transcript: text("transcript").notNull(),
  img_url: text("img_url").notNull().unique(),
});
