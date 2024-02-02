import "./loadingSpinner.style.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner">
      <svg
        className="spinner-svg"
        viewBox="0 0 50 50"
        width="50px"
        height="50px"
      >
        <circle
          className="spinner-circle"
          cx="25"
          cy="25"
          r="20"
          fill="none"
          strokeWidth="5"
        />
      </svg>
    </div>
  );
};

export default LoadingSpinner;
