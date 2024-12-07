import { z } from "zod";

const schema = z.object({
    commenT_TYPE: z.string(),
    grown: z.string().array(),
    pageno: z.number(),
    f_LENGTH: z.string(),
    t_LENGTH: z.string(),
    f_WIDTH: z.string(),
    t_WIDTH: z.string(),
    colgrp:z.string().array(),
    stock:z.string().array(),
    purgrp:z.string().array(),
    tableFilter:z.string().array(),
});
export type ValidationSchemaType = z.infer<typeof schema>

export  { schema };



