import { Router } from "express";
import { prisma } from "../db.js";
const routes = Router();
routes.get("/products", async (req, res) => {
  const products = await prisma.product.findMany();
  res.json(products);
});
routes.get("/products/:id", async (req, res) => {
  const productsId = await prisma.product.findFirst({
    where: {
      id: parseInt(req.params.id),
    },
    include: {
        category: true
    }
  });
 return  res.json(productsId);
});
routes.post("/products", async (req, res) => {
  const newProducto = await prisma.product.create({
    data: req.body,
  });
  res.json(newProducto);
});
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
routes.delete("/products/:id", async (req, res) => {
    const productsId = await prisma.product.deleteMany({
      where: {
        id: parseInt(req.params.id),
      },
    });
   return  res.json(productsId);
  });
export default routes;
