const express = require('express');
const mongoose = require('mongoose');
const cors=require("cors")


const router = require('./Router/index');

const port = process.env.PORT||4567;

const serverDB = process.env.MONGODB_URI || 'mongodb+srv://Avinash:Avinash8805@zomato.dnnea.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();
app.use(cors());
app.use(express.json());  // parse json object 
app.use('/', router);

if(process.env.NODE_ENV ==='production'){
         app.use(express.static('client/build'));
    }
mongoose.connect(serverDB,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(res => {
        app.listen(port, () => {
            console.log(`Server is running at ${port}`);
        });
    })
    .catch(err => console.log(err));

// export let paytmMerchantkey = process.env.PAYTM_MERCHANT_KEY;
// export let paytmParams = {};
// paytmParams['MID'] = process.env.PAYTM_MID,
// paytmParams['WEBSITE'] = process.env.PAYTM_WEBSITE,
// paytmParams['CHANNEL_ID'] = process.env.PAYTM_CHANNEL_ID,
// paytmParams['INDUSTRY_TYPE_ID'] = process.env.PAYTM_INDUSTRY_TYPE_ID,
// paytmParams['ORDER_ID'] = uuid(),
// paytmParams['CUST_ID'] = process.env.PAYTM_CUST_ID,
// paytmParams['TXN_AMOUNT'] = '100',
// paytmParams['CALLBACK_URL'] = 'http://localhost:8000/callback'
// paytmParams['EMAIL'] = 'avijadhav416@gmail.com'
// paytmParams['MOBILE_NO'] = '1234567852'

