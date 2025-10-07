// import React from "react";
// import { useSelector } from "react-redux";
// import {
//   getCartSubtotal,
//   getCartDeliveryCharge,
//   getCartTotalAmount,
// } from "../../redux/cartslice"; // path adjust karo agar alag folder me ho
// import { useContext } from "react";
// import { StoreContext } from "../../context/StoreContext";
// import { useState } from "react";

// const PlaceOrder = () => {
//   const {token,food_items,cartItems,url}=useContext(StoreContext);
//   const[data,setdata]=useState({
//     firstName:"",
//     lastName:"",
//     email:"",
//     street:"",
//     city:"",
//     state:"",
//     zipcode:"",
//     country:"",
//     phone:""
//   })

// const onChangeHandler=(event)=>{
//   const name=event.target.name;
//   const value=event.target.value;
//   setdata(data=>({...data,[name]:value}))
// }


//   const subtotal = useSelector(getCartSubtotal);
//   const deliveryFee = useSelector(getCartDeliveryCharge);
//   const totalAmount = useSelector(getCartTotalAmount);

//   return (
//     <div className="max-w-6xl mx-auto pt-60 p-5 5 md:pt-2 min-h-screen w-full flex justify-center items-start md:items-center overflow-y-auto">
//       <div className="flex flex-col md:flex-row justify-between gap-8 w-full py-6">
//         {/* Delivery Information */}
//         <div className="w-full md:w-[60%]">
//           <h2 className="text-2xl font-semibold  mb-4">Delivery Information</h2>
//           <form className="space-y-4">
//             <div className="flex gap-4">
//               <input type="text" placeholder="First name" className="w-1/2 border rounded px-4 py-2" />
//               <input type="text" placeholder="Last name" className="w-1/2 border rounded px-4 py-2" />
//             </div>
//             <input type="email" placeholder="Email address" className="w-full border rounded px-4 py-2" />
//             <input type="text" placeholder="Street" className="w-full border rounded px-4 py-2" />
//             <div className="flex gap-4">
//               <input type="text" placeholder="City" className="w-1/2 border rounded px-4 py-2" />
//               <input type="text" placeholder="State" className="w-1/2 border rounded px-4 py-2" />
//             </div>
//             <div className="flex gap-4">
//               <input type="text" placeholder="Zip code" className="w-1/2 border rounded px-4 py-2" />
//               <input type="text" placeholder="Country" className="w-1/2 border rounded px-4 py-2" />
//             </div>
//             <input type="tel" placeholder="Phone" className="w-full border rounded px-4 py-2" />
//           </form>
//         </div>

//         {/* Cart Totals */}
//         <div className="w-full md:w-[40%] bg-white shadow-md rounded p-6">
//           <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
//           <div className="space-y-2 text-base">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <span>₹{subtotal}</span>
//             </div>
//             <div className="flex justify-between">
//               <span>Delivery Fee</span>
//               <span>₹{deliveryFee}</span>
//             </div>
//             <div className="flex justify-between font-bold text-lg">
//               <span>Total</span>
//               <span>₹{totalAmount}</span>
//             </div>
//           </div>
//           <button className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded">
//             PROCEED TO PAYMENT
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PlaceOrder;


import React, { useContext, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  getCartSubtotal,
  getCartDeliveryCharge,
  getCartTotalAmount,
} from "../../redux/cartslice";
import { StoreContext } from "../../context/StoreContext";

const PlaceOrder = () => {
  const { token, cartItems, food_items, url } = useContext(StoreContext);
  const [data, setdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const subtotal = useSelector(getCartSubtotal);
  const deliveryFee = useSelector(getCartDeliveryCharge);
  const totalAmount = useSelector(getCartTotalAmount);

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setdata((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async () => {
    if (!token) {
      alert("Please login first");
      return;
    }

    const items = food_items
      .filter((item) => cartItems[item._id] > 0)
      .map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: cartItems[item._id],
      }));

    const address = { ...data };

    try {
      const res = await axios.post(
        `${url}/api/order/place`,
        {
          items,
          amount: totalAmount,
          address,
        },
        {
          headers: { token },
        }
      );
      console.log(res)
      if (res.data.success) {
        window.location.href = res.data.session_url;
      } else {
        alert("Failed to initiate payment");
      }
    } catch (err) {
      console.error("❌ Payment error:", err.message);
      alert("Something went wrong");
    }
  };

  return (
    <div className="max-w-6xl mx-auto pt-40 p-4 min-h-screen w-full flex justify-center items-start">
      <div className="flex flex-col md:flex-row justify-between gap-8 w-full py-6">
        {/* Delivery Information */}
        <div className="w-full md:w-[60%]">
          <h2 className="text-2xl font-semibold mb-4">Delivery Information</h2>
          <form className="space-y-4">
            <div className="flex gap-4">
              <input name="firstName" value={data.firstName} onChange={onChangeHandler} type="text" placeholder="First name" className="w-1/2 border rounded px-4 py-2" />
              <input name="lastName" value={data.lastName} onChange={onChangeHandler} type="text" placeholder="Last name" className="w-1/2 border rounded px-4 py-2" />
            </div>
            <input name="email" value={data.email} onChange={onChangeHandler} type="email" placeholder="Email address" className="w-full border rounded px-4 py-2" />
            <input name="street" value={data.street} onChange={onChangeHandler} type="text" placeholder="Street" className="w-full border rounded px-4 py-2" />
            <div className="flex gap-4">
              <input name="city" value={data.city} onChange={onChangeHandler} type="text" placeholder="City" className="w-1/2 border rounded px-4 py-2" />
              <input name="state" value={data.state} onChange={onChangeHandler} type="text" placeholder="State" className="w-1/2 border rounded px-4 py-2" />
            </div>
            <div className="flex gap-4">
              <input name="zipcode" value={data.zipcode} onChange={onChangeHandler} type="text" placeholder="Zip code" className="w-1/2 border rounded px-4 py-2" />
              <input name="country" value={data.country} onChange={onChangeHandler} type="text" placeholder="Country" className="w-1/2 border rounded px-4 py-2" />
            </div>
            <input name="phone" value={data.phone} onChange={onChangeHandler} type="tel" placeholder="Phone" className="w-full border rounded px-4 py-2" />
          </form>
        </div>

        {/* Cart Totals */}
        <div className="w-full md:w-[40%] bg-white shadow-md rounded p-6">
          <h2 className="text-2xl font-semibold mb-4">Cart Totals</h2>
          <div className="space-y-2 text-base">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span>₹{deliveryFee}</span>
            </div>
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{totalAmount}</span>
            </div>
          </div>
          <button
            className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white py-2 px-4 rounded"
            onClick={handlePayment}
          >
            PROCEED TO PAYMENT
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;



