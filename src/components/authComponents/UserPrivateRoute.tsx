import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../../redux/store";
import { FC } from "react";

const User_Private_Route: FC = ({}) => {
  const { user } = useSelector((state: RootState) => state.user);
  if (user?._id) {
    return <Outlet />;
  }
  return <Navigate to="/" />;
};

export default User_Private_Route;
