
const DataFormate = (data:any) => {
    data.shapE_SEQ = data.shapE_SEQ.join(",");
    data.coloR_SEQ = data.coloR_SEQ.join(",");
    data.puritY_SEQ = data.puritY_SEQ.join(",");
    data.laB_SEQ = data.laB_SEQ.join(",");
    data.PREFIX = data.PREFIX.join(",");
    data.cuT_SEQ = data.cuT_SEQ.join(",");
    data.polisH_SEQ = data.polisH_SEQ.join(",");
    data.country = data.country.join(",");
    data.symM_SEQ = data.symM_SEQ.join(",");
    data.deaL_INT_STAGE = data.deaL_INT_STAGE.join(",");
    data.icolor_desc &&( data.icolor_desc = data.icolor_desc.join(","))
    
    return data;
  };



export default DataFormate