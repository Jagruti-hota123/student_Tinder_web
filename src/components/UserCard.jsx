/* eslint-disable react/prop-types */

import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { removeUserFeed } from "../utils/feedSlice";
// eslint-disable-next-line react/prop-types
const UserCard = ({ user }) => {
  const { _id, firstName, lastName, age, about, gender, photoUrl } = user;
  const dispatch = useDispatch();
  const handleRequest = async (status, userId) => {
    try {
      const res = await axios.post(
        BASE_URL + "/request/send/" + status + "/" + userId,
        {},
       {
        headers: {
          authorization: "Bearer " + localStorage.getItem("token"),
        },
       }
      );
      dispatch(removeUserFeed(userId));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="card bg-white w-96 shadow-xl">
        <figure>
          <img src={photoUrl} alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{firstName + " " + lastName}</h2>
          <p>{about}</p>
          {age && gender && (
            <p>
              {age} years old, {gender}
            </p>
          )}
          <div className="card-actions justify-center">
            <button
              className="btn btn-primary"
              onClick={() => handleRequest("ignored", _id)}
            >
              Ignore
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => handleRequest("interested", _id)}
            >
              Interested
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
