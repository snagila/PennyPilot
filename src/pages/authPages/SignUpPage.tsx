import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Spinner,
} from "react-bootstrap";
import SignupPic from "../../assets/signup.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import "./authPage.css";
import { signUpUser } from "../../axios/authAxios";
import { useState } from "react";
import { toast } from "react-toastify";
import { SignupFormData } from "../../interfaces/formsInterface/signUpFormsInterface";
import { Link } from "react-router-dom";

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>();
  const [conformPassword, setConformPassword] = useState<string>("");

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    const { password } = data;
    if (password !== conformPassword) {
      return toast.error("Passwords do not match.");
    }
    const result = await signUpUser(data);
    if (result?.status === "error") {
      reset();
      setConformPassword("");
      toast.error(result.message);
      return;
    }
    reset();
    setConformPassword("");
    toast.success(result?.message);
  };
  return (
    <>
      <Row className="min-vh-100 gap-1">
        <Col xs={12} md={6}>
          <Image src={SignupPic} className="img-fluid h-100" />
        </Col>
        <Col className="d-flex justify-content-center align-items-center flex-column p-4 ">
          <Container>
            <Row className="pt-5">
              <h2
                className="text-center pb-0 mb-0"
                style={{ color: "rgba(241, 174, 49, 0.717)" }}
              >
                Create your Account
              </h2>
              <p
                className="text-center p-0 fst-italic text-primary"
                // style={{ color: "#9966CC" }}
              >
                Sign up and start using PennyPilot today!
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
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      placeholder="Enter your first name"
                      type="text"
                      className="bg-dark text-light border-0  custom-placeholder"
                      {...register("firstName", {
                        //   required: true, this is for simple validation
                        required: "First Name is required", // this is to show error message using react hook form
                        min: 2,
                        max: 12,
                      })}
                    />
                    {errors.firstName && (
                      <div className="text-danger p-1">
                        {errors.firstName.message}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      placeholder="Enter your last name"
                      type="text"
                      className="bg-dark text-light border-0  custom-placeholder"
                      {...register("lastName", {
                        required: "Last Name is required",
                      })}
                    />
                    {errors.lastName && (
                      <div className="text-danger">
                        {errors.lastName.message}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      placeholder="Enter your email"
                      type="text"
                      className="bg-dark text-light border-0  custom-placeholder"
                      {...register("email", {
                        required: "Email is required",
                      })}
                    />
                    {errors.email && (
                      <div className="text-danger">{errors?.email.message}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      placeholder="Enter your Phone"
                      type="number"
                      className="bg-dark text-light border-0  custom-placeholder"
                      {...register("phone", {
                        required: "Phone is required",
                      })}
                    />
                    {errors.phone && (
                      <div className="text-danger">{errors.phone.message}</div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      className="bg-dark text-light border-0  custom-placeholder"
                      placeholder="Enter your password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                    {errors.password && (
                      <div className="text-danger">
                        {errors.password.message}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                      className="bg-dark text-light border-0  custom-placeholder"
                      placeholder="Re enter your password"
                      value={conformPassword}
                      onChange={(e) => setConformPassword(e.target.value)}
                      required
                    />
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
            <Row className="pt-3 text-white">
              <div>
                <span className="fst-italic">Have an account?</span>
                &nbsp;
                <Link to="/" style={{ display: "inline" }}>
                  {" "}
                  Login Now
                </Link>
              </div>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default SignUpPage;
