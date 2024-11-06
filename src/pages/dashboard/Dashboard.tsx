import { FC } from "react";
import NabBar from "../../components/dashboard/NabBar";
import { Col, Container, Row } from "react-bootstrap";
import TransactionForm from "../../components/dashboard/TransactionForm";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import PieChartData from "../../components/dashboard/PieChart";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";
import ModalForm from "../../components/dashboard/ModalForm";
import TransactionsDisplay from "../../components/dashboard/TransactionsDisplay";
import Footer from "../../components/dashboard/Footer";

const Dashboard: FC = () => {
  const { transactions, loading } = useSelector(
    (state: RootState) => state.transaction
  );

  const exprenseTransactions = transactions?.filter(
    (item) => item.type === "expense"
  );
  const expenseData = exprenseTransactions?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const incomeTransactions = transactions?.filter(
    (item) => item.type === "income"
  );
  const incomeData = incomeTransactions?.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );

  const totalbalance = incomeData - expenseData;
  return (
    <>
      <NabBar />
      <Container fluid className="mb-3">
        <Row className="p-2 mt-5">
          <Col
            xs={12}
            md={7}
            lg={7}
            className="chart box-shadow-lg rounded p-3  "
          >
            <Row>
              <Col xs={12} md={7} lg={5}>
                <PieChartData
                  expenseData={expenseData}
                  incomeData={incomeData}
                />
              </Col>
              <Col
                xs={12}
                md={5}
                lg={7}
                className="d-grid align-items-center mt-4 "
              >
                <Row>
                  <Row className="justify-content-center pb-4">
                    Your Transaction Summery
                  </Row>
                  <Row className="justify-content-between pt-2 m-0 p-0">
                    <Col className="d-flex gap-3 align-items-center">
                      <BsArrowDownCircleFill className="fs-3" color="#936ee3" />

                      <div>
                        <p className=" p-0 m-0 fw-bold">${incomeData}</p>
                        <p className="p-0 m-0">Income</p>
                      </div>
                    </Col>
                    <Col className="d-flex gap-3 align-items-center">
                      <BsArrowUpCircleFill className="fs-3" color="#ffc532" />
                      <div>
                        <p className="p-0 m-0 fw-bold">${expenseData}</p>
                        <p className="  p-0 m-0">Expense</p>
                      </div>
                    </Col>
                  </Row>
                </Row>
              </Col>
            </Row>
          </Col>

          <Col
            className=" p-3 d-md-block d-none d-flex justify-content-center align-items-center"
            xs={0}
            md={5}
            lg={5}
          >
            <div className="d-flex justify-content-center align-items-center">
              <TransactionForm loading={loading} />
            </div>
          </Col>
        </Row>
        <ModalForm />
        <Row className="box-shadow-lg mt-4">
          <Col xs={12} className=" text-center p-4">
            Available Balance :{" "}
            {totalbalance > 0 ? (
              <span className="fw-bold text-success">${totalbalance}</span>
            ) : (
              <span className="fw-bold text-danger">${totalbalance}</span>
            )}
          </Col>
        </Row>
        <TransactionsDisplay
          exprenseTransactions={exprenseTransactions}
          incomeTransactions={incomeTransactions}
          allTransactions={transactions}
        />
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
