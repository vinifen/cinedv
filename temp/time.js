const date = new Date();
console.log(date);
let hours = date.getHours();
console.log(hours);
const minutes = String(date.getMinutes());
console.log(minutes);

const ampm = hours >= 12 ? 'PM' : 'AM';
hours = hours % 12;
hours = hours ? hours : 12;

const formattedTime = `${hours}:${minutes} ${ampm}`;
console.log(formattedTime);

const [splitHours, splitMinutes] = formattedTime.split(":").map(parseFloat);
console.log(splitHours, splitMinutes);
const formattedMinutes = splitHours * 60 + splitMinutes;
console.log(formattedMinutes);







/*let timeNow = 0;
let hoursNow = 0;
let ingresso = 0;
timeNow = new Date().getHours();
let hoursString = "19:55"
if(timeNow < parseInt(hoursString)){
    console.log("aaa " + hoursStringNumber);
}

let diaHoje = timeNow.getDate();
if (hoursNow >= 17){
    ingresso = 0;
}
else{
    ingresso = hoursNow;
}
let proxDia = diaHoje + 1;
console.log(ingresso);
console.log(hoursNow);
console.log(timeNow.getDay());
console.log(proxDia);
console.log(timeNow.getMonth());*/
