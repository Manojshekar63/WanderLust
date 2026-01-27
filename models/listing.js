const mongoose = require("mongoose"); // import mongoose
const { Schema } = mongoose; // Schema constructor

// Define an image sub-schema to match your seed data (filename + url)
const imageSchema = new Schema({
  filename: String,
  url: String,
}, { _id: false }); // no separate _id for image

// Define the Listing schema
const listingSchema = new Schema({
  title: { type: String, required: true }, // required title
  description: String,                      // optional description
  image: imageSchema,                       // image as object { filename, url }
  price: Number,     // numeric price
  location: String,  // location name
  country: String,   // country name
});

// Create and export the Listing model
const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;