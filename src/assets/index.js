import guitor from './guitor-2.svg';
import userIcon from './user.svg';
import star from './star.svg';
import drums from './drum-set.png';
import microphone from './microphone.png';
import trumpet from './trumpet.png';
import keyboard from './keyboard.png';
import guitar from './guitar.png';
import user0 from './users/spiderman.jpg';
import user1 from './users/antman.jpg';
import user2 from './users/John_doe.webp';
import user3 from './users/moana-2.jfif';
import user4 from './users/snow-white.jfif';
import user5 from './users/tangled.jfif';
import user6 from './users/zootopia.webp';
import locationIco from './location.svg';
import sundayServicePoster from './sunday-service.avif'
import mountainServicePoster from './mountain-service.jpg'
import crusadeServicePoster from './crusade1.png'



export const icons = {
    mainIcon: {name:'guitor', value: guitor, href: "/"},
    userIcon: {name:'user', value: userIcon, href: "/#Profile"},
    starIcon: {name:'star', value: star, href: "#"},
}


const venue1 = {id:0, date: "2025-02-19", from: "02:00", to: "03:00", place: "at church", role: "for discussions", img: locationIco};
const venue2 = {id:1, date: "2025-01-15", from: "02:00", to: "03:00", place: "at church", role: "for practice", img: locationIco};
const venue3 = {id:2, date: "2025-04-21", from: "03:15", to: "05:00", place: "at church", role: "for practice", img: locationIco};
const venue4 = {id:3, date: "2025-02-28", from: "02:00", to: "03:00", place: "at church", role: "for practice", img: locationIco};
const venue5 = {id:4, date: "2025-03-15", from: "02:00", to: "03:00", place: "at church", role: "for practice", img: locationIco};
const venue6 = {id:5, date: "2025-04-15", from: "02:00", to: "03:00", place: "at church", role: "for practice", img: locationIco};

const attendance1 = [
    { date: '2025-02-23', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 2 },
    { date: '2025-02-28', startTime: "14:00", endTime: "16:00", place: "church", role: "practice", sessions: 2, attendance: 1 },
    { date: '2025-02-21', startTime: "13:00", endTime: "15:00", place: "church", role: "practice", sessions: 2, attendance: 1.2 },
    { date: '2025-02-12', startTime: "15:05", endTime: "17:05", place: "church", role: "practice", sessions: 2, attendance: 0 },
  ]

const attendance2 = [
    { date: '2025-03-23', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 0 },
    { date: '2025-03-30', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 0 },
    { date: '2025-03-18', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 0 },
    { date: '2025-03-13', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 1 },
    { date: '2025-03-01', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 2 },
    { date: '2025-03-16', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 2 },
    { date: '2025-03-20', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 1},
  ]
const attendance3 = [
    { date: '2024-12-02', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 1 },
    { date: '2024-12-12', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 1 },
    { date: '2024-12-21', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 1 },
    { date: '2024-12-30', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 0 },
    { date: '2024-12-24', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 2 },
    { date: '2024-12-17', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 0 },
    { date: '2024-12-10', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 1 },
    { date: '2024-12-06', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 2 },
    { date: '2024-12-16', startTime: "15:00", endTime: "17:00", place: "church", role: "practice", sessions: 2, attendance: 2 },
  ]


const absent1 = [
    { name: 'Work/Study',  date: "2024-11-28" },
    { name: 'Work/Study',  date: "2024-11-29" },
    { name: 'Work/Study',  date: "2024-11-30" },
    { name: 'Work/Study',  date: "2024-11-31" },
    { name: 'Health',  date: "2024-12-30" },
    { name: 'Health',  date: "2024-12-31" },
    { name: 'Family',  date: "2025-01-01" },
    { name: 'Travel',  date: "2025-01-02" },
    { name: 'Other',  date: "2025-01-03" },
    { name: 'Other',  date: "2025-01-04" },
  ]
const absent2 = [
    { name: 'Work/Study',  date: "2024-11-31" },
    { name: 'Travel',  date: "2025-01-02" },
    { name: 'Other',  date: "2025-01-03" },
    { name: 'Other',  date: "2025-01-04" },
    { name: 'Other',  date: "2025-01-05" },
    { name: 'Other',  date: "2025-01-06" },
  ]
