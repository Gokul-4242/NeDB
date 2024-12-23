const express = require('express');
const bodyParser = require('body-parser');
const Datastore = require('nedb');
const app = express();
const db = new Datastore({ filename: 'database.db', autoload: true });
app.use(bodyParser.json());
const PORT = 3000;
app.post('/items', (req, res) => {
    const newItem = req.body;
    db.insert(newItem, (err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Failed to add item' });
        } else {
            res.status(201).json(doc);
        }
    });
});
app.get('/items', (req, res) => {
    db.find({}, (err, docs) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch items' });
        } else {
            res.status(200).json(docs);
        }
    });
});
app.get('/items/:id', (req, res) => {
    const { id } = req.params;
    db.findOne({ _id: id }, (err, doc) => {
        if (err) {
            res.status(500).json({ error: 'Failed to fetch item' });
        } else if (!doc) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.status(200).json(doc);
        }
    });
});
app.put('/items/:id', (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    db.update({ _id: id }, { $set: updates }, {}, (err, numReplaced) => {
        if (err) {
            res.status(500).json({ error: 'Failed to update item' });
        } else if (numReplaced === 0) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.status(200).json({ message: 'Item updated successfully' });
        }
    });
});
app.delete('/items/:id', (req, res) => {
    const { id } = req.params;

    db.remove({ _id: id }, {}, (err, numRemoved) => {
        if (err) {
            res.status(500).json({ error: 'Failed to delete item' });
        } else if (numRemoved === 0) {
            res.status(404).json({ error: 'Item not found' });
        } else {
            res.status(200).json({ message: 'Item deleted successfully' });
        }
    });
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
