import React from 'react';
import ReactJson from '@silizia/react-json-view';

const ContributeStep3 = ({
  moduleData,
  onNextButtonClick,
  data,
  setData,
  onBackButtonClick,
}) => {
  const module = moduleData.step3;

  const addValue = (value) => {
    setData((_data) => ({
      ..._data,
      entry: {
        ..._data.entry,
        cds: JSON.stringify(value),
      },
    }));
  };

  const editValue = (value) => {
    setData((_data) => ({
      ..._data,
      entry: {
        ..._data.entry,
        cds: JSON.stringify(value),
      },
    }));
  };

  const deleteValue = (value) => {
    setData((_data) => ({
      ..._data,
      entry: {
        ..._data.entry,
        cds: JSON.stringify(value),
      },
    }));
  };

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

        <div className="cds-editor__step3-form">
          {data.entry.cds && (
            <ReactJson
              src={JSON.parse(data.entry.cds)}
              onAdd={(add) => addValue(add.updated_src)}
              onEdit={(edit) => editValue(edit.updated_src)}
              onDelete={(edit) => deleteValue(edit.updated_src)}
              theme={'monokai'}
              collapsed={3}
              collapseStringsAfterLength={30}
              displayDataTypes={false}
            />
          )}
        </div>

        <div>
          <div class="cds-editor__form-buttons">
            <a
              className="cta_button back"
              onClick={onBackButtonClick}
              style={{ cursor: 'pointer' }}
            >
              Back
            </a>
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
    </div>
  );
};

export default ContributeStep3;