const absent3 = [
    { name: 'Work/Study',  date: "2024-11-28" },
    { name: 'Work/Study',  date: "2024-11-29" },
    { name: 'Work/Study',  date: "2024-11-30" },
    { name: 'Work/Study',  date: "2024-11-31" },
    { name: 'Health',  date: "2024-12-30" },
    { name: 'Health',  date: "2024-12-31" },
    { name: 'Family',  date: "2025-01-01" },
    { name: 'Travel',  date: "2025-01-02" },
    { name: 'Other',  date: "2025-01-03" },
    { name: 'Other',  date: "2025-01-04" },
    { name: 'Other',  date: "2025-01-05" },
    { name: 'Other',  date: "2025-01-06" },
  ]
const absent4 = [
    { name: 'Health',  date: "2024-12-30" },
    { name: 'Health',  date: "2024-12-31" },
  ]
const songsLearned = [
    {title: "tilape", date: "2024-11-30"},
    {title: "Alemekedzeke Yehova", date: "2024-12-01"},
    {title: "Ndiimba ine", date: "2025-01-01"},
    {title: "Pemphera", date: "2025-02-01"},
    {title: "Yesu mfumu yathu", date: "2025-02-15"},
    {title: "Kumwamba", date: "2025-02-20"},
    {title: "Yesu akubwera", date: "2025-03-01"},
]

const performance = [
    {location: "Church", date: "2025-02-23"},
    {location: "Mountain", date: "2025-01-15"},
    {location: "Crusaide", date: "2025-04-21"},
    {location: "Opening day", date: "2024-12-02"},
    {location: "Church", date: "2025-02-28"},
]
const feedback1 = {title: "Celebrating Your", highlitedTitle: "Voice", desc: `This past month, you shone brightly in our choir with 
    your stunning performance of "How Great Thou Art." Your dedication and passion were evident, and you touched the hearts of 
    everyone present. We are grateful for your incredible talent and for sharing your gift with us. Keep lifting our spirits with your 
    beautiful voice! 🎶❤️🙏`, completed: false}
const feedback2 = {title: "A Melodic", highlitedTitle: "Highlight", desc: 
    `This past month, you lifted our spirits with your heartfelt rendition of "Amazing Grace." Your powerful voice and genuine 
    emotion resonated with every member of our congregation, leaving us all inspired and moved. We are truly blessed to have such a 
    talented and devoted singer in our choir. Thank you, you, for your beautiful contribution to our worship`, completed: false}
const feedback3 = {title: "Reflecting on", highlitedTitle: "Challenges", desc: `This past month, you faced some vocal challenges 
    during your solo performance of "Holy, Holy, Holy." While it was a tough moment, your perseverance and dedication were clear 
    to everyone. Remember, every great singer encounters obstacles, and it's through these experiences that we grow stronger. 
    We appreciate your courage and look forward to seeing you continue to shine. Keep practicing and never lose faith in your 
    amazing talent!`, completed: false}


function division(
    id, divName, value, ratings, shortWords, venue, attendance, songs, eventPerformance, absent, userRole="Member"
) {
    return {
        id: id,
        isRegistered: true,
        name: divName,
        value: value,
        role: "Training",
        userRole: userRole,
        showRating:true, 
        ratings: ratings, 
        href: "/#instruments", 
        shortWords: shortWords,
        showVenue:true,
        title: "Our Mission",
        titleDesc: `To glorify God and uplift the hearts of our congregation through the power of music. We aim to create an atmosphere 
        of worship where people can connect with the divine and experience spiritual renewal. Through our music, we seek to inspire, 
        encourage, and foster a sense of community within the church. We are committed to excellence in our musical offerings, and we 
        strive to use our talents to serve the Lord and bring joy to His people.`,
        titleQuote: "To create a better everyday life for the many people",
        showUsers: true,
        baseUser: "Member",
        baseUserModifier: "Available",
        
        venue: venue,
        attendance: attendance,
        absent: absent,
        songsLearned: songs,
        performance: eventPerformance,
    }
}

