const DataFormateCsMelee = (data:any) => {
    // data.shape = data.shape.join(",");
    // data.grown = data.grown.join(",");
    data.intensity = data.intensity.join(',');
    data.fancY_COLOR = data.fancY_COLOR.join(",");
    data.purgrp = data.purgrp.join(",");
    data.location = data.location.join(",");
    data.stock = data.stock.join(",");
    return data;
};

export default DataFormateCsMelee;
