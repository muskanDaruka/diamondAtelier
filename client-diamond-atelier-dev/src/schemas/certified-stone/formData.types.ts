import { z } from "zod";


const schema = z.object({
    deaL_INT_STAGE: z.string().array(),
    shapE_SEQ:z.string().array(),
    laB_SEQ:z.string().array(),
    coloR_SEQ: z.string().array(),
    puritY_SEQ: z.string().array(),
    polisH_SEQ:z.string().array(),
    cuT_SEQ: z.string().array(),
    symM_SEQ: z.string().array(),
    reporT_NO: z.string(),
    PACKET_NO: z.string(),
    PREFIX: z.string().array(),
    froM_WGT: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    tO_WGT: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    ratiO_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    ratiO_TO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    tableP_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    tableP_TO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    depthP_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    depthP_TO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    lengtH_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    lengtH_TO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    widtH_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    widtH_TO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    deptH_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    deptH_TO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    PRATE_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    PRATE_TO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    PVALUE_FROM: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    PVALUE_To: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    FDISC_PER: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    TDISC_PER: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    PAGENO: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    priceType: z.number({invalid_type_error: "it must be a number"}).or(z.string()),
    country: z.string().array(),
    coloR_DESC: z.string().optional(),
    icolor_desc:z.string().array().optional(),
    partyrole:z.string(),
    PARTYRATE:z.string().optional(),
    PARTY_CODE:z.number().optional()
});



export type ValidationSchemaType = z.infer<typeof schema>

export  { schema };


