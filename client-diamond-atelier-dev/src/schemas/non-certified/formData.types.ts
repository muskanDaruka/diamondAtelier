import { z } from "zod";


const schema = z.object({
    commenT_TYPE: z.string(),
    stock: z.string().array(),
    shape: z.string().array(),
    colgrp: z.string().array(),
    purgrp: z.string().array(),
    packeT_NO: z.string(),
    grown: z.string().array(),
    f_WGT: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_WGT: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_RATIO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_RATIO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_LENGTH: z.string(),
    t_LENGTH: z.string(),
    f_WIDTH: z.string(),
    t_WIDTH: z.string(),
    f_DEPTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_DEPTH: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_RATE: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_RATE: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    f_VALUE: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    t_VALUE: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    pageno: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    priceType: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    location: z.string().array(),  
});



export type ValidationSchemaType = z.infer<typeof schema>

export  { schema };


