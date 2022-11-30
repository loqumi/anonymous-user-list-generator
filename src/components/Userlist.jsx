import React from "react";
import { IoEarthSharp } from "react-icons/io5";
import { generateErrorsForRecord } from "../js/ErrorGen.js";

const Userlist = () => {
  const [users, setUsers] = React.useState([]);
  const [nat, setNat] = React.useState("gb");
  const [count, setCount] = React.useState(0);
  const [length, setLength] = React.useState(20);
  const [errorCount, setErrorCount] = React.useState(0);
  const [seed, setSeed] = React.useState(0);

  const url = React.useMemo(
    () =>
      `https://randomuser.me/api/?nat=${nat}&results=${length}&seed=${
        Number(seed) + Number(count)
      }`,
    [nat, seed, length, count]
  );

  const incrementCount = () => setCount((prev) => prev + 1);

  const addUsers = React.useCallback(async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      incrementCount();
      const data = await fetch(url).then((res) => res.json());
      setUsers((prev) => [
        ...prev,
        ...data.results.map((acc) => generateErrorsForRecord(errorCount, acc)),
      ]);
    }
  }, [url, errorCount]);

  React.useEffect(() => {
    setLength(10);
    if (!users.length && !count) {
      const fetchData = async () => {
        const data = await fetch(url).then((res) => res.json());
        setUsers(
          data.results.map((acc) => generateErrorsForRecord(errorCount, acc))
        );
      };
      fetchData().catch((e) => console.log(e));
      incrementCount();
    }
    window.addEventListener("scroll", addUsers);
    return () => window.removeEventListener("scroll", addUsers);
  }, [addUsers, setLength, errorCount, count, url, users.length]);

  const handleChange = (e) => {
    setNat(e.target.value);
    setUsers([]);
    setCount(0);
    setLength(20);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUsers([]);
    setCount(0);
    setLength(20);
  };

  const randomSeed = (e) => {
    e.preventDefault();
    setSeed(Math.floor(Math.random() * 10000000));
    setUsers([]);
    setCount(0);
    setLength(20);
  };

  return (
    <div>
      <h1>hahaha</h1>
      <h1>dont look</h1>
      <nav className="navbar is-fixed-top has-background-black">
        <div className="columns is-vcentered">
          <div className="column ml-6 is-3 control has-icons-left">
            <div className="select">
              <select onChange={handleChange}>
                <option defaultValue value={"au"}>
                  Australia
                </option>
                <option value={"ca"}>Canada</option>
                <option value={"ch"}>Switzerland</option>
                <option value={"de"}>Germany</option>
                <option value={"dk"}>Denmark</option>
                <option value={"es"}>Spain</option>
                <option value={"fr"}>France</option>
                <option value={"gb"}>United Kingdom</option>
                <option value={"ie"}>Ireland</option>
                <option value={"in"}>India</option>
                <option value={"mx"}>Mexico</option>
                <option value={"nl"}>Netherlands</option>
                <option value={"no"}>Norway</option>
                <option value={"rs"}>Serbia</option>
                <option value={"us"}>United States</option>
              </select>
              <div className="icon is-left">
                <IoEarthSharp />
              </div>
            </div>
          </div>
          <div className="column is-5 control">
            <form
              className="field is-grouped columns is-vcentered"
              onSubmit={handleSubmit}
            >
              <div className="control column is-4">
                <input
                  type="range"
                  value={errorCount}
                  min="0"
                  max="1000"
                  step="0.5"
                  onChange={(e) => setErrorCount(e.target.value)}
                />
              </div>
              <div className="control column is-3 is-grouped">
                <input
                  type="text"
                  className="input"
                  value={errorCount}
                  onChange={(e) => setErrorCount(e.target.value)}
                />
              </div>
              <button className="button is-white">Submit</button>
            </form>
          </div>
          <div className="column control is-6">
            <form onSubmit={handleSubmit} className="field is-grouped columns">
              <button
                type="reset"
                className="button is-link mr-1"
                onClick={randomSeed}
              >
                Random seed
              </button>
              <input
                className="input column is-5 mr-1"
                type="text"
                placeholder={`${"seed:"}${seed}`}
                name="seed"
                onChange={(e) => setSeed(e.target.value)}
              />
              <button type="submit" className="button is-danger">
                Search in seed
              </button>
            </form>
          </div>
        </div>
      </nav>
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
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.id}</td>
              <td>{user.fullName}</td>
              <td>{user.location}</td>
              <td>{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Userlist;
