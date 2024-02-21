const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
var orderSchema = new mongoose.Schema({
  products: [
    {
      product: { type: mongoose.Types.ObjectId, ref: "Product" },
      count: Number,
      color: String,
      size: String,
    },
  ],
  address: {
    type: String,
    require: true,
  },
  status: {
    type: String,
    default: "Processing",
    enum: ["Cancel", "Processing", "Success"],
  },
  total: {type: Number},
  orderBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

//Export the model
module.exports = mongoose.model("Order", orderSchema);
