import express from 'express';
import { Review } from '../entities/Review';
import { Customer } from '../entities/Customer';
import { Product } from '../entities/Product';
import { AppDataSource } from '../data-source';

const router = express.Router();

// Create a new review
router.post('/addReview', async (req, res) => {
  try {
    const { productId, customerId, text, rating } = req.body;

    if (rating < 0 || rating > 5) {
      return res
        .status(400)
        .json({ error: 'Invalid rating. Rating must be between 0 and 5.' });
    }

    const [product, customer] = await Promise.all([
      AppDataSource.manager.findOne(Product, { where: { id: productId } }),
      AppDataSource.manager.findOne(Customer, { where: { id: customerId } }),
    ]);

    if (!product || !customer) {
      return res.status(404).json({ error: 'Product or customer not found' });
    }

    // Create a new Review entity
    const review = new Review();
    review.rating = rating;
    review.text = text;
    review.customer = customer;
    review.product = product;

    await AppDataSource.manager.save(review);

    res.status(201).json({ message: 'Review added successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
