const express = require('express');
const app = express();
const authRoutes = require('./routes/authRoutes');
const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');
const path = require('path');
const indexRoutes = require('./routes/index');
const isAuthenticated = require('./middlewares/isAuthenticated');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const Film = require('./models/Movie');
require('./models/associations');

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: process.env.SESSION_SECRET || 'my-secret',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 heure
}));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/users', isAuthenticated, userRoutes);
app.use('/movies', isAuthenticated, movieRoutes);

app.use('/main', isAuthenticated, async (req, res) => {
    try {
        const movies = await Film.findAll();
        res.render('main', { user: JSON.stringify(req.user), movies: movies });
    } catch (error) {
        console.error(error);
        res.status(500).send('Une erreur est survenue lors de la récupération des films');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});