const Joi = require('joi');

const listingschema = Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        location: Joi.string().required(),
        countr : Joi.string().required(),
        price: Joi.number().required(),
        image: Joi.object({
            url: Joi.string()
        })
    })


module.exports = listingschema;

const reviewschema =Joi.object({

  review: Joi.object({
    rating: Joi.number().required(),
    Comment:Joi.string().required()

   }).required()
})

module.exports=reviewschema;
