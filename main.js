const fs = require("fs");

class Product {
  constructor(nombre, precio, descripcion, stock, thumbnail, code) {
    this.nombre = nombre;
    this.precio = precio;
    this.descripcion = descripcion;
    this.stock = stock;
    this.thumbnail = thumbnail;
    this.code = code;
    this.Id = ProductManager.productList.length + 1;
  }
}

class ProductManager {
  static productList = [];

  static addProduct = (
    nombre,
    precio,
    descripcion,
    stock,
    thumbnail,
    code,
    Id
  ) => {
    const isCodeUsed = ProductManager.productList.some(
      (product) => product.code === code
    );
    if (isCodeUsed) {
      console.log("ese code ya esta en uso");
      return;
    }

    const nuevoProducto = new Product(
      nombre,
      precio,
      descripcion,
      stock,
      thumbnail,
      code,
      Id
    );
    ProductManager.productList.push(nuevoProducto);

    fs.writeFile("./products.json", JSON.stringify(ProductManager.productList), (err) => {
        if (err) {
          throw err;
        }
      }
    );
  };

  static getProducts = () => {
    fs.readFile("./products.json", "utf-8", (err, data) => {
      if (err) throw err;
      console.log(data);
    });
  };

  static getProductById = (id) => {
    fs.readFile("./products.json", "utf-8", (err, data) => {
      if (err) throw err;
      const hola = JSON.parse(data).filter((producto) => producto.Id === id);
      hola.length > 0
        ? console.log(hola)
        : console.log("producto no encontrado");
    });
  };
}

ProductManager.addProduct("dddd","ddasdad","aaaaa","ssss","s","adssad");