import * as productModel from "../models/products.model.js";

export const getProducts = async (req, res) => {
  try {
    const categoryId = req.query.categoryId;

    const filteredProducts = await productModel.findAll(categoryId);

    res.json(filteredProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener productos" });
  }
};

export const getProductById = async (req, res) => {
  try {
    const productId = req.params.id;

    const product = await productModel.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Producto no encontrado" });
    }
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener el producto" });
  }
};

export const createProduct = async (req, res) => {
  const { nombre, precio, categoryId } = req.body ?? {};

  if (!nombre || !precio || !categoryId) {
    return res.status(422).json({ error: "Faltan datos del producto" });
  }

  const newProduct = await productModel.create({ nombre, precio, categoryId });

  res.status(201).json(newProduct);
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const removedProduct = await productModel.remove(id);

  if (!removedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  res.json(removedProduct);
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { nombre, precio, categoryId } = req.body;

  if (!nombre || !precio || !categoryId) {
    return res.status(422).json({ error: "Faltan datos del producto" });
  }

  const updatedProduct = await productModel.update(id, {
    nombre,
    precio,
    categoryId,
  });
  if (!updatedProduct) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.json(updatedProduct);
};
