require('./models/mongodb');

/**
 * @author ${Manoj Reddy}
 *
 * This is the main script file which call the project and executes 
 */
//Import the required packages
const express = require('express');
var app = express();
const path = require('path');
const exphb = require('express-handlebars');
const bodyparser = require('body-parser');

const dogController = require('./controllers/dogController');

app.use(bodyparser.urlencoded({
    extended: true
}));

//Creates a welcome message and redirect to the main page
app.get('/', (req, res) => {
    res.send('<div style="padding:10px 0;color:#ffffffd9 !important;font-family:Roboto, Malgun Gothic,sans-serif;margin:12% auto;width:40%;height:400px;background:#171746d1;text-align:center;border-radius:4px;"><h2 style="color:#fff; text-align:center; margin-bottom:100px">Paris dog database</h2>Click Here to <b> <a style="color:#ffffffd9 !important" href="/dog">Enter</a> </b></div>')
});
app.use(bodyparser.json());

//Configures Express middleware for the handlebars
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphb({ extname: 'hbs', defaultLayout: 'mainLayout', layoutDir: __dirname + 'views/layouts/' }));
app.set('view engine', 'hbs');

//Establish server connection
//PORT ENVIRONMENT VARIABLE PROVIDED
const port = process.env.PORT || 3001;
app.listen(port, () => console.log(`Listening on port ${port}..`));

//Set the Controller path which will responding the user actions
app.use('/dog', dogController);