const express=require('express')
const cors=require('cors')
const stripe=require('stripe')('sk_test_51MWzILSJqCDJ3ZovRlrEDkPtuzrVA20Bs5Cfh05bM1RDAjLLkQeIDV5JnOFdSWpp6yHGpVa8YdQ1Kw786nZoLZ7u00YnWF5hhJ')

const app=express()
app.use(express.json())
app.use(cors())
// http://localhost:1000
app.get('/',(req,res)=>{
    res.send("hello from express server")
})

// http://localhost:1000/payment
app.post('/payment',async(req,res)=>{
   let{email,amount,shippingAddress,description}=req.body
    const paymentIntent=await stripe.paymentIntents.create({
        amount:amount,
        currency:"usd",
        automatic_payment_methods:{enabled:true},
        shipping:{
            address:{
                line1:shippingAddress.line1,line2:shippingAddress.line2,
                city:shippingAddress.city,state:shippingAddress.state,country:shippingAddress.country,postal_code:shippingAddress.postal_code
            },
            name:shippingAddress.name,
            phone:shippingAddress.phone
        },
        description:description
    })
    res.send({clientSecret:paymentIntent.client_secret})
})

let PORT=1000
app.listen(PORT,()=>{console.log(`server started at http://localhost:${PORT}`)})