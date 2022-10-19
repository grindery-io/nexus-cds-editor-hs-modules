import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { RichInput, Autocomplete, CircularProgress } from 'grindery-ui';
import ethereumLogo from '../images/ethereum.svg';
import gnosisLogo from '../images/xdai.svg';
import polygonLogo from '../images/polygon.svg';

const API_ENDPOINT = {
  ethereum: {
    URL: 'https://api.etherscan.io/api?module=contract',
    API_TOKEN: '6F5G5QRI6H9RHVT218T8HSK8RIAJ3R1ABF',
  },
  polygon: {
    URL: 'https://api.polygonscan.com/api?module=contract',
    API_TOKEN: 'DGJQAWP72Y5DZ2CRBYF64B1ITBE67EJ3XB',
  },
  xdai: {
    URL: 'https://blockscout.com/xdai/mainnet/api?module=contract',
    API_TOKEN: 'e9189f80-3186-400f-a947-da071072144c',
  },
};

export const getABI = async ({ blockchain, addressContract }) => {
  const { URL, API_TOKEN } = API_ENDPOINT[blockchain];

  return axios
    .get(
      URL +
        '&action=getabi&address=' +
        addressContract +
        '&apikey=' +
        API_TOKEN,
    )
    .then((response) => response);
};

const ContributeStep1 = ({
  moduleData,
  onNextButtonClick,
  data,
  setData,
  error,
  setError,
  setLoading,
  loading,
}) => {
  const module = moduleData.step1;
  const errors = moduleData.errors;
  const [abiKey, setAbiKey] = useState(0);

  useEffect(() => {
    if (data.entry.blockchain && data.entry.contract) {
      setLoading(true);
      getABI({
        blockchain: data.entry.blockchain,
        addressContract: data.entry.contract,
      })
        .then((v) => {
          if (
            v &&
            v.data &&
            v.data.result &&
            v.data.result !== 'Invalid Address format'
          ) {
            setData((_data) => ({
              ..._data,
              entry: {
                ..._data.entry,
                abi: (v && v.data && v.data.result) || '',
              },
            }));
          } else {
            setData((_data) => ({
              ..._data,
              entry: {
                ..._data.entry,
                abi: '',
              },
            }));
            setError({
              type: 'abi',
              text:
                errors.contract_invalid ||
                'Invalid smart-contract address format',
            });
          }
          setAbiKey((_abiKey) => _abiKey + 1);
          setLoading(false);
        })
        .catch((err) => {
          setData((_data) => ({
            ..._data,
            entry: {
              ..._data.entry,
              abi: '',
            },
          }));
          setError({
            type: 'abi',
            text:
              err.message ||
              errors.contract_invalid ||
              'Invalid smart-contract address',
          });
          setAbiKey((_abiKey) => _abiKey + 1);
          setLoading(false);
        });
    }
  }, [data.entry.blockchain, data.entry.contract]);
  return (
    <div
      className="step step-1 align-center all-text-white step-box"
      style={{ display: 'block', padding: '50px 20px 20px' }}
    >
      {(module.subtitle || module.heading) && (
        <div className="heading">
          {module.heading && <h2>{module.heading}</h2>}

          {module.subtitle && (
            <p dangerouslySetInnerHTML={{ __html: module.subtitle }} />
          )}
        </div>
      )}

      <div className="next-step-button active">
        {module.important && (
          <span className="important">{module.important}</span>
        )}
        {module.subtitle_2 && (
          <p dangerouslySetInnerHTML={{ __html: module.subtitle_2 }} />
        )}
        {module.image.src && (
          <img
            src={module.image.src}
            style={{ width: '330px', borderWidth: '0px', border: '0px' }}
            alt={module.image.alt}
            title={module.image.alt}
          />
        )}

        <div className="cds-editor__step1-form">
          <Autocomplete
            options={[
              {
                label: 'Ethereum (Mainnet)',
                value: 'ethereum',
                icon: ethereumLogo,
              },
              {
                label: 'Gnosis',
                value: 'xdai',
                icon: gnosisLogo,
              },
              {
                label: 'Polygon',
                value: 'polygon',
                icon: polygonLogo,
              },
            ]}
            label={module.form.blockchain_label}
            value={data.entry.blockchain}
            placeholder={module.form.blockchain_placeholder}
            onChange={(value) => {
              setError({ type: '', text: '' });
              setData((_data) => ({
                ..._data,
                entry: { ..._data.entry, blockchain: value },
              }));
            }}
            required={true}
          ></Autocomplete>

          <RichInput
            label={module.form.contract_label}
            placeholder={module.form.contract_placeholder}
            onChange={(value) => {
              setError({ type: '', text: '' });
              setData((_data) => ({
                ..._data,
                entry: { ..._data.entry, contract: value },
              }));
            }}
            value={data.entry.contract}
            options={[]}
            required
            singleLine
          />

          <RichInput
            key={abiKey}
            label={module.form.abi_label}
            placeholder={module.form.abi_placeholder}
            onChange={(value) => {
              setError({ type: '', text: '' });
              setData((_data) => ({
                ..._data,
                entry: { ..._data.entry, abi: value },
              }));
            }}
            value={data.entry.abi}
            options={[]}
            required
          />
        </div>

        <div>
          {loading && (
            <div class="cds-editor__loading">
              <CircularProgress />
            </div>
          )}
          {error && error.text && (
            <p className="cds-editor__form-error">{error.text}</p>
          )}
          <a
            className="cta_button"
            onClick={onNextButtonClick}
            style={{ cursor: 'pointer' }}
          >
            {module.button}
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContributeStep1;