const div1 = division(
    0, "drum", drums, [4, 4.8, 4.2], "Lets beat something", [venue1, venue2], attendance1, songsLearned, performance, absent1
)
const div2 = division(
    1, "Keyboard", keyboard, [4, 3.5, 4.2], "Hands on Lesson", [venue3, venue4, venue5], attendance2, songsLearned, performance, absent2
)
const div3 = division(
    2, "Trumpet", trumpet, [4, 3.5, 4.2], "For Professionals", [venue2, venue3, venue6], attendance3, songsLearned, performance, absent3
)
const div4 = division(
    3, "Guitar", guitar, [4, 3.5, 4.2], "Pluck those strings", [venue1, venue3, venue6], attendance3, songsLearned, performance, absent4
)
const div5 = division(
    4, "Sing", microphone, [4, 3.5, 4.2], "Your Voice", [venue1, venue2, venue3], attendance2, songsLearned, performance, 
    absent2
)

export const divisions = [div1, div2, div3, div4, div5]


function user(
    id, fname, lname, username, picture, divisions, feedback
) {

    return (
        {
            id: id,
            details: {
                username: username,
                firstname: fname,
                lastname: lname,
                age: 16,
                sex: "male",
                occupation: "student",
                location: "Chikanda",
                picture: picture,
            },
            divisions: divisions,
            suggestions: [
                {showName:true, isPublic:true, title: "Change of venue", desc: "Lets meet in church"}
            ],
            complaints: [
                {title:"James was misbehaving", desc: "I dont if he is devil"}
            ],
            isAdmin: false,
            feedback: feedback,
        }
    )
}

const user_0 = user(0, "Emmanuel", "Basikolo", "byke", user0, [div1, div2, div3, div4, div5], feedback1);
const user_1 = user(1, "John", "Phiri", "johny", user1, [div2, div3], feedback2);
const user_2 = user(2, "Blessings", "Roberts",  "bule", user2, [div3, div2, div4], feedback3);
const user_3 = user(3, "James", "Banda", "muje", user3, [div2, div3], feedback1);
const user_4 = user(4, "Macdonald", "Phiri", "mac", user4, [div2, div4, div5], feedback2);
const user_5 = user(5, "Joseph", "Chimtengo", "jay", user5, [div4, div5, div2], feedback3);
const user_6 = user(6, "Gift", "Kalulu", "gibo", user6, [div1, div4, div2], feedback1); 

export const users = [ user_0, user_1, user_2, user_3, user_4, user_5, user_6 ]


export const pendingRequest = [
    {userId: 0, venueId: 0, divId: 1, attended: true, reason:''},
    {userId: 0, venueId: 1, divId: 2, attended: true, reason:''},
    {userId: 0, venueId: 2, divId: 0, attended: true, reason:''},
    {userId: 1, venueId: 0, divId: 1, attended: false, reason:'study/work'},
    {userId: 1, venueId: 0, divId: 2, attended: true, reason:''},
    {userId: 1, venueId: 0, divId: 0, attended: false, reason:'family'},
]

export const allVenues = [ venue1, venue2, venue3, venue4, venue5, venue6 ]

export function capitalize(str) {
    return str
      .toLowerCase()
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
}
export function getAllUsers() {
    return users;
}
// export function getUser(id) {
//     return users.find(u=>u.id===id);
// }

export function getUserHeader() {
    return users.map(u=>({id: u.id, username:u.details.username, name:`${u.details.firstname} ${u.details.lastname}`}))
}

export function getDiv(divId) {
    return divisions.find(div=>div.id===divId)
}

export function getVenue(venueId) {
    return allVenues.find(venue=>venue.id===venueId)
}

export function getUsersByDivision(divId) {
    return users.filter(user =>user.divisions.some(division => division.id === divId)) || null;
}

export function countUsersInDiv(divId) {
    const users = getUsersByDivision(divId);
    return users? users.length : 0;
}


//statistics
export function getMean(array) {
    return (array.reduce((a, b) => a + b, 0) / array.length).toFixed(1);
}

