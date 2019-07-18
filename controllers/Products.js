let models = require('../../HeraldStoreAPI/models');

exports.create_product =  function(req, res, next) {
    
     models.Products.create({
      product_name:req.body.product_name,
      product_price: req.body.product_price,
      product_qty:req.body.product_qty,
      category_id:req.body.category_id,
      
    }).then ( product=> {
      if(product) {
      res.status(201).json({
        success: true,
        message: 'product successfully created',
        product
      }).catch(error => res.status(400).send(error));
      }
      else{
        res.status(500).json({"Message": "Error creating new product"})
      }
    }).catch(error => {
      console.log(error)
      res.status(400).send(error)});
}
exports.show_products = function(req,res,next){
   models.Products.findAll()
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

exports.show_product =function(req,res,next){
  models.Products.findOne({
     where:{
         id:req.params.id
     }

 }) .then ( product => {
   if(product){
     res.status(200).json(product);
   }
   else{
     res.status(400).json({"Message" : "No data found"})
   }
 }).catch(error => {
   console.log(error)
   res.status(400).send(error)});
}


exports.edit_product = function(req,res,next){
  return models.Products.update({
    product_name:req.body.product_name,
    product_price: req.body.product_price,
    product_qty:req.body.product_qty,
    category_id:req.body.category_id,

  },
  {
      where:{
          id:req.params.id
      }
  }).then( updatedUser => {
    res.status(200).json({
      message: 'Product updated successfully',
      data: req.body || updatedUser
    })
  }).catch(error => res.status(400).json(error));
}

exports.delete_product = function(req,res,next){
    return models.Products.findOne({
            where : {
                     id : req.params.id
                     }
    }).then( product => {
        if(!product){
            return res.status(404).send('Product not found')
        }
        return product.destroy()
        .then ( () => res.status(204).send('deleted'))
        .catch(error => res.status(400).send(error))
    })
}