const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
require("./conn/conn");
app.use(express.json());
const User = require("./routes/user");
const Book = require("./routes/book");
const Favourite = require("./routes/favourite");
const Cart = require("./routes/cart");
const Order = require("./routes/order");
app.use(cors());
app.use(express.json());

app.use("/api/v1", User);
app.use("/api/v1/", Book);
app.use("/api/v1/", Favourite);
app.use("/api/v1/", Cart);
app.use("/api/v1", Order);
app.use;
app.listen(process.env.PORT, () => {
  console.log(`server started ${process.env.PORT}`);
});
