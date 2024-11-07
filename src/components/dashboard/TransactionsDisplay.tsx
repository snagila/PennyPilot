import { FC } from "react";
import { useEffect, useState } from "react";
import { Alert, Button, ButtonGroup, Col, Row, Spinner } from "react-bootstrap";
import { RiDeleteBin6Line } from "react-icons/ri";
import EachTransaction, { TransactionItem } from "./EachTransaction";
import { AppDispatch, RootState } from "../../redux/store";
import { deleteTransactionsAction } from "../../redux/transactionRedux/transactionThunk";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import LineCharts, { Transaction } from "./LineChart";

interface TransactionsDisplayProps {
  exprenseTransactions: Transaction[];
  incomeTransactions: Transaction[];
  allTransactions: Transaction[];
}
const TransactionsDisplay: FC<TransactionsDisplayProps> = ({
  exprenseTransactions,
  incomeTransactions,
  allTransactions,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const btns = ["All", "Income", "Expenses"];
  const [button, setButton] = useState("All");
  const [list, setlist] = useState<object[]>([]);
  const [idToDelete, setIdToDelete] = useState<string[]>([]);

  const { loading, error } = useSelector(
    (state: RootState) => state.transaction
  );
  const handleBtnClick = (item: string) => {
    setButton(item);
    if (item === "Income") {
      setlist(incomeTransactions);
    } else if (item === "Expenses") {
      setlist(exprenseTransactions);
    } else {
      setlist([...allTransactions]);
    }
  };

  const handleOnDelete = () => {
    dispatch(deleteTransactionsAction(idToDelete));
    if (loading === false) {
      setIdToDelete([]);
    }
  };
  useEffect(() => {
    setlist([...allTransactions]);
  }, [allTransactions]);
  return (
    <>
      <Row>
        <Col xs={12} md={8} lg={8}>
          <div className="py-4 d-flex justify-content-between">
            <ButtonGroup aria-label="Basic example" className="shadow-lg ">
              {btns.map((item, i) => {
                return (
                  <Button
                    key={i}
                    style={{
                      background: item === button ? "#FFC532" : "#BB8B32",
                      color: item === button ? "white" : "black",
                      fontWeight: "bold",
                      border: "none",
                    }}
                    onClick={() => handleBtnClick(item)}
                  >
                    {item}
                  </Button>
                );
              })}
            </ButtonGroup>
            {idToDelete?.length > 0 &&
              (loading ? (
                <Spinner animation="border" />
              ) : (
                <RiDeleteBin6Line
                  color="red"
                  className="fs-4"
                  role="button"
                  onClick={handleOnDelete}
                />
              ))}
            {error && <Alert variant="danger">{error}</Alert>}
          </div>
        </Col>
      </Row>

      {list.length === 0 ? (
        <Row
          style={{ height: "35vh" }}
          className="justify-content-center align-items-center text-danger"
        >
          No transactions found !!!
        </Row>
      ) : (
        <Row className="">
          <Col xs={12} md={8} lg={8} className=" transaction-Table">
            {list?.map((item, i) => {
              return (
                item && (
                  <EachTransaction
                    key={i}
                    setIdToDelete={setIdToDelete}
                    idToDelete={idToDelete}
                    item={item as TransactionItem}
                  />
                )
              );
            })}
          </Col>
          <Col xs={12} md={4} lg={4} className="pt-4">
            <LineCharts allTransactions={allTransactions} />
          </Col>
        </Row>
      )}
    </>
  );
};

export default TransactionsDisplay;
