import { useState } from "react";
import { Col, Container, Image, Row, Spinner } from "react-bootstrap";
import { MdVerifiedUser } from "react-icons/md";
import { Link } from "react-router-dom";

const VerifyEmail = () => {
  const [emailVerifying, setEmailVerifying] = useState<boolean>(false);
  const [emailVerified, setEmailVerified] = useState<boolean>(true);
  return (
    <>
      <Row className="min-vh-100 gap-1">
        <Col xs={12} md={6}>
          <Image
            src={
              "https://images.unsplash.com/photo-1614064849348-46bfef75deb8?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            className="img-fluid h-100"
          />
        </Col>
        <Col className="d-flex justify-content-center align-items-center flex-column p-4 ">
          <Container>
            {emailVerifying && (
              <Row className="pt-5">
                <div className="text-center">
                  <Spinner animation="border" variant="warning" />
                </div>

                <p
                  className="text-center p-0 fst-italic pt-2"
                  style={{ color: "whitesmoke" }}
                >
                  Please wait while we verify your account.
                </p>
              </Row>
            )}
            {emailVerified && (
              <Row className="pt-5">
                <div className="text-center">
                  <MdVerifiedUser size={100} color="white" />
                </div>
                <p
                  className="text-center p-0 fst-italic pt-2 fs-4"
                  style={{ color: "whitesmoke" }}
                >
                  Email verified. <Link to={"/login"}>Login Now</Link>
                </p>
              </Row>
            )}
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default VerifyEmail;
