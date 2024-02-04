import LandImage from "../images/vector-landing.png"
import Feature1 from "../images/feature1.png"
import Trackimg from "../images/track.png"
import Blogimg from "../images/blog1.png"
import Webinarimg from "../images/webinar.png"
import React from 'react'
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const nav = useNavigate();
  return (
    // <div className="bg-myColor w-full h-screen">
    <div className="bg-myColor">
      {/* <header className="text-gray-400 bg-myColor body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <a className="flex title-font font-medium items-center text-white  md:mb-0 align-baseline">
            <span className="ml-3 text-xl">RECONNECT.</span>
          </a>
          
            <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center invisible mt-10">
            <a className="mr-5 mt-0 hover:text-white" href="index.html">
              Home
            </a>
            <a className="mr-5 hover:text-white" href="#content">
              About Us
            </a>
            <a className="mr-5 hover:text-white" href="#our-team">
              Our Team
            </a>
            <a className="mr-5 hover:text-white" href="#contact-us">
              Contact Us
            </a>
          </nav> 
          
            <a
              href="/auth/user/sign-in"
              className="inline-flex items-center flex-wrap text-white1 bg-indigo-500 border-0 py-1 px-3 mx-5 focus:outline-none hover:bg-gray-700 rounded text-base  md:mt-0"
            >
              Sign In
              <svg
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                className="w-4 h-4 ml-1"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
        </div>
      </header> */}

      <header>
        <nav class="bg-blueGray-800 border-gray-200 px-4 lg:px-6 py-4">
          <div class="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
            <a href="#" class="flex items-center">
              {/* <img src="https://flowbite.com/docs/images/logo.svg" class="mr-3 h-6 sm:h-9" alt="Flowbite Logo" /> */}
              <span class="self-center text-xl font-semibold whitespace-nowrap text-white">RECONNECT.</span>
            </a>
            <div class="flex items-center lg:order-2">
              {/* <a href="#" class="text-gray-800 dark:text-white hover:bg-gray-50 focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 dark:hover:bg-gray-700 focus:outline-none dark:focus:ring-gray-800">Log in</a> */}
              <a
                onClick={() => { nav('/register') }}
                className="text-white bg-indigo-400 hover:bg-indigo-600 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 mr-2 focus:outline-none cursor-pointer"
              >
                Get started
              </a>

            </div>
            <div class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
              <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0 invisible">
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-white rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Company</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Marketplace</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Features</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Team</a>
                </li>
                <li>
                  <a href="#" class="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      <section className="text-gray-400 bg-myColor body-font">
        <div className="container mx-auto flex px-5 py-15 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-0 ml-10">
            <img
              className="object-cover object-center rounded mt-10"
              width={500}
              height={500}
              src={LandImage}
            />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="sm:text-4xl text-3xl mb-1 font-medium text-white">
              <div className="my-4 text-5xl font-extrabold">
                <span className="animate-pulse bg-gradient-to-r from-cyan-500 to-blue-500  bg-clip-text text-transparent title-font">
                  {" "}RECONNECT.{" "}
                </span>
              </div>
            </h1>

            <p className="mb-7 leading-relaxed text-left pr-10">
              Start your journey to recovery with our platform. Track progress, join expert-led webinars, and celebrate milestones with visual streaks.
              Our supportive community and weekly leaderboards are here to guide you towards an addiction-free life. Your brighter future begins now.
            </p>
            <div className="flex justify-center">
              <a>
                <button
                  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={() => { nav('/register') }}
                >
                  Sign Up
                </button>
              </a>
              <button
                className="ml-4 inline-flex text-gray-400 bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-700 hover:text-white rounded text-lg"
                onClick={() => { nav('/login') }}
              >
                <a>
                  Login
                </a>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- Features --> */}
    <section class="bg-myColor py-20 mt-10 lg:mt-5">
      {/* <!-- Heading --> */}
      <div class="sm:w-3/4 lg:w-5/12 mx-auto px-2">
        <h1 class="text-3xl text-center text-white">Features</h1>
        <p class="text-center text-white mt-4">
          Our aim is to make it quick and easy for you to access your favourite websites. Your bookmarks sync between
          your devices so you can access them on the go.
        </p>
      </div>
      {/* <!-- Feature #1 --> */}
      <div class="relative mt-10 lg:mt-24">
        <div class="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
          {/* <!-- Image1 --> */}
          <div class="flex flex-1 justify-center z-10 mb-5 lg:mb-0">
            <img
              class="w-3/4 h-3/4 sm:w-3/4 sm:h-3/4 md:w-auto md:h-25"
              src={Blogimg}
              alt=""
            />
          </div>
          {/* <!-- Content1 --> */}
          <div class="flex flex-1 flex-col items-center lg:items-start pr-4 mr-14 ml-0.5">
            <h1 class="text-3xl text-white">Success Stories (Blogs)</h1>
            <p class="text-white my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
