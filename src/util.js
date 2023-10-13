import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import React from "react";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import MilitaryTechIcon from "@mui/icons-material/MilitaryTech";
import CardGiftcardIcon from "@mui/icons-material/CardGiftcard";
import WatchIcon from "@mui/icons-material/Watch";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import CoffeeIcon from "@mui/icons-material/Coffee";
import ExtensionIcon from "@mui/icons-material/Extension";
import AirplanemodeActiveIcon from "@mui/icons-material/AirplanemodeActive";
import PaidIcon from "@mui/icons-material/Paid";
import moment from "moment";

export default function formatDate(ms) {
    let date = new Date(ms)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}`
}

export function formatDateYear(ms) {
    let date = new Date(ms)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    return `${year}/${month < 10 ? `0${month}` : month}/${day < 10 ? `0${day}` : day}`
}

export function formatDateWithTime(ms) {
    let date = new Date(ms)
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let time = date.getHours()
    let minute = date.getMinutes()
    return `${day < 10 ? `0${day}` : day}/${month < 10 ? `0${month}` : month}/${year}  ${time}:${minute < 10 ? `0${minute}` : minute}`
}

export function formatDateMinus(ms) {
    let date;
    if (ms) {
        date = new Date(ms)
    } else {
        date = new Date()
    }
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`
}

export function formatDateWithMonth(ms) {
    let date = new Date(ms)
    let day = date.getDate();
    return `${day < 10 ? `0${day}` : day}`
}

export function formatDateStampList(ms) {
    return new Date(ms).getTime()
}

export function formatDateWithWeek(ms) {
    let dayName = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    let day = dayName[new Date(ms).getDay()];
    return `${day}`
}

export function dayAndMonth(day) {
    const valentines = new Date(day);
    const thisDay = valentines.getDay();
    const month = valentines.getMonth();
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    return `${thisDay} ${monthNames[month]}`
}

export function formatDayDashboard() {
    let date = new Date();
    let year = date.getFullYear();
    let day = date.getDate();
    const month = date.getMonth();
    const monthNames = ["Yanvar", "Fevral", "Mart", "April", "May", "Iyun", "Iyul", "Avgust", "Sentyabr", "Oktyabr", "Noyabr", "Dekabr"];
    let week = moment().format('dddd');
    return `${year} yil - ${day} ${monthNames[month]}, ${week}`
}

export function formatIcon(index, color) {
    let a = null
    switch (index) {
        case '1':
            a = '---'
            break;
        case '2':
            a = <EmojiEventsIcon
                style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '3':
            a = <ThumbUpIcon style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '4':
            a = <MilitaryTechIcon
                style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '5':
            a = <CardGiftcardIcon
                style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '6':
            a = <WatchIcon style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '7':
            a = <MenuBookIcon style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '8':
            a = <CoffeeIcon style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '9':
            a = <ExtensionIcon
                style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '10':
            a = <AirplanemodeActiveIcon
                style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '10px'}}/>
            break;
        case '11':
            a = <PaidIcon style={{color: color, transform: 'scale(1.5)', marginRight: '10px', marginLeft: '20px'}}/>
            break;
    }
    return a
}


export function getExtension(filename) {
    let a = filename.split('.').pop()
    const pictureFilesType = ['gif', 'jpg', 'jpeg', 'jfif', 'png', 'svg', 'webp']
    return pictureFilesType.some(item => item === a)
}


export function prettify(num) {
    if (!num) return num;

    const [wholeNumber, part] = num.toString().split(' ');
    const regExp = /(\d{1,3}(?=(?:\d\d\d)+(?!\d)))/g;
    const formattedNumber = wholeNumber.toString().replace(regExp, '$1 ') + (part ? `.${part}` : '');

    return formattedNumber
}

export function camelize(str) {
    return str.replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
        return index === 0 ? word.toUpperCase() : word.toLowerCase();
    }).replace('_', ' ');
}
