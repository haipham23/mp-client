import React, { Component } from 'react';
// import classnames from 'classnames';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import Sound from 'react-sound';

import Model from './HomeModel';

const status = {
  STOPPED: 'STOPPED',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING'
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: 0,
      selectedSong: '',
      playStatus: status.STOPPED
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.playSongByIndex = this.playSongByIndex.bind(this);
    this.playFirst = this.playFirst.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
  }

  componentDidMount() {
    this.props.loadPlaylist();
  }

  play(songUrl, index) {
    this.setState({
      current: index,
      selectedSong: songUrl,
      playStatus: status.PLAYING
    });
  }

  pause() {
    this.setState({
      playStatus: status.PAUSED
    });
  }

  resume() {
    this.setState({
      playStatus: status.PLAYING
    });
  }

  playSongByIndex(idx) {
    const song = this.props.music.songs[idx];

    if (song) {
      this.setState({
        current: idx,
        selectedSong: song.songurl.value.file.url,
        playStatus: status.PLAYING
      });
    }
  }

  playFirst() {
    this.playSongByIndex(0);
  }

  playNext() {
    const nextIndex = this.state.current + 1;

    this.playSongByIndex(nextIndex);
  }

  playPrev() {
    const prevIndex = this.state.current - 1;

    this.playSongByIndex(prevIndex);
  }

  render() {
    return (
      <div className="container home">
        <div className="home__song-list">
          <ul>
            {
              this.props.music && this.props.music.songs &&
              this.props.music.songs.map((s, idx) => (
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
                          this.state.selectedSong !== s.songurl.value.file.url &&
                          this.state.playStatus !== status.PAUSED &&
                          <button
                            className="button is-rounded"
                            onClick={() => this.play(s.songurl.value.file.url, idx)}
                          >
                            <i className="fas fa-play" />
                          </button>
                        }
                        {
                          this.state.selectedSong !== s.songurl.value.file.url &&
                          this.state.playStatus === status.PAUSED &&
                          <button
                            className="button is-rounded"
                            onClick={this.resume}
                          >
                            <i className="fas fa-play" />
                          </button>
                        }
                        {
                          this.state.selectedSong === s.songurl.value.file.url &&
                          <button
                            className="button is-rounded"
                            onClick={this.pause}
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
              !this.props.music &&
              <li>Library empty...</li>
            }
          </ul>
        </div>
        <Sound
          url={this.state.selectedSong}
          playStatus={this.state.playStatus}
        />

        <div className="home__song-control">
          <div className="card">
            <div className="card-footer">
              <div className="card-footer-item">
                <button className="button is-rounded" onClick={this.playPrev}>
                  <i className="fas fa-step-backward" />
                </button>
              </div>
              <div className="card-footer-item">
                {
                  this.state.playStatus === status.PAUSED &&
                  <button className="button is-rounded" onClick={this.resume}>
                    <i className="fas fa-play" />
                  </button>
                }
                {
                  this.state.playStatus === status.PLAYING &&
                  <button className="button is-rounded" onClick={this.pause}>
                    <i className="fas fa-pause" />
                  </button>
                }
                {
                  this.state.playStatus === status.STOPPED &&
                  <button className="button is-rounded" onClick={this.playFirst}>\
                    <i className="fas fa-play" />
                  </button>
                }
              </div>
              <div className="card-footer-item">
                <button className="button is-rounded" onClick={this.playNext}>
                  <i className="fas fa-step-forward" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = Model.propTypes;

export default compose(
  connect(
    Model.mapStateToProps,
    Model.mapDispatchToProps
  )
)(Home);
