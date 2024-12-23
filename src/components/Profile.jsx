import { useSelector } from "react-redux";
import EditProfile from "./EditProfile";

const Profile = () => {
  const user = useSelector((store) => store.user);

  return (
    user && (
      <div className="flex justify-center items-center h-[120vh] overflow-y-auto bg-gray-100 p-4">
        <EditProfile user={user} />
      </div>
    )
  );
};

export default Profile;
