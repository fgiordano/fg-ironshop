const express = require('express');
const Product = require('../models/product');

const router  = express.Router();


router.get('/', (req, res, next) => {
  Product.find({}, (err, products) => {
    if (err) { return next(err) }

    res.render('products/index', {
      products: products
    });
  });
});

router.get('/new', (req, res, next) => {
  res.render('products/new');
});

/* other routes */

router.post('/', (req, res, next) => {
  const productInfo = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };

  const newProduct = new Product(productInfo);

  newProduct.save( (err) => {
    if (err) { return next(err) }
    // redirect to the list of products if it saves
    return res.redirect('/products');
  });
});

// router.get('/product-details', (req, res, next) => {
//   const productId = req.query.id;
//
//   Product.findById(productId, (err, product) => {
//     if (err) { return next(err); }
//     res.render('products/show', { product: product });
//   });
// });

router.get('/:id', (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId, (err, product) => {
    if (err) { return next(err); }
    res.render('products/show', { product: product });
  });
});

router.get('/:id/edit', (req, res, next) => {
  const productId = req.params.id;

  Product.findById(productId, (err, product) => {
    if (err) { return next(err); }
    res.render('products/edit', { product: product });
  });
});

router.post('/:id', (req, res, next) => {
  const productId = req.params.id;

  /*
   * Create a new object with all of the information from the request body.
   * This correlates directly with the schema of Product
   */
  const updates = {
      name: req.body.name,
      price: req.body.price,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };

  Product.findByIdAndUpdate(productId, updates, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/products');
  });
});

router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Product.findByIdAndRemove(id, (err, product) => {
    if (err){ return next(err); }
    return res.redirect('/products');
  });

});



module.exports = router;
