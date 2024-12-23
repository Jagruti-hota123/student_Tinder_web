/* eslint-disable react/prop-types */
import { useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { addUser } from "../utils/userSlice";
import UserCard from "./UserCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [error, setError] = useState("");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [about, setAbout] = useState(user?.about || "");
  const [photoUrl, setPhotoUrl] = useState(user?.photoUrl || "");
  const dispatch = useDispatch();

  async function handleSave() {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, age, gender, about, photoUrl },
        { withCredentials: true }
      );
      console.log(res.data);
      dispatch(addUser(res?.data?.data));
    } catch (error) {
      //   setError(error?.response?.data?.msg || "An error occurred.");
      console.error(error);
    }
  }

  return (
    <div className="flex flex-col md:flex-row justify-center items-center gap-4">
      <div className="card bg-white w-96 shadow-xl">
        <div className="card-body">
          <h2 className="text-center font-bold text-2xl text-gray-700">
            Edit Profile
          </h2>
          <form action="">
            <label htmlFor="firstName" className="text-gray-600 form-control">
              Firstname:-
            </label>
            <input
              type="text"
              placeholder="First Name"
              className="bg-blue-400 rounded-lg p-2 w-full my-2 text-black"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <label htmlFor="lastName" className="text-gray-600  form-control">
              Lastname:-
            </label>
            <input
              type="text"
              placeholder="Last Name"
              className="bg-blue-400 rounded-lg p-2 w-full my-2 text-black"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <label htmlFor="age" className="text-gray-600 form-control">
              Age:-
            </label>
            <input
              type="number"
              placeholder="Age"
              className="bg-blue-400 rounded-lg p-2 w-full my-2 text-black"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <label htmlFor="gender" className="text-gray-600 form-control  ">
              Gender:-
            </label>
            <select
              className="bg-blue-400 rounded-lg p-2 w-full my-2 text-black"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <label htmlFor="photoUrl" className="text-gray-600 form-control">
              Photo:-
            </label>
            <input
              type="text"
              placeholder="Photo Url"
              className="bg-blue-400 rounded-lg p-2 w-full my-2 text-black"
              value={photoUrl}
              onChange={(e) => setPhotoUrl(e.target.value)}
            />
            <label htmlFor="about" className="text-gray-600 form-control ">
              About:-
            </label>
            <textarea
              type="text"
              placeholder="About"
              className="bg-blue-400 rounded-lg p-2 w-full my-2 text-black"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            />
          </form>
          {error && <p className="text-red-500">{error}</p>}
          <div className="card-actions justify-center">
            <button className="btn btn-primary " onClick={handleSave}>
              Save Profile
            </button>
          </div>
        </div>
      </div>
      <div>
        <UserCard
          user={{ firstName, lastName, age, about, gender, photoUrl }}
        />
      </div>
    </div>
  );
};

export default EditProfile;
