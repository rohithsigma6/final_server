const mongoose = require('mongoose');

const mobileProductSchema = new mongoose.Schema({
    productName: { type: String, required: true },
    brand: { type: String, required: true },
    model: { type: String, required: true },
    color: { type: String, required: true },
    storage: { type: Number, required: true },
    ram: { type: Number, required: true },
    displaySize: { type: String, required: true },
    resolution: { type: String, required: true },
    batteryCapacity: { type: Number, required: true },
    camera: {
      mainCamera: { type: Number, required: true },
      frontCamera: { type: Number, required: true } 
    },
    processor: {
      name: { type: String, required: true },
      cores: { type: Number, required: true },
      clockSpeed: { type: String, required: true }
    },
    operatingSystem: { type: String, required: true },
    connectivity: {
      bluetooth: { type: Boolean, required: true },
      wifi: { type: Boolean, required: true },
      '4g': { type: Boolean, required: true },
      '5g': { type: Boolean, required: true },
      usbType: { type: String, required: true }
    },
    price: { type: Number, required: true },
    availability: { type: Boolean, required: true },
    ratings: { type: Number, default:4 },
 
});


const MobileProduct = mongoose.model('MobileProduct', mobileProductSchema);

module.exports = MobileProduct;
