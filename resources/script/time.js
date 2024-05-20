let timeNow = 0;
let hoursNow = 0;
let ingresso = 0;
timeNow = new Date();
hoursNow = parseFloat(timeNow.toLocaleTimeString());
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
console.log(timeNow.getMonth());
