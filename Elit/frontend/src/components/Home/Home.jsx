import React, { lazy, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import homeLogo from "../../Assets/home-main.svg";
import Type from "./Type";
import { useNavigate } from "react-router-dom";

const Particle = lazy(()=>import('../Particle'));

function Home() {
  const [showAdditionalContent, setShowAdditionalContent] = useState(false);
  const navigateTo = useNavigate();

  const handleLearnMoreClick = () => {
    setShowAdditionalContent(!showAdditionalContent);
  };

  return (
    <section>
      
      <Container className="home-content">
        <Row>
          <Col md={7} className="home-header">
            <h1 style={{ paddingBottom: 15 }} className="heading">
              Welcome to Decentralized <strong className="main-name"> FIR</strong> system
            </h1>

            <h1 className="heading-name">
              Project <strong className="main-name"> SecureJury</strong>
            </h1>

            <div style={{ padding: 50, textAlign: "left" }}>
              <Type />
            </div>
          </Col>

          <Col md={5} style={{ paddingBottom: 20 }}>
            <img
              src={homeLogo}
              alt="home pic"
              className="img-fluid"
              style={{ maxHeight: "450px" }}
            />
          </Col>
        </Row>

        <Row>
          <Col md={12} className="home-about-description">
            <h1 style={{ fontSize: "2.6em" }}>
              What is<span className="purple"> SecureJury </span> ?
            </h1>
            <p className="home-about-body">
              SecureJury is a decentralized application that allows users to file FIRs and complaints in a secure and transparent manner. It is built on the Ethereum blockchain and uses smart contracts to ensure that the data is secure and tamper-proof. The application also uses IPFS to store the data in a decentralized manner, making it resistant to censorship and data loss. SecureJury is designed to be user-friendly and accessible to everyone, regardless of their technical expertise. It is a step towards making the legal system more transparent and efficient, and ensuring that justice is accessible to all.
            </p>

            <Button variant="primary" size="lg" className="mt-3" style={{width:'100%'}} onClick={handleLearnMoreClick}>
              Learn More
            </Button>
              <br/>
              <br/>
              <br/>
              <br/>
            {showAdditionalContent && (
              <>
                {/* Repeat the following pattern for each row */}
                <Row className="align-items-center">
                  <h2><span className="purple"> Help </span></h2>
                  <Col md={6}>
                    <p className="home-about-body">
                      Integrating AI summarization and chatbot features enhances the efficiency, accessibility, and user experience of a blockchain FIR project, streamlining information processing and improving public engagement.
                    </p>
                  </Col>
                  <Col md={6} className="d-flex justify-content-center">
                    <Button variant="primary" size="lg" className="mt-3" onClick={()=>{
                      navigateTo('/help');
                    }}>
                      Help
                    </Button>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <h2><span className="purple"> File Complaint </span></h2>
                  <Col md={6}>
                    <p className="home-about-body">
                      This function allows the user to file a complaint. The user can enter the details of the complaint, upload any relevant documents, and submit the complaint. The complaint is then stored on the blockchain and can be accessed by the user at any time.
                    </p>
                  </Col>
                  <Col md={6} className="d-flex justify-content-center">
                    <Button variant="primary" size="lg" className="mt-3" onClick={()=>{
                      navigateTo('/filecomplain');
                    }}>
                      File Complaint
                    </Button>
                  </Col>
                </Row>

                <Row className="align-items-center">
                  <h2><span className="purple"> Locate </span></h2>
                  <Col md={6}>
                    <p className="home-about-body">
                      This function allows the user to locate the nearest police station. The user can enter their location, and the application will display the nearest police station along with contact details and directions.
                    </p>
                  </Col>
                  <Col md={6} className="d-flex justify-content-center">
                    <Button variant="primary" size="lg" className="mt-3" href="/Locate">
                      Locate
                    </Button>
                  </Col>
                </Row>
                {/* Repeat the pattern for the remaining rows */}
              </>
            )}
          </Col>
        </Row>
      </Container>
      <Particle />
    </section>
  );
}

export default Home;