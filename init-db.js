'use strict';

require('dotenv').config();

const { mongoose, connectDB, User, Camp } = require('./models');

main().catch(err => console.error(err));

async function main() {
  // init collection users y camps
  await initUser();
  await initCamps();

  mongoose.connection.close();
}

async function initUser() {
  const { deletedCount } = await User.deleteMany();
  console.log(`Deleted ${deletedCount} users`);

  const resultUser = await User.insertMany([
    {
      _id: '5d7a514b5d2c12c7449be040',
      name: 'Rhaegar',
      lastName: 'Targaryen',
      nationality: 'Valyrian',
      gender: 'male',
      documentId: 'DNI',
      idNumber: 'A1234567',
      bornDate: '1980-12-09',
      tutor: '',
      address: 'kings Landyng at the red keep',
      phone: '111-111-1111',
      medicalKnowledge: true,
      about: 'im the rightfull heir to the iron trhone',
      allergies: 'Milk of the poppy',
      curriculum: 'url://',
      photo: 'url://',
      username: 'morningSword',
      email: 'reagear@gmail.com',
      role: 'helper',
      password: '123456',
    },
    {
      _id: '5d7a514b5d2c12c7449be050',
      name: 'Theon',
      lastName: 'Greyjoy',
      nationality: 'Islander',
      gender: 'male',
      documentId: 'NIE',
      idNumber: 'X12345678A',
      bornDate: '1887-07-01',
      tutor: '',
      address: 'Castel of Iron Islands',
      phone: '222-222-2222',
      medicalKnowledge: true,
      about: 'im the prince of the iron islands',
      allergies: 'Valiryan fire',
      curriculum: 'url://',
      photo: 'url://',
      username: 'Reek',
      email: 'theon@gmail.com',
      role: 'helper',
      password: '123456',
    },
    {
      _id: '5d7a514b5d2c12c7449be060',
      name: 'Brandon',
      lastName: 'Stark',
      nationality: 'Northen',
      gender: 'male',
      documentId: 'PASS',
      idNumber: 'ABC123456',
      bornDate: '1992-07-01',
      tutor: 'Ned Stark',
      address: 'Castel of Winterfell',
      phone: '333-333-3333',
      medicalKnowledge: false,
      about: 'im the three eye raven',
      allergies: 'phobia of heights',
      curriculum: 'url://',
      photo: 'url://',
      username: 'brandonRaven',
      email: 'brandon@gmail.com',
      role: 'guest',
      password: '123456',
    },
  ]);
  console.log(
    `Insert ${resultUser.length} user${resultUser.length > 1 ? 's' : ''}.`,
  );
}

async function initCamps() {
  const { deletedCount } = await Camp.deleteMany();
  console.log(`Deleted ${deletedCount} Camps.`);

  const resultCamps = await Camp.insertMany([
    {
      _id: '5d7a514b5d2c12c7449be030',
      name: 'Orden de Malta Verano',
      edition: '2021',
      location: 'Libano',
      description: 'campamento para mujeres',
      tag: ['montaña'],
      activities: ['taller de reciclaje', 'lectura'],
      address: 'Vanilian Bldg, 6th fl.City Rama Str. Dekwaneh',
      phone: '111-111-1111',
      email: 'camps@campmanager.com',
      from: '2021-08-01',
      to: '2021-08-22',
      capacity: 30,
      inPeople: 0,
      available: true,
      helpers: ['Theon Greyjoy'],
      guests: ['Brandon Stark'],
    },
    {
      _id: '5d7a514b5d2c12c7449be031',
      name: 'Diplomacia Humanitaria',
      edition: '2021',
      location: 'Palestina',
      description: 'campamento para hombres',
      tag: ['urbano'],
      activities: ['taller de reciclaje', 'museo'],
      address: 'El Hospital de la Sagrada Familia de Belén',
      phone: '111-111-1111',
      email: 'camps@campmanager.com',
      from: '2021-09-01',
      to: '2021-09-22',
      capacity: 30,
      inPeople: 0,
      available: true,
      helpers: ['Theon Greyjoy'],
      guests: ['Brandon Stark'],
    },
    {
      _id: '5d7a514b5d2c12c7449be032',
      name: 'Aniversario asistencia social',
      edition: '2021',
      location: 'Italy',
      description: 'voluntarios primera vez',
      tags: ['playa'],
      activities: ['piscina', 'taller de artesanias'],
      address: 'Via Passo Buole, 75/F, 00054 Fiumicino RM',
      phone: '111-111-1111',
      email: 'camps@campmanager.com',
      from: '2021-08-01',
      to: '2021-08-22',
      capacity: 30,
      inPeople: 0,
      available: true,
      helpers: ['Theon Greyjoy'],
      guests: ['Brandon Stark'],
    },
  ]);
  console.log(
    `Insert ${resultCamps.length} anuncio${resultCamps.length > 1 ? 's' : ''}.`,
  );
}
