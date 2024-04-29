import { Router } from "express";
import { prisma } from "../db.js";
const routes = Router();
routes.get("/categories", async (req, res) => {
  const category = await prisma.category.findMany(
    {
        include: {
            products : true
        }
    }
  );
  res.json(category);
});

routes.get("/categories/:id", async (req, res) => {
  const categoriesId = await prisma.category.findFirst({
    where: {
      id: parseInt(req.params.id),
    }

  });
  return res.json(categoriesId);
});

routes.post("/categories", async (req, res) => {
  const newCategories = await prisma.category.create({
    data: req.body,
  });
  return res.json(newCategories);
});
routes.delete("/categories/:id", async (req, res) => {
  const categoriesId = await prisma.category.deleteMany({
    where: {
      id: parseInt(req.params.id),
    },
  });
  return res.json(categoriesId);
});

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
