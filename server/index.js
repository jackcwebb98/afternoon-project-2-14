require('dotenv').config()

const express = require('express');
const bodyParser = require('body-parser');
const massive = require('massive')
const ctrl = require('./productController')

const app = express();
app.use(bodyParser.json())

const {CONNECTION_STRING} = process.env


massive(CONNECTION_STRING).then((dbInstance) => {
    app.set('db', dbInstance)
    console.log('we are connected')
}).catch(()=>{
    console.log('error')
})

app.get(`/api/products`, ctrl.getAll)

app.get(`/api/products/:id`, ctrl.getOne)

app.put(`/api/products/:id`, ctrl.updateProduct)

app.post(`/api/products`, ctrl.createProduct)

app.delete(`/api/products/:id`, ctrl.deleteProduct)






const PORT = 3000

app.listen(PORT, () => console.log(`we good on ${PORT}`))