const DataFormateMelee = (data:any) => {
    // data.shape = data.shape.join(",");
    data.grown = data.grown.join(",");
    data.colgrp = data.colgrp.join(",");
    data.purgrp = data.purgrp.join(",");
    // data.country = data.country.join(",");
    data.stock = data.stock.join(",");
    return data;
};

export default DataFormateMelee;
