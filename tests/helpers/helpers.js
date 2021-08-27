const {app} = require('../../server')
const supertest = require('supertest')

const api = supertest(app)

const camps = [
  {
		"name": "Humanitarian Diplomacy",
		"edition": "2021",
		"location": "Palestine",
		"description": "Camp focussed on Humanitarian Diplomacy. How the diplomacy could help in humanitarian disasters and avoid the effect of that on local peole",
		"tag": ["urban"],
		"activities": ["recycling workshop", "reading", "museum"],
		"address": "Bethlehem Arab Society, P. O. Box 100, Bethlehem",
		"phone": "111-111-1111",
		"email": "camps@campmanager.com",
		"from": "2021-09-01",
		"to": "2021-09-22",
		"capacity": 30,
		"inPeople": 0,
    "available": true,
		"helpers": [],
		"confirmedHelpers":[
			"5d7a514b5d2c12c7449be040",
			"5d7a514b5d2c12c7449be050"
		],
		"guests": [],
		"confirmedGuests":[
      "5d7a514b5d2c12c7449be060"
    ]
	},
	{
		"name": "Villa Magistral Del Aventino",
		"edition": "2022",
		"location": "Italy",
		"description": "Anual act for volunteers recruitment. Includes conferences, seminars and visit to Vaticano museum.",
		"tag": ["urban"],
		"activities": ["museum", "conference", "seminar"],
		"address": "Via S. Domenico, 31, 00015 Monterotondo Scalo RM, Italy",
		"phone": "111-111-1111",
		"email": "camps@campmanager.com",
		"from": "2022-01-01",
		"to": "2022-01-22",
		"capacity": 30,
		"inPeople": 0,
    "available": true,
		"helpers": [],
		"confirmedHelpers":[
			"5d7a514b5d2c12c7449be040",
			"5d7a514b5d2c12c7449be050"
		],
		"guests": [],
		"confirmedGuests":[
      "5d7a514b5d2c12c7449be060"
    ]
	},
]

const users = [
  {
    "_id": "5d7a514b5d2c12c7449be040",
    "name": "Rhaegar",
    "firstFamilyName": "Targaryen",
    "secondFamilyName": "",
    "nationality": "Valyrian",
    "gender": "male",
    "documentId": "DNI",
    "idNumber": "A1234567",
    "bornDate": "1980-12-09",
    "tutor": "",
    "address": "kings Landing at the red keep",
    "phone": "111-111-1111",
    "medicalKnowledge": true,
    "about": "im the rightfull heir to the iron trhone",
    "allergies": "Milk of the poppy",
    "curriculum": "",
    "photo": "",
    "username": "morningSword",
    "email": "rhaegar@gmail.com",
    "role": "helper",
    "coments": "",
    "password": "123456",
    "campsRequested": [],
    "campsRejected": [],
    "campsConfirmed": []
  },
  {
    "_id": "5d7a514b5d2c12c7449be050",
    "name": "Theon",
    "firstFamilyName": "Greyjoy",
    "secondFamilyName": "",
    "nationality": "Islander",
    "gender": "male",
    "documentId": "NIE",
    "idNumber": "X12345678A",
    "bornDate": "1887-07-01",
    "tutor": "",
    "address": "Castel of Iron Islands",
    "phone": "222-222-2222",
    "medicalKnowledge": true,
    "about": "im the prince of the iron islands",
    "allergies": "Valiryan fire",
    "curriculum": "",
    "photo": "",
    "username": "Reek",
    "email": "theon@gmail.com",
    "role": "helper",
    "coments": "",
    "password": "123456",
    "campsRequested": [],
    "campsRejected": [],
    "campsConfirmed": []
  },
]

const getCampsContent = async () => {
  const response = await api.get('/api/v1/camps')
  return {
    content: body.map(camp => camp.content),
    response,
  }
}

module.exports = {
  camps,
  users, 
  api,
  getCampsContent
}