const express = require('express');
const cors = require('cors');
require('./db/config');
const User = require('./db/User');
const Product = require('./db/Product');
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
});



app.post('/add-product', async (req, resp) => {

    let product = new Product(req.body);

    let result = await product.save();

    resp.send(result)

})


// get all product 
app.get('/products', async (req, resp) => {

    const data = await Product.find();

    resp.send(data)
})


// DELETE PRODUCT   
app.delete('/delete-product/:_id', async (req, resp) => {

    let productId = await req?.params;

    const result = await Product.deleteOne(productId);

    resp.send(result)

});


// GET PRODUCT DETAILS API
app.get('/product-details/:_id', async (req, resp) => {

    const productId = await req.params;
     const productDetails = await Product.findOne(productId);

    if(productDetails){
        resp.send(productDetails)
    }else{
        resp.send({result : "No Record Found!"})
    }
})


// EDIT PROUDCT API
app.put('/update-product/:_id', async (req, resp) => {

    const proudctId = await req.params;

    const result = await Product.updateOne(
        proudctId,
        {
            $set: req.body
        }
    );

    resp.send(result)
})



// SEARCH API
app.get('/search/:text', async(req, resp)=>{
    
    const result = await Product.find(
        {
            "$or" : [
                {name : {$regex : req?.params?.text }},
                {category : {$regex : req?.params?.text} },
                {company : {$regex : req?.params?.text}}
            ]
        }
    ) 


    resp.send(result)

})





app.listen(5000);