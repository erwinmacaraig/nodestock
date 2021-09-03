const express = require('express');
const app = express();
const path = require('path');
const exphbs = require('express-handlebars');

const PORT = process.env.PORT || 5000;

// Set handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Set handlebars routes
app.get('/', (req, res) => {
    res.render('home', {
        stuff: 'This is stuff'
    });
});

//create about page route
app.get('/about.html', (req, res) => {
    res.render('about', {});
});

// set a static folder and point our app
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => { console.log(`SERVER LISTENING ON PORT ${PORT}`)});