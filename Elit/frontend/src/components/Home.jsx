import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import homeLogo from "../Assets/home-main.svg";
// import Particle from "../Particle";
import Type from "./Type";

function Home() {
  return (
    <section>

        {/* <Particle /> */}
        <Container className="home-content">
          <Row>
            <Col md={7} className="home-header">
              <h1 style={{ paddingBottom: 15 }} className="heading">
                Welcome to Decentralized <strong className="main-name"> FIR</strong> system{" "}
                
              </h1>

              <h1 className="heading-name">
                Project
                <strong className="main-name"> SecureJudge</strong>
              </h1>

              <div style={{ padding: 50, textAlign: "left" }}>
                <Type />
              </div>
            </Col>

            <Col md={5} style={{ paddingBottom: 20 }}>
              <img
                 src={homeLogo} // one picture here
                alt="home pic"
                className="img-fluid"
                style={{ maxHeight: "450px" }}
              />
            </Col>
          </Row>

          <Row>
            <Col md={8} className="home-about-description">
              <h1 style={{ fontSize: "2.6em" }}>
                What is<span className="purple"> SecureJudge </span> ?
              </h1>
              <p className="home-about-body">
                Description
              </p>
              <Button variant="primary" size="lg" className="mt-3">
                Learn More
              </Button>
            </Col>
          </Row>

        </Container>

    </section>
  );
}

export default Home;