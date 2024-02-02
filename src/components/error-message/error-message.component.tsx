import React from "react";
import {ErrorMessageContainer} from "./error-message.styles.tsx";

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({message}) => (
  // Check if the message is not an empty string before rendering
  <>
    {message && (
      <ErrorMessageContainer>
        <p>{message}</p>
      </ErrorMessageContainer>
    )}
  </>
);

export default ErrorMessage;