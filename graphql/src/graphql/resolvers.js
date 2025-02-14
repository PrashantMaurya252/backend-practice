const products = require('../data/product')

const resolvers = {
    Query:{
        products:()=>products,
        product:(_,{id})=> products.find(item => item.id === id)
    }
}

module.exports = resolvers