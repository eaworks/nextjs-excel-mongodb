// import mongoose from 'mongoose';

// interface IProduct {
// name: String;
// surname: String;
// }

// const ProductSchema = new mongoose.Schema<IProduct>({
//   name: String,
//   surname: Number,
// });

// const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

// export default Product;

import mongoose from 'mongoose';

export interface Product {
    name: String,
    price: Number,
    category: String,
}

const ProductSchema = new mongoose.Schema<Product>({
    name: String,
    price: Number,
    category: String,
});

export const Product = mongoose.model('Product', ProductSchema);
