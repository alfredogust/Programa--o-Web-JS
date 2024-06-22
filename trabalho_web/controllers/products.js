module.exports = {
  listProducts: (Product) => {
    return async (req, res) => {
      try {
        const products = await Product.findAll();
        res.render('products', { products: products, error: null }); // Passa 'products' e 'error'
      } catch (err) {
        console.error(err);
        res.render('products', { products: [], error: 'Erro ao carregar produtos.' }); // Passa um array vazio para 'products' e define 'error'
      }
    };
  },
  addProduct: (req, res) => {
    res.render('add-product', { error: null }); // Define 'error' como null
  },
  createProduct: (Product) => {
    return async (req, res) => {
      const { name, description, price } = req.body;
      try {
        await Product.create({
          name,
          description,
          price: parseFloat(price),
        });
        res.redirect('/products');
      } catch (err) {
        console.error(err);
        res.render('add-product', { error: 'Erro ao criar produto.' });
      }
    };
  },
  editProduct: (Product) => {
    return async (req, res) => {
      try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
          res.render('edit-product', { product, error: null }); // Passa 'product' e 'error'
        } else {
          res.redirect('/products');
        }
      } catch (err) {
        console.error(err);
        res.redirect('/products');
      }
    };
  },
  updateProduct: (Product) => {
    return async (req, res) => {
      const { name, description, price } = req.body;
      try {
        const product = await Product.findByPk(req.params.id);
        if (product) {
          product.name = name;
          product.description = description;
          product.price = parseFloat(price);
          await product.save();
          res.redirect('/products');
        } else {
          res.redirect('/products');
        }
      } catch (err) {
        console.error(err);
        res.redirect('/products');
      }
    };
  },
  deleteProduct: (Product) => {
    return async (req, res) => {
      try {
        await Product.destroy({ where: { id: req.params.id } });
        res.redirect('/products');
      } catch (err) {
        console.error(err);
        res.redirect('/products');
      }
    };
  },
};