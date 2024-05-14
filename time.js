let timeNow = 0;
let hoursNow = 0;
let ingresso = 0;
timeNow = new Date();
hoursNow = parseFloat(timeNow.toLocaleTimeString());
if (hoursNow >= 17){
    ingresso = 0;
}
else{
    ingresso = hoursNow;
}
console.log(ingresso);
console.log(hoursNow);
console.log(timeNow.getDay());

