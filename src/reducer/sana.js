export default function  formatDateYear(ms){
    let date  = new Date(ms)
    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();
    // return `${ day<10 ? `0${day}`:day  }/${month<10 ? `0${month}`:month}/${year}`

    return `${year}/${month<10 ? `0${month}`:month}/${ day<10 ? `0${day}`:day  }`
}

