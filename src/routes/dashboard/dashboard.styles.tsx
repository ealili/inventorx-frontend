import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  row-gap: 50px;
  column-gap: 25px;
  grid-template-columns: auto auto auto auto;
  padding: 10px;

  @media (max-width: 1200px) {
    grid-template-columns: auto auto auto;
  }

  @media (max-width: 900px) {
    grid-template-columns: auto auto;
  }

  @media (max-width: 600px) {
    grid-template-columns: auto;
  }
`;

export const DashboardItemContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 50px;
  font-size: 18px;
  text-align: center;
`;

// Additional styles for mobile responsiveness
export const MobileDashboardItemContainer = styled(DashboardItemContainer)`
  padding: 20px;
  font-size: 14px;
`;
