const knex = require("knex")({
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",

  },
});

knex.schema.createTable("users", (table) => {
  table.increments("id");
  table.string("name");
  table.integer("price");
});

const personas = [
  { codigo: "1549", nombre: "Regla", price: 200, stock: 5 },
  { codigo: "1550", nombre: "cuaderno", price: 100, stock: 25 },
  { codigo: "1551", nombre: "lapiz", price: 20, stock: 1000 },
  { codigo: "1552", nombre: "boligrafo", price: 30, stock: 1000 },
  { codigo: "1553", nombre: "Mochila", price: 100, stock: 50 },
];
knex("users")
  .insert(personas)
  .then(() => console.log("data"))
  .catch((err) => {
    console.error(err);
  })
  .finally(() => knex.destroy());
