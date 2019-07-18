let models = require('../models');

exports.create_customer =  function(req, res, next) {
    
     models.Customers.create({
      customer_name:req.body.customer_name,
      cust_phone: req.body.cust_phone,
      customer_address:req.body.customer_address,
      cust_email:req.body.cust_email,
      
    }).then ( customer=> {
      if(customer) {
      res.status(201).json({
        success: true,
        message: 'customer successfully created',
        customer
      }).catch(error => res.status(400).send(error));
      }
      else{
        res.status(500).json({"Message": "Error creating new Customer"})
      }
    }).catch(error => res.status(400).send(error));
}
exports.show_customers = function(req,res,next){
   models.Customers.findAll()
  .then( data => {
    if(data){
     
    res.status(200)
            .json({ data });
    }
    else {
      res.status(400)
            .json({ "Message" : "No data found" });
    }
  }).catch(error => res.status(400).send(error));
  
}

exports.show_customer =function(req,res,next){
  models.Customers.findOne({
     where:{
         id:req.params.id
     }

 }) .then ( customer => {
   if(customer){
     res.status(200).json(customer);
   }
   else{
     res.status(400).json({"Message" : "No data found"})
   }
 }).catch(error => res.status(400).send(error));
}


exports.edit_customer = function(req,res,next){
  return models.Customers.update({
    customer_name:req.body.customer_name,
      cust_phone: req.body.cust_phone,
      customer_address:req.body.customer_address,
      cust_email:req.body.cust_email,

  },
  {
      where:{
          id:req.params.id
      }
  }).then( updatedUser => {
    res.status(200).json({
      message: 'Customer updated successfully',
      data: req.body || updatedUser
    })
  }).catch(error => res.status(400).json(error));
}

exports.delete_customer = function(req,res,next){
    return models.Customers.findOne({
            where : {
                     id : req.params.id
                     }
    }).then( customer => {
        if(!customer){
            return res.status(404).send('Product not found')
        }
        return customer.destroy()
        .then ( () => res.status(204).send('deleted'))
        .catch(error => res.status(400).send(error))
    })
}

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
           customer_id : req.params.customerId,
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
             where: {customer_id: req.params.customerId}
           })

}