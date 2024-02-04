import React, { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from "reactstrap";
import pic from '../assets/img/pic.jpg'

function Userdata() {
  const initialData = [
    {
      customerId: 101,
      name: "Chet Faker",
      username: "@chetfaker",
      phoneNumber: "+91-98765-43210",
      productPurchased: "Car",
      modelName: "Maruti Suzuki Baleno",
      paymentMode: "Credit Card",
      installment: "12",
      credit: "₹24,00,000",
      feedback: "Satisfied",
      insurance: "Yes",
      complaints: "None",
      specifics: "Custom specifics for Chet Faker",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400001",
      dateOfBirth: "1990-01-01",
      occupation: "Software Engineer",
      dateOfPurchase: "2022-02-01",
      warrantyInformation: "1 year",
      transactionId: "ABC123",
      billingInformation: "Billing Info for Chet Faker",
      emailSubscriptionStatus: "Subscribed",
      serviceRequests: "2",
      maintenanceSchedule: "Bi-annual",
      repairsHistory: "None",
      vehicleMake: "Maruti Suzuki",
      vehicleModel: "Baleno",
      vehicleYear: "2022",
      vin: "VIN123",
      membershipStatus: "Gold",
    },
    
    {
      customerId: 102,
      name: "John Doe",
      username: "@johndoe",
      phoneNumber: "+91-98765-43210",
      productPurchased: "Motorcycle",
      modelName: "Hero Splendor Plus",
      paymentMode: "PayPal",
      installment: "8",
      credit: "₹12,00,000",
      feedback: "Neutral",
      insurance: "No",
      complaints: "Delayed delivery",
      specifics: "Custom specifics for John Doe",
      city: "Mumbai",
      state: "Maharashtra",
      country: "India",
      postalCode: "400002",
      dateOfBirth: "1985-05-15",
      occupation: "Teacher",
      dateOfPurchase: "2022-02-15",
      warrantyInformation: "2 years",
      transactionId: "XYZ456",
      billingInformation: "Billing Info for John Doe",
      emailSubscriptionStatus: "Unsubscribed",
      serviceRequests: "5",
      maintenanceSchedule: "Annual",
      repairsHistory: "Minor repairs",
      vehicleMake: "Hero",
      vehicleModel: "Splendor Plus",
      vehicleYear: "2021",
      vin: "VIN456",
      membershipStatus: "Silver",
    },
    {
      customerId: 103,
      name: "Jane Smith",
      username: "@janesmith",
      phoneNumber: "+91-87654-32109",
      productPurchased: "Scooter",
      modelName: "TVS Jupiter",
      paymentMode: "Bank Transfer",
      installment: "15",
      credit: "₹18,00,000",
      feedback: "Unsatisfied",
      insurance: "Yes",
      complaints: "Quality issues",
      specifics: "Custom specifics for Jane Smith",
      city: "Delhi",
      state: "Delhi",
      country: "India",
      postalCode: "110001",
      dateOfBirth: "1988-10-20",
      occupation: "Doctor",
      dateOfPurchase: "2022-03-05",
      warrantyInformation: "3 years",
      transactionId: "PQR789",
      billingInformation: "Billing Info for Jane Smith",
      emailSubscriptionStatus: "Subscribed",
      serviceRequests: "3",
      maintenanceSchedule: "Quarterly",
      repairsHistory: "Major repairs",
      vehicleMake: "TVS",
      vehicleModel: "Jupiter",
      vehicleYear: "2020",
      vin: "VIN789",
      membershipStatus: "Bronze",
    },
    {
      customerId: 104,
      name: "Amit Patel",
      username: "@amitpatel",
      phoneNumber: "+91-76543-21098",
      productPurchased: "Car",
      modelName: "Maruti Suzuki Swift",
      paymentMode: "Check",
      installment: "10",
      credit: "₹15,00,000",
      feedback: "Satisfied",
      insurance: "Yes",
      complaints: "None",
      specifics: "Custom specifics for Amit Patel",
      city: "Ahmedabad",
      state: "Gujarat",
      country: "India",
      postalCode: "380001",
      dateOfBirth: "1977-12-08",
      occupation: "Business Owner",
      dateOfPurchase: "2022-04-10",
      warrantyInformation: "4 years",
      transactionId: "LMN101",
      billingInformation: "Billing Info for Amit Patel",
      emailSubscriptionStatus: "Unsubscribed",
      serviceRequests: "1",
      maintenanceSchedule: "Bi-monthly",
      repairsHistory: "None",
      vehicleMake: "Maruti Suzuki",
      vehicleModel: "Swift",
      vehicleYear: "2021",
      vin: "VIN101",
      membershipStatus: "Silver",
    },
    {
      customerId: 105,
      name: "Priya Sharma",
      username: "@priyasharma",
      phoneNumber: "+91-65432-10987",
      productPurchased: "Motorcycle",
      modelName: "Bajaj Pulsar NS200",
      paymentMode: "Credit Card",
      installment: "18",
      credit: "₹30,00,000",
      feedback: "Very Satisfied",
      insurance: "Yes",
      complaints: "None",
      specifics: "Custom specifics for Priya Sharma",
      city: "Bangalore",
      state: "Karnataka",
      country: "India",
      postalCode: "560001",
      dateOfBirth: "1995-07-25",
      occupation: "Artist",
      dateOfPurchase: "2022-05-20",
      warrantyInformation: "5 years",
      transactionId: "VRY456",
      billingInformation: "Billing Info for Priya Sharma",
      emailSubscriptionStatus: "Subscribed",
      serviceRequests: "4",
      maintenanceSchedule: "Monthly",
      repairsHistory: "Minor repairs",
      vehicleMake: "Bajaj",
      vehicleModel: "Pulsar NS200",
      vehicleYear: "2022",
      vin: "VIN456"}
    
  ];
  

  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = () => {
    const filteredResults = initialData.filter(
      (person) =>
        person.customerId.toString() === searchTerm.trim()
    );

    setSearchResults(filteredResults);
  };  return (
    <>
      <div className="content">
        <Form>
          <Row>
            <Col md="6">
              <FormGroup>
              <Input
                  type="text"
                  placeholder="Search by ID"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ marginTop: '10px' }}
                />

              </FormGroup>
            </Col>
            <Col md="6">
              <Button color="primary" onClick={handleSearch}>
                Search
              </Button>
            </Col>
          </Row>
        </Form>

        {searchResults.length > 0 ? (
          searchResults.map((person, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle tag="h5">{person.name}</CardTitle>
              </CardHeader>
              <CardBody>
                <div className="author">
                  <img
                    alt="..."
                    className="avatar border-gray"
                    src={require("assets/img/damir-bosnjak.jpg")}
                    style={{ borderRadius: "100%",
                    width: "10%", 
                    height: "10%", 
                   }}
                  />
                  <h5 className="title">{person.username}</h5>
                </div>
                <p className="description text-center">
                <strong>Phone Number: {person.phoneNumber}</strong>
                </p>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container">
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.productPurchased} </strong><br />
                        <small>Product Purchased</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.modelName}</strong> <br />
                        <small>Model Name</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong> {person.paymentMode}</strong> <br />
                        <small>Payment Mode</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.installment}</strong> <br />
                        <small>Installment</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.credit}</strong> <br />
                        <small>Credit</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong>{person.feedback} </strong><br />
                        <small>Feedback</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.insurance} </strong><br />
                        <small>Insurance</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.complaints} </strong><br />
                        <small>Complaints</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong>{person.specifics} </strong><br />
                        <small>Specifics</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.city}</strong> <br />
                        <small>City</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.state}</strong> <br />
                        <small>State</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong> {person.country}</strong> <br />
                        <small>Country</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.postalCode}</strong> <br />
                        <small>Postal Code</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.dateOfBirth} </strong><br />
                        <small>Date of Birth</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong> {person.occupation} </strong><br />
                        <small>Occupation</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.dateOfPurchase} </strong><br />
                        <small>Date of Purchase</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.warrantyInformation}</strong> <br />
                        <small>Warranty Information</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong> {person.transactionId}</strong> <br />
                        <small>Transaction ID</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.billingInformation}</strong> <br />
                        <small>Billing Information</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.emailSubscriptionStatus} </strong><br />
                        <small>Email Subscription Status</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong>{person.serviceRequests}</strong> <br />
                        <small>Service Requests</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.maintenanceSchedule} </strong><br />
                        <small>Maintenance Schedule</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong> {person.repairsHistory}</strong> <br />
                        <small>Repairs History</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong> {person.vehicleMake}</strong> <br />
                        <small>Vehicle Make</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                     <strong> {person.vehicleModel}</strong> <br />
                        <small>Vehicle Model</small>
                      </h5>
                    </Col>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.vehicleYear}</strong> <br />
                        <small>Vehicle Year</small>
                      </h5>
                    </Col>
                    <Col lg="4">
                      <h5>
                      <strong>{person.vin} </strong><br />
                        <small>VIN</small>
                      </h5>
                    </Col>
                  </Row>
                  <Row>
                    <Col lg="4" md="6" xs="6">
                      <h5>
                      <strong>{person.membershipStatus}</strong> <br />
                        <small>Membership Status</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
          ))
        ) : (
          <Card className="card-user">
              <div className="image" style={{ position: "relative", overflow: "hidden" }}>
                      <img
                        alt="Background"
                        src={require("assets/img/damir-bosnjak.jpg")}
                        style={{
                          width: "100%", 
                          height: "100%", 
                          objectFit: "cover", 
                          position: "absolute",
                          top: 0,
                          left: 0,
                        }}
                      />
                    </div>
                    <CardBody>
                      <div className="author" style={{ position: "relative", zIndex: 1 }}>
                        <a href="#pablo" onClick={(e) => e.preventDefault()}>
                          <img
                            alt="Profile"
                            className="avatar border-gray"
                            src={require("assets/img/pic.jpg")}
                            style={{ borderRadius: "50%" }}
                          />
                          <h5 className="title">Anil</h5>
                        </a>
                        <p className="description">@anil</p>
                      </div>



               
              </CardBody>
              <CardFooter>
                <hr />
                <div className="button-container mt-4" style={{ marginTop: '200px' }}>
                  <Row>
                    <Col className="ml-auto" lg="3" md="6" xs="6">
                      <h5>
                        Yes <br />
                        <small>Insurance</small>
                      </h5>
                    </Col>
                    <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                      <h5>
                        Mumbai <br />
                        <small>City</small>
                      </h5>
                    </Col>
                    <Col className="mr-auto" lg="3">
                      <h5>
                        8<br />
                        <small>Installment</small>
                      </h5>
                    </Col>
                  </Row>
                </div>
              </CardFooter>
            </Card>
        )}
      </div>
    </>
  );
}

export default Userdata;
