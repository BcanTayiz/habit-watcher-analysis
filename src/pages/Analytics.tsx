import { useLocation } from "react-router-dom";
import { BackBtn } from "../components/Common/BackBtn";
import moment from "moment";

export default function Analytics() {
  const location = useLocation();
  const habit = location.state; // Receiving the habit object

  if (!habit) {
    return <div><p>No habit data received.</p><BackBtn/></div>;
    
  }

  let now = moment();
  let diff = now.diff(habit.created_at, "days", true);

  console.log(habit)
  return (
    <div>
      <h1>Analytics Page</h1>
      <p>Habit Name: {habit.name}</p>
      <p>Completed: {habit.completed ? "✅ Yes" : "❌ No"}</p>
      <p>Created_at: {habit.created_at}</p>
      <p>days passed: {diff.toFixed(2)} days passed</p>
      <BackBtn/>
    </div>
  );
}
