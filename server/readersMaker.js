const fs = require('fs');

let writeToFile = (json) => {
  let data = JSON.stringify(json, null, 2);
  fs.writeFileSync('server/readers.json', data);
}

let random = (min, max) => Math.round((Math.random()*(max-min) + min));

let readerFields = {
  gender: () => {
    let genders = ['m', 'f'];
    return genders[random(0, 1)];
  },
  birthday: () => {
    return `${random(1940, 2017)}-${random(1,12)}-${random(1,28)}`; 
  },  
  given_name: (reader) => {
    let names = {
      'f': ['Emma', 'Olivia', 'Ava', 'Isabella', 'Sophia', 'Charlotte', 'Mia', 'Amelia', 'Harper', 'Evelyn', 'Abigail', 'Emily', 'Elizabeth',  'Eva', 'Serenity', 'Autumn'],
      'm': ['Liam', 'Noah', 'William', 'James', 'Oliver', 'Benjamin', 'Elijah', 'Lucas', 'Mason', 'Logan', 'Alexander', 'Ethan', 'Jacob', 'Michael', 'Daniel', 'Henry', 'Jackson', 'Sebastian', 'Aiden']
    }
    let namesArr = names[reader.gender];
    return namesArr[random(0, namesArr.length - 1)];

  },
  surname: (reader) => {
    let surnames = ['Rogers','Morgan', 'Peterson', 'Cooper', 'Reed', 'Bailey', 'Bell', 'Kelly', 'Howard', 'Ward', 'Cox', 'Diaz', 'Richardson', 'Wood', 'Watson', 'Brooks', 'Bennett', 'Gray', 
    'James', 'Reyes', 'Cruz', 'Hughes', 'Price', 'Myers', 'Long', 'Foster', 'Sanders', 'Ross', 'Morales', 'Powell', 'Sullivan', 'Russell', 'Ortiz', 'Jenkins', 'Gutierrez', 'Perry', 'Butler', 'Barnes', 'Fisher'];
    return surnames[random(0, surnames.length - 1)];
  },
  photo: (reader) => {
    let age = 2020 - parseInt(reader.birthday.match(/^[0-9]{4}/)[0], 10);

    if (age <= 12){
      return reader.gender == 'm' ? 'boy.png' : 'girl.png'
    }
    if (age > 12 && age <= 22){
      return reader.gender == 'm' ? 'male_teenager.png' : 'female_teenager.png';
    }
    if (age > 22 && age <= 60){
      let isPhoto = !!random(0, 1);

      if (isPhoto){
        let photos = {
          'm': ['download (1).jfif', 'download (2).jfif', 'download (4).jfif', 'download (5).jfif'],
          'f': ['download (8).jfif', 'images (4).jfif', 'images.jfif', 'images (6).jfif']
        }[reader.gender];
        return photos[random(0, photos.length - 1)];
      } else {
        return reader.gender == 'm' ? 'man.png' : 'woman.png';
      }
    }
    if (age > 60){
      return reader.gender == 'm' ? 'old_man.png' : 'old_woman.png';
    }
  },
  phone: () => random(100000000, 999999999).toString(),
  passport_number: () => {
    return random(1000, 9999) + ' ' + random(100000, 999999);
  },
  email: (reader) => `${reader.given_name.toLowerCase()}_${reader.surname.toLowerCase()}@email.com`,
  notifications: () => {
    return {
      email_distribution: true,
      email_events_exhibitions: true,
      email_warning_about_returning_books: true,
      sms_warning_about_returning_books: true,
      email_appearance_in_store: true
    }
  }
}


let createReaders = () => {
  let readers_number = 10;

  let readers = new Array(readers_number).fill(0).map((z, i) => {
    let reader = {id: i};
    for (let field in readerFields){
      reader[field] = readerFields[field](reader);
    }
    return reader;
  })

  writeToFile(readers);

}

createReaders();