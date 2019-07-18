let express = require('express');
let router = express.Router();

//const indexController = require('../controllers/index');
const productsController = require('../controllers/Products');
const customerController = require('../controllers/Customers');
const ordersController = require('../controllers/Orders');

//router.post('/login',indexController.login);
//router.post('/signup',indexController.signup);
router.post('/add_product',productsController.create_product)
router.get('/products',productsController.show_products);
router.get('/product/:id',productsController.show_product);
router.put('/product/edit/:id',productsController.edit_product);
router.delete('/product/delete/:id',productsController.delete_product);

router.post('/add_customer',customerController.create_customer)
router.get('/customers',customerController.show_customers);
router.get('/customer/:id',customerController.show_customer);
router.put('/customer/edit/:id',customerController.edit_customer);
router.delete('/customer/delete/:id',customerController.delete_customer);

router.post('/neworder/:customerId',ordersController.add_product_to_cart);
router.get('/customerOrders/:customerId',ordersController.get_customer_orders);
router.put('/order_cancel/:id',ordersController.customer_cancel_order);
router.get('/allOrders/',ordersController.get_all_orders);


module.exports = router;