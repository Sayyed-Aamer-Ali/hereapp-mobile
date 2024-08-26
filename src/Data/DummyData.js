export const UserTypes=[
    {
        id:1,
        name:'Student',

    },
    {
        id:2,
        name:'Instructor',

    },
    

]



export const MyClasses=[

  {
    id:1,
    className:"Advanced Data Structures & Algorithm Analysis",
    classInstructor:"Dr. Calvin Lin",
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },
  {
    id:2,
    className:"Computer Networks",
    classInstructor:"Dr. Casico Lindo",
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",
  },
  {
    id:3,
    className:"Calculus II",
    classInstructor:"Dr. Alex C.",
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },
  {
    id:4,
    className:"Advanced Data Structures & Algorithm Analysis",
    classInstructor:"Dr. Calvin Lin",
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },
  {
    id:5,
    className:"Computer Networks",
    classInstructor:"Dr. Casico Lindo",
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",
  },
  {
    id:6,
    className:"Calculus II",
    classInstructor:"Dr. Alex C.",
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },

]

export const genders = [
  { label: "Male", value: "MALE" },
  { label: "Female", value: "FEMALE" },
];


export const instructorClasses=[

  {
    id:1,
    className:"Advanced Data Structures & Algorithm Analysis",
    enrolledStudents:100,
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },
  {
    id:2,
    className:"Computer Networks",
    enrolledStudents:90,
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",
  },
  {
    id:3,
    className:"Calculus II",
    enrolledStudents:20,
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },
  {
    id:4,
    className:"Advanced Data Structures & Algorithm Analysis",
    enrolledStudents:80,
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },
  {
    id:5,
    className:"Computer Networks",
    enrolledStudents:70,
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",
  },
  {
    id:6,
    className:"Calculus II",
    enrolledStudents:42,
    classSection:"6B",
    timeSLot:"4:30 PM to 5:45 PM",
    date:"15/09/2021",

  },

]


export const attendanceData = [
  { id: '1', status: 'Present', className: 'ABCD', dateTime: 'Thu 4:30 PM, Mar 23, 2024' },
  { id: '2', status: 'Absent', className: 'XYZ', dateTime: 'Fri 10:00 AM, Mar 24, 2024' },
  // Add more data as needed
];



export const attendanceListData = [
  {
      name: 'John Doe',
      netId: 'XYZ',
      status: 'Present',
      dateTime: 'Dec 28, 2024, 8:25 PM',
      location: 'Harvard, New York',
  },
  {
      name: 'Jane Smith',
      netId: 'ABC',
      status: 'Absent',
      dateTime: 'Jan 10, 2025, 10:30 AM',
      location: 'Stanford, California',
  },
];

export const dummyExcuseData = [
  {
    "_id": "669e3c8bc37c5c9fd452b6e2",
    "name": "FYP",
    "semester": 1,
    "schedule": {
        "day": "Monday",
        "startTime": "17:03",
        "endTime": "18:03",
        "_id": "669e3d97bc7054a17312a6e2"
    },
    "createdBy":{
      "_id":'121312321',
      "firstName":"Malik",
      "lastName":"Saad"
    },
    "geoTracking": "disable",
    "excusedAbsenceAllowance": 2,
    "enrolledStudents": [
        "669e3c4a7b6d2e298db17884",
        "669e3c1f6304f2fb428bfa5d",
        "669e3c37343c808d5dfe0526"
    ],
    "__v": 0
},
]


export const particularDatesdummyExcuseData = [
  {
    "_id": "669e3c8bc37c5c9fd452b6e2",
    "name": "Advanced Data Structures & Algorithm Analysis",
    "semester": 1,
    "schedule": {
        "day": "Friday",
        "startTime": "17:03",
        "endTime": "18:03",
        "_id": "669e3d97bc7054a17312a6e2"
    },
    "createdBy":{
      "_id":'121312',
      "firstName":"Abdul",
      "lastName":"Basit"
    },
    "geoTracking": "disable",
    "excusedAbsenceAllowance": 2,
    "enrolledStudents": [
        "669e3c4a7b6d2e298db17884",
        "669e3c1f6304f2fb428bfa5d",
        "669e3c37343c808d5dfe0526"
    ],
    "__v": 0
},
{
  "_id": "669e3c8bc37c5c9fd452b6e3",
  "name": "FYP",
  "semester": 1,
  "schedule": {
      "day": "Wednesday",
      "startTime": "17:03",
      "endTime": "18:03",
      "_id": "669e3d97bc7054a17312a6e2"
  },
  "createdBy":{
      "_id":'121312321',
      "firstName":"Danish",
      "lastName":"Fayyaz"
    },
  "geoTracking": "disable",
  "excusedAbsenceAllowance": 2,
  "enrolledStudents": [
      "669e3c4a7b6d2e298db17884",
      "669e3c1f6304f2fb428bfa5d",
      "669e3c37343c808d5dfe0526"
  ],
  "__v": 0
},
{
  "_id": "669e3c8bc37c5c9fd452b6e4",
  "name": "FYP final year",
  "semester": 1,
  "schedule": {
      "day": "Tuesday",
      "startTime": "17:03",
      "endTime": "18:03",
      "_id": "669e3d97bc7054a17312a6e2"
  },
  "createdBy":{
      "_id":'121312321',
      "firstName":"John",
      "lastName":"Doe"
    },
  "geoTracking": "disable",
  "excusedAbsenceAllowance": 2,
  "enrolledStudents": [
      "669e3c4a7b6d2e298db17884",
      "669e3c1f6304f2fb428bfa5d",
      "669e3c37343c808d5dfe0526"
  ],
  "__v": 0
},
]


export const notifications = [
  { id: '1', title: 'Excused Absence', message: 'Your Excused Absence request has been approved' },
  { id: '2', title: 'Excused Absence', message: 'Your Excused Absence request has been approved' },
  { id: '3', title: 'Excused Absence', message: 'Your Excused Absence request has been approved' },
  { id: '4', title: 'Excused Absence', message: 'Your Excused Absence request has been approved' },
  { id: '5', title: 'Excused Absence', message: 'Your Excused Absence request has been approved' },
  { id: '6', title: 'Excused Absence', message: 'Your Excused Absence request has been approved' },
];


export const attemptsData = [
  { label: '1 Time', value: '1 Time' },
  { label: '2 Times', value: '2 Times' },
  { label: '3 Times', value: '3 Times' },
  { label: '4 Times', value: '4 Times' },
  { label: '5 Times', value: '5 Times' },
  { label: '6 Times', value: '6 Times' },
  { label: '7 Times', value: '7 Times' },
  { label: '8 Times', value: '8 Times' },
  { label: '9 Times', value: '9 Times' },
  { label: '10 Times', value: '10 Times' },
];


export const expiryData = [
  { label: '1 Minute', value: '1 Minute' },
  { label: '2 Minutes', value: '2 Minutes' },
  { label: '3 Minutes', value: '3 Minutes' },
  { label: '4 Minutes', value: '4 Minutes' },
  { label: '5 Minutes', value: '5 Minutes' },
];


export const CACHE_CLEAR_INTERVAL = 86400000;


