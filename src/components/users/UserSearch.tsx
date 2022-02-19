import { ChangeEvent, FormEvent, useState, useContext } from "react";
import AlertContext from "../../context/alert/alertContext";
import GithubContext from "../../context/github/githubContext";
import { searchUsers } from "../../context/github/githubActions";

function UserSearch() {
  const [text, setText] = useState("");

  const { users, dispatch } = useContext(GithubContext);
  const { setAlert } = useContext(AlertContext);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setText(e.target.value);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (text === "") {
      setAlert("Please enter something", "error");
    } else {
      dispatch({ type: "SET_LOADING" });
      const users = await searchUsers(text);
      dispatch({
        type: "GET_USERS",
        payload: users,
      });
      setText("");
    }
  };

  const handleClick = () => {
    dispatch({ type: "CLEAR_USERS" });
  };
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 mb gap-8">
      <div>
        <form onSubmit={handleSubmit}>
          <div className="form-control">
            <div className="relative">
              <input
                type="text"
                className="w-full pr-40 bg-base-200 input input-lg text-base-content"
                value={text}
                placeholder="Search"
                onChange={handleChange}
              />
              <button
                type="submit"
                className="absolute top-0 right-0 rounded-l-none w-36 btn btn-primary btn-lg"
              >
                Go
              </button>
            </div>
          </div>
        </form>
      </div>
      {users.length > 0 && (
        <div>
          <button className="btn btn-ghost bgn lg" onClick={handleClick}>
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default UserSearch;
