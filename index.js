require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const exphbs = require('express-handlebars');
var bodyParser = require('body-parser')
var methodOverride = require('method-override');

const modelo = require('./models/model')
const porta = 5000

//mongoose.connect('mongodb+srv://thiago:<password>@cluster0.hqweslt.mongodb.net/').then(() => console.log('Conectado!')).catch(() => console.log('Erro ao conectar!'));

mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(methodOverride('_method'));

// define a extensão e a instância do handlebars com o modelo que será interpretado o código
app.engine('hbs', exphbs.engine({
    extname: '.hbs', runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    },
}));

// define qual o template a ser utilizado
app.set('view engine', 'hbs');

app.use(express.json());

app.use(express.static('public'));

const routes = require('./routes/routes');

app.use('/api', routes)

app.get('/', function (req, res) {
    modelo.find().then(function (dados) {
        res.render('index', { dados: dados })
    })
})

app.listen(porta, () => {
    console.log(`Server Started at ${porta}`)
})
