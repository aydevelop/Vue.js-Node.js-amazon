const router = require("express").Router();
const Product = require("../models/product");
const upload = require("../middlewares/upload-photo");

router.post('/', upload.single('photo'), async (req, res) => {
    try{
        let product = new Product();
        product.title = req.body.title;
        product.description = req.body.description;
        product.photo = req.file.filename;
        product.stockQuantity = req.body.stockQuantity;

        await product.save();
        res.json({
            success: true,
            message: "Product saved"
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

module.exports = router;