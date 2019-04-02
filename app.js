const express = require('express');
const bodyParser = require('body-parser');
const heroesArr = require(__dirname + '/heroes-array');

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.render('home');
})

app.get('/home', (req, res) => {
    res.render('home');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/heroes', (req, res) => {
    res.render('heroes', {heroes: heroesArr});
})

app.get('/hero/:name', (req, res) => {
    let name = req.params.name;
    heroesArr.forEach( hero => {
        if (hero.nombre === name ) {
            let i = hero.index;
            console.log(hero)
            res.render('hero', {hero: heroesArr[i]});
        } 
    });
})

app.post('/search', (req, res) => {
    let heroName = req.body.hero;
    // capitalize first letter of name
    heroName = heroName.charAt(0).toUpperCase() + heroName.slice(1);
    console.log(heroName);
    res.redirect(`hero/${heroName}`);
})

app.listen(3000, () => {
    console.log('Server running at port 3000');
})