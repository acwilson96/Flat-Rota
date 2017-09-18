/***************************************\
              Server Setup
\***************************************/

var app         = require('express')();
var bodyParser  = require('body-parser');
var mongoose    = require('mongoose');

var server      = require('http').Server(app);
var io          = require('socket.io')(server);

app.use(bodyParser.json());
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/flatrota', {useMongoClient: true});

/* Import Models */
const User      = require('./models/user.js');
const Resource  = require('./models/resource.js');


/***************************************\
                  API
\***************************************/

// RECEIVES: authToken of a User.
// RETURNS:  True/False if that authToken is still valid.
app.post('/token', (req, res) => {
    var authToken = req.body.authToken;
    User.findOne({
        authToken: authToken
    }).exec((err, user) => {
        if (err) console.log(err);
        else if (user) {
            res.send({ valid: true });
        }
        else {
            res.send({ valid: false });
        }
    })
});

// RECEIVES: Username and Password of a specific User.
// RETURNS:  Error/Warning message, authToken of User account.
app.post('/login', (req, res) => {
    uname = req.body.username;
    pword = req.body.password;
    // Find the requested User.
    User.findOne({
        username: uname
    }).exec((err, user) => {
        if (err) console.log(err);
        else if (!user) {
            res.send({
                err: false,
                warning: true,
                msg: 'Invalid Username or Password'
            });
        }
        else {
            // Check submitted password.
            User.checkPassword(pword, user.password, (err, match) => {
                if (err) console.log(err);
                else if (match) {
                    res.send({
                        err: false,
                        warning: false,
                        authToken: user.authToken
                    });
                } else {
                    res.send({
                        err: false,
                        warning: true,
                        msg: 'Invalid Username or Password'
                    });
                }
            });
        }
    });
});

// RECEIVES: Username and Password to create a User under.
// RETURNS:  Error/Warning message, authToken of created account.
app.post('/register', (req, res) => {
    uname = req.body.username;
    pword = req.body.password;
    if (uname == undefined || pword == undefined) {
        res.send({
            err: false,
            warning: true,
            msg: 'Invalid username or password'
        });
    }
    // Check User does not exist.
    User.findOne({
        username: uname
    }).exec((err, user) => {
        if (err) console.log(err);
        else if (user) {
            res.send({
                err: false,
                warning: true,
                msg: 'User already exists with that Username'
            });
        }
        else {
            // Get hash of Users password.
            User.hashPassword(pword, (err, hash) => {
                if (err) console.log(err);
                else {
                    // Generate them an auth authToken.
                    User.generateToken((err, authToken) => {
                        if (err) console.log(err);
                        else {
                            // Create the new User.
                            var user = new User({
                                username: uname,
                                password: hash,
                                authToken: authToken
                            });
                            // Save the new user.
                            user.save((err) => {
                                if (err) console.log(err);
                                else {
                                    res.send({
                                        err: false,
                                        warning: false,
                                        msg: 'Succesfully created account.',
                                        authToken: authToken
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

app.post('/resource/all', (req, res) => {
    Resource.find().exec((err, resources) => {
        res.send(resources);
    })
});

// RECEIVES: Name, Price,Description, Quantity params.
// RETURNS: New Resource item in JSON.
app.post('/resource/new', (req, res) => {
    name        = req.body.name;
    price       = req.body.price;
    desc        = req.body.desc;
    quantity    = req.body.quantity;
    var newResource = new Resource({
        name: name,
        price: price,
        description: desc,
        quantity: quantity
    });
    newResource.save((err) => {
        if (err) console.log(err);
        else {
            res.send({done: true})
        }
    });

})

/***************************************\
           Socket/Notif Handler
\***************************************/

io.on('connection', (socket) => {
    console.log('A client just joined on', socket.id);
    socket.on('subscribe_notifs', (data) => {
        console.log(data);
    });
});


//*************************************\\
app.listen(1337, () => { console.log('Server Started on Port 1337...'); })