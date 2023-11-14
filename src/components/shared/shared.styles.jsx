import styled, { css } from "styled-components";

export const PageHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const animationStyles = css`
  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const FormContainer = styled.div`
  width: 50%;
  background-color: #fff;
  border-radius: 0.5rem;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
  padding: 1.25rem 1.5rem;
  margin-bottom: 1rem;
  margin-top: 0.5rem;
  animation: fadeInDown 0.3s both; /* Apply the animation directly here */

  ${animationStyles}
`;

export const NoDataFoundYetContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 70vh;
  text-align: center;
`;
