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
import { resetPassword } from "../../axios/authAxios";
import { toast } from "react-toastify";

type ResetFormData = {
  email: string;
};

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>();

  const onSubmit: SubmitHandler<ResetFormData> = async (data) => {
    const result = await resetPassword(data);
    if (result?.status === "error") {
      reset();
      return toast.error(result?.message);
    } else {
      toast.success(result?.message);
    }
    reset();
  };
  return (
    <>
      <Row className="min-vh-100 gap-1" style={{ maxHeight: "100vh" }}>
        <Col
          xs={12}
          md={6}
          style={{ maxHeight: "100vh" }}
          className="p-0 noshowPic-SmallScreens"
        >
          <Image
            src="https://images.unsplash.com/photo-1726074268663-5d6bafae5120?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9yZ290fGVufDB8fDB8fHww"
            className="img-fluid h-100"
          />
        </Col>
        <Col className="d-flex justify-content-center align-items-center flex-column p-4 ">
          <Container>
            <Row className="pt-5">
              <h2
                className="text-center pb-0 mb-0"
                style={{ color: "rgba(241, 174, 49, 0.717)" }}
              >
                Forgot Password !
              </h2>
              <p
                className="text-center p-0 fst-italic text-primary"
                // style={{ color: "#9966CC" }}
              >
                Enter email to send reset link
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
      </Row>
    </>
  );
};

export default ForgotPassword;
