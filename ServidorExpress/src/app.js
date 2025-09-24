// Importamos las bibliotecas
const express = require('express');
const ProductManager = require('./ProductManager'); 
const console = require('console'); // Importa el módulo console


// Crea una instancia de Express
const app = express();
const port = 8080; 

// Endpoint para obtener todos los productos
app.get('/products', async (req, res) => {
  try {
    const limit = req.query.limit; // Obtiene el valor del parámetro de consulta "limit"

    const products = await ProductManager.getProducts();

    if (limit) {
      const limitedProducts = products.slice(0, limit); // Limita el número de productos si se proporciona un valor para "limit"
      res.json(limitedProducts);
    } else {
      res.json(products);
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
});

// Endpoint para obtener todos los productos
app.get('/products/:pid', async (req, res) => {
    const productId = req.params.pid;

    try {
      const product = await ProductManager.getProductById(productId);

      if (product) {
        console.log('Producto encontrado:', product); // Agrega registro de depuración
        res.json(product);
      } else {
        res.status(404).json({ error: 'Producto no encontrado' });
      }
    } catch (error) {
      console.error('Error al obtener el producto:', error); // Agrega registro de depuración
      res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor Express escuchando en el puerto ${port}`);
});



  
  