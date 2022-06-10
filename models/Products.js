const { model, Schema } = require("mongoose");
const mongoose = require("mongoose"); /* ESTO ES PARA CERRAR LA CONEXION CON EL SERVER Y MEJORAR EL RENDIMIENTO Y USO DE LA MEMORIA DEL SERVER */
const newSchema = new Schema({
  modelo: String,
  descripcion: String,
  stock: Number,
  precio: Number,
  pic: String,
  peso: Number,
  aro: Number,
  patronEncordado: String,
  grip: String,
  balance: Number,
  largo: Number,
});

const Prod = model("product", newSchema);

/* ESTO ES PARA GUARDAR UN PRODUCTO EN MONGO */
/* const product = new Prod({
  modelo: "Wilson Blade 104 V8.0",
  descripcion:
    "La Blade 104 v8 también podría considerarse la raqueta del renacimiento: presenta una mezcla verdaderamente envidiosa de sensación, potencia, perdón, flexibilidad, estabilidad y un diseño impresionante. Con un acabado elástico dinámico que cambia de color que se transforma entre tonos de verde y cobre.",
  stock: 40,
  precio: 50500,
  id: 9,
  pic: "https://wilsonstore.com.ar/media/catalog/product/cache/70463b1ff005ad550922e9aee1aaa0df/w/r/wr079111u_1_blade_104_v8_iridescent-1200x1200_2.jpeg",
  peso: 290,
  aro: 104,
  patronEncordado: "18/20",
  grip: "4 3/4",
  balance: 290,
  largo: 690,
});

product
  .save()
  .then((res) => {
    console.log(res); 
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error(err);
    mongoose.connection.close();
  }); */

  
newSchema.set("toJSON", {
  transform: (docunent, resProducto) => {
    resProducto.id = resProducto._id;
    delete resProducto._id;
    delete resProducto.__v;
  },
});
module.exports = Prod;
