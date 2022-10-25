import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Contribute from './components/contributeForm/Contribute';
import CDSFormPreview from './components/formPreview/CDSFormPreview';
import NavBar from './components/navBar/NavBar';

const targetModulesData = document.querySelectorAll(
  '.cms-react-boilerplate > script[type="application/json"]',
);
targetModulesData.forEach(({ dataset, textContent }) => {
  const root = document.getElementById(`App--${dataset.moduleInstance}`);
  switch (dataset.type) {
    case 'contribute':
      return ReactDOM.render(
        <Contribute
          portalId={dataset.portalId}
          moduleData={JSON.parse(textContent).module}
          moduleInstance={dataset.moduleInstance}
          blockchains={JSON.parse(textContent).blockchains}
        />,
        root,
      );
    case 'cds-form-preview':
      return ReactDOM.render(
        <CDSFormPreview
          portalId={dataset.portalId}
          moduleData={JSON.parse(textContent).module}
          moduleInstance={dataset.moduleInstance}
          cds={JSON.parse(textContent).cds}
        />,
        root,
      );
    case 'cds-editor-navbar':
      return ReactDOM.render(
        <NavBar
          portalId={dataset.portalId}
          moduleData={JSON.parse(textContent).module}
          moduleInstance={dataset.moduleInstance}
        />,
        root,
      );
    default:
      return null;
  }
});
