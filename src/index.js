import express from 'express'
import fs from 'fs'
const PORT = 4000

const app = express();

app.get('/products', (req, res) =>{
    const products = fs.readFile('products.json', 'utf-8', (err, products)=>{
        if(err)throw err;
        console.log(products)
        res.send(products)
    })
})

app.get('/products/:Pid', (req, res, id) =>{
    const prod = fs.readFile('products.json', 'utf-8', (err, products)=>{
        if(err)throw err;
        const prod = JSON.parse(products);
        const filtrado = prod.filter((producto) => producto.Id === parseInt(req.params.Pid))
        res.send(filtrado)
    })
     
})
app.get('/products/limit/:lim', (req, res) =>{
    const prod = fs.readFile('products.json', 'utf-8', (err, products)=>{
        if(err)throw err;
        const fill = parseInt(req.params.lim)
        const filtrado = JSON.parse(products);
        const fillter = filtrado.splice(0, fill)
        res.send(fillter)
    })
     
})

app.listen(PORT,() =>{
    console.log(`server on port ${PORT}`)
})