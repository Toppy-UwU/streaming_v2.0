import React from 'react';

function ProgressBar({ value }) {
  const progressStyle = {
    width: `${value}`,
  };

  return (
    <div className="progress-bar bg-info" role="progressbar" style={progressStyle} aria-valuenow={value.slice(0, -1)} aria-valuemin="0" aria-valuemax="100">
        {value}
    </div>
  );
}

export default ProgressBar;