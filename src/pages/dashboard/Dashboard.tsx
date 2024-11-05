import { FC } from "react";
import NabBar from "../../components/dashboard/NabBar";
import { Col, Container, Row } from "react-bootstrap";
import TransactionForm from "../../components/dashboard/TransactionForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";

const Dashboard: FC = () => {
  const { transactions, loading, error } = useSelector(
    (state: RootState) => state.transaction
  );
  console.log(loading);
  return (
    <>
      <NabBar />
      <Container>
        <Row>
          <Col></Col>
          <Col>
            <TransactionForm loading={loading} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Dashboard;
