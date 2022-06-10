require("./mongodb")
const express = require("express");
const middelware = require("./components/middleware");
const mongoose = require("mongoose");
const cors = require("cors");   /* ESTO HACE QUE NUESTRA API PUEDA COMPARTIR SUS RECURSOS CON OTROS DOMINIO  */

const Prod= require("./models/Products")

/* CORS = CROSS ORIGIN RESOURCE SHARING */
const app = express()
/* CORS */
app.use(cors())
/* MIDDLEWARES */
app.use(express.json());

app.use(middelware)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`listening on port: ${PORT}`)
}) 

let productos = []

app.get("/", (req, res) => {
  /* FIJARSE EL CONTENT TYPE EN GOOGLE */
  res.send("<h1>Hola desde Match Point</h1>")
})
app.get("/productos", (req, res) => {
  /* FIJARSE EL CONTENT TYPE EN GOOGLE */
  Prod.find({}).then(
    producto => {
      res.json(producto)/* cambie el res.json a res.send */
      console.log(producto)
    })
})

app.get("/productos/:id", (req, res) => {
  const id = String(req.params.id)
  /* NORMAL SIN MONGOOSE */
  /* 
  const producto = productos.find((producto) => producto.id == id)  ESTO HACE QUE SI LA ID QUE SE ESCRIBIO EN LA URL EXISTE EN EL ARRAY DE PRODUCTOS MUESTRE EL CORRECTO 
  if (producto) {
    res.json(producto)*/
  /*} else {   Y EN CASO DE QUE NO CATCHEA ESE ERROR Y RESUELVE CON UN STATUS 404 
    res.status(404).json({
      error:"Este producto no existe"
    })
  }*/ 


  /* CON MONGOOSE */
  Prod.find({_id:`${id}`}).then( 
    producto => {
      res.json(producto)/* 
      mongoose.connection.close(); */
    })
    /* ESTO HACE QUE SI LA ID QUE SE ESCRIBIO EN LA URL EXISTE EN EL ARRAY DE PRODUCTOS MUESTRE EL CORRECTO */ 
})
app.delete("/productos/:id", (req, res) => {
  const id = Number(req.params.id)
  productos = productos.filter((producto) => producto.id !== id)
  res.status(204).end()
  console.log("Producto deleted")
})

app.post("/productos", (req, res) => {
  /* PUSH SIN MONGOOSE */
  const producto = req.body

  const ids = productos.map((producto) => producto.id)
  const maxId = Math.max(...ids)

  const newProducto = {
    id: maxId + 1,
    modelo: producto.modelo,
    descripcion: producto.descripcion,
    stock: producto.stock,
    precio: producto.precio,
    pic: producto.pic,
    peso: producto.peso,
    aro: producto.aro,
    patronEncordado: producto.patronEncordado,
    balance: producto.balance,
    grip: producto.grip,
    largo: producto.largo,
  }

  productos = productos.concat(newProducto)
  res.json(newProducto)
});
/* ESTO SI O SI DEBE IR AL FINAL DE LAS RUTAS YA QUE SE USARIA PARA EL ERROR 404 Y COMO EL 1ER APP.USE RECORRE LOS DEMAS APP. DE ARRIBA HACIA ABAJO   */
app.use((requ,res)=>{
  res.status(404).json( {
    error:404
  })
})

/* ANTIGUO ARRAY DE PRODUCTOS */

