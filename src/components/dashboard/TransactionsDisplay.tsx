import { FC } from "react";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Col, Row } from "react-bootstrap";
import { GiSevenPointedStar } from "react-icons/gi";
import { RiDeleteBin6Line } from "react-icons/ri";
import EachTransaction, { TransactionItem } from "./EachTransaction";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { deleteTransactionsAction } from "../../redux/transactionRedux/transactionThunk";

interface TransactionsDisplayProps {
  exprenseTransactions: object[];
  incomeTransactions: object[];
  allTransactions: object[];
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

  const handleOnDelete = async () => {
    const result = await dispatch(deleteTransactionsAction(idToDelete));

    // setIdToDelete([]);
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
            {idToDelete?.length > 0 && (
              <RiDeleteBin6Line
                color="red"
                className="fs-4"
                role="button"
                onClick={handleOnDelete}
              />
            )}
          </div>
        </Col>
      </Row>
      <Row>
        <Col xs={12} md={8} lg={8} className="p-4 transaction-Table">
          {list?.map((item, i) => {
            return (
              <EachTransaction
                key={i}
                setIdToDelete={setIdToDelete}
                idToDelete={idToDelete}
                item={item as TransactionItem}
              />
            );
          })}
        </Col>
        <Col xs={12} md={4} lg={4} className="">
          <div className="box-shadow-lg  p-3">
            <p className="fw-bold">Budget Rules</p>
            <p>
              <GiSevenPointedStar /> The art is not in making money, but in
              keeping it.
            </p>
            <p>
              <GiSevenPointedStar /> It's not your salary that makes you rich,
              it's your spending habits.
            </p>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default TransactionsDisplay;
