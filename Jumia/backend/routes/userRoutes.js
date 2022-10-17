import express from 'express';
import User from '../models/userModel.js'
import { getToken } from '../util.js';

const router = express.Router();

router.post("/signin", async (req, res) => {
    
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password
    })

    if (signinUser) {
      res.send({
        _id: signinUser.id,
        name: signinUser.name,
        email: signinUser.email,
        isAdmin: signinUser.isAdmin,
        token: getToken(signinUser)
      });
    } else {
      res.status(401).send({ msg: "Invalid Email or Password" });
    }
});

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
          name: "Bamisile Tolulope",
          email: "tolulopebamisil@gmail.com",
          password: "Icui4cu2naw",
          isAdmin: true,
        });

        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.status(404).send({ msg: error.message });
    }
})

export default router;