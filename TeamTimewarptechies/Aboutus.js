import React from 'react'
import { Link } from "react-router-dom"; 
import './Aboutus.css'

export const Aboutus = () => {
 return (
    <body>
        <header>
            <nav>
                <div className="logo">AAROGYA SAHAYATHA</div>
            </nav>
        </header>

        <section className="about">
            <h1>About Us</h1>
            <p style={{fontWeight: 'bold'}}>A revolution in the medical field</p>
            <div className="about-info">
                <div className="about-img">
                    <img src="about us.jpeg" alt="Aarogya Sahayatha" />
                </div>
                <div>
                    <p>Our goal is to provide every citizen with a secure online blockchain health identity. This solution
                        enables healthcare professionals to access patient records efficiently, ensuring secure storage on the
                        blockchain. The aim is to enhance data integrity, privacy, and seamless information transfer in
                        healthcare, aligning with UN SDG 3 for Good Health and Well-Being. This system aids timely diagnoses
                        during emergencies, contributing to global health improvements.
                    </p>
                </div>
            </div>
        </section>

        <section className="team">
            <h1>Meet Our Team</h1>
            <div className="team-cards">

                <div className="card">
                    <div className="card-img">
                        <img src="person1.jpg" alt="User 1" />
                    </div>
                    <div className="card-info">
                        <h2 className="card-name">SARTHAK GUPTA</h2>
                        <p className="card-role">CYBER SECURITY</p>
                        <p className="card-email">sarthak@example.com</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-img">
                        <img src="person2.jpg" alt="User 2" />
                    </div>
                    <div className="card-info">
                        <h2 className="card-name">ABHISHEK SARAFF</h2>
                        <p className="card-role">CYBER SECURITY</p>
                        <p className="card-email">abhishek@example.com</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-img">
                        <img src="person3.jpg" alt="User 3" />
                    </div>
                    <div className="card-info">
                        <h2 className="card-name">ROHITH BIRADAR</h2>
                        <p className="card-role">CSE</p>
                        <p className="card-email">rohith@example.com</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>

                <div className="card">
                    <div className="card-img">
                        <img src="person4.jpg" alt="User 4" />
                    </div>
                    <div className="card-info">
                        <h2 className="card-name">ADARSH SHRIVASTAVA</h2>
                        <p className="card-role">CYBER SECURITY</p>
                        <p className="card-email">adarsh@example.com</p>
                        <p><button className="button">Contact</button></p>
                    </div>
                </div>
            </div>
        </section>
    </body>
 )
}
