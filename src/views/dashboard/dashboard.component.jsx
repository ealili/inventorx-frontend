import { DashboardContainer, DashboardItem } from "./dashboard.styles.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";

const Dashboard = () => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const response = await axiosClient.get("insights");
    const insights = await response.data;
    setInsights(insights);
  };

  return (
    <>
      {insights && (
        <DashboardContainer>
          <DashboardItem>
            <h2>{insights.clients_count}</h2>
            <h2>Clients</h2>
          </DashboardItem>
          <DashboardItem>
            <h2>{insights.projects_count}</h2>
            <h2>Projects</h2>
          </DashboardItem>
          <DashboardItem>
            <h2>{insights.users_count}</h2>
            <h2>Users</h2>
          </DashboardItem>
          <DashboardItem>
            <h2>{insights.tasks_count}</h2>
            <h2>Tasks</h2>
          </DashboardItem>
        </DashboardContainer>
      )}
    </>
  );
};

export default Dashboard;