function dateFilter(array, startDate, endDate) {
    return array.filter(record => {
        const rd = new Date(record.date);
        const start = startDate && new Date(startDate);
        const end = endDate && new Date(endDate);
        return (!start || rd >= start) && (!end || rd <= end);
    });
}

export function absentCal(absArray, date_range) {
    const absByReasonResult = {};
    absArray.forEach(item => { absByReasonResult[item.reason] = (absByReasonResult[item.reason] || 0) + 1; });
    
    const absByDateResult = {};
    addDateDesc(absArray, date_range).forEach(item => {
        if (!absByDateResult[item.dateDesc]) {
            absByDateResult[item.dateDesc] = { ...item, value: 0 };
        }
        absByDateResult[item.dateDesc].value += 1;
    });

    return {
        byReason: Object.keys(absByReasonResult).map(reason => ({ reason: reason, value: absByReasonResult[reason] })),
        byDate: Object.values(absByDateResult)
    };
}

export function getStat(user, divId, startDate = null, endDate = null, sess_to_hours = 1) {
    const div = user.divisions.find(d => d.id===divId);
    const filteredAtt = dateFilter(div.attendance, startDate, endDate);    
    const absent = absentCal(div.absent, startDate, endDate);

    const total = filteredAtt.reduce((t, a) => t + a.sessions, 0);
    const attended = filteredAtt.reduce((t, a) => t + a.attendance, 0);
    const percentage = total ? Math.round(attended / total * 100) : 0;

    return {
        totalSessions: Math.round(total),
        attendedSessions: Math.round(attended),
        totalHours: Math.round(total * sess_to_hours),
        attendedHours: Math.round(attended * sess_to_hours),
        attendancePercentage: percentage,
        attendance: filteredAtt,
        absentByName: absent.byName,
        absentByDate: absent.byDate
    };
}

export function getAvgAttendance(users) {
    let totalAttendance = 0;
    let totalSessions = 0;
    for(let i=0; i<users.length; i++) {
        for(let j=0; j<users[i].divisions.length; j++){
            for(let k=0; k<users[i].divisions[j].attendance.length; k++) {
                totalAttendance += users[i].divisions[j].attendance[k].attendance;
                totalSessions += users[i].divisions[j].attendance[k].sessions;
            }
        }
    }
    return totalSessions===0? 0 : (100*totalAttendance)/totalSessions;
}

export function getTopAbsenceReason(users, date_range) {
    const result = [];
    const reasonIndexMap = new Map();
    for(let i=0; i<users.length; i++) {
        for(let j=0; j<users[i].divisions.length; j++){
            const input = absentCal(users[i].divisions[j].absent, date_range).byReason;
            for(let k=0; k<input.length; k++) {
                const { reason, value } = input[k];
                if (reasonIndexMap.has(reason)) {
                    const index = reasonIndexMap.get(reason);
                    result[index].value += value;
                } else {
                    result.push({ reason, value });
                    reasonIndexMap.set(reason, result.length - 1);
                }
            }
        }
    }
    
    return result.sort((a,b)=>b.value-a.value)[0];
}

function sortByDate(array) {
    if(!array || Object.keys(array).length <= 0) return array
    return array.sort((a, b) => {
        const dateA = new Date(`${a.date}`);
        const dateB = new Date(`${b.date}`);
        return dateA - dateB;
    }); 
}
export function addDateDesc(array, date_range) {
    if(!array || array.length<=0) return array;
    const startDate = date_range.start;
    const endDate = date_range.end;
    const diff = (new Date(endDate) - new Date(startDate))/(1000 * 60 * 60 * 24);

    if(diff<=7) return array.map(a=>({...a, dateDesc: getDateDetails(a.venue_detail.date).dayName}));
    else if(diff<=31) {
        const weekStart = getWeekNumber(new Date(startDate));
        return array.map(a=>({...a, dateDesc: `Week ${getWeekNumber(new Date(a.venue_detail.date)) - weekStart + 1}`}));
    } else if(diff<=366) {
        return array.map(a=>({...a, dateDesc: getDateDetails(a.venue_detail.date).monthName}));
    }
    return array.map(a=>({...a, dateDesc: getDateDetails(a.venue_detail.date).year}));
}

