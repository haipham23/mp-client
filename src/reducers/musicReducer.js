import initState from './initState';
import { START_LOAD_PLAYLIST, LOAD_PLAYLIST_SUCCESS, LOAD_PLAYLIST_FAILED } from '../constants/actionTypes';

export default function musicReducer(state = initState.music, action) {
  switch (action.type) {
    case START_LOAD_PLAYLIST:
      return Object.assign({}, state, {
        isLoading: true,
        hasError: false
      });

    case LOAD_PLAYLIST_SUCCESS:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: false,
        songs: action.payload
      });

    case LOAD_PLAYLIST_FAILED:
      return Object.assign({}, state, {
        isLoading: false,
        hasError: true
      });

    default:
      return state;
  }
}
