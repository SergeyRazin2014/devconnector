const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');

//@route     GET api/users
//@desc      Register user
//@access    Public
router.post('/',
    [
        check('name', 'Name is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
    ], async (req, res) => {

        const errors = validationResult(req);  //получаем ошибки валидации

        //если есть ошибки валидации, то шлем их пользователю
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name, email, password } = req.body;

        try {
            //See if user exists
            let user = await User.findOne({ email })

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] })
            }

            //Get users gravatar
            const avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            user = new User({
                name,
                email,
                avatar,
                password
            });

            //Encrypt password
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);

            await user.save();


            //Return jsonwebtoken
            const payload = {
                user: {
                    id: user.id
                }
            }
            
            jwt.sign(payload,
                config.get('jwtSecret'),
                { expiresIn: 360000 }, //самое нормальное время токена:3600 - это в родакшене, но когда мы разрабатываем можно поставить и побольше чтоб не мучится
                (err, token) => {
                    if (err) {
                        throw err;
                    }
                    res.json({ token })
                }
            );



            

            //res.send('User registered')

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server error');
        }






    });

module.exports = router;