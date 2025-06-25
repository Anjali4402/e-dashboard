const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const app = express();

app.use(cors());
app.use(express.json());

app.post('/register', async (req, resp) => {

    let user = new User(req.body);
    let result = await user.save();

    result = result.toObject();

    // it will not show the password in the result ( not show in the response) good practice.
    delete result.password

    resp.send(result);
});

app.post('/login', async (req, resp) => {

    if (req.body?.email && req.body?.password) {

        // remove password for the sending in response
        let user = await User.findOne(req.body).select("-password");

        if (user) {
            resp.send(user)
        } else {
            resp.send('No User Found')
        }
    } else {
        resp.send("No result found")
    }
})





app.listen(5000);