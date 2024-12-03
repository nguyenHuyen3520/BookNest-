// server.js
const express = require('express');
const bodyParser = require('body-parser');
const postRoutes = require('./routes/postRoutes');
const userRoutes = require('./routes/userRoutes');
const { sequelize } = require('./models');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', postRoutes);
app.use('/api', userRoutes);

sequelize.sync()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch(err => console.log('Error syncing database:', err));
