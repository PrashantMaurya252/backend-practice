const Product = require('../models/products')

const resolvers = {
    Query:{
        products:async ()=>Product.find({}),
        product:async(_,{id})=> await Product.findById(id)
    },
    Mutation:{
        createProduct:async(_,args)=>{
            const newelyCreatedProduct = new Product(args);
            return await newelyCreatedProduct.save()
        },

        updateProduct:async(_,{id,...updatedFields})=>{
            return await Product.findByIdAndUpdate(id,updatedFields,{new:true})
        },

        deleteProduct:async(_,{id})=>{
            const result = await Product.findByIdAndDelete(id)

            return !!result
        }

        // deleteProduct:(_,{id})=>{
        //     const index = products.findIndex(product=>product.id === id);
        //     if(index === -1) return false;

        //     products.splice(index,1)

        //     return true
        // },
        // updateProduct:(_,{id,...updates})=>{
        //     const index = products.findIndex(product=>product.id === id);
        //     if(index === -1) return null;

        //     const updatedProduct = {
        //         ...products[index],...updates
        //     }

        //     products[index] = updatedProduct;
        //     return updatedProduct
        // }
    }
}

module.exports = resolvers