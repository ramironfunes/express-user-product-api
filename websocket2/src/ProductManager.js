import fs from "fs/promises";

export class ProductManager {

constructor(filepath) {

this.path = "Products.json";

}

// Método para agregar un producto

addProduct(product) {

let products = this.getProducts();

if (!Array.isArray(products)) {

// Si no es un array (puede ocurrir si el archivo está vacío o no contiene un JSON válido),

// inicializamos products como un array vacío.

products = [];

}

const lastId = products.length > 0 ? products[products.length - 1].id : 0;

product.id = lastId + 1;

products.push(product);

this.saveProducts(products);

return product;

}

// Método para obtener todos los productos

async getProducts() {

try {

const data = await fs.readFile(this.path, "utf8");

const parsedData = JSON.parse(data);

return Array.isArray(parsedData) ? parsedData : [];

} catch (error) {

console.error("Error al leer el archivo:", error);

return [];

}

}

// Método para buscar un ID de producto

// getProductById(id) {

// const products = this.getProducts();

// const product = products.findIndex((product) => product.id == id);

// return product || null;

// }

async getProductById(id) {

  try {
  
  const products = await this.getProducts();
  
  const product = products.find((product) => product.id == id);
  
  return product || null;
  
  } catch (error) {
  
  console.error("Error al obtener el producto por ID:", error);
  
  return null;
  
  }
  
  }

// Método para actualizar un producto

updateProduct(productId, updatedProduct) {

  const products = this.getProducts();
  
  const index = products.findIndex(product => product.id === productId);
  
  if (index !== -1) {
  
  products[index] = updatedProduct;
  
  this.saveProducts(products);
  
  return true;
  
  }
  
  return false;
  
  }

// Método para eliminar un producto por su id

async deleteProductById(id) {

  const products = await this.getProducts();
  
  const index = products.findIndex((product) => product.id == id);
  
  if (index !== -1) {
  
  products.splice(index, 1);
  
  this.saveProducts(products);
  
  }
  
  }

// Método para guardar productos en el archivo

saveProducts(products) {

fs.writeFile(this.path, JSON.stringify(products, null, 2));

}

}

export default ProductManager;

//Agregar 10 productos

// for (let i = 1; i <= 10; i++) {

// productManager.addProduct({

// title: `Producto ${i}`,

// description: `Descripción ${i}`,

// price: 10.99 * i,

// thumbnail: `imagen${i}.jpg`,

// code: `P${i}`,

// stock: 50 + i,

// });

// }

//Agregar un producto

// const newProduct = productManager.addProduct({

// title: ‘Producto 11’,

// description: ‘Descripción 11’,

// price: 10.99,

// thumbnail: ‘imagen11.jpg’,

// code: ‘P11’,

// stock: 500,

// });

// console.log(‘Producto agregado:’, newProduct);

//Obtener un producto por ID

//Eliminar un producto

// productManager.deleteProduct(productIdToFind);

// console.log(‘Producto eliminado.’);

//Obtener todos los productos

const instanciaDeClase = new ProductManager("Products.json");

// async function mostrarProductos() {

// try {

// const productos = await instanciaDeClase.getProducts();

// console.log(‘Productos:’, productos);

// } catch (error) {

// console.error(‘Error al obtener los productos:’, error);

// }

// }

// mostrarProductos();

async function ejemplo() {

const instanciaDeClase = new ProductManager("Products.json");

const productId = 5; // Cambia esto al ID del producto que estás buscando

const productoEncontrado = await instanciaDeClase.getProductById(productId);

if (productoEncontrado) {

console.log("Producto encontrado:", productoEncontrado);

} else {

console.log("Producto no encontrado.");

}

}

ejemplo();