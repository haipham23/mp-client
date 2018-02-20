import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

class HomePlaylist extends PureComponent {
  render() {
    const {
      status,
      play,
      pause,
      resume,
      isDisplay,
      music,
      current,
      playStatus
    } = this.props;

    return (
      <div className="home__song-list">
        <ul>
          {
            isDisplay &&
            music.songs.map((s, idx) => (
              <div key={`song__${idx}`} className="card">
                <div className="card-content">
                  <div className="media">
                    <div className="media-left">
                      <div className="image is-48x48">
                        <img src={s.cover.value.main.url} alt={s.name.value} />
                      </div>
                    </div>
                    <div className="media-content">
                      <p className="title is-4">{s.name.value}</p>
                      <p className="subtitle is-6">@{s.artist.value}</p>
                    </div>
                    <div className="media-name">
                      {
                        current !== idx &&
                        <button
                          className="button is-rounded"
                          onClick={() => play(idx)}
                        >
                          <i className="fas fa-play" />
                        </button>
                      }
                      {
                        current === idx &&
                        playStatus === status.PAUSED &&
                        <button
                          className="button is-rounded"
                          onClick={resume}
                        >
                          <i className="fas fa-play" />
                        </button>
                      }
                      {
                        current === idx &&
                        playStatus !== status.PAUSED &&
                        <button
                          className="button is-rounded"
                          onClick={pause}
                        >
                          <i className="fas fa-pause" />
                        </button>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))
          }
          {
            !this.props.isDisplay &&
            <li>
              <div className="card">
                <div className="card-content">
                  Playlist is empty
                </div>
              </div>
            </li>
          }
        </ul>
      </div>
    );
  }
}

HomePlaylist.propTypes = {
  music: Proptypes.shape({
    songs: Proptypes.array
  }).isRequired,

  isDisplay: Proptypes.bool.isRequired,

  play: Proptypes.func.isRequired,
  pause: Proptypes.func.isRequired,
  resume: Proptypes.func.isRequired,

  status: Proptypes.shape({
    PLAYING: Proptypes.string,
    STOPPED: Proptypes.string,
    PAUSED: Proptypes.string
  }).isRequired,
  current: Proptypes.number.isRequired,
  playStatus: Proptypes.string.isRequired
};

export default HomePlaylist;
