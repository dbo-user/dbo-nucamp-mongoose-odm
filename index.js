const mongoose = require('mongoose');
const Campsite = require('./models/campsite');

const url = 'mongodb://localhost:27017/nucampsite';
const connect = mongoose.connect(url, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

connect.then(() => {

    console.log('LOOK, YOU ARE CONNECTED correctly to the server');
    console.log('-----------------------------------------------');
    Campsite.create({
        name: 'React Lake Campground',
        description: 'test'
    })
    .then(campsite => {
        console.log('**Original Document',campsite);

        return Campsite.findByIdAndUpdate(campsite._id, {
            $set: { description: 'Updated Test Document' }
        }, {
            new: true
        });
    })
    .then(campsite => {
        console.log('**Updated Document', campsite);

        campsite.comments.push({
            rating: 5,
            text: 'What a magnificent view!',
            author: 'Tinus Lorvaldes'
        });

        return campsite.save();
    })
    .then(campsite => {
        console.log('**Updated by SubDocument',campsite);
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
