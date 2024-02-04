
import React from "react";

// reactstrap components
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

function User() {
  return (
    <>
      <div className="content">
  <Card className="card-user">
    <CardHeader>
      <CardTitle tag="h5">Lead Information</CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row>
          <Col className="pr-1" md="4">
            <FormGroup>
              <label>Lead Owner</label>
              <Input placeholder="Owner" type="text" />
            </FormGroup>
          </Col>

          <Col className="px-1" md="4">
            <FormGroup>
              <label>Model</label>
              <Input placeholder="Model" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="4">
            <FormGroup>
              <label>First Name</label>
              <Input placeholder="First Name" type="text" />
            </FormGroup>
          </Col>

          <Col className="pr-1" md="6">
            <FormGroup>
              <label>Last Name</label>
              <Input placeholder="Last Name" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Email address</label>
              <Input placeholder="Email" type="email" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Contact</label>
              <Input placeholder="Number" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Secondary Contact</label>
              <Input placeholder="Number" type="text" />
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup>
              <label>Address</label>
              <Input placeholder="Home Address" type="text" />
            </FormGroup>
          </Col>

          <Col className="pr-1" md="4">
            <FormGroup>
              <label>City</label>
              <Input placeholder="City" type="text" />
            </FormGroup>
          </Col>

          <Col className="px-1" md="4">
            <FormGroup>
              <label>Country</label>
              <Input placeholder="Country" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="4">
            <FormGroup>
              <label>Postal Code</label>
              <Input placeholder="ZIP Code" type="number" />
            </FormGroup>
          </Col>

          <Col md="12">
            <div className="update ml-auto mr-auto">
              <Button className="btn-round" color="primary" type="submit">
                Update Profile
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>

  <Card className="card-user">
    <CardHeader>
      <CardTitle tag="h5">Dealer's Information</CardTitle>
    </CardHeader>
    <CardBody>
      <Form>
        <Row>
          <Col className="pr-1" md="4">
            <FormGroup>
              <label>Name of the dealership employee</label>
              <Input placeholder="Owner" type="text" />
            </FormGroup>
          </Col>

          <Col className="px-1" md="4">
            <FormGroup>
              <label>Model</label>
              <Input placeholder="Model" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="4">
            <FormGroup>
              <label>First Name</label>
              <Input placeholder="First Name" type="text" />
            </FormGroup>
          </Col>

          <Col className="pr-1" md="6">
            <FormGroup>
              <label>Last Name</label>
              <Input placeholder="Last Name" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Policy Number</label>
              <Input placeholder="Policy Number" type="email" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Vehicle Identification Number(VIN)</label>
              <Input placeholder="VIN" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="6">
            <FormGroup>
              <label htmlFor="exampleInputEmail1">Secondary Contact</label>
              <Input placeholder="Number" type="text" />
            </FormGroup>
          </Col>

          <Col md="12">
            <FormGroup>
              <label>Address</label>
              <Input placeholder="Shipping Address" type="text" />
            </FormGroup>
          </Col>

          <Col className="pr-1" md="4">
            <FormGroup>
              <label>City</label>
              <Input placeholder="City" type="text" />
            </FormGroup>
          </Col>

          <Col className="px-1" md="4">
            <FormGroup>
              <label>Country</label>
              <Input placeholder="Country" type="text" />
            </FormGroup>
          </Col>

          <Col className="pl-1" md="4">
            <FormGroup>
              <label>Postal Code</label>
              <Input placeholder="ZIP Code" type="number" />
            </FormGroup>
          </Col>

          <Col md="12">
            <div className="update ml-auto mr-auto">
              <Button className="btn-round" color="primary" type="submit">
                Update Information
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </CardBody>
  </Card>

       
      </div>
    </>
  );
}

export default User;
