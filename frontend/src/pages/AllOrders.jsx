import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import axios from "axios";
import { IoOpenOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { FaUserLarge } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";
import SeeUserData from "./SeeUserData";

const AllOrders = () => {
  const [allOrders, setAllOrders] = useState([]);
  const [options, setOptions] = useState(-1);
  const [values, setValues] = useState({ status: "" });
  const [userDiv, setuserDiv] = useState("hidden");
  const [userDivData, setuserDivData] = useState();
  const headers = {
    id: localStorage.getItem("id"),
    role: localStorage.getItem("role"),
    authorization: `Bearer ${localStorage.getItem("token")}`,
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:1000/api/v1/get-all-orders",
          { headers }
        );
        setAllOrders(response.data.data || []);
      } catch (error) {
        console.error("Error fetching all orders:", error);
      }
    };
    fetchOrders();
  }, []); //  only run once on mount

  const change = (e) => {
    const { value } = e.target;
    setValues({ status: value });
  };

  const submitChanges = async (i) => {
    try {
      const orderId = allOrders[i]?._id;
      if (!orderId) return alert("Order ID not found!");

      const response = await axios.put(
        `http://localhost:1000/api/v1/update-status/${orderId}`,
        values,
        { headers }
      );

      alert(response.data.message);

      // Update UI after status change
      setAllOrders((prev) =>
        prev.map((order, idx) =>
          idx === i ? { ...order, status: values.status } : order
        )
      );
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };

  return (
    <>
      {!allOrders || allOrders.length === 0 ? (
        <div className="h-[100%] flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <div className="h-[100%] p-0 md:p-4 text-zinc-100">
          <h1 className="text-3xl md:text-5xl font-semibold text-zinc-500 mb-8">
            All Orders
          </h1>

          {/* Header Row */}
          <div className="mt-4 bg-zinc-800 w-full rounded py-2 px-4 flex gap-2">
            <div className="w-[3%]">
              <h1 className="text-center">Sr.</h1>
            </div>
            <div className="w-[22%]">
              <h1>Books</h1>
            </div>
            <div className="w-[45%]">
              <h1>Description</h1>
            </div>
            <div className="w-[9%]">
              <h1>Prices</h1>
            </div>
            <div className="w-[16%]">
              <h1>Status</h1>
            </div>
            <div className="w-[10%] md:w-[5%]">
              <h1>
                <FaUserLarge />
              </h1>
            </div>
          </div>

          {/* Orders */}
          {allOrders.map((items, i) => (
            <div
              key={items?._id || i}
              className="bg-zinc-800 w-full rounded py-2 px-4 flex gap-2 hover:bg-zinc-900 hover:cursor-pointer transition-all duration"
            >
              <div className="w-[3%]">
                <h1 className=" text-center">{i + 1}</h1>
              </div>

              {/* Title */}
              <div className="w-[40%] md:w-[22%]">
                {items?.book ? (
                  <Link
                    to={`/view-book-details/${items.book._id}`}
                    className="hover:text-blue-300"
                  >
                    {items.book.title}
                  </Link>
                ) : (
                  <span className="text-gray-400 italic">Book Deleted</span>
                )}
              </div>

              <div className="w-0 md:w-[45%] hidden md:block">
                <h1>
                  {items?.book?.desc
                    ? items.book.desc.slice(0, 50) + "..."
                    : "No description"}
                </h1>
              </div>

              {/* Price */}
              <div className="w-[17%] md:w-[9%]">
                <h1>₹ {items?.book?.price ?? "N/A"}</h1>
              </div>

              {/* Status */}
              <div className="w-[30%] md:w-[16%]">
                <h1 className="font-semibold">
                  <button
                    className="hover:scale-105 transition-all duration-300"
                    onClick={() => setOptions(i)}
                  >
                    {items.status === "Order placed" ? (
                      <div className="text-yellow-500">{items.status}</div>
                    ) : items.status === "Canceled" ? (
                      <div className="text-red-500">{items.status}</div>
                    ) : (
                      <div className="text-green-500">{items.status}</div>
                    )}
                  </button>

                  <div
                    className={`${
                      options === i ? "block" : "hidden"
                    } flex mt-4`}
                  >
                    <select
                      name="status"
                      className="bg-gray-800"
                      onChange={change}
                      value={values.status}
                    >
                      {[
                        "Order placed",
                        "Out for delivery",
                        "Delivered",
                        "Canceled",
                      ].map((statusOpt, idx) => (
                        <option value={statusOpt} key={idx}>
                          {statusOpt}
                        </option>
                      ))}
                    </select>
                    <button
                      className="text-green-500 hover:text-pink-600 mx-2"
                      onClick={() => {
                        setOptions(-1);
                        submitChanges(i);
                      }}
                    >
                      <FaCheck />
                    </button>
                  </div>
                </h1>
              </div>
              <div className="w-[10%] md:w-[5%]">
                <button
                  className="text-xl hover:text-orange-500"
                  onClick={() => {
                    setuserDiv("fixed");
                    setuserDivData(items.user);
                  }}
                >
                  <IoOpenOutline />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      {userDivData && (
        <SeeUserData
          userDivData={userDivData}
          userDiv={userDiv}
          setuserDiv={setuserDiv}
        />
      )}
    </>
  );
};

export default AllOrders;
