const nodemailer = require('nodemailer');
const { User, Movie } = require('../models/index');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendWelcomeEmail = async (email, username) => {
    if (!email || !username) {
        console.log('Missing email or username.');
        return;
    }
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to My Movie Library',
        text: `Hello ${username},\n\nThank you for registering on My Movie Library!`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error.message);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

exports.sendMovieNotification = async (subject, movie, isUpdate = false) => {
    const users = await User.findAll({ include: { model: Movie, as: 'movies', where: isUpdate ? { id: movie.id } : null } });
    const to = users.map(user => user.email).join(', ');

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        text: `Movie: ${movie.title}\nDescription: ${movie.description}\nRelease Date: ${movie.release_date}\nDirector: ${movie.director}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log('Error sending email:', error.message);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};