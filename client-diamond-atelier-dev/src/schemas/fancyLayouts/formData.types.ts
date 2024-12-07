import { z } from "zod";

const schema = z.object({
    commenT_TYPE: z.string(),
    pageno: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_WGT: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_WGT: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_LENGTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_LENGTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_WIDTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_WIDTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    grown: z.string().array(),
    shape:z.string().array().or(z.string()),
    tableFilter:z.string().array().optional(),
});

export type ValidationSchemaType = z.infer<typeof schema>

export  { schema };



