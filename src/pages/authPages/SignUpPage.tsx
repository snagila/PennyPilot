import { Button, Col, Form, Image, Row } from "react-bootstrap";
import SignupPic from "../../assets/signup.jpg";
import { SubmitHandler, useForm } from "react-hook-form";

type FormFields = {
  firstName: string;
  lastName: string;
  email: string;
  phone: number;
  password: string;
};

const SignUpPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormFields>();

  const onSubmit: SubmitHandler<FormFields> = (data) => {
    console.log(data);
  };
  return (
    <>
      <Row className="min-vh-100 gap-1">
        <Col xs={12} md={6}>
          <Image src={SignupPic} className="img-fluid h-100" />
        </Col>
        <Col className=" ">
          <Row className="pt-5">
            <h2 className="text-center pb-0 mb-0" style={{ color: "#333333" }}>
              Create your Account
            </h2>
            <p className="text-center p-0 fst-italic">
              Sign up and start using PennyPilot today!
            </p>
          </Row>
          <Row>
            <div
              className=" d-flex justify-content-center align-items-center "
              //   style={{ height: "80vh" }}
            >
              <Form className="gap-1 w-75" onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-2">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    placeholder="Enter your first name"
                    type="text"
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
                    {...register("lastName", {
                      required: "First Name is required",
                    })}
                  />
                  {errors.lastName && (
                    <div className="text-danger">{errors.lastName.message}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>E-mail</Form.Label>
                  <Form.Control
                    placeholder="Enter your email"
                    type="text"
                    {...register("email", {
                      required: "email is required",
                    })}
                  />
                  {errors.lastName && (
                    <div className="text-danger">{errors.lastName.message}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    placeholder="Enter your Phone"
                    type="number"
                    {...register("phone", {
                      required: "First Name is required",
                    })}
                  />
                  {errors.phone && (
                    <div className="text-danger">{errors.phone.message}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "First Name is required",
                    })}
                  />
                  {errors.password && (
                    <div className="text-danger">{errors.password.message}</div>
                  )}
                </Form.Group>

                <Form.Group className="mb-2">
                  <Form.Label>Conform Password</Form.Label>
                  <Form.Control placeholder="Re enter your password" required />
                </Form.Group>

                <Button className="w-100" type="submit">
                  Submit
                </Button>
              </Form>
            </div>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default SignUpPage;
