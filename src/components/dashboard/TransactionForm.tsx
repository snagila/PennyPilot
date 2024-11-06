import { FC } from "react";
import { Button, Form, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { addTransactionAction } from "../../redux/transactionRedux/transactionThunk";

type TransactionFormData = {
  type: string;
  description: string;
  amount: number;
  date: Date;
};

interface TransactionFormProps {
  loading: boolean;
}
const TransactionForm: FC<TransactionFormProps> = ({ loading }) => {
  const dispatch = useDispatch<AppDispatch>();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TransactionFormData>();

  const onSubmit: SubmitHandler<TransactionFormData> = async (
    formData
  ): Promise<void> => {
    dispatch(addTransactionAction(formData));
    if (!loading) {
      reset();
    }
  };
  return (
    <>
      <Form
        className="gap-1 w-100 "
        style={{ color: "white", opacity: "0.8" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Form.Group className="mb-2">
          <Form.Select
            className="bg-dark text-light border-0  custom-placeholder"
            style={{ color: "#b0b0b0" }}
            {...register("type", {
              //   required: true, this is for simple validation
              required: "Type is required", // this is to show error message using react hook form
            })}
          >
            <option value="">--select--</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
          {errors.type && (
            <div className="text-danger p-1">{errors.type.message}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Description"
            type="text"
            className="bg-dark text-light border-0  custom-placeholder"
            {...register("description", {
              required: "Description is required",
            })}
          />
          {errors.description && (
            <div className="text-danger">{errors.description.message}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Amount ($)"
            type="text"
            className="bg-dark text-light text-secondary border-0  custom-placeholder"
            {...register("amount", {
              required: "Amount is required",
            })}
          />
          {errors.amount && (
            <div className="text-danger">{errors.amount.message}</div>
          )}
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Control
            placeholder="Date"
            type="date"
            className="bg-dark text-light border-0  "
            {...register("date", {
              required: "Description is required",
            })}
          />
          {errors.date && (
            <div className="text-danger">{errors.date.message}</div>
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
    </>
  );
};

export default TransactionForm;
