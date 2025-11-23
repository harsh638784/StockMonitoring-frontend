// HomePage.js
import React from 'react';
import Hero from './Hero';
import Stats from './Stats';
import Pricing from './Pricing';
import Education from './Education';
import OpenAccount from './OpenAccount';
import Award from './Award';
import Navbar from '../Navbar';
import Footer from '../Footer';

function HomePage() {
  return (
    <>
      <Navbar/>
      <Hero />
      <Stats />
      <Pricing />
      <Education />
      <OpenAccount />
      <Award />
      <Footer/>
    </>
  );
}
export default HomePage;
