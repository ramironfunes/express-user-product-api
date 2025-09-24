import express from 'express'
import handlebars from 'express-handlebars';
import { productRouter } from './routes/product.router.js';
import { ProductManager } from './ProductManager.js'
import { cartRouter } from './routes/carts.router.js';
import __dirname from './utils.js';
import viewRouter from './routes/view.router.js';
import { Server } from 'socket.io';
import path from 'path';
import fs from 'fs';


// Definicion de variables
const app = express();
const port = 8080;
const productManagerFilePath = (__dirname + '/Products.json'); 
const pMI = new ProductManager(productManagerFilePath);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'))

// Ruta del archivo JSON que se utiliza en ProductManager
// const productManagerFilePath = path.join(__dirname, 'Products.json');



app.use('/', viewRouter);

const httpServer = app.listen(port, () => {
    console.log(`Current port ${port}`)
});

const io = new Server(httpServer);

io.on('connection', (socket) => {
    console.log("new client online");
    socket.on('message', (data) => {
        // Manejar mensajes si es necesario
    });

    // Añadir elemento
    socket.on("add_item", async (data) => {

        try {
        
        const newProduct = data;
        
        const newProductCode = newProduct.code;
        
        const array = await pMI.getProducts();
        
        console.log('Attempting to add a new product');
        
        const duplicate = array.findIndex(product => product.code === newProductCode);
        
        if (duplicate === -1) {
        
        if (data.thumbnail) {
        
        newProduct.thumbnail = data.thumbnail;
        
        }
        
        pMI.addProduct(newProduct);
        
        const updatedArray = await pMI.getProducts();
        
        const addedProduct = updatedArray[updatedArray.length - 1];
        
        console.log('New product is:');
        
        console.log(addedProduct);
        
        io.emit('confirm_add', [true, 0, addedProduct.id, addedProduct]);
        
        } else {
        
        console.log(`Error: Item ${newProduct.title} by code ${newProductCode} already in the database \nSimilar item`);
        
        console.log(array[duplicate]);
        
        io.emit('confirm_add', [false, array[duplicate], 0, 0]);
        
        }
        
        } catch (error) {
        
        console.error('Error:', error);
        
        io.emit('confirm_add', [false, null, 0, 0]);
        
        }
        
        });

    // Borrar elemento
    socket.on('delete', async (data) => {
        console.log("want to delete ", data);
        const productId = Number(data);
        console.log('Product ID to delete: ', productId);

        // Antes de la eliminación
        console.log('Products before deletion:', await pMI.getProducts());

        const array = await pMI.getProducts();
        const productIndex = array.findIndex(product => product.id === productId);

        if (productIndex === -1) {
            console.log(`Item by ID ${productId} was not found`);
            io.emit('confirm_delete', [false, productId]);
        } else {
            pMI.deleteProductById(productId);
            const updatedArray = await pMI.getProducts();

            // Después de la eliminación
            console.log('Products after deletion:', updatedArray);

            io.emit('confirm_delete', [true, productId]);
        }
    });

    
});


export default io;


