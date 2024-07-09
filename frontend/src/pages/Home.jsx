import React from 'react'
import Hero from '../components/Hero'
import Events from '../components/Events'
import MobileApp from './MobileApp'
import Collections from '../components/Collections'
import Cities from '../components/Cities'



const Home = () => {
  return (
    <>
      <Hero />

      <Events />
      <Collections />
      <Cities/>
      <MobileApp />


    </>
  )
}

export default Home
