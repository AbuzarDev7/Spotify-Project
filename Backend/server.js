require('dotenv').config();
const connectDb = require('./src/db/db.js');
const app = require('./src/app');

const port = process.env.PORT || 3000;

connectDb()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is running at: http://localhost:${port}`);
        });

    })
    .catch((err) => {
        console.log("MONGO db connection failed !!! ", err);
    });
