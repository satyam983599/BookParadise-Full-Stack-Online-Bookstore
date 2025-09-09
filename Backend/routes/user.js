const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateToken } = require("./userAuth");

//sign-up
router.post("/sign-up", async (req, res) => {
  try {
    const { username, email, password, address } = req.body;
    //check length of username
    if (username.length < 4) {
      return res
        .status(400)
        .json({ message: "Username length should be greater then 3" });
    }
    // check username already exist
    const exsitingUsername = await User.findOne({ username: username });
    if (exsitingUsername) {
      return res.status(400).json({ message: "Username already exist" });
    }
    // check Email already exist
    const exsitingEmail = await User.findOne({ email: email });
    if (exsitingEmail) {
      return res.status(400).json({ message: "Email already exist" });
    }
    if (password?.length <= 5) {
      return res
        .status(400)
        .json({ message: "password must be greater then 5 digit" });
    }

    const hashpass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashpass,
      address: address,
    });
    await newUser.save(); //newUser data save in database
    console.log("hello");
    return res.status(200).json({ message: "SignUp successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

//sign-in
router.post("/sign-in", async (req, res) => {
  try {
    const { username, password } = req.body;

    //find existing username
    const exsitingUser = await User.findOne({ username });
    if (!exsitingUser) {
      return res.status(400).json({ message: "Invalid Cardential" });
    }
    await bcrypt.compare(password, exsitingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          { name: exsitingUser.username },
          { role: exsitingUser.role },
        ];
        const token = jwt.sign({ authClaims }, "bookStore123", {
          expiresIn: "30d",
        });
        res.status(200).json({
          id: exsitingUser._id,
          role: exsitingUser.role,
          token: token,
        });
      } else {
        res.status(200).json({ message: "Invalid Cardential" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "INternal server error" });
  }
});

//get-user information

router.get("/get-user-information", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;

    if (!id) {
      return res.status(400).json({ message: "User ID missing in headers" });
    }

    const data = await User.findById(id).select("-password");

    if (!data) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json(data);
  } catch (error) {
    console.error("Error in get-user-information:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//update address

router.put("/update-address", authenticateToken, async (req, res) => {
  try {
    const { id } = req.headers;
    const { address } = req.body;
    await User.findByIdAndUpdate(id, { address: address });
    return res.status(200).json({ message: "Address update successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
