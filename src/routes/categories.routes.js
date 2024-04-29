import { Router } from "express";
import { prisma } from "../db.js";
const routes = Router();

//metodo GET
routes.get("/categories", async (req, res) => {
  const category = await prisma.category.findMany(
    {
        //esto me mostrara los productos que tengo en esta categoria 
        include: {
            products : true
        }
    }
  );
  res.json(category);
});
//metodo GET por id 
routes.get("/categories/:id", async (req, res) => {
  const categoriesId = await prisma.category.findFirst({
    where: {
      id: parseInt(req.params.id),
    }

  });
  return res.json(categoriesId);
});
//metodo POST
routes.post("/categories", async (req, res) => {
  const newCategories = await prisma.category.create({
    data: req.body,
  });
  return res.json(newCategories);
});

//metodo DELETE
routes.delete("/categories/:id", async (req, res) => {
  const categoriesId = await prisma.category.deleteMany({
    where: {
      id: parseInt(req.params.id),
    },
  });
  return res.json(categoriesId);
});
//metodo PUT
routes.put("/categories/:id", async (req, res) => {
  let body = req.body;
  const categories = await prisma.category.updateMany({
    where: {
      id: parseInt(req.params.id),
    },
    data: body,
  });

  return res.json(categories);
});

export default routes;
