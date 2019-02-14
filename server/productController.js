module.exports = {
    createProduct: (req, res) => {
        const dbInstance = req.app.get('db')
        const {name, description, price, imageurl} = req.body
        dbInstance.create_product(name, description, price, imageurl).then((response) =>{
            res.status(200).send(response)
        })
    },

    getOne: (req, res) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        dbInstance.read_product(id).then((response) => {
            if (response[0]){
                res.status(200).send(response[0])
            } else {
                res.status(400)
            }
        })
    },

    getAll: (req, res) => {
        const dbInstance = req.app.get('db')
        dbInstance.read_products().then((response) => {
            res.status(200).send(response)
        })
    },

    updateProduct: (req, res) => {
        const dbInstance = req.app.get('db')
        const {description} = req.body
        const {id} = req.params
        dbInstance.update_product([id, description]).then((response) => {
            res.sendStatus(200).send(response)
        })
    },

    deleteProduct: (req, res) => {
        const dbInstance = req.app.get('db')
        const {id} = req.params
        dbInstance.delete_product(id).then((response) => {
            console.log('fired')
            res.sendStatus(200)
        }).catch((err) => {
            res.sendStatus(404)
            console.log('11111 error')
        })
    }
}