Embark on a journey through our curated success stories, where real-life triumphs provide a beacon of hope. Witness the collective sense of achievement as communities unite to overcome challenges, reinforcing the powerful reminder that you are not alone in your aspirations. These stories resonate, inspire, and illustrate the strength found in shared human experiences, creating a source of motivation on your path to success.
            </p>
            <button onClick={() => { nav('/register') }}  class="bg-indigo-500 hover:bg-bookmark-white text-white rounded-2xl px-4 py-3 hover:bg-indigo-600">More Info</button>
          </div>
        </div>
        
      </div>
      {/* <!-- Feature #2 --> */}
      <div class="relative mt-10 lg:mt-42">
        <div class="container flex flex-col lg:flex-row-reverse items-center justify-center gap-x-24">
          {/* <!-- Image2 --> */}
          <div class="flex flex-1 justify-center z-10 mb-5 lg:mb-0">
            <img
              // class="w-/6 h-4/6 sm:w-3/4 sm:h-3/4 md:w-full md:h-full"
              class="w-3/4 h-3/4 sm:w-3/4 sm:h-3/4 md:w-auto md:h-25"
              src={Webinarimg}
            />
          </div>
          {/* <!-- Content2 --> */}
          <div class="flex flex-1 flex-col items-center lg:items-start ml-14 pl-4">
            <h1 class="text-3xl text-white">Webinars</h1>
            <p class="text-white text-center my-4 lg:text-left sm:w-3/4 lg:w-full">
            Step into our webinars – live lifelines led by caring experts who guide you through a virtual 
            space of support, shared stories, and hope. Beyond mere advice, these sessions create a rhythmic 
            gathering for healing and understanding, fostering a sense of community and shared strength on your 
            journey towards well-being and personal growth.
            </p>
            <button onClick={() => { nav('/register') }}  class="bg-indigo-500 hover:bg-bookmark-white text-white rounded-2xl px-4 py-3 hover:bg-indigo-600 mt-3">More Info</button>
          </div>
        </div>
        
      </div>
      {/* <!-- Feature #3 --> */}
      <div class="relative mt-20 lg:mt-42">
        <div class="container flex flex-col lg:flex-row items-center justify-center gap-x-24">
          {/* <!-- Image --> */}
          <div class="flex flex-1 justify-center z-5 mb-5 lg:mb-0">
            <img
              class="w-3/4 h-3/4 sm:w-3/4 sm:h-3/4 md:w-auto md:h-25"
              src={Trackimg}
              alt=""
            />
          </div>
          {/* <!-- Content --> */}
          <div class="flex flex-1 flex-col items-center lg:items-start pr-4 mr-14 ml-0.5">
            <h1 class="text-3xl text-white">Tracker & Leader Board</h1>
            <p class="text-white my-4 text-center lg:text-left sm:w-3/4 lg:w-full">
            Empower your journey with our comprehensive tracker, streaks, and leaderboards. Monitor and manage your daily recovery tasks, following a clear roadmap for success. Celebrate your achievements visually as you build and maintain streaks in completing tasks. Engage in weekly leaderboards that recognize and applaud your progress, fostering a sense of accomplishment and motivation on your path to success.
            </p>
            <button onClick={() => { nav('/register') }} class="bg-indigo-500 hover:bg-bookmark-white text-white rounded-2xl px-4 py-3 hover:bg-indigo-600">More Info</button>
          </div>
        </div>
        
      </div>
    </section>



    <footer class="bg-white shadow dark:bg-gray-900 m-0">
    <div class="w-full max-w-screen-xl mx-auto p-10 md:py-4">

        <span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" class="hover:underline">RECONNECT.</a> All Rights Reserved.</span>
    </div>
</footer>


    </div>


  )
}

export default Landing