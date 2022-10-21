import React from 'react';

const CDSFormPreview = ({ moduleData, cds }) => {
  console.log('cds', cds);
  if (!cds.cds) {
    return null;
  }
  const cdsJson = JSON.parse(cds.cds);

  return (
    <div className="entry-demo cds-form-preview">
      <div className="page-center">
        <div className="__code-box code" style={{ marginBottom: '0px' }}>
          <div className="__box-title">Form Preview</div>
          <div className="__box-content"></div>
        </div>
      </div>
    </div>
  );
};

export default CDSFormPreview;
