import { z } from "zod";


const schema = z.object({
    commenT_TYPE: z.string(),
    stock: z.string().array(),
    fancY_COLOR: z.string().array(),
    purgrp: z.string().array(),
    grown: z.string().optional(),
    intensity: z.string().array(),
    f_LENGTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_LENGTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_WIDTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_WIDTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    pageno: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    location: z.string().array(),
    tableFilter: z.string().array(),
});



export type ValidationSchemaType = z.infer<typeof schema>

export  { schema };


