import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

function Payment() {

  const [modal, setModal] = useState(false);
  const [editedData, setEditedData] = useState({});
  const [editedIndex, setEditedIndex] = useState(null);

  const toggleModal = (index) => {
    setModal(!modal);
    if (index !== undefined) {
      setEditedData({ ...paymentsData[index] });
      setEditedIndex(index);
    }
  };
  const handleEdit = () => {
    // Update the actual data in paymentsData array
    const updatedData = [...paymentsData];
    updatedData[editedIndex] = editedData;
    setPaymentsData(updatedData);

    // Reset the modal state
    setModal(false);
    setEditedData({});
    setEditedIndex(null);
  };

  const [paymentsData, setPaymentsData] = useState([
    {
      ID: 1,
      name: "Sam Joseph",
      date: "2024-02-03",
      paymentmode: "Credit Card",
      amount: "Rs.30,000",
    },
    {
      ID: 2,
      name: "Shaliq Abdul",
      date: "2024-02-05",
      paymentmode: "PayPal",
      amount: "Rs.25,000",
    },
    {
      ID: 3,
      name: "Sohail  Abbasi",
      date: "2024-02-08",
      paymentmode: "Bank Transfer",
      amount: "Rs.40,000",
    },
    {
      ID: 4,
      name: "Jatin Kumar",
      date: "2024-02-10",
      paymentmode: "Check",
      amount: "Rs.22,000",
    },
    {
      ID: 5,
      name: "Priyanshu",
      date: "2024-02-15",
      paymentmode: "Credit Card",
      amount: "Rs.28,500",
    },
    {
      ID: 6,
      name: "Pabhas Varma",
      date: "2024-02-18",
      paymentmode: "PayPal",
      amount: "Rs.35,000",
    },
    {
      ID: 7,
      name: "Pawan Omprakash",
      date: "2024-02-20",
      paymentmode: "Bank Transfer",
      amount: "Rs.45,000",
    },
    {
      ID: 8,
      name: "Raniya Poonthala",
      date: "2024-02-25",
      paymentmode: "Check",
      amount: "Rs.21,500",
    },
    {
      ID: 9,
      name: "Vidhvath J Poojari",
      date: "2024-02-28",
      paymentmode: "Credit Card",
      amount: "Rs.32,000",
    },
    {
      ID: 10,
      name: "Akshat Maheshwari",
      date: "2024-03-03",
      paymentmode: "PayPal",
      amount: "Rs.27,500",
    },
  ]);
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardHeader>
                <CardTitle tag="h4">Car Payments</CardTitle>
              </CardHeader>
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Date</th>
                      <th>Payment Mode</th>
                      <th>Amount</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paymentsData.map((payment, index) => (
                      <tr key={index}>
                        <td>{payment.ID}</td>
                        <td>{payment.name}</td>
                        <td>{payment.date}</td>
                        <td>{payment.paymentmode}</td>
                        <td>{payment.amount}</td>
                        <td>
                          <UncontrolledDropdown>
                            <DropdownToggle caret>Action</DropdownToggle>
                            <DropdownMenu right>
                              <DropdownItem onClick={() => toggleModal(index)}>
                                Edit
                              </DropdownItem>
                              <DropdownItem>Delete</DropdownItem>
                              <DropdownItem>Show</DropdownItem>
                              <DropdownItem>Download</DropdownItem>
                            </DropdownMenu>
                          </UncontrolledDropdown>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>

      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Edit Payment</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <Label for="id">ID</Label>
              <Input
                type="text"
                name="id"
                id="id"
                value={editedData.id || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, id: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={editedData.name || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, name: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="date">Date</Label>
              <Input
                type="text"
                name="date"
                id="date"
                value={editedData.date || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, date: e.target.value })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="paymentmode">Payment Mode</Label>
              <Input
                type="text"
                name="paymentmode"
                id="paymentmode"
                value={editedData.paymentmode || ""}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    paymentmode: e.target.value,
                  })
                }
              />
            </FormGroup>
            <FormGroup>
              <Label for="amount">Amount</Label>
              <Input
                type="text"
                name="amount"
                id="amount"
                value={editedData.amount || ""}
                onChange={(e) =>
                  setEditedData({ ...editedData, amount: e.target.value })
                }
              />
            </FormGroup>
          </Form>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleEdit}>
            Save
          </Button>{" "}
          <Button color="secondary" onClick={toggleModal}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Payment;