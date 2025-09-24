import express from 'express';
import fs from 'fs';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import path from 'path'; // Importa el módulo path

const productsRouter = express.Router();

function generateUniqueId(products) {
  let id;
  do {
    id = Math.floor(Math.random() * 1000000).toString();
  } while (products.some((p) => p.id === id));
  return id;
}

function isValidProduct(product) {
  return (
    product.title &&
    product.description &&
    product.code &&
    product.price &&
    product.stock &&
    product.category
  );
}

// Obtener todos los productos
productsRouter.get('/', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '../data/productos.json'); // Ruta absoluta
    try {
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const limit = req.query.limit;
    if (limit) {
      res.json(products.slice(0, limit));
    } else {
      res.json(products);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Obtener un producto por ID
productsRouter.get('/:pid', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '../data/productos.json'); // Ruta absoluta
    try {
    const productId = req.params.pid;
    const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    const product = products.find((p) => p.id == productId);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
});

// Agregar un nuevo producto
productsRouter.post('/new', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '../data/productos.json'); // Ruta absoluta
    try {
      const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      const newProduct = {
        id: generateUniqueId(products),
        ...req.body,
      };
  
      if (!isValidProduct(newProduct)) {
        return res.status(400).json({ error: 'Campos obligatorios faltantes' });
      }
  
      products.push(newProduct);
      fs.writeFileSync(filePath, JSON.stringify(products, null, 2));
      res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error al agregar el producto' });
    }
  });

// Eliminar un producto por ID
productsRouter.delete('/:pid', (req, res) => {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);
    const filePath = path.join(__dirname, '../data/productos.json'); // Ruta absoluta
    try {
        const productId = req.params.pid;
        const products = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Encuentra el índice del producto a eliminar
        const productIndex = products.findIndex((p) => p.id == productId);

        if (productIndex !== -1) {
            // Elimina el producto del arreglo
            products.splice(productIndex, 1);

            // Guarda el arreglo actualizado en el archivo JSON
            fs.writeFileSync(filePath, JSON.stringify(products, null, 2));

            res.json({ message: 'Producto eliminado exitosamente' });
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});


export default productsRouter;
