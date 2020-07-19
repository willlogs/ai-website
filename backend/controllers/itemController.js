const Item = require('../models/itemModel');
const User = require('../models/userModel');
const bcrypt = require('bcrypt');

module.exports.findItemByID = (req, res, next) => {
    let data = req.body;
    id = data.id;

    Item
    .findById(id)
    .then(item => {
        res.send(item);
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports.getAllItems = (req, res, next) => {
    let data = req.body;

    Item
    .find()
    .then(items => {
        res.send(items);
    })
    .catch(
        err => {
            console.log(err);
        }
    )
};

module.exports.addToCart = (req, res, next) => {
    let data = req.body;
    id = data.id;
    username = data.username;

    console.log("adding to cart");

    Item
    .findById(id)
    .then(item => {
        User.findOne({username: username})
        .then(user => {
            if(user){
                items = user.cart.items;

                items.forEach(element => {
                    if(element.id == item._id)
                        return;
                });

                items.push({id: item._id});
                cart = {
                    items: items
                };
                User.findOneAndUpdate({username: username}, {cart: cart}, () => {
                    console.log("updated");
                });
                res.send(user.cart);
            }
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
        console.log(err);
    });
};

module.exports.getCart = (req, res, next) => {
    let data = req.body;
    username = data.username;

    User
    .findOne({username: username})
    .then(user => {
        if(user){
            res.send(user.cart);
        }
    })
    .catch(err => console.log(err));
};