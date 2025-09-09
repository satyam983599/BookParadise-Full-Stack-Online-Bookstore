import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateBook = () => {
  const [Data, setData] = useState({
    url: "",
    title: "",
    author: "",
    price: "",
    desc: "",
    language: "",
  });

  const { id } = useParams();
  const navigate = useNavigate();
  const headers = {
    id: localStorage.getItem("id"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
    bookid: id,
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
        const response = await axios.put(
          "http://localhost:1000/api/v1/update-book",
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
      alert(error.response?.data?.message);
      navigate(`/view-book-details/${id}`);
    }
  };
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get(
        `http://localhost:1000/api/v1/get-book-by-id/${id}`
      );
      setData(response.data.data);
    };
    fetch();
  }, []);

  return (
    <div className=" bg-zinc-900 h-[100%] p-0 md:p-4">
      <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
        Update Book
      </h1>

      <div className="p-4 bg-zinc-800 rounded space-y-4">
        {/* Image */}
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

        {/* Title */}
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

        {/* Author */}
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

        {/* Language & Price */}
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

        {/* Description */}
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

        {/* Submit Button */}
        <button
          className="mt-4 px-3 bg-blue-500 text-white font-semibold py-2 rounded hover:bg-blue-600 transition-all duration-300"
          onClick={submit}
        >
          Update Book
        </button>
      </div>
    </div>
  );
};

export default UpdateBook;
