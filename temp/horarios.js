// Dados fornecidos
const data = [
    [
        ["2:25", "10:30"],
        ["1:30", "3:30", "4:20"],
        ["1:00", "4:03", "7:37"]
    ],
    [
        ["1:25", "10:30"],
        ["1:30", "3:30", "4:20"],
        ["1:00", "4:03", "7:37"]
    ],
    [
        ["2:25", "10:30"],
        ["1:30", "3:30", "4:20"],
        ["1:00", "4:03", "7:37"]
    ],
    [
        ["2:25", "10:30"],
        ["1:30", "3:30", "4:20"],
        ["1:00", "4:03", "7:37"]
    ],
    [
        ["2:25", "10:30"],
        ["1:30", "3:30", "4:20"],
        ["1:00", "4:03", "7:37"]
    ],
    [
        ["2:25", "10:30"],
        ["1:30", "3:30", "4:20"],
        ["1:00", "4:03", "7:37"]
    ]
];

// Função para converter um horário "HH:MM" em minutos desde a meia-noite
function toMinutes(timeStr) {
    const [hours, minutes] = timeStr.split(':').map(Number);
    return hours * 60 + minutes;
}

// Função para converter minutos desde a meia-noite de volta para o formato "HH:MM"
function toTimeString(minutes) {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}:${mins.toString().padStart(2, '0')}`;
}

// Combinar, ordenar e reconverter os horários
let orderedTimes = data.map(sublist => {
    // Combinar todos os horários em uma única lista
    const allTimes = sublist.flat();
    // Converter para minutos, ordenar e reconverter para "HH:MM"
    return allTimes.map(toMinutes).sort((a, b) => a - b).map(toTimeString);
});

// Exibir as listas combinadas e ordenadas
console.log(orderedTimes);

const timeParagraphs = orderedTimes.map(sublist => {
    return sublist.map(time => `<div>${time}</div>`);
});

let divTimesHTML = ``;
for (let i = 0; i < timeParagraphs.length; i++) {
    divTimesHTML += 
    `<div>
        ${timeParagraphs[i]}
    </div>`;
}
console.log(timeParagraphs)
console.log(divTimesHTML);
