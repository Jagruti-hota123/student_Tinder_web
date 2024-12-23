import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connection);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      console.log(res);
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return null;
  if (connections.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <h1 className="text-3xl font-bold text-gray-700">
          No connections found
        </h1>
      </div>
    );

  return (
    <div className="my-10 max-w-4xl mx-auto">
      <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
        Connections
      </h1>
      <div className="flex flex-col gap-6">
        {connections.map((connection, index) => {
          const { firstName, lastName, photoUrl, age, gender, about } =
            connection;
          return (
            <div
              key={index}
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
