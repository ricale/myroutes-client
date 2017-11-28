import {push} from 'react-router-redux';

import pathHelper from 'utils/pathHelper';

export function onFailureWith401() {
  return push(pathHelper.index());
};

export function afterFailure({status}) {
  return {
    401: onFailureWith401
  }[status]();
}
