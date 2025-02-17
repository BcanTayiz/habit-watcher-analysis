import { useLocation } from "react-router-dom";
import { BackBtn } from "../components/Common/BackBtn";
import moment from "moment";

export default function Analytics() {
  const location = useLocation();
  const habbit = location.state; // Receiving the habit object


  
  if (!habbit) {
    return <div><p>No habit data received.</p><BackBtn/></div>;
    
  }

  let now = moment();
  let diff = now.diff(habbit.created_at, "days", true);

  console.log(habbit)
  return (
    <div>
      <h1>Analytics Page</h1>
      <p>Habit Name: {habbit.name}</p>
      <p>Completed: {habbit.completed ? "✅ Yes" : "❌ No"}</p>
      <p>Created_at: {habbit.created_at}</p>
      <p>days passed: {diff.toFixed(2)} days passed</p>
      <BackBtn/>
    </div>
  );
}