export function combineByDateDesc(array) {
    const result = {};
    
    array.forEach(item => {
        if (!result[item.dateDesc]) { //if dateDesc does not exist, create it with init value of 0
            result[item.dateDesc] = { ...item, attendance: 0, sessions: 0 };
        }
        result[item.dateDesc].attendance += item.attendance; //group items by creating dateDesc key and perform action on values
        result[item.dateDesc].sessions += item.sessions;
    });

    return Object.values(result); //we created a group, remove it and return the result
}

export function getDateRange(date_range) {
    if(!date_range || Object.keys(date_range).length <= 0) return "No Data available";

    return `${getDateDetails(date_range.start).date} to ${getDateDetails(date_range.end).date}`
}









export function selectVenueByDate(array, cutOff=3) {
    const allVenue = array.map(u=>u.venue).flat()

    const now = new Date();

    const upcomingEvents = allVenue
        .filter(event => {
            const eventDateTime = new Date(`${event.date}T${event.from}`);
            return eventDateTime > now;
        })
        .sort((a, b) => {
            const dateA = new Date(`${a.date}T${a.from}`);
            const dateB = new Date(`${b.date}T${b.from}`);
            return dateA - dateB;
        }); 
    return cutOff? upcomingEvents.slice(0, cutOff): upcomingEvents;
}

export function checkUserInDivision(user, divId) {
    return user.divisions.find(division => division === divId) !== undefined;
}

export function sortAllDivisionsByUser(user, div) {
    return div.sort((a, b) => {
        const aInUser = checkUserInDivision(user, a.id);
        const bInUser = checkUserInDivision(user, b.id);

        if (aInUser && !bInUser) {
            return 1;
        } else if (!aInUser && bInUser) {
            return -1;
        } else {
            return a.id - b.id; // if both are the same, sort by id
        }
    });
}


export function getDivisionToRegister(user, cutOff=null) {
    const result = [];

    user.divisions.map(v=>{
        if(v.isRegistered && v.venue.length>0 && v.userRole==="Member" && (cutOff===null || cutOff>0)){
            result.push({
                userId: user.id,
                divisionId: v.id,
                divName: v.name,
                img: v.value,
                availableVenue: cutOff===null||cutOff>v.venue.length? v.venue : v.venue.slice(0, cutOff)
            });
            cutOff===null? cutOff:  cutOff -= v.venue.length;
        }
    });
    return result;
}

export function addS(num) {
    return num===1? "": "s"
}
function addZero(num) {
    return num < 10 ? `0${num}` : num;
}

export function getDateDetails(dateString) {
    const date = new Date(dateString);

    const monthNames = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];

    const dayNames = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];

    
    const day = addZero(date.getDate());
    const dayName = dayNames[date.getDay()];
    const monthName = monthNames[date.getMonth()];
    const year = date.getFullYear();

    return {
        day: day,
        dayName: dayName,
        monthName: monthName,
        year: year,
        date: `${day} ${monthName} ${year}`,
        date2: `${dayName}, ${day} ${monthName} ${year}`,
    };
}

export function getWeekNumber(date) {
    const copyDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    copyDate.setUTCDate(copyDate.getUTCDate() + 4 - (copyDate.getUTCDay() || 7));
    const yearStart = new Date(Date.UTC(copyDate.getUTCFullYear(), 0, 1));
    const weekNumber = Math.ceil(((copyDate - yearStart) / 86400000 + 1) / 7);
    return weekNumber;
}

export function timeDiff(t1, t2) {
    const [startHour, startMinute] = t1.split(':').map(Number);
    const [endHour, endMinute] = t2.split(':').map(Number);
    const startDate = new Date(2025, 1, 23, startHour, startMinute);
    const endDate = new Date(2025, 1, 23, endHour, endMinute);
    const durationMs = endDate - startDate;
    if (durationMs===0) return 0;

    const durationHours = Math.floor(durationMs / (1000 * 60 * 60));
    const durationMinutes = Math.floor((durationMs % (1000 * 60 * 60)) / (1000 * 60));
    if(durationMinutes===0) return `${durationHours}h`;
    else if(durationHours===0) return `${durationMinutes}m`
    return `${durationHours}h ${durationMinutes}m`;
}

