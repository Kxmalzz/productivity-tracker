import { useEffect, useState } from "react";
import io from "socket.io-client";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import "./App.css";

const socket = io("http://localhost:5000");

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Fetch initial data
    fetch("http://localhost:5000/api/activity/report")
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error("Fetch error:", err));

    // Real-time socket listener
    socket.on("new-activity", (activity) => {
      setActivities((prev) => [activity, ...prev]);
    });

    return () => {
      socket.off("new-activity");
    };
  }, []);

  return (
    <div className="App">
      <h1>📊 Productivity Report</h1>

      <div className="chart-container">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={activities}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="task" tick={{ fontSize: 12 }} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="duration" fill="#82ca9d" name="Duration (min)" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <h2>📄 Activity Log</h2>
      <table>
        <thead>
          <tr>
            <th>Task</th>
            <th>Duration (min)</th>
            <th>Date</th>
            <th>URL</th>
          </tr>
        </thead>
        <tbody>
          {activities.length === 0 ? (
            <tr>
              <td colSpan="4">No activity yet.</td>
            </tr>
          ) : (
            activities.map((act, index) => (
              <tr key={index}>
                <td>{act.task}</td>
                <td>{act.duration}</td>
                <td>{act.date}</td>
                <td>{act.url}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;