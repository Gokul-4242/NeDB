const Datastore = require('nedb')
const db = new Datastore
console.log("Database Initialized")
db.insert({ name: 'Gokul', age: 22, city: 'Nagercoil' }, (err, newDoc) => {
    if (err) console.error(err);
    else console.log('Inserted:', newDoc);
});
db.find({ age: { $gte: 18 } }, (err, docs) => {
    if (err) {
        console.error('Error querying documents:', err);
    } else {
        console.log('Documents found:', docs);
    }
});
