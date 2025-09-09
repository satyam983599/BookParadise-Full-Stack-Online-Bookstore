const mongoose = require("mongoose");

const book = new mongoose.Schema(
  {
    url: {
      type: String,
      requird: true,
    },
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      requied: true,
    },
    desc: {
      type: String,
      reuired: true,
    },
    language: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("books", book);
