import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import Contribute from './components/Contribute';

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
          moduleData={JSON.parse(textContent)}
          moduleInstance={dataset.moduleInstance}
        />,
        root,
      );
    default:
      return null;
  }
});
