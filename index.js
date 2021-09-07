const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');
const request = require('request');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 5000;

// use body parser middleware 
app.use(bodyParser.urlencoded({extended: false}));

// API KEY
// pk_fc8f00039bb7435694882bda527b8c02

// create call_api function
function call_api(finishedAPI, ticker) {
    request('https://cloud.iexapis.com/stable/stock/' + ticker + '/quote?token=pk_fc8f00039bb7435694882bda527b8c02', {json: true}, (err, res, body) => {
        if (err) {
            return console.log(err);
        }    
        if (res.statusCode === 200) {
            /* console.log('Status is 200');
            console.log(body); */
            finishedAPI(body)
        }
    });
};


// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebars index GET route
app.get('/', (req, res) => {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    }, "fb");
    
});

// Set handlebars index POST route
app.post('/', (req, res) => {
    call_api(function(doneAPI){
        res.render('home', {
            stock: doneAPI
        });
    }, req.body.stock_ticker);
    
});


//create about page route
app.get('/about.html', (req, res) => {
    res.render('about', {});
});

// set a static folder and point our app
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => { console.log(`SERVER LISTENING ON PORT ${PORT}`)});