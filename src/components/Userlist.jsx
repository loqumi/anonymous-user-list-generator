import React from "react";
import { IoEarthSharp } from "react-icons/io5";

const Userlist = () => {
  const [users, setUsers] = React.useState([]);
  const [nat, setNat] = React.useState("gb");
  const [count, setCount] = React.useState(0);
  const [seed, setSeed] = React.useState(
    Math.floor(Math.random() * 10000000) + 1
  );

  const url = React.useMemo(
    () =>
      `https://randomuser.me/api/?nat=${nat}&results=10&seed=${seed + count}`,
    [nat, seed, count]
  );

  const addUsers = React.useCallback(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      const i = count + 1;
      setCount(i);
      const response = await fetch(url);
      const data = await response.json();
      setUsers((prev) => [...prev, ...data.results]);
    }
  }, [count, url]);

  React.useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const data = await response.json();
      setUsers(data.results);
    };
    fetchData();
    window.addEventListener("scroll", addUsers);
    return () => window.removeEventListener("scroll", addUsers);
  }, [addUsers, url]);

  return (
    <div>
      <h1 className="title">List of Users</h1>
      <h2 className="subtitle">Toolbar</h2>
      <div className="columns">
        <div className="column control has-icons-left">
          <div className="select">
            <select onChange={(e) => setNat(e.target.value)}>
              <option defaultValue value={"gb"}>
                United Kingdom
              </option>
              <option value={"us"}>United States</option>
              <option value={"au"}>Australia</option>
            </select>
            <div className="icon is-left">
              <IoEarthSharp />
            </div>
          </div>
        </div>
        <div className="column control">
          <div className="field is-grouped">
            <form action="">
              <input type="text" />
              <p className="control">
                <button className="button is-danger">Submit</button>
              </p>
              <p className="control">
                <button className="button is-danger">Random</button>
              </p>
            </form>
          </div>
        </div>
      </div>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>ID</th>
            <th>Full Name</th>
            <th>Location</th>
            <th>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((user, index) => (
            <tr key={user.id.value}>
              <td>{index + 1}</td>
              <td>{user.id.value}</td>
              <td>
                {user.name.first}
                {user.name.last}
              </td>
              <td>
                {user.location.country}
                {user.location.city}
                {user.location.postcode}
                {user.location.street.name}
              </td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
