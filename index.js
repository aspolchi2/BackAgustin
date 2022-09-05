const fs = require("fs");
const express = require("express");

const app = express();
const PORT = 8080;


/* It's a class that allows you to create a file, save data to it, get all the data from it, get a
specific data from it, delete a specific data from it, and delete all the data from it. */
class Contenedor {
  constructor(name) {
    this.name = name;
  }

  /* *
    It takes an object, converts it to a string, and saves it to a file.
    @param obj - The object to be saved.
   */
  async save(obj) {
    try {
      await fs.promises.writeFile(
        `${this.name}.txt`,
        JSON.stringify(obj, null, 2),
        "utf-8"
      );
      console.log(`${this.name}.txt creado con exito`);
    } catch (error) {
      console.log(error);
    }
  }

  /**
   * It reads the file, parses the data, and returns the data.
   * @returns The data is being returned as a JSON object.
   */
  async getAll() {
    try {
      const data = await fs.promises.readFile("./productos.txt", "utf-8");
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
    }
  }

  async saveNew(newProduct) {
    try {
      const data = await this.getAll();
      const index = data.sort((a, b) => b.id - a.id)[0].id;
      newProduct.id = index + 1;
      data.push(newProduct);
      console.log(`nuevo producto con ID ${newProduct.id} creado con exito `);
      this.save(data);
    } catch (error) {
      console.log(error);
    }
  }

  async getByID(id) {
    try {
      const data = await this.getAll();
      const findByID = data.find((data) => data.id === id);
      console.log(findByID);
      return findByID;
    } catch (error) {
      console.log("getByID", error);
    }
  }

  async deleteByID(id) {
    try {
      const data = await this.getAll();
      const filterByID = data.filter((data) => data.id !== id);
      console.log(`elemento con ID ${id} Eliminado con exito`);
      this.save(filterByID);
    } catch (error) {
      console.log("deleteByID", error);
    }
  }
  async deleteAll() {
    try {
      fs.promises.unlink(`${this.name}.txt`);
      console.log("bien, eliminaste todo, Campeon");
    } catch (error) {
      console.log(error);
    }
  }
}

const contenedor = new Contenedor("productos");

const server = app.listen(PORT, () => {
  console.log("server iniciado");
});

app.get("/", (req, res) => {
  contenedor.getAll().then((data) => {
    res.send(
      `<div style="display:flex ">${data.map(
        (prod) =>
          `<p>${prod.title}</p> <p>Precio: ${prod.price}</p> <img src= ${prod.thumbnail}></img>`
      )} 
      <a href = "/productsRandom">Ir a random</a></div> `
    );
  });

});

/* It's a function that takes a path and a callback function. The callback function takes two
parameters, req and res. The req parameter is the request object, and the res parameter is the
response object. The response object has a method called send, which takes a string as a parameter.
The string is the HTML code that will be displayed in the browser. */
app.get("/products", (req, res) => {
  });

app.get("/productsRandom", (req, res) => {
  const random = Math.floor(Math.random() * 4 + 1);
  contenedor.getByID(random).then((data) => {
    res.send(
      `<p>${data.title}</p><p>${data.price}</p> <img src= ${data.thumbnail} </img>`
    );
  });
});
