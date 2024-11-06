import { FC } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../redux/store";
import { CiLogout } from "react-icons/ci";
import { useDispatch } from "react-redux";
import { logoutUserAction } from "../../redux/userRedux/userThunk";

const NabBar: FC = () => {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const handleLogOut = (): void => {
    dispatch(logoutUserAction());
  };
  return (
    <>
      <Navbar className="box-shadow-lg">
        <Container>
          <Navbar.Brand href="#home" style={{ color: "whitesmoke" }}>
            {user?.firstName} {user?.lastName}
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse className="justify-content-end">
            <Nav.Link
              role="button"
              style={{ color: "whitesmoke" }}
              onClick={handleLogOut}
            >
              Signout
              <CiLogout className="fs-4 fw-bold" color="white" />
            </Nav.Link>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NabBar;
