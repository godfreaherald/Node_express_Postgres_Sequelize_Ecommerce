let models = require('../models');

exports.add_product_to_cart = function(req,res){
    //const order = req.body.orders;
    const item = req.body;
    const order_total = req.body.total;
    console.log(`item.productId" ${item.productId}`)
    console.log(`CustomerID" ${req.params.customerId}`)
     
    //for (item in order) {
     return models.Customers.findOne({
             where : {  id : req.params.customerId }
      }).then( customer => {
         if(!customer){return res.status(404).send('Customer not found') }
      
         models.Products.findOne({
             where : { id : item.productId }
      }).then( product => {
         if(!product){
             return res.status(404).send('Product not found')
         }
       
        return models.orders.create( {
            CustomerId : req.params.customerId,
            product_id : item.productId,
            product_price : item.product_price,
            product_qty :item.product_qty,
            product_total :item.product_total,
            cart_total :item.order_total,
 
         })
         .then ( order => res.status(201).send(order))
         .catch(error => {
             console.log(error);
             res.status(400).send(error)});
     }).catch(error => {
         console.log(error);
         res.status(400).send(error)});
 
 }).catch(error => {
     console.log(error);
     res.status(400).send(error) });
   // }
 }
 
 
 exports.get_customer_orders =function(req,res){
 
            return models.orders.findAll({
              where: {CustomerId: req.params.customerId}
            }).then( orders => {
                if(!orders){
                  return  res.status(404).send("No orders for the given customer")
                }
                return res.status(200).send(orders);
            }).catch(error => res.status(400).send(error))
 
 }

 exports.get_all_orders =function(req,res){
 
    return models.orders.findAll({
     // where: {CustomerId: req.params.customerId}
    }).then( orders => {
        if(!orders){
          return  res.status(404).send("No orders for the yet")
        }
        return res.status(200).send(orders);
    }).catch(error => res.status(400).send(error))

}

exports.customer_cancel_order =function(req,res){
 
    return models.orders.update(
        { isCancelled :true  },
       {  where: { id: req.params.id } }
    ).then( orders => {
        if(!orders){
          return  res.status(404).send("No orders for the given customer")
        }
        return res.status(200).send(orders);
    }).catch(error => res.status(400).send(error))

}