import { Link } from "react-router-dom";

export default function NavBar() {
  return (
    <>
      <Link to="/" className="btn btn-ghost normal-case text-xl">
        ChatApp
      </Link>

      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">Profile</Link>
      </li>
      <li>
        <Link to="/settings">Settings</Link>
      </li>

      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/signup">Sign Up</Link>
      </li>
    </>
  );
}
