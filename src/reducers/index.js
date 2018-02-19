import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import { i18nState } from 'redux-i18n';

import music from './musicReducer';

const rootReducer = combineReducers({
  music,
  routing: routerReducer,
  i18nState
});

export default rootReducer;
