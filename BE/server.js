require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const db = require('./models'); // Import toàn bộ database

const app = express();
const port = 3001;

app.use(bodyParser.json());

app.use('/v1/api', postRoutes);
app.use('/v1/api', userRoutes);

db.sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.log('Error syncing database:', err));
