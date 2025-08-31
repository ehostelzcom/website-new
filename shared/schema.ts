import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Province API types
export const provinceSchema = z.object({
  id: z.number(),
  title: z.string(),
});

export const provincesResponseSchema = z.object({
  items: z.array(provinceSchema),
  hasMore: z.boolean(),
  limit: z.number(),
  offset: z.number(),
  count: z.number(),
  links: z.array(z.object({
    rel: z.string(),
    href: z.string(),
  })),
});

// City API types
export const citySchema = z.object({
  id: z.number(),
  title: z.string(),
  province_id: z.number(),
});

export const citiesResponseSchema = z.object({
  items: z.array(citySchema),
  hasMore: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  count: z.number().optional(),
  first: z.object({
    $ref: z.string(),
  }).optional(),
  next: z.object({
    $ref: z.string(),
  }).optional(),
});

// Location API types
export const locationSchema = z.object({
  id: z.number(),
  title: z.string(),
  city_id: z.number(),
});

export const locationsResponseSchema = z.object({
  items: z.array(locationSchema),
  hasMore: z.boolean().optional(),
  limit: z.number().optional(),
  offset: z.number().optional(),
  count: z.number().optional(),
  first: z.object({
    $ref: z.string(),
  }).optional(),
  next: z.object({
    $ref: z.string(),
  }).optional(),
});

export type Province = z.infer<typeof provinceSchema>;
export type ProvincesResponse = z.infer<typeof provincesResponseSchema>;
export type City = z.infer<typeof citySchema>;
export type CitiesResponse = z.infer<typeof citiesResponseSchema>;
export type Location = z.infer<typeof locationSchema>;
export type LocationsResponse = z.infer<typeof locationsResponseSchema>;