export function getFormattedTime(timeString) {
    let [hours, minutes] = timeString.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12; 
    
    return `${hours}:${minutes < 10 ? '0' + minutes : minutes} ${period}`;
}

export function subtractDates(parameterDate) {
    const msPerDay = 86400000;
    const diff = Math.floor((new Date(parameterDate) - Date.now()) / msPerDay);
    const absDiff = Math.abs(diff);
    const future = diff > 0;
    const pluralize = (unit, value) => `${value} ${unit}${value > 1 ? 's' : ''} ${future ? 'from now' : 'ago'}`;
  
    if (diff === 0) return 'Today';
    if (absDiff === 1) return future ? 'Tomorrow' : 'Yesterday';
    if (absDiff < 7) return future ? `In ${absDiff} days` : `${absDiff} days ago`;
    if (absDiff < 28) return future ? `In ${Math.floor(absDiff / 7)} weeks` : `${Math.floor(absDiff / 7)} weeks ago`;
    if (absDiff < 60) return future ? 'In about a month' : 'About a month ago';
    if (absDiff < 365) return pluralize('month', Math.floor(absDiff / 30));
    return pluralize('year', Math.floor(absDiff / 365));
}
  
  

export const getAllDiv = (user) => user.divisions
    .map(div=>({id: div.id, name: div.name, isReg: div.isRegistered}))
    .filter(u=>!u.isRegistered);

export function getAllDivisions() {
    return divisions;
}


export function getStructuredDivData() {
    const dates = getPastThreeMonthsDates();
    const result = [];
    
    for (let j = 0; j < dates.length; j++) {
        const div = []; 
        for (let i = 0; i < divisions.length; i++) {
            const att = dateFilter(
                divisions[i].attendance,
                dates[j].startDate,
                dates[j].endDate 
            );
            const v = att.reduce((a, b) => a + b.attendance, 0);
            div.push({
                name: capitalize(divisions[i].name),
                value: v
            });
        }
        result.push({
            month: getDateDetails(dates[j].startDate).monthName,
            div: div
        });
    }
    return result;
}

export function getTop5Users() {
    const dates = getPastThreeMonthsDates();
    const result = [];
    
    for(let k=0; k<users.length; k++) {
        let total = 0; 
        for (let j = 0; j < dates.length; j++) {
            for (let i = 0; i < users[k].divisions.length; i++) {
                const att = dateFilter(
                    users[k].divisions[i].attendance,
                    dates[j].startDate,
                    dates[j].endDate 
                );
                total += att.reduce((a, b) => a + b.attendance, 0);
            }
        }
        result.push({
            userId: users[k].id, 
            name: `${capitalize(users[k].details.firstname)[0]}. ${capitalize(users[k].details.lastname)}`,
            total: total
        });
    }
    return result.sort((a,b)=>b.total-a.total).slice(0, 5);
}

function getPastThreeMonthsDates() {
    const result = [];
    const today = new Date();
    
    // Loop for current month and the 2 preceding months
    for (let i = 0; i < 3; i++) {
      // Create a date for the first day of the target month
      const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const year = firstDayOfMonth.getFullYear();
      const month = firstDayOfMonth.getMonth(); // Note: Months are 0-indexed (0 = January)
      
      // Format month number to two digits
      const formattedMonth = String(month + 1).padStart(2, '0');
      
      // First day is always the 1st of the month
      const startDate = `${year}-${formattedMonth}-01`;
      
      // To get the last day, set day to 0 of the next month
      const lastDayOfMonth = new Date(year, month + 1, 0);
      const formattedDay = String(lastDayOfMonth.getDate()).padStart(2, '0');
      const endDate = `${year}-${formattedMonth}-${formattedDay}`;
      
      result.push({ startDate, endDate });
    }
    
    return result.reverse();
  }
  
