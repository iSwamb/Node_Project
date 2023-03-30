const { User } = require('../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { mailService } = require('../services/mailService');

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).render('index', { message: 'Un utilisateur avec cet e-mail existe déjà.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            email,
            password: hashedPassword,
        });

        await user.save();

        // Envoyer un mail de bienvenue
        await mailService.sendWelcomeEmail(user.email, user.username);

        // Renvoyer la vue index avec un message de succès
        res.render('index', { message: 'Inscription réussie. Vous pouvez maintenant vous connecter.' });
    } catch (error) {
        console.error(error);
        res.status(500).render('index', { message: 'Une erreur est survenue lors de l\'inscription. Veuillez réessayer.' });
    }
};

exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).render('index', { message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id, isAdmin: user.is_admin }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('jwt', token, { httpOnly: true });
    req.session.user = user;
    res.redirect('/main'); // Modifiez cette ligne
};