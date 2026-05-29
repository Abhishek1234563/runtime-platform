import { z } from "zod";
export const FieldSchema = z.object({
  name: z.string(),

  label: z.string(),

  type: z.string(),
});


export const FormSchema = z.object({
  id: z.string().optional(),

  type: z.literal("form"),

  title: z.string().optional(),

  submitTo: z.string().optional(),

  fields: z.array(FieldSchema).default([]),
});


export const ColumnSchema = z.object({
  key: z.string(),
  label: z.string(),
});

export const TableSchema = z.object({
  id: z.string().optional(),

  type: z.literal("table"),

  dataSource: z.string().optional(),

  columns: z.array(ColumnSchema).default([]),

  data: z.array(
    z.record(z.string(), z.any())
  ).default([]),
});


export const LayoutSchema = z.object({
  id: z.string().optional(),

  type: z.literal("layout"),

  direction: z.enum(["row", "column"]).default("column"),

  children: z.array(z.any()).default([]),
});

export const CardSchema = z.object({
  id: z.string().optional(),

  type: z.literal("card"),

  title: z.string().optional(),

  entity: z.string().optional(),
});