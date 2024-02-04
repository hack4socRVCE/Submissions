import React, { useState } from "react";
import {
  Button,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "reactstrap";
import "../App.css"

function LeadManagement() {
  const [modalEnquiry, setModalEnquiry] = useState(false);
  const [modalCallback, setModalCallback] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);
  const [modalComplaint, setModalComplaint] = useState(false);
  const [modalService, setModalService] = useState(false);
  const [modalOther, setModalOther] = useState(false);

  const toggleModal = (modal) => {
    switch (modal) {
      case "enquiry":
        setModalEnquiry(!modalEnquiry);
        break;
      case "callback":
        setModalCallback(!modalCallback);
        break;
      case "order":
        setModalOrder(!modalOrder);
        break;
      case "complaint":
        setModalComplaint(!modalComplaint);
        break;
      case "service":
        setModalService(!modalService);
        break;
      case "other":
        setModalOther(!modalOther);
        break;
      default:
        break;
    }
  };


  const handleEnquirySubmit = () => {
  
    toggleModal("enquiry");
  };


  const handleCallbackSubmit = () => {
    // Similar logic as handleEnquirySubmit
    toggleModal("callback");
  };

  const handleOrderSubmit = () => {
    // Similar logic as handleEnquirySubmit
    toggleModal("order");
  };

  const handleComplaintSubmit = () => {
    // Similar logic as handleEnquirySubmit
    toggleModal("complaint");
  };

  const handleServiceSubmit = () => {
    // Similar logic as handleEnquirySubmit
    toggleModal("service");
  };

  const handleOtherSubmit = () => {
    // Similar logic as handleEnquirySubmit
    toggleModal("other");
  };

  return (
    <>
      <div className="content">
        <Row>
          <Col md={6}>
            <Button
              className="comp"
              color="primary"
              block
              onClick={() => toggleModal("enquiry")}
            >
              Enquiry
            </Button>
          </Col>
          <Col md={6}>
            <Button
              className="comp"
              color="primary"
              block
              onClick={() => toggleModal("callback")}
            >
              Callback
            </Button>
          </Col>
          <Col md={6}>
            <Button  className="comp" color="primary" block onClick={() => toggleModal("order")}>
              Order
            </Button>
          </Col>
          <Col md={6}>
            <Button               className="comp"

              color="primary"
              block
              onClick={() => toggleModal("complaint")}
            >
              Complaint
            </Button>
          </Col>
          <Col md={6}>
            <Button               className="comp"
              color="primary"
              block
              onClick={() => toggleModal("service")}
            >
              Service
            </Button>
          </Col>
          <Col md={6}>
            <Button               className="comp"
              color="primary"
              block
              onClick={() => toggleModal("other")}
            >
              Other
            </Button>
          </Col>
        </Row>
      </div>

      {/* Modals */}
      <Modal isOpen={modalEnquiry} toggle={() => toggleModal("enquiry")}>
  <ModalHeader toggle={() => toggleModal("enquiry")}>Enquiry</ModalHeader>
  <ModalBody>
    <form>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter product name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="Enter price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Remarks:</label>
        <textarea
          className="form-control"
          id="remarks"
          placeholder="Enter remarks"
        />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
    <Button color="secondary" onClick={() => toggleModal("enquiry")}>
      Go Back
    </Button>
    <Button color="primary" onClick={() => handleEnquirySubmit()}>
      Submit
    </Button>
  </ModalFooter>
</Modal>

      <Modal isOpen={modalCallback} toggle={() => toggleModal("callback")}>
        <ModalHeader toggle={() => toggleModal("callback")}>
          Callback
        </ModalHeader>
        <ModalBody>
    <form>
      <div className="form-group">
        <label htmlFor="productName">CallBack Date:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter dd/mm/yy"
        />
      </div>
      
      <div className="form-group">
        <label htmlFor="remarks">Remarks:</label>
        <textarea
          className="form-control"
          id="remarks"
          placeholder="Enter remarks"
        />
      </div>
    </form>
  </ModalBody>
  <ModalFooter>
          <Button color="secondary" onClick={() => toggleModal("callback")}>
            Go Back
          </Button>
          <Button color="primary" onClick={handleCallbackSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalOrder} toggle={() => toggleModal("order")}>
        <ModalHeader toggle={() => toggleModal("order")}>Order</ModalHeader>
        <ModalBody>
    <form>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter product name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Delivery Address</label>
        <input
          type="number"
          className="form-control"
          id="price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Confirmation:</label>
        <textarea
          className="form-control"
          id="remarks"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Description:</label>
        <textarea
          className="form-control"
          id="remarks"
        />
      </div>

    </form>
  </ModalBody>
  <ModalFooter>
          <Button color="secondary" onClick={() => toggleModal("order")}>
            Go Back
          </Button>
          <Button color="primary" onClick={handleOrderSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalComplaint} toggle={() => toggleModal("complaint")}>
        <ModalHeader toggle={() => toggleModal("complaint")}>
          Complaint
        </ModalHeader>
        <ModalBody>
    <form>
      <div className="form-group">
        <label htmlFor="productName">Complaint ID:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
        />
        <br></br>
         <label htmlFor="productName">Complaint Reg:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter registered complaint number4"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Servive/Sales ID:</label>
        <input
          type="number"
          className="form-control"
          id="price"
          placeholder="Reference number"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Priority:</label>
        <textarea
          className="form-control"
          id="remarks"
          placeholder="Enter low, medium or high"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Complaint Details:</label>
        <textarea
          className="form-control"
          id="remarks"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Remarks:</label>
        <textarea
          className="form-control"
          id="remarks"
          
        />
      </div>
    </form>
  </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleModal("complaint")}>
            Go Back
          </Button>
          <Button color="primary" onClick={handleComplaintSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalService} toggle={() => toggleModal("service")}>
        <ModalHeader toggle={() => toggleModal("service")}>
          Service
        </ModalHeader>
        <ModalBody>
    <form>
      <div className="form-group">
        <label htmlFor="productName">Product Name:</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter product name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Service Date:</label>
        <input
          type="number"
          className="form-control"
          id="price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Service Charge:</label>
        <input
          type="number"
          className="form-control"
          id="price"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Priority:</label>
        <textarea
          className="form-control"
          id="remarks"
          placeholder="Enter low, medium or high"
        />
      </div>
      <div className="form-group">
        <label htmlFor="price">Details:</label>
        <input
          type="number"
          className="form-control"
          id="price"
        />
      </div>
    </form>
  </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleModal("service")}>
            Go Back
          </Button>
          <Button color="primary" onClick={handleServiceSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modalOther} toggle={() => toggleModal("other")}>
        <ModalHeader toggle={() => toggleModal("other")}>Other</ModalHeader>
        <ModalBody>
    <form>
      <div className="form-group">
        <label htmlFor="productName">Category</label>
        <input
          type="text"
          className="form-control"
          id="productName"
          placeholder="Enter category"
        />
      </div>
      <div className="form-group">
        <label htmlFor="remarks">Description:</label>
        <textarea
          className="form-control"
          id="remarks"
   
          // Example: value={remarks} onChange={(e) => setRemarks(e.target.value)}
        />
      </div>
    </form>
  </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={() => toggleModal("other")}>
            Go Back
          </Button>
          <Button color="primary" onClick={handleOtherSubmit}>
            Submit
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default LeadManagement;