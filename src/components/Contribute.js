import React, { useState } from 'react';
import ContributeIntro from './ContributeIntro';
import ContributeProgress from './ContributeProgress';
import ContributeStep1 from './ContributeStep1';
import ContributeStep2 from './ContributeStep2';

const Contribute = ({ moduleData }) => {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    entry: {
      blockchain: '',
      contract: '',
      abi: '',
      name: '',
      description: '',
      icon: '',
    },
    contributor: {
      username: '',
    },
  });
  const [error, setError] = useState({ type: '', text: '' });

  console.log('data', data);

  const validateStep1 = () => {
    setError({ type: '', text: '' });
    if (!data.entry.blockchain) {
      setError({ type: 'blockchain', text: 'Blockchain field is required' });
      return;
    }
    if (!data.entry.contract) {
      setError({
        type: 'contract',
        text: 'Smart-contract address field is required',
      });
      return;
    }
    if (!data.entry.abi) {
      setError({ type: 'abi', text: 'ABI JSON field is required' });
      return;
    }
    setStep(2);
    window.scrollTo({
      top: 187,
      behavior: 'smooth',
    });
  };

  return (
    <div className="cds-editor__contribute">
      {step === 0 && (
        <ContributeIntro
          moduleData={moduleData}
          onButtonClick={() => {
            setStep(1);
          }}
        />
      )}
      {step > 0 && (
        <div className="submission-steps-section">
          <div
            className="github-process page-center"
            style={{ display: 'block' }}
          >
            <ContributeProgress moduleData={moduleData} step={step} />
            {step === 1 && (
              <ContributeStep1
                moduleData={moduleData}
                step={step}
                onButtonClick={validateStep1}
                data={data}
                setData={setData}
                error={error}
                setError={setError}
              />
            )}
            {step === 2 && (
              <ContributeStep2
                moduleData={moduleData}
                step={step}
                onButtonClick={() => {
                  setStep(3);
                }}
                data={data}
                setData={setData}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contribute;
