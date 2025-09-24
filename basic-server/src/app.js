import express from 'express';
import productsRouter from './routes/products.js';
import cartsRouter from './routes/carts.js';

const app = express();
const PORT = 8080;

// Middleware para analizar el cuerpo de las solicitudes como datos codificados en formularios
app.use(express.urlencoded({ extended: true }));

// Middleware para analizar el cuerpo de las solicitudes como datos JSON
app.use(express.json());

// Configurar Express para servir archivos estáticos desde la carpeta "public"
app.use(express.static('./src/public'));

// Conectar los routers a las rutas principales
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
  console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});