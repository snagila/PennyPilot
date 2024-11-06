import React, { FC } from "react";
import { Col, Form, Row } from "react-bootstrap";
import { BsArrowDownCircleFill, BsArrowUpCircleFill } from "react-icons/bs";

export interface TransactionItem {
  _id: string;
  type: string;
  description: string;
  amount: number;
  date: string;
}

interface EachTransactionProps {
  setIdToDelete: React.Dispatch<React.SetStateAction<string[]>>;
  idToDelete: string[];
  item: TransactionItem;
}

const EachTransaction: FC<EachTransactionProps> = ({
  setIdToDelete,
  idToDelete,
  item,
}) => {
  const handleCheckedBox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    if (checked) {
      setIdToDelete([...idToDelete, name]);
    } else {
      setIdToDelete(idToDelete.filter((id) => id !== item?._id));
    }
  };
  return (
    <>
      <div
        className="d-flex justify-content-between align-items-center  shadow-lg rounded p-2 mb-2 bordered gap-3"
        style={{
          background: idToDelete?.includes(item._id) ? "#B4A6AB" : "whitesmoke",
          color: idToDelete?.includes(item._id) ? "black" : "black",
        }}
      >
        <div className=" d-flex align-items-center  gap-3">
          <Form.Check
            name={item._id}
            checked={idToDelete.includes(item._id)}
            onChange={handleCheckedBox}
          />
          <div className="circle box-shadow-lg">
            {item.type === "income" ? (
              <BsArrowDownCircleFill fontSize={"40px"} color="#936ee3" />
            ) : (
              <BsArrowUpCircleFill fontSize={"40px"} color="#ffc532" />
            )}
          </div>
          <p className="fw-bold text-capitalize ">{item.description}</p>
        </div>
        <div className="flex-item">
          <Row>
            <Col lg={6} xs={12} md={6}>
              {item.type === "income" ? (
                <p className="text-success price">+${item.amount}</p>
              ) : (
                <p className="text-danger price">-${item.amount}</p>
              )}
            </Col>
            <Col lg={6} xs={12} md={6}>
              <p className="text-muted date">{item.date.slice(0, 10)}</p>
            </Col>
          </Row>
        </div>
      </div>
    </>
  );
};

export default EachTransaction;
