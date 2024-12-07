import { ValidationSchemaType } from "@/schemas/exotic-shapes/formData.types";

const DataFormateExotic = (data:any) => {
    data.shape = data.shape.join(",");
    data.grown = data.grown.join(",");
    data.colgrp = data.colgrp.join(",");
    data.location = data.location.join(",");
    data.stock = data.stock.join(",");
    data.cut = data.cut.join(",");
    // data.lab_SEQ = data.lab_SEQ.join(',');
    // data.cuT_SEQ = data.cuT_SEQ.join(",");
    return data;
};

export default DataFormateExotic;
