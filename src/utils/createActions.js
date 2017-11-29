import {createActions as reduxActionsCreateActions} from 'redux-actions';
import {push} from 'react-router-redux';

import pathHelper from 'utils/pathHelper';

function onFailureWith401() {
  return push(pathHelper.index());
}

function afterFailure({status}) {
  return {
    401: onFailureWith401
  }[status]();
}

export function createActions(hash, options = {}) {
  options.afterFailure || (options.afterFailure = afterFailure);

  Object.keys(hash).forEach(modelName =>
    Object.keys(hash[modelName]).forEach(actionName => {
      if(!hash[modelName][actionName]['FAILURE']) {
        hash[modelName][actionName]['FAILURE'] = ({message}) => ({message});
      }
    })
  );

  const actions = reduxActionsCreateActions(hash);

  Object.keys(actions).forEach(modelName =>
    Object.keys(actions[modelName]).forEach(actionName =>
      actions[modelName][actionName]['afterFailure'] = options.afterFailure
    )
  );

  return actions;
}
