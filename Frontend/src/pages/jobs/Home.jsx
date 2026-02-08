import { Link } from "react-router-dom";
import JobFeed from "../../components/JobFeed";

export default function Home() {
  return (
    <div>
      <h1>Home</h1>

      <Link to="/login">Go to Login</Link> <br />
      <Link to="/register">Go to Register</Link>
      <JobFeed/>
    </div>
  );
}
