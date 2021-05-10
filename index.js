require('dotenv').config({path: __dirname + '/.env'});
const app = require('./config/server.config');
const db = require("./models");
const PORT = process.env.PORT || '5000';
db.sequelize.authenticate().then(() => {
    console.log('Database connected...');
}).catch(err => {
    console.log('Error: ' + err);
})
db.sequelize.sync().then(() => {
    app.listen(PORT,()=>{
        console.log(`Server started on port ${PORT}`);
    })
}).catch(err => console.log("Error: " + err));
