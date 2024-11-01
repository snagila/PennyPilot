import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { newPasswordReset } from "../../axios/authAxios";
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";

type NewPassWord = {
  newPassword: string;
  confirmPassword: string;
};
const NewPassWordPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NewPassWord>();

  const [message, setMessage] = useState<string | undefined>("");
  const [params] = useSearchParams();

  const email = params.get("e");
  const token = params.get("id");

  const onSubmit: SubmitHandler<NewPassWord> = async (data): Promise<void> => {
    const { newPassword, confirmPassword } = data;
    if (newPassword !== confirmPassword) {
      toast.error("Passwords must match.");
      return;
    }
    const result = await newPasswordReset({ newPassword, email, token });
    setMessage(result?.message);
  };

  return (
    <>
      <Row className="min-vh-100 gap-1" style={{ maxHeight: "100vh" }}>
        <Col
          xs={12}
          md={6}
          className="noshowPic-SmallScreens"
          style={{ maxHeight: "100vh" }}
        >
          <div style={{ width: "100%", height: "100%" }}>
            <LazyLoadImage
              src="https://images.unsplash.com/photo-1533165899829-6ddfc2f95fec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9ja3xlbnwwfHwwfHx8MA%3D%3D"
              effect="blur"
              height="100%"
              width="100%"
              alt="Login background"
              placeholder={
                <Image
                  src="https://images.unsplash.com/photo-1533165899829-6ddfc2f95fec?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bG9ja3xlbnwwfHwwfHx8MA%3D%3D"
                  className="img-fluid h-100"
                />
              }
            />
          </div>
        </Col>
        {!message && (
          <Col className="d-flex justify-content-center align-items-center flex-column p-4 ">
            <Container>
              <Row className="">
                <h2
                  className="text-center pb-0 mb-0"
                  style={{ color: "rgba(241, 174, 49, 0.717)" }}
                >
                  Login to PennyPilot
                </h2>
                <p
                  className="text-center p-0 fst-italic text-primary"
                  // style={{ color: "#9966CC" }}
                >
                  Transaction tracking made easier.
                </p>
              </Row>
              <Row>
                <div className=" p-0 ">
                  <Form
                    className="gap-1 w-100 "
                    style={{ color: "white", opacity: "0.8" }}
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <Form.Group className="mb-2">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        placeholder="Enter new password "
                        type="text"
                        className="bg-dark text-light border-0  custom-placeholder"
                        {...register("newPassword", {
                          //   required: true, this is for simple validation
                          required: "Password is required", // this is to show error message using react hook form
                          min: 2,
                          max: 12,
                        })}
                      />
                      {errors.newPassword && (
                        <div className="text-danger p-1">
                          {errors.newPassword.message}
                        </div>
                      )}
                    </Form.Group>

                    <Form.Group className="mb-2">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        placeholder="Enter your email "
                        type="text"
                        className="bg-dark text-light border-0  custom-placeholder"
                        {...register("confirmPassword", {
                          //   required: true, this is for simple validation
                          required: "ConfirmPassword is required", // this is to show error message using react hook form
                          min: 2,
                          max: 12,
                        })}
                      />
                      {errors.confirmPassword && (
                        <div className="text-danger p-1">
                          {errors.confirmPassword.message}
                        </div>
                      )}
                    </Form.Group>

                    <Button
                      className="w-100"
                      type="submit"
                      variant="outline-primary"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner animation="border" /> : "Submit"}
                    </Button>
                  </Form>
                </div>
              </Row>
            </Container>
          </Col>
        )}
        {message && (
          <Col className="d-flex justify-content-center align-items-center flex-column p-4 text-white">
            <Container>
              <h3>{message}</h3>

              <Row>
                <Link to={"/"}>Login Now</Link>
              </Row>
            </Container>
          </Col>
        )}
      </Row>
    </>
  );
};

export default NewPassWordPage;
