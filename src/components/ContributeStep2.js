import React from 'react';
import { RichInput, CircularProgress } from 'grindery-ui';

const ContributeStep2 = ({
  moduleData,
  onNextButtonClick,
  data,
  setData,
  error,
  setError,
  onBackButtonClick,
  loading,
}) => {
  const module = moduleData.step2;
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

        <div className="cds-editor__step2-form">
          <RichInput
            label={module.form.username_label}
            placeholder={module.form.username_placeholder}
            onChange={(value) => {
              setError({ type: '', text: '' });
              setData((_data) => ({
                ..._data,
                contributor: { ..._data.contributor, username: value },
              }));
            }}
            value={data.contributor.username}
            options={[]}
            singleLine
            required
            tooltip={module.form.username_tooltip}
          />
          <RichInput
            label={module.form.name_label}
            placeholder={module.form.name_placeholder}
            onChange={(value) => {
              setError({ type: '', text: '' });
              setData((_data) => ({
                ..._data,
                entry: { ..._data.entry, name: value },
              }));
            }}
            value={data.entry.name}
            options={[]}
            required
            singleLine
            tooltip={module.form.name_tooltip}
          />

          <RichInput
            label={module.form.description_label}
            placeholder={module.form.description_placeholder}
            onChange={(value) => {
              setError({ type: '', text: '' });
              setData((_data) => ({
                ..._data,
                entry: { ..._data.entry, description: value },
              }));
            }}
            value={data.entry.description}
            options={[]}
            tooltip={module.form.description_tooltip}
          />

          <RichInput
            label={module.form.icon_label}
            placeholder={module.form.icon_placeholder}
            onChange={(value) => {
              setError({ type: '', text: '' });
              setData((_data) => ({
                ..._data,
                entry: { ..._data.entry, icon: value },
              }));
            }}
            value={data.entry.icon}
            options={[]}
            singleLine
            tooltip={module.form.icon_tooltip}
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

export default ContributeStep2;
