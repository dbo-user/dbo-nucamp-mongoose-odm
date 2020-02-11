const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {

    console.log('LOOK, YOU ARE CONNECTED correctly to the server');

    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log('** SAVED',campsite);
        return Campsite.find();
    })
    .then(campsites => {
        console.log('** DOCUMENT',campsites);
        return Campsite.deleteMany();
    })
    .then(() => {
        return mongoose.connection.close();
    })
    .catch(err => {
        console.log('YOU HAVE AN ERROR',err);
        mongoose.connection.close();
    });
});
