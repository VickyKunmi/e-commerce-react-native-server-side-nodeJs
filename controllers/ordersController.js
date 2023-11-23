const Order = require("../models/Order");



module.exports = {
    getAllOrders: async (req, res) => {
        try {
            const allOrders = await Order.find()
                .populate({
                    path: "productId",
                    select: "-description -product_location"
                })
                .exec();
            res.status(200).json(allOrders);
        } catch (error) {
            res.status(500).json(error);
        }
    },


    getUserOrders: async (req, res) => {
        const userId = req.user.id;
        try {
            const userOrders = await Order.find({userId})
            .populate({
                path: "productId",
                select: "-description -product_location"
            })
            .exec();
            res.status(200).json(userOrders);
        } catch (error) {
            res.status(500).json(error);
            
        }
    }
}