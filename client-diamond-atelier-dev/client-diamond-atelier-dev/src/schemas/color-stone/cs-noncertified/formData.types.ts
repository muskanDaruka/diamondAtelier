import { z } from "zod";

const schema = z.object({
  commenT_TYPE: z.string(),
  shape: z.string().array(),
  f_WGT: z.number(),
  t_WGT: z.number(),
  colgrp: z.string().array(),
  purgrp: z.string().array(),
  f_RATIO: z.number(),
  t_RATIO: z.number(),
  grown: z.string().array(),
  stock: z.string().array(),
  packeT_NO: z.string(),
  location: z.string().array(),
  f_RATE: z.number(),
  t_RATE: z.number(),
  f_VALUE: z.number(),
  t_VALUE: z.number(),
  f_LENGTH: z.string(),
  t_LENGTH: z.string(),
  f_WIDTH: z.string(),
  t_WIDTH: z.string(),
  f_DEPTH: z.number(),
  t_DEPTH: z.number(),
  intensity: z.string().array(),
  pageno: z.number()
});

export type ValidationSchemaType = z.infer<typeof schema>;

export { schema };