/* {

    modelo: "Babolat Pure Aero Rafa",
    descripcion:
      "Combatividad, resistencia, fortaleza mental... ¡eres como Rafa! Es hora de desafiar a tus oponentes más duros con esta Pure Aero, que con su nombre y colores acompañará tu dominio del juego a través de tu liftado y tu potencia.",
    stock: 75,
    precio: 59000,
    id: 1,
    pic: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/338/510/products/raqueta-babolat-pure-aero-rafa-2-bff1f4ef7c1210fb3b16334515103466-240-0.png",
    peso: 300,
    aro: 100 ,
    patronEncordado: "16/19",
    grip: "4 3/4 4 1/4",
    balance: 320,
    largo: 685 ,
  },
  {
    modelo: "Babolat Pure Drive ",
    descripcion:
      "Babolat lanzó la Pure Drive en 1994 y rápidamente se estableció como una de las raquetas más populares y versátiles del mundo.",
    stock: 30,
    precio: 52000,
    id: 2,
    pic: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/338/510/products/pure-drive-encordada-21-358f17888d656be79c16341391022033-240-0.png",
    peso: 300,
    aro: 100 ,
    patronEncordado: "16/19",
    grip: "4 3/4 4 1/4",
    balance: 320 ,
    largo: 685,
  },
  {
    modelo: "Babolat Pure Strike 100 ",
    descripcion:
      " Con la 3ª generación de la Pure Strike, Babolat da un paso hacia adelante en el control del juego moderno. ¿Sueñas con esa sensación clásica? El riguroso control de la Pure Strike ha sido diseñado para satisfacer tus exigencias como jugador agresivo que le pega duro a la bola. ",
    stock: 40,
    precio: 51000,
    id: 3,
    pic: "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/338/510/products/babolat-pure_strike_100-11-7434b6518bd529d73016357184390406-480-0.png",
    peso: 295 ,
    aro: 100 ,
    patronEncordado: "16/19",
    grip: "4 3/4 4 1/4",
    balance: 320 ,
    largo: 685 ,
  },
  {
    modelo: "HEAD Speed PRO ",
    descripcion:
      "Diseñada para la velocidad y para un swing rápido, ahora, la SPEED PRO promete un tacto sensacional aún mayor gracias a la  nueva estructura en material Auxetic. Esta raqueta, forma parte de la serie SPEED,diseñada para jugadores de torneos de nivel avanzado que buscan un control óptimo en sus juegos rápidos. ",
    stock: 40,
    precio: 54000,
    id: 4,
    pic: "https://cdn-mdb.head.com/CDN3/G/233602/1/400x400/speed-pro-2022.jpg",
    peso: 310 ,
    aro: 100,
    patronEncordado: "18/20",
    grip: "4 1/4",
    balance: 315,
    largo: 685,
  },
  {
    modelo: "HEAD Prestige PRO",
    descripcion:
      "La raqueta de tenis PRESTIGE PRO da un giro innovador a todo un clásico de HEAD, incorporando a partir de ahora el tacto sensacional gracias a la nueva estructura Auxetic para ayudar a los jugadores de nivel avanzado a ser más precisos y tener más control. ",
    stock: 40,
    precio: 51500,
    id: 5,
    pic: "https://cdn-mdb.head.com/CDN3/G/236101/1/400x400/prestige-pro-2021.jpg",
    peso: 320,
    aro: 98 ,
    patronEncordado: "18/20",
    grip: "4 3/4",
    balance:310,
    largo: 685,
  },
  {
    modelo: "HEAD Radical PRO",
    descripcion:
      "Con un nuevo diseño dinámico y atrevido que refleja su estilo moderno, la RADICAL PRO pone en ten manos la combinación perfecta de potencia, control y efecto para el jugador de nivel avanzado y versátil que se enfrenta a todas las superficies. ",
    stock: 40,
    precio: 53000,
    id: 6,
    pic: "https://cdn-mdb.head.com/CDN3/G/234101/1/400x400/radical-pro.jpg",
    peso:315,
    aro: 98 ,
    patronEncordado: "16/19",
    grip: "4 3/4",
    balance:315,
    largo: 685 ,
  },
  {
    modelo: "Wilson CLASH 98 V2",
    descripcion:
      "Equipada con el cabezal más pequeño de la línea Clash v2 para una precisión de primera, la Clash 98 v2 combina un diseño puntero con un rendimiento supremo para los jugadores más avanzados. Una construcción de carbono patentada, se une a una composición revisada en la punta del aro para crear una excelente flexibilidad.",
    stock: 40,
    precio: 58000,
    id: 7,
    pic: "https://wilsonstore.com.ar/media/catalog/product/cache/70463b1ff005ad550922e9aee1aaa0df/w/r/wr074510u_1_clash_108_v2_rd_bl-1200x1200_2_1.jpeg",
    peso: 310 ,
    aro: 98 ,
    patronEncordado: "16/19",
    grip: "4 3/4",
    balance:310 ,
    largo: 685,
  },
  {
    modelo: "Wilson Pro Staff 97ULS",
    descripcion:
      "Altamente maniobrable y súper fácil de balancear para las estrellas del mañana, la raqueta Pro Staff 97ULS presenta la tecnología Spin Effect para spin de precisión.",
    stock: 40,
    precio: 57000,
    id: 8,
    pic: "https://wilsonstore.com.ar/media/catalog/product/cache/70463b1ff005ad550922e9aee1aaa0df/w/r/wrt73181u_5.jpg",
    peso: 270,
    aro: 97,
    patronEncordado: "18/16",
    grip: "4 3/4",
    balance:325,
    largo: 685,
  },
  {
    modelo: "Wilson Blade 104 V8.0",
    descripcion:
      "La Blade 104 v8 también podría considerarse la raqueta del renacimiento: presenta una mezcla verdaderamente envidiosa de sensación, potencia, perdón, flexibilidad, estabilidad y un diseño impresionante. Con un acabado elástico dinámico que cambia de color que se transforma entre tonos de verde y cobre.",
    stock: 40,
    precio: 50500,
    id: 9,
    pic: "https://wilsonstore.com.ar/media/catalog/product/cache/70463b1ff005ad550922e9aee1aaa0df/w/r/wr079111u_1_blade_104_v8_iridescent-1200x1200_2.jpeg",
    peso: 290 ,
    aro: 104 ,
    patronEncordado: "18/20",
    grip: "4 3/4",
    balance: 290,
    largo: 690,
  }, */