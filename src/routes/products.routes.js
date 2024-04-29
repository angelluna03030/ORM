import { Router } from "express";
import { prisma } from "../db.js";
const routes = Router();
//metodo GET
routes.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});

//metodo GET por id 
routes.get("/products/:id", async (req, res) => {
  const productsId = await prisma.product.findFirst({
    where: {
        //esto me mostrara la categoria de el producto. 
      id: parseInt(req.params.id),
    },
    include: {
        category: true
    }
  });
 return  res.json(productsId);
});
//metodo POST
routes.post("/products", async (req, res) => {
  const newProducto = await prisma.product.create({
    data: req.body,
  });
  res.json(newProducto);
});
//metodo PUT 
routes.put("/products/:id", async (req, res) => {
  let body = req.body;
  const products = await prisma.product.update({
    data: body,
    where : {
        id: parseInt(req.params.id),
    },
   
  });

  return res.json(products);
});

//metod DELETE 
routes.delete("/products/:id", async (req, res) => {
    const productsId = await prisma.product.deleteMany({
      where: {
        id: parseInt(req.params.id),
      },
    });
   return  res.json(productsId);
  });
export default routes;
