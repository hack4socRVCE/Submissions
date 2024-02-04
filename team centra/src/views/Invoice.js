
import React from "react";
// reactstrap components
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import qr1 from 'qr1.jpg'
import qr2 from 'qr2.jpg'

import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";



function Invoice() {

  const [modal, setModal] = React.useState(false);

const toggleModal = () => {
  setModal(!modal);
};

const handleUpdateClick = () => {
  console.log('update');
};
const handlePayTax = () => {
  // Handle the logic for paying tax
  console.log("Tax paid!");
  toggleModal(); // Close the modal
};

const handleNameClick = () => {
  toggleModal();
};




  const invoiceData = [
    {
      customerID: 189,
      name: "Vivek varma",
      date: "2024-02-03",
      expiryDate: "2024-03-03",
      totalAmt: "Rs.50,000",
      credit: "Rs.10,000",
      status: "Pending",
      payment: "Not Paid",
    },
    {
      customerID: 232,
      name: "Arun kumar",
      date: "2024-02-04",
      expiryDate: "2024-03-04",
      totalAmt: "Rs.45,000",
      credit: "Rs.8,000",
      status: "Approved",
      payment: "Paid",
    },
    {
      customerID: 365,
      name: "Vidhvath J Poojari",
      date: "2024-02-05",
      expiryDate: "2024-03-05",
      totalAmt: "Rs.55,000",
      credit: "Rs.12,000",
      status: "Pending",
      payment: "Not Paid",
    },
    {
      customerID: 89,
      name: "Pawan Omprakash",
      date: "2024-02-06",
      expiryDate: "2024-03-06",
      totalAmt: "Rs.40,000",
      credit: "Rs.5,000",
      status: "Approved",
      payment: "Paid",
    },
    {
      customerID: 154,
      name: "Akshat Maheshwari",
      date: "2024-02-07",
      expiryDate: "2024-03-07",
      totalAmt: "Rs.60,000",
      credit: "Rs.15,000",
      status: "Pending",
      payment: "Not Paid",
    },
    {
      customerID: 23,
      name: "Sohan Koushik",
      date: "2024-02-08",
      expiryDate: "2024-03-08",
      totalAmt: "Rs.48,000",
      credit: "Rs.7,000",
      status: "Approved",
      payment: "Paid",
    },
    {
      customerID: 87,
      name: "Raghavendra Karthik",
      date: "2024-02-09",
      expiryDate: "2024-03-09",
      totalAmt: "Rs.52,000",
      credit: "Rs.9,000",
      status: "Pending",
      payment: "Not Paid",
    },
    {
      customerID: 32,
      name: "Aditya  Sharma",
      date: "2024-02-10",
      expiryDate: "2024-03-10",
      totalAmt: "Rs.43,000",
      credit: "Rs.6,000",
      status: "Approved",
      payment: "Paid",
    },
    {
      customerID: 236,
      name: "Narendranath",
      date: "2024-02-11",
      expiryDate: "2024-03-11",
      totalAmt: "Rs.57,000",
      credit: "Rs.11,000",
      status: "Pending",
      payment: "Not Paid",
    },
    {
      customerID: 410,
      name: "Ravi Teja",
      date: "2024-02-12",
      expiryDate: "2024-03-12",
      totalAmt: "Rs.65,000",
      credit: "Rs.20,000",
      status: "Approved",
      payment: "Paid",
    },
    {
      customerID: 101,
      name: "Ashok Nabhiyal",
      date: "2024-02-13",
      expiryDate: "2024-03-13",
      totalAmt: "Rs.42,000",
      credit: "Rs.8,000",
      status: "Approved",
      payment: "Paid",
    },
    {
      customerID: 6,
      name: "Raghav Mittal",
      date: "2024-02-14",
      expiryDate: "2024-03-14",
      totalAmt: "Rs.53,000",
      credit: "Rs.15,000",
      status: "Pending",
      payment: "Not Paid",
    },
    
    
  ];

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Car Invoice List</CardTitle>
                
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Customer ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Expiry Date</th>
                      <th>Amount</th>
                      <th>Credit</th>
                      <th>Status</th>
                      <th>Payment</th>
                    </tr>
                  </thead>
                  <tbody>
                    {invoiceData.map((invoice, index) => (
                      <tr key={index}>
                        <td>{invoice.customerID}</td>
                        <td onClick={handleNameClick} style={{ cursor: 'pointer' }}>{invoice.name}</td>

                        <td>{invoice.date}</td>
                        <td>{invoice.expiryDate}</td>
                        <td >{invoice.totalAmt}</td>
                        <td >{invoice.credit}</td>
                        <td>{invoice.status}</td>
                        <td>{invoice.payment}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Button color="primary" onClick={handleUpdateClick}>
      Update
    </Button>


    <Modal isOpen={modal} toggle={toggleModal}>
  <ModalHeader toggle={toggleModal}>Pay Tax</ModalHeader>
  <ModalBody>
    
    Are you sure you want to pay tax?
    <img src={qr1} alt="T" />
    
  </ModalBody>
  <ModalFooter>
    <Button color="primary" onClick={handlePayTax}>
      Pay Tax
    </Button>{" "}
    <Button color="secondary" onClick={toggleModal}>
      Go Back
    </Button>
  </ModalFooter>
</Modal>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );
}
const handleUpdateClick = () => {
  console.log("Update button clicked");
};

export default Invoice;
