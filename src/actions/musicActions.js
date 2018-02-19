import axios from 'axios';

import config from '../config/index';

import {
  START_LOAD_PLAYLIST,
  LOAD_PLAYLIST_SUCCESS,
  LOAD_PLAYLIST_FAILED
} from '../constants/actionTypes';

const loadPlaylist = () => (dispatch) => {
  dispatch({ type: START_LOAD_PLAYLIST });

  return axios
    .get(config.musicApi)
    .then(response => dispatch({
      type: LOAD_PLAYLIST_SUCCESS,
      payload: response.data
    }))
    .catch(() => dispatch({
      type: LOAD_PLAYLIST_FAILED
    }));
};

export {
  loadPlaylist
};
