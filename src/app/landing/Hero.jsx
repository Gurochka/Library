import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Hero(){
  return (
        <div className="landing-hero flex justify-content-center align-items-center flex-column">
          <h1 className="mb-3 text-light">A Discworld public library</h1>
          <h2>Explore the magnificent world of fantasy</h2>
          
          <p>Our adress: <a className="tag tag-hover" target="__blank" href="https://www.google.com/maps/place/Ankh-Morpork,+Unseen+University/@53.4867132,18.747349,18z/data=!4m5!3m4!1s0x4702cfddb7134027:0x2d7eebfc6a343fb4!8m2!3d53.486883!4d18.747915"><FontAwesomeIcon icon="place-of-worship"/> Ankh-Morpork, The Unseen University</a></p>
          <div className="flex">
            <div className="mr-3 mt-3">We work at:</div>
            <div className="mt-3 text-w-400 text-gray-300">
              <div className="mb-3">Monday-Tuesday from <b>10 am</b> to <b>6 pm</b></div>
              Friday, Satudray, Sunday - <b>day off</b>
            </div>
          </div>
        </div>
    )
}

export default Hero