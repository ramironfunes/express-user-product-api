import express from 'express';
import fs from 'fs';
import path from 'path'; // Importa el módulo path
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const cartsRouter = express.Router();

function generateUniqueId(carts) {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000).toString();
  } while (carts.some((c) => c.id === id));
  return id;
}

// Crear un nuevo carrito
cartsRouter.post('/', (req, res) => {
    const filePath = path.join(__dirname, '../data/carrito.json'); // Ruta absoluta
    try {
    const carts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const newCart = {
      id: generateUniqueId(carts),
      products: [],
    };

    carts.push(newCart);
    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
    res.status(201).json(newCart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el carrito' });
  }
});

// Listar productos en un carrito por ID del carrito (cid)
cartsRouter.get('/:cid', (req, res) => {
    const filePath = path.join(__dirname, '../data/carrito.json'); // Reemplaza con la ruta correcta
  try {
    const cartId = req.params.cid;
    const carts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const cart = carts.find((c) => c.id == cartId);
    if (cart) {
      res.json(cart.products);
    } else {
      res.status(404).json({ error: 'Carrito no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el carrito' });
  }
});

// Agregar un producto a un carrito por ID del carrito (cid) y ID del producto (pid)
cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const filePath = path.join(__dirname, '../data/carrito.json'); // Reemplaza con la ruta correcta
  try {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const carts = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const cart = carts.find((c) => c.id == cartId);
    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const product = cart.products.find((p) => p.product === productId);
    if (product) {
      product.quantity++;
    } else {
      cart.products.push({ product: productId, quantity: 1 });
    }

    fs.writeFileSync(filePath, JSON.stringify(carts, null, 2));
    res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al agregar el producto al carrito' });
  }
});

export default cartsRouter;
