import React from 'react'
import CartSummary from './CartSummary'

const Order = () => {
  return (
    <div className="container py-24 mx-auto flex flex-wrap-reverse">
  <div className="lg:w-1/2 w-full p-5">
    <h2 className="text-2xl mb-5 font-bold">Delivery Information</h2>
    <form className="flex flex-col gap-3">
      <div className="flex w-full gap-2">
        <input
          type="text"
          name="firstName"
          className="w-1/2 border px-4 py-2 rounded-lg"
          placeholder="First Name"
          required=""
          defaultValue=""
        />
        <input
          type="text"
          name="lastName"
          className="w-1/2 border px-4 py-2 rounded-lg"
          placeholder="Last Name"
          required=""
          defaultValue=""
        />
      </div>
      <div className="flex w-full gap-2">
        <input
          type="text"
          name="city"
          className="border w-1/2 px-4 py-2 rounded-lg"
          placeholder="Enter city"
          required=""
          defaultValue=""
        />
        <input
          type="text"
          name="state"
          className="border w-1/2 px-4 py-2 rounded-lg"
          placeholder="Enter state"
          required=""
          defaultValue=""
        />
      </div>
      <div className="flex w-full gap-2">
        <input
          type="text"
          name="zipcode"
          className="border w-1/2 px-4 py-2 rounded-lg"
          placeholder="Enter zipcode"
          required=""
          defaultValue=""
        />
        <input
          type="text"
          name="country"
          className="border w-1/2 px-4 py-2 rounded-lg"
          placeholder="Enter country"
          required=""
          defaultValue=""
        />
      </div>
      <input
        type="email"
        name="email"
        className="border px-4 py-2 rounded-lg"
        placeholder="Enter email"
        required=""
        defaultValue=""
      />
      <input
        type="text"
        name="phone"
        className="border px-4 py-2 rounded-lg"
        placeholder="Enter phone"
        required=""
        defaultValue=""
      />
      <button
        className="px-4 py-2 text-white bg-orange-500 rounded-lg"
        type="submit"
      >
        PROCESS TO PAYMENT
      </button>
    </form>
  </div>
  <CartSummary/>
  
</div>

  )
}

export default Order
