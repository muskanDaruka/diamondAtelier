const DataFormateFancy = (data:any) => {
    data.shape = data.shape.join(",");
    data.grown = data.grown.join(",");
    return data;
};

export default DataFormateFancy;
