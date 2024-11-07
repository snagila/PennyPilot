import { Button, Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useDispatch } from "react-redux";
import { loginUser } from "../../axios/authAxios";
import { toast } from "react-toastify";
import { AppDispatch, RootState } from "../../redux/store";
import { getUserDataAction } from "../../redux/userRedux/userThunk";
import { useSelector } from "react-redux";
import { useEffect } from "react";

type LoginFormData = {
  email: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const { user } = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    defaultValues: {
      email: "sachinnagila2053@gmail.com",
      password: "aa",
    },
  });

  const onSubmit: SubmitHandler<LoginFormData> = async (
    formData
  ): Promise<void> => {
    const result = await loginUser(formData);

    if (result?.status === "error") {
      toast.error(result?.message);
      return;
    }
    if (result?.status === "success") {
      sessionStorage.setItem("accessJWT", result.data.accessJWT);
      localStorage.setItem("refreshJWT", result.data.refreshJWT);
      dispatch(getUserDataAction());
    }
  };

  useEffect(() => {
    dispatch(getUserDataAction());
    if (user?._id) {
      navigate("/user/dashboard");
    }
  }, [user]);
  return (
    <>
      <Row className="min-vh-100 gap-1" style={{ maxHeight: "100vh" }}>
        <Col
          xs={12}
          md={6}
          className="noshowPic-SmallScreens"
          style={{ maxHeight: "100vh" }}
        >
          {/* FOR LAZY LOADING */}
          {/* https://blog.webdevsimplified.com/2023-05/lazy-load-images/ */}
          <div style={{ width: "100%", height: "100%" }}>
            <LazyLoadImage
              // src={loginPic}
              src="https://images.unsplash.com/photo-1593672715438-d88a70629abe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXl8ZW58MHx8MHx8fDA%3D"
              effect="blur"
              height="100%"
              width="100%"
              alt="Login background"
              placeholder={
                <img
                  src="https://images.unsplash.com/photo-1593672715438-d88a70629abe?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8bW9uZXl8ZW58MHx8MHx8fDA%3D"
                  alt="Placeholder"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              }
            />
          </div>
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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? <Spinner animation="border" /> : "Submit"}
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
