import React from 'react';

const ContributeSuccess = ({ moduleData, onNextButtonClick }) => {
  const module = moduleData.success;
  return (
    <div className="submission-steps-section">
      <div id="0" className="step-0 page-center step">
        <div className="heading">
          <img
            src={module.image.src}
            style={{ width: '111px', borderWidth: '0px', border: '0px' }}
            width="111"
            alt="Design Manager"
            title={module.image.alt}
          />

          <h3>{module.heading}</h3>

          <p>{module.subtitle}</p>
        </div>
        <div className="description">
          <div dangerouslySetInnerHTML={{ __html: module.content }}></div>

          <div className="next-step-button active align-center">
            <a
              className="cta_button"
              onClick={onNextButtonClick}
              style={{ cursor: 'pointer' }}
            >
              {module.button}
            </a>
          </div>
        </div>

        {module.footer && (
          <div
            className="subtext align-center"
            dangerouslySetInnerHTML={{ __html: module.footer }}
          ></div>
        )}
      </div>
    </div>
  );
};

export default ContributeSuccess;
