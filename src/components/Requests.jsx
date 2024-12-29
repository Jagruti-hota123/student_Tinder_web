import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { useEffect } from "react";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.request);

  const reviewRequest = async (status, _id) => {
    try {
      // eslint-disable-next-line no-unused-vars
      const res = await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        {
          headers: {
            authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      dispatch(removeRequest(_id));
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRequest = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/received", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRequest();
  }, []);

  useEffect(() => {
    console.log("Current requests:", requests);
  }, [requests]);

  if (!requests) return null;
  if (requests.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-gray-700">No requests found</h1>
      </div>
    );

  return (
    <div className="my-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Requests
      </h1>
      <div className="flex flex-col gap-6">
        {requests.map((request) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about } =
            request.senderId;
          return (
            <div
              key={_id}
              className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow"
            >
              <img
                src={photoUrl || "https://via.placeholder.com/100"}
                alt="photo"
                className="w-20 h-20 rounded-full border border-gray-300"
              />
              <div className="flex-1">
                <h2 className="text-xl font-semibold text-gray-800">
                  {firstName + " " + lastName}
                </h2>
                {age && gender && (
                  <p className="text-gray-500">
                    {age} years old, {gender}
                  </p>
                )}
                <p className="mt-2 text-gray-600">
                  {about || "No bio available."}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-primary"
                  onClick={() => reviewRequest("rejected", request._id)}
                >
                  Reject
                </button>
                <button
                  className="btn btn-accent"
                  onClick={() => reviewRequest("accepted", request._id)}
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
