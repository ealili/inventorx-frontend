import { DashboardContainer } from "./dashboard.styles.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios-client.js";
import DashboardItem from "./dashboard-item.component.jsx";

const Dashboard = () => {
  const [insights, setInsights] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchInsights();
  }, []);

  const fetchInsights = async () => {
    const response = await axiosClient.get("insights");
    const insights = await response.data;
    console.log(insights);
    setInsights(insights);
  };

  return (
    <>
      {insights && (
        <DashboardContainer>
          {Object.keys(insights).map((key, index) => (
            <DashboardItem key={index} model={key} count={insights[key]} />
          ))}
        </DashboardContainer>
      )}
    </>
  );
};

export default Dashboard;
