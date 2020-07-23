const uuid = require('uuid/v4');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');

const exampleUsers = [
    {
        id: "user1",
        name: "Sean Brown",
        email: "example@example.com",
        password: "examplepw"
    }
];

const getUsers = (req, res, next) => {
    res.json({ users: exampleUsers });
};

const signup = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        throw new HttpError('Invalid input', 422);
    }

    const { name, email, password } = req.body;

    const hasUser = exampleUsers.find(user => user.email === email);
    if(hasUser) {
        throw new HttpError('Email already in use', 422);
    }
    const createdUser = {
        id: uuid(),
        name: name,
        email: email,
        password: password
    }

    exampleUsers.push(createdUser);

    res.status(201).json({user: createdUser});
};

const login = (req, res, next) => {
    const { email, password } = req.body;

    const identifiedUser = exampleUsers.find(user => user.email === email);
    if(!identifiedUser || identifiedUser.password !== password) {
        throw new HttpError('Username or pw is wrong', 401);
    }

    res.json({ message: 'logged in' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
