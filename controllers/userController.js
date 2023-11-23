const User = require("../models/User");

module.exports = {
  deleteUser: async (req, res) => {
    try {
      await User.findByIdAndDelete(req.params.id);
      res.status(200).json("User successfully deleted!");
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(401).json("User does not exist!");
      }
      const { password, __v, createdAt, updatedAt, ...userData } = user._doc;
      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  updateUser: async (req, res) => {
    try {
      
      const existingUser = await User.findById(req.params.id);
      if (!existingUser) {
        return res.status(404).json({ error: "User not found" });
      }

    
      existingUser.username = req.body.username || existingUser.username;
      existingUser.email = req.body.email || existingUser.email;
      existingUser.location = req.body.location || existingUser.location;

      
      const updatedUser = await existingUser.save();

      
      const { password, __v, createdAt, updatedAt, ...userData } =
        updatedUser._doc;

      res.status(200).json(userData);
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
