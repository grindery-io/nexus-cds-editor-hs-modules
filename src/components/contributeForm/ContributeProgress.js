import React from 'react';

const ContributeProgress = ({ moduleData, step }) => {
  const module = moduleData.progress;
  return (
    <div className="steps-progress">
      <ul>
        {module.step_name.map((item, i) => (
          <li className={step >= i + 1 ? 'active' : ''}>
            <span className="circle"></span>
            <h4>{item}</h4>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ContributeProgress;
