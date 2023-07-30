const MobileProduct = require('./mobileProductModel'); 


const createMobileProduct = (req, res) => {
  const newMobileProduct = req.body;
  MobileProduct.create(newMobileProduct)
    .then(createdProduct => {
      res.status(201).json(createdProduct);
    })
    .catch(error => {
        console.log(error)
      res.status(500).json({ error: "Error creating mobile product" });
    });
};

const getAllMobileProducts = (req, res) => {
  MobileProduct.find()
    .then(products => {
      res.status(200).json(products);
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving mobile products" });
    });
};

const getMobileProductById = (req, res) => {
  const productId = req.params.id;
  MobileProduct.findById(productId)
    .then(product => {
      if (product) {
        res.status(200).json(product);
      } else {
        res.status(404).json({ error: "Mobile product not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Error retrieving mobile product" });
    });
};

const updateMobileProductById = (req, res) => {
  const productIdToUpdate = req.params.id;
  const updatedData = req.body;
  MobileProduct.findOneAndUpdate({ _id: productIdToUpdate }, updatedData, { new: true })
    .then(updatedProduct => {
      if (updatedProduct) {
        res.status(200).json(updatedProduct);
      } else {
        res.status(404).json({ error: "Mobile product not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Error updating mobile product" });
    });
};

const deleteMobileProductById = (req, res) => {
  const productIdToDelete = req.params.id;
  MobileProduct.findByIdAndDelete(productIdToDelete)
    .then(deletedProduct => {
      if (deletedProduct) {
        res.status(200).json(deletedProduct);
      } else {
        res.status(404).json({ error: "Mobile product not found" });
      }
    })
    .catch(error => {
      res.status(500).json({ error: "Error deleting mobile product" });
    });
};

module.exports = {
  createMobileProduct,
  getAllMobileProducts,
  getMobileProductById,
  updateMobileProductById,
  deleteMobileProductById,
};
