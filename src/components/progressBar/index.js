import React from "react";

const ProgressBar = (props) => {
  const { barColor, barWidth } = props;

  const containerStyles = {
    height: 20,
    width: '100%',
    backgroundColor: "#fff",
    margin: 50,
    borderStyle: 'solid',
    borderWidth: 'thin',
    borderColor: '#ccc'
  }

  const fillerStyles = {
    height: '100%',
    width: `${barWidth}%`,
    minWidth: '0%',
    maxWidth: '100%',
    backgroundColor: barColor,
    transition: 'width 1s ease-in-out',
    textAlign: 'center',
  }

  const labelStyles = {
    padding: 5,
    color: '$fff',
  }

  return (
    <div data-testid="progress-bar" style={containerStyles}>
      <div style={fillerStyles}>
        <span data-testid="precentage-amount" style={labelStyles}>{`${barWidth}%`}</span>
      </div>
    </div>
  );
};

export default ProgressBar;
