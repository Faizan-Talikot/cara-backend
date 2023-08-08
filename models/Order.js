const mongoose = require('mongoose')
const {Schema} = mongoose

const OrdersSchema = new Schema({
    user:{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'user'
    },
    name:{
        type : String,
        required: true
    },
    street:{
        type:String,
        required: true
    },
    city:{
        type:String,
        required: true
    },
    state:{
        type:String,
        required: true
    },
    pincode:{
        type:String,
        required: true
    },
    landmark:{
        type:String,
        required: true
    },
    address:{
        type:String,
        required: true
    },
    total :{
       type:String,
       required: true
    },
    date:{
        type:Date,
        default: Date.now
    },
    cartItems:[{
        image:String,
        name:String,
        price:String,
        quantity:String,
        productid:Number         
    }]
})

module.exports = mongoose.model('orders',OrdersSchema);