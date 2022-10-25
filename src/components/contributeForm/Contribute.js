import React, { useState } from 'react';
import axios from 'axios';
import { getCDS } from '../../utils/cds';
import { scrollToTop } from '../../utils/scroll';
import ContributeIntro from './ContributeIntro';
import ContributeProgress from './ContributeProgress';
import ContributeStep1 from './ContributeStep1';
import ContributeStep2 from './ContributeStep2';
import ContributeStep3 from './ContributeStep3';
import ContributeStep4 from './ContributeStep4';
import ContributeSuccess from './ContributeSuccess';

const CDS_EDITOR_API_ENDPOINT =
  'https://nexus-cds-editor-api.herokuapp.com/api';

const Contribute = ({ moduleData, blockchains }) => {
  const errors = moduleData.errors;
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    entry: {
      blockchain: '',
      contract: '',
      abi: '',
      name: '',
      description: '',
      icon: '',
      cds: '',
    },
    contributor: {
      username: '',
    },
  });
  const [error, setError] = useState({ type: '', text: '' });
  const [loading, setLoading] = useState(false);

  const validateStep1 = async () => {
    setError({ type: '', text: '' });
    if (!data.entry.blockchain) {
      setError({
        type: 'blockchain',
        text: errors.blockchain || 'Blockchain field is required',
      });
      return;
    }
    if (!data.entry.contract) {
      setError({
        type: 'contract',
        text: errors.contract || 'Smart-contract address field is required',
      });
      return;
    }
    if (!data.entry.abi) {
      setError({
        type: 'abi',
        text: errors.abi || 'ABI JSON field is required',
      });
      return;
    }
    setStep(2);
    scrollToTop();
  };

  const validateStep2 = async () => {
    setError({ type: '', text: '' });
    if (!data.contributor.username) {
      setError({
        type: 'username',
        text: errors.username || 'Username field is required',
      });
      return;
    }
    if (!data.entry.name) {
      setError({
        type: 'name',
        text: errors.contract_name || 'Smart-contract name field is required',
      });
      return;
    }
    if (!data.entry.icon) {
      setError({
        type: 'icon',
        text: errors.cds_icon || 'CDS icon field is required',
      });
      return;
    }

    setLoading(true);
    const cds = await getCDS(data.entry.abi, data.entry.name, data.entry.icon);
    if (cds) {
      setData((_data) => ({
        ..._data,
        entry: {
          ..._data.entry,
          cds: JSON.stringify(cds, null, 2),
        },
      }));
      setLoading(false);
    } else {
      setData((_data) => ({
        ..._data,
        entry: {
          ..._data.entry,
          cds: '',
        },
      }));
      setError({
        type: 'cds',
        text:
          errors.abi_invalid ||
          "ABI is incorrect, CDS JSON wasn't generated. Please, return to the previous step and edit the ABI.",
      });
      setLoading(false);
      return;
    }

    setStep(3);
    scrollToTop();
  };

  const submitCDS = async () => {
    setLoading(true);
    setError({ type: '', text: '' });
    let res;

    try {
      res = await axios.post(`${CDS_EDITOR_API_ENDPOINT}/cds/submit`, {
        data: data,
      });
    } catch (err) {
      setError({ type: 'submit', text: err.message });
      setLoading(false);
      return;
    }
    if (res && res.data && res.data.success) {
      setStep(5);
      scrollToTop();
    } else {
      setError({
        type: 'submit',
        text: 'Server error. Please, try again later.',
      });
    }
    setLoading(false);
  };

  return (
    <div className="cds-editor__contribute">
      {step === 0 && (
        <ContributeIntro
          moduleData={moduleData}
          onButtonClick={() => {
            setStep(1);
            scrollToTop();
          }}
        />
      )}
      {step === 5 && (
        <ContributeSuccess
          moduleData={moduleData}
          step={step}
          onNextButtonClick={() => {
            location.href = moduleData.success.redirect;
          }}
          data={data}
        />
      )}
      {step > 0 && step < 5 && (
        <div className="submission-steps-section">
          <div
            className="github-process page-center"
            style={{ display: 'block' }}
          >
            <ContributeProgress moduleData={moduleData} step={step} />
            {step === 1 && (
              <ContributeStep1
                moduleData={moduleData}
                blockchains={blockchains}
                step={step}
                onNextButtonClick={validateStep1}
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {step === 2 && (
              <ContributeStep2
                moduleData={moduleData}
                step={step}
                onNextButtonClick={validateStep2}
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                onBackButtonClick={() => {
                  setStep(1);
                }}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {step === 3 && (
              <ContributeStep3
                moduleData={moduleData}
                step={step}
                onNextButtonClick={() => {
                  setStep(4);
                }}
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                onBackButtonClick={() => {
                  setStep(2);
                }}
                loading={loading}
                setLoading={setLoading}
              />
            )}
            {step === 4 && (
              <ContributeStep4
                moduleData={moduleData}
                step={step}
                onNextButtonClick={submitCDS}
                data={data}
                setData={setData}
                error={error}
                setError={setError}
                onBackButtonClick={() => {
                  setStep(3);
                }}
                loading={loading}
                setLoading={setLoading}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Contribute;
