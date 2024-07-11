const activity = {
    name: 'Almoço',
    date: new Date('2024-07-08 10:00'),
    isFinished: true,
};

let activities = [
    activity,
    {
        name: 'Academia em grupo',
        date: new Date('2024-07-09 12:00'),
        isFinished: false,
    },

    {
        name: 'Gaming session',
        date: new Date('2024-07-09 16:00'),
        isFinished: false,
    },
];

const formatter = (date) => {
    return {
        day: {
            numeric: dayjs(date).format('DD'),
            week: {
                short: dayjs(date).format('ddd'),
                long: dayjs(date).format('dddd'),
            },
        },

        month: dayjs(date).format('MMMM'),
        hour: dayjs(date).format('HH:mm'),
    };
};

const createActivityItem = (activity) => {
    let input = `
    <input 
    onchange="finishActivity(event)"
    value="${activity.date}"
    type="checkbox"
    `;

    if (activity.isFinished) {
        input += ' checked';
    }

    input += '>';

    const format = formatter(activity.date);

    return `<div>
                ${input}
                <span>${activity.name}</span>
                <time>${format.day.week.long},dia ${format.day.numeric} de ${format.month} às ${format.hour}h</time>
            </div>`;
};

const updateActivitiesList = () => {
    const section = document.querySelector('section');
    section.innerHTML = '';

    if (activities.length == 0) {
        section.innerHTML = '<p>Nenhuma atividade encontrada</p>';
        return;
    }

    for (const activity of activities) {
        section.innerHTML += createActivityItem(activity);
    }
};

updateActivitiesList();

const saveActivities = (event) => {
    event.preventDefault();
    const dataForm = new FormData(event.target);

    const name = dataForm.get('activity');
    const day = dataForm.get('day');
    const hour = dataForm.get('hour');
    const date = `${day} ${hour}`;

    const newActivity = {
        name,
        date,
        isFinished: false,
    };

    const activityExist = activities.find((activity) => {
        return activity.date == newActivity.date;
    });

    if (activityExist) {
        return alert('Dia/Hora não disponível');
    }

    activities = [newActivity, ...activities];
    updateActivitiesList();
};

const createDaysSelect = () => {
    const days = [
        '2024-02-01',
        '2024-02-02',
        '2024-02-03',
        '2024-02-04',
        '2024-02-05',
        '2024-02-06',
    ];

    let daysSelect = '';

    for (let day of days) {
        const format = formatter(day);
        const formattedDay = `
        ${format.day.numeric} de
        ${format.month}
        `;
        daysSelect += `<option value="${day}">${formattedDay}</option>`;
    }

    document.querySelector('select[name="day"]').innerHTML = daysSelect;
};
createDaysSelect();

const createHourSelect = () => {
    let hoursAvailable = '';

    for (let i = 6; i < 23; i++) {
        const hour = String(i).padStart(2, '0');
        hoursAvailable += `<option value="${hour}:00">${hour}:00</option>`;
        hoursAvailable += `<option value="${hour}:30">${hour}:30</option>`;
    }

    document.querySelector('select[name="hour"]').innerHTML = hoursAvailable;
};

createHourSelect();

const finishActivity = (event) => {
    const input = event.target;
    const dateThisInput = input.value;

    const activity = activities.find((activity) => {
        return activity.date == dateThisInput;
    });

    if (!activity) {
        return;
    }

    activity.isFinished = !activity.isFinished;
};
