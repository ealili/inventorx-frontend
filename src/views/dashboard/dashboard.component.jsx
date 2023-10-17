import {DashboardContainer, DashboardItem} from "./dashboard.styles.jsx";

const Dashboard = () => {
  return (
    <DashboardContainer>
      <DashboardItem>
        <h2>Clients</h2>
        <h2>#</h2>
      </DashboardItem>
      <DashboardItem>
        <h2>Projects</h2>
        <h2>#</h2>
      </DashboardItem>
      <DashboardItem>
        <h2>Employees</h2>
        <h2>#</h2>
      </DashboardItem>
    </DashboardContainer>
  )
}

export default Dashboard