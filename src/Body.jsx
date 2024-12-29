import { Outlet, useNavigate } from "react-router-dom";
import { Footer, Navbar } from "./components";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "./utils/constants";
import axios from "axios";
import { addUser } from "./utils/userSlice";
import { useEffect } from "react";

const Body = () => {
  const userData = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUser = async () => {
    try {
      if (userData) return;
      const res = await axios.get(BASE_URL + "/profile/view", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
      });

      dispatch(addUser(res.data));
    } catch (error) {
      if (error.response.status === 400 || error.status === 400) {
        navigate("/login");
      }

      console.error(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
};

export default Body;
