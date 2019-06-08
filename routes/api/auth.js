const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');

const auth = require('../../middleware/auth');
const User = require('../../models/User');

//@route     GET api/auth
//@desc      получить авторизованного юзера
//@access    Public
router.get('/', auth, async (req, res) => {

    try {
        const user = await User.findById(req.user.id).select('-password'); //получили пользователя без пароля
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

//@route     GET api/auth
//@desc      Аутентификация юзера и получение токена для этого юзера (юзер вводит логин пароль чтобы войти) (тут нам нужны только email и пароль)
//@access    Public
router.post('/',
    [
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password is required').exists()
    ], async (req, res) => {

        const errors = validationResult(req);  //получаем ошибки валидации

        //если есть ошибки валидации, то шлем их пользователю
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { email, password } = req.body;

        try {
            let user = await User.findOne({ email })

            if (!user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }


            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'Invalid Credentials' }] });
            }

            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }

            jwt.sign(
                payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 }, //самое нормальное время токена:3600 - это в родакшене, но когда мы разрабатываем можно поставить и побольше чтоб не мучится
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token })
                }
            );
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }
    });

module.exports = router;