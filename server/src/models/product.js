const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  description: {
    type: String,
    default: "NEEDS OF WISDOM®",
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: mongoose.Types.ObjectId,
    ref: "ProductCategory",
  },
  images: {
    type: Array,
  },
  color: {
    type: Array,
  },
  size: {
    type: String,
    enum: ["S", "M", "L", "XL"],
  },
  thumbnail: {
    type: String,
  },
  isready: {
    type: Boolean,
    default: true,
  }
}, {
  timestamps: true
});

//Export the model
module.exports = mongoose.model("Product", productSchema);
