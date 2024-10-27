import { Button, Col, Container, Form, Image, Row } from "react-bootstrap";
import loginPic from "../../assets/loginPic.jpg";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link } from "react-router-dom";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "aa@gmail.com",
      password: "aa",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    console.log(data);
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
          <Image src={loginPic} className="img-fluid h-100" />
        </Col>
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
                    <Form.Label>E-mail</Form.Label>
                    <Form.Control
                      placeholder="Enter your email "
                      type="text"
                      className="bg-dark text-light border-0  custom-placeholder"
                      {...register("email", {
                        //   required: true, this is for simple validation
                        required: "Email is required", // this is to show error message using react hook form
                        min: 2,
                        max: 12,
                      })}
                    />
                    {errors.email && (
                      <div className="text-danger p-1">
                        {errors.email.message}
                      </div>
                    )}
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      placeholder="Enter your password"
                      type="text"
                      className="bg-dark text-light border-0  custom-placeholder"
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

                  <Button
                    className="w-100"
                    type="submit"
                    variant="outline-primary"
                  >
                    Submit
                  </Button>
                </Form>
              </div>
            </Row>
            <Row className="pt-3 text-white">
              <div>
                {" "}
                <span className="fst-italic">New to PennyPilot?</span>
                &nbsp;
                <Link
                  to="/signup"
                  className="no-linkeffect"
                  style={{ display: "inline" }}
                >
                  {" "}
                  SignUp Now
                </Link>
              </div>
            </Row>
            <Row className="pt-3 text-white">
              <div>
                {" "}
                <span className="fst-italic">Forgot password ?</span>
                &nbsp;
                <Link
                  to="/reset-password"
                  className="no-linkeffect"
                  style={{ display: "inline" }}
                >
                  {" "}
                  Reset Now
                </Link>
              </div>
            </Row>
          </Container>
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
