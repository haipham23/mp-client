import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

class HomeControl extends PureComponent {
  render() {
    const {
      playPrev,
      resume,
      pause,
      playFirst,
      playNext,
      status,
      playStatus
    } = this.props;

    return (
      <div className="home__song-control">
        <div className="card">
          <div className="card-footer">
            <div className="card-footer-item">
              <button className="button is-rounded" onClick={playPrev}>
                <i className="fas fa-step-backward" />
              </button>
            </div>
            <div className="card-footer-item">
              {
                playStatus === status.PAUSED &&
                <button className="button is-rounded" onClick={resume}>
                  <i className="fas fa-play" />
                </button>
              }
              {
                playStatus === status.PLAYING &&
                <button className="button is-rounded" onClick={pause}>
                  <i className="fas fa-pause" />
                </button>
              }
              {
                playStatus === status.STOPPED &&
                <button className="button is-rounded" onClick={playFirst}>\
                  <i className="fas fa-play" />
                </button>
              }
            </div>
            <div className="card-footer-item">
              <button className="button is-rounded" onClick={playNext}>
                <i className="fas fa-step-forward" />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HomeControl.propTypes = {
  playPrev: Proptypes.func.isRequired,
  resume: Proptypes.func.isRequired,
  pause: Proptypes.func.isRequired,
  playFirst: Proptypes.func.isRequired,
  playNext: Proptypes.func.isRequired,

  status: Proptypes.shape({
    PLAYING: Proptypes.string,
    STOPPED: Proptypes.string,
    PAUSED: Proptypes.string
  }).isRequired,
  playStatus: Proptypes.string.isRequired
};

export default HomeControl;
