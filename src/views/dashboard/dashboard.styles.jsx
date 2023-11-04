import styled from "styled-components";

export const DashboardContainer = styled.div`
  display: grid;
  row-gap: 50px;
  column-gap: 25px;
  grid-template-columns: auto auto auto auto;
  padding: 10px;
`;

export const DashboardItemContainer = styled.div`
  border: 1px solid black;
  border-radius: 10px;
  padding: 50px;
  font-size: 18px;
  text-align: center;
`;
