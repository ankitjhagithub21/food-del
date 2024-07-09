import React, { useState } from 'react'
import { CiMail, CiLocationOn, CiPhone } from "react-icons/ci";
import toast from "react-hot-toast"
const Contact = () => {
  const initialData = {
    username: "",
    email: "",
    message: ""
  }

  const [formData, setFormData] = useState(initialData)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/message/send`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',
        body: JSON.stringify(formData)
      })
      const data = await res.json()

      if (data.success) {
        toast.success(data.message)
        setFormData(initialData)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error("Network error.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <section className="text-gray-600 body-font relative">
        <div className="absolute inset-0 bg-gray-300">
          <iframe
            width="100%"
            height="100%"

            title="map"
            scrolling="no"
            src="https://maps.google.com/maps?width=100%&height=600&hl=en&q=%C4%B0zmir+(My%20Business%20Name)&ie=UTF8&t=&z=14&iwloc=B&output=embed"
            style={{ filter: "grayscale(1) contrast(1.2) opacity(0.4)" }}
          />
        </div>
        <section className="text-gray-600 body-font relative">
          <div className="absolute inset-0 bg-gray-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3665.759022499106!2d77.46261482440728!3d23.25185455773481!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397c4203e1c28add%3A0xce85ece223ab006b!2sIndrapuri%20C%20sector%2C%20Sector%20C%2C%20Indrapuri%2C%20Bhopal%2C%20Madhya%20Pradesh%20462022!5e0!3m2!1sen!2sin!4v1720488748470!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />

          </div>
          <div className="container px-5 py-24 mx-auto flex">
            <div className="lg:w-1/3 md:w-1/2 bg-white rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0 relative z-10 shadow-md">
              <h2 className="text-gray-900 text-lg mb-1 font-medium title-font">
                Location
              </h2>
              <p className="leading-relaxed">
                India
              </p>




            </div>
          </div>
        </section>

      </section>
      <div className='container px-5 py-24 mx-auto flex flex-wrap items-center '>
        <div className='lg:w-1/2 w-full'>
          <h2 className='text-3xl font-bold mb-5'>Contact Us</h2>
          <form onSubmit={handleSubmit} className='flex flex-col gap-3'>
            <input type="text" placeholder='Your name' name='username' className='px-4 py-2 border rounded-lg' value={formData.username} onChange={handleChange} required />
            <input type="email" placeholder='Your email' name='email' className='px-4 py-2 border rounded-lg' value={formData.email} onChange={handleChange} required />
            <textarea name='message' rows={5} value={formData.message} className='px-4 py-2 border rounded-lg' onChange={handleChange} required></textarea>
            <button type='submit' className='bg-orange-500 hover:bg-orange-600 px-4 py-2 text-white rounded-lg'>
              {
                loading ? 'Sending...' : 'Send'
              }
            </button>
          </form>
        </div>
        <div className='lg:w-1/2 w-full flex pt-10 flex-col justify-center items-center gap-5'>
          <div className='flex items-center gap-4'>
            <div className='bg-orange-500 text-white p-2 rounded-full'>
              <CiMail size={30} />
            </div>
            <div className='flex flex-col gap-1'>
              <h4 className='font-bold text-lg'>CHART TO US</h4>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, aut!</p>
              <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
            </div>

          </div>
          <div className='flex items-center gap-4'>
            <div className='bg-orange-500 text-white p-2 rounded-full'>
              <CiLocationOn size={30} />
            </div>
            <div className='flex flex-col gap-1'>
              <h4 className='font-bold text-lg'>OFFICE</h4>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, aut!</p>
              <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
            </div>

          </div>
          <div className='flex items-center gap-4'>
            <div className='bg-orange-500 text-white p-2 rounded-full'>
              <CiPhone size={30} />
            </div>
            <div className='flex flex-col gap-1'>
              <h4 className='font-bold text-lg'>PHONE</h4>
              <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat, aut!</p>
              <p className='text-sm'>Lorem ipsum dolor sit amet.</p>
            </div>

          </div>


        </div>
      </div>


    </>
  )
}

export default Contact