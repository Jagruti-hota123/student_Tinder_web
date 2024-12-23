/* eslint-disable react/prop-types */
// eslint-disable-next-line react/prop-types
const UserCard = ({ user }) => {
  const { firstName, lastName, age, about, gender, photoUrl } = user;

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
            <button className="btn btn-primary">Ignore</button>
            <button className="btn btn-secondary">Interested</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
