import { NoDataFoundYetContainer } from "./shared.styles";

interface NoRecordsMessageProps {
  type: string;
}

const NoRecordsMessage: React.FC<NoRecordsMessageProps> = ({ type }) => {
  return (
    <NoDataFoundYetContainer>
      You do not have any {type} yet. <br />
      Click the Create button to create one.
    </NoDataFoundYetContainer>
  );
};

export default NoRecordsMessage;
