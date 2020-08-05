const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.register = (req, res, next) => {
    let data = req.body;
    if(data.username && data.username.includes('ADMIN_')){
        res.json({lashi: "true"});
    }
    else{
        bcrypt.hash(data.password, 12)
        .then(result => {  
            data.password = result;
            User.findOne({username: data.username})
                .then(u => {
                    if(!u){
                        let user = new User(data);
                        user.save()
                            .then(result => {
                                console.log('new user added');
                                res.json({ok: true, detail: 'user added', usernameOK: true});
                            })
                            .catch(err => {
                                console.log(err);
                                res.json({ok: false, detail: 'db save err', usernameOK: true});
                            });
                    }
                    else{
                        console.log('username already exists');
                        res.json({ok: false, detail: 'username exists', usernameOK: false});
                    }
                })
                .catch(err => {
                    console.log('db search err');
                    res.status(500);
                });            
        })
        .catch(err => {
            console.log('error with hashing');
        });
    }
};

module.exports.getItemsOf = (req, res, next) => {
    let data = req.body;

    User.find({username: data.username})
    .then(user => {
        res.json(user.cart);
    })
    .catch();
};

module.exports.login = (req, res, next) => {
    let username = req.body.username;
    if(username && username.includes('ADMIN_')){
        let adminUser = 
            User
            .findOne({username})
            .then(user_ => {
                if(user_){
                    bcrypt
                        .compare(req.body.password, user_.password)
                        .then(isAuth => {
                            req.session.isAdmin = true;
                            req.session.isAuth = true;
                            res.json({isAuth});
                        })
                        .catch(err => {console.log(err);});
                }
                else{
                    console.log('no such user!');
                    res.json({isAuth: false});
                }
            })
            .catch(err => {console.log("got errors logging in as admin")});
    }
    else{
        User
        .findOne({username})
        .then(user_ => {
            if(user_){
                bcrypt
                    .compare(req.body.password, user_.password)
                    .then(isAuth => {
                        req.session.isAdmin = false;
                        req.session.isAuth = isAuth;
                        res.json({isAuth: isAuth});
                        res.end("done");
                        console.log(req.session);
                    })
                    .catch(err => {console.log(err);});
            }
            else{
                console.log('no such user!');
                res.json({isAuth: false});
            }
        })
        .catch(
            err => {
                console.log(err);
                res.json({isAuth: false});
            }
        );
    }
}

module.exports.isAuth = (req, res, next) => {
    let isAuth = req.session.isAuth === true;
    let isAdmin = req.session.isAdmin === true;
    res.json({isAuth, isAdmin});
    res.end("done");
}

module.exports.logOut = (req, res, next) => {
    req.session.isAuth = false;
    res.end("done");
}