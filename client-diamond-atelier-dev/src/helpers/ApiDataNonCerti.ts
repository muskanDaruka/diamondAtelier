const DataFormateNonCerti = (data:any) => {
    data.shape = data.shape.join(",");
    data.grown = data.grown.join(",");
    data.colgrp = data.colgrp.join(",");
    data.purgrp = data.purgrp.join(",");
    data.location = data.location.join(",");
    data.stock = data.stock.join(",");
    return data;
};

export default DataFormateNonCerti;
