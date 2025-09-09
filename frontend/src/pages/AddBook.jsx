import axios from "axios";
import React, { useState } from "react";

const AddBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  const change = (e) => {
    const { name, value } = e.target;
    setData({ ...Data, [name]: value });
  };

  const submit = async () => {
    try {
      if (
        Data.url === "" ||
        Data.title === "" ||
        Data.author === "" ||
        Data.price === "" ||
        Data.desc === "" ||
        Data.language === ""
      ) {
        alert("All fields are required");
      } else {
        const response = await axios.post(
          "http://localhost:1000/api/v1/add-book",
          Data,
          { headers }
        );

        setData({
          url: "",
          title: "",
          author: "",
          price: "",
          desc: "",
          language: "",
        });

        alert(response.data.message);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Add Book
      </h1>

      <div className="p-4 bg-zinc-800 rounded space-y-4">
        <div>
          <label className="text-zinc-400">Image</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="URL of Image"
            name="url"
            value={Data.url}
            onChange={change}
          />
        </div>

        <div>
          <label className="text-zinc-400">Title of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Title of book"
            name="title"
            value={Data.title}
            onChange={change}
          />
        </div>

        <div>
          <label className="text-zinc-400">Author of book</label>
          <input
            type="text"
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            placeholder="Author of book"
            name="author"
            value={Data.author}
            onChange={change}
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-zinc-400">Language</label>
            <input
              type="text"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Language of book"
              name="language"
              value={Data.language}
              onChange={change}
            />
          </div>

          <div className="w-1/2">
            <label className="text-zinc-400">Price</label>
            <input
              type="number"
              className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
              placeholder="Price of book"
              name="price"
              value={Data.price}
              onChange={change}
            />
          </div>
        </div>

        <div>
          <label className="text-zinc-400">Description of book</label>
          <textarea
            className="w-full mt-2 bg-zinc-900 text-zinc-100 p-2 outline-none"
            rows="5"
            placeholder="Description of book"
            name="desc"
            value={Data.desc}
            onChange={change}
          />
        </div>

        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Add Book
        </button>
      </div>
    </div>
  );
};

export default AddBook;
