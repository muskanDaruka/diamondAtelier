import moment, { Duration } from "moment";




export const  parseDuration = (duration:string):Duration => {
   
    const regex = /(\d+)([a-zA-Z]+)/;
    const match = duration.match(regex);

    if(!match){
        throw new Error("Invalid duration format");
    }

    const value = parseInt(match[1],10);
    const unit = match[2].toLowerCase();

    switch (unit) {
        case 'd':
        case 'day':
          return moment.duration(value, 'days');
        case 'h':
        case 'hour':
        case 'hr':
          return moment.duration(value, 'hours');
        case 'm':
        case 'minute':
        case 'min':
          return moment.duration(value, 'minutes');
        case 's':
        case 'second':
        case 'sec':
          return moment.duration(value, 'seconds');
        default:
          throw new Error("Unsupported duration unit");
      }
}

console.log(parseDuration("3d"));