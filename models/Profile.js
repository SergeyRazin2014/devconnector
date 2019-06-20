const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId, //ГОВОРИМ, ЧТО ЭТО БУДЕТ ВНЕШНИЙ КЛЮЧ НА ID МОДЕЛИ User
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    location: {
        type: String
    },
    status: {
        type: String,
        required: true //ОБЯЗАТЕЛЬНЫЙ
    },
    skills: {
        type: [String], //МАССИВ СТРОК
        required: true,
    },
    bio: {
        type: String
    },
    githubusername: {
        type: String
    },
    experience: [ //ЭТО МАССИВ ТАКИХ-ТО ОБЪЕКТОВ
        {
            title: {
                type: String,
                required: true,
            },
            company: {
                type: String,
                required: true
            },
            location: {
                type: String
            },
            from: {
                type: Date, //ТИП ДАТА
                required: true
            },
            to: {
                type: Date
            },
            current: {
                type: Boolean, //ТИП БУЛЕВ
                default: false //ДЕФОЛТНОЕ ЗНАЧЕНИЕ
            },
            description: {
                type: String
            }
        }
    ],
    education: [ //ЕЩЕ ОДИН МАССИВ С ОБЪЕКТАМИ (ОБРАЗОВАНИЕ)
        {
            school: {
                type: String,
                required: true
            },
            degree: {
                type: String,
                require: true
            },
            fieldofstudy: {
                type: String,
                required: true
            },
            from: {
                type: Date,
                required: true
            },
            to: {
                type: Date,
                required: false
            },
            current: {
                type: Boolean,
                default: false
            },
            description: {
                type: String
            }
        }
    ],
    social: { //ЕЩЕ ОДНА СУЩЬНОСТЬ, НО УЖЕ НЕ МАССИВ
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        },
        date: {
            type: Date,
            default: Date.now
        }
    }
});

module.exports = Profile = mongoose.model('profile',ProfileSchema)