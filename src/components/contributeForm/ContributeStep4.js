import React, { useState } from 'react';
import { RichInput, Autocomplete, CircularProgress } from 'grindery-ui';

const ContributeStep4 = ({
  moduleData,
  onNextButtonClick,
  data,
  onBackButtonClick,
  loading,
  error,
}) => {
  const module = moduleData.step4;
  const [type, setType] = useState('');
  const [operation, setOperation] = useState('');
  const cds = JSON.parse(data.entry.cds);
  const types = [
    {
      label: 'Trigger',
      value: 'trigger',
    },
    {
      label: 'Action',
      value: 'action',
    },
  ];

  const triggers = cds.triggers.map((trigger) => ({
    value: trigger.key,
    label:
      (trigger.display && trigger.display.label) || trigger.name || trigger.key,
    icon: cds.icon || undefined,
    description: (trigger.display && trigger.display.description) || undefined,
  }));

  const actions = cds.actions.map((action) => ({
    value: action.key,
    label:
      (action.display && action.display.label) || action.name || action.key,
    icon: cds.icon || undefined,
    description: (action.display && action.display.description) || undefined,
  }));

  const operationObject =
    type && operation
      ? type === 'trigger'
        ? cds.triggers.find((trigger) => trigger.key === operation)
        : cds.actions.find((action) => action.key === operation)
      : undefined;
  const inputFields = operationObject
    ? operationObject.operation.inputFields
    : [];

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

        <div className="cds-editor__step4-form">
          <Autocomplete
            options={types}
            label={module.form.type_label}
            value={type}
            placeholder={module.form.type_placeholder}
            onChange={(value) => {
              setType(value);
            }}
          />
          {type && (
            <Autocomplete
              key={type || '1'}
              options={type === 'trigger' ? triggers : actions}
              label={
                type === 'trigger'
                  ? module.form.trigger_label
                  : module.form.action_label
              }
              value={operation}
              placeholder={
                type === 'trigger'
                  ? module.form.trigger_placeholder
                  : module.form.action_placeholder
              }
              onChange={(value) => {
                setOperation(value);
              }}
            />
          )}
          {type && operation && inputFields && inputFields.length > 0 && (
            <React.Fragment>
              <div class="cds-editor__preview-header">
                <hr />
                <h5>Operation form preview</h5>
              </div>
              {inputFields.map((field) => (
                <RichInput
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  onChange={() => {}}
                  value={''}
                  options={[]}
                  required={field.required}
                  tooltip={field.helpText}
                />
              ))}
            </React.Fragment>
          )}
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

export default ContributeStep4;
