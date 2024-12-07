


export function ApproxPiece(value:any){
    return value*100 ?(1/value).toFixed() :(1/((Number((value?.split("-")[0]))+Number((value?.split("-")[1])))/2)).toFixed()
}


export function SizeInCent(value:any){
    return value*100 ? (value*100).toFixed(2) :(((Number((value?.split("-")[0]))+Number((value?.split("-")[1])))/2)*100).toFixed(2)
}


