import express from 'express';
import { Product } from '../entities/Product';
import { AppDataSource } from '../data-source';

const router = express.Router();

// Route to get all products
router.get('/products', async (req, res) => {
  try {
    const products = await AppDataSource.manager.find(Product);
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
//purchase product
router.post('/purchaseProduct/:id', async (req, res) => {
  const productId = parseInt(req.params.id);
  const purchaseQuantity = parseInt(req.body.quantity);

  if (isNaN(productId) || isNaN(purchaseQuantity) || purchaseQuantity <= 0) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  try {
    const product = await AppDataSource.manager.findOne(Product, {
      where: { id: productId },
    });

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    if (product.stock < purchaseQuantity) {
      return res.status(400).json({ error: 'Insufficient stock available' });
    }

    if (product.stock <= 0) {
      return res.status(400).json({ error: 'Product is out of stock' });
    }

    product.stock -= purchaseQuantity;
    await AppDataSource.manager.save(product);

    res.status(201).json({ message: 'Product updated successfully', product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
