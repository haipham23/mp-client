import Proptypes from 'prop-types';
import { bindActionCreators } from 'redux';

import { loadPlaylist } from '../../actions/musicActions';

export default {
  propTypes: {
    loadPlaylist: Proptypes.func.isRequired,
    music: Proptypes.shape({
      songs: Proptypes.array,
      isLoading: Proptypes.bool,
      hasError: Proptypes.bool
    }).isRequired
  },
  mapStateToProps: state => ({
    music: state.music
  }),
  mapDispatchToProps: dispatch => ({
    loadPlaylist: bindActionCreators(loadPlaylist, dispatch)
  })
};
