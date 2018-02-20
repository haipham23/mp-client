import React, { Component } from 'react';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Sound from 'react-sound';

import HomeNews from '../../components/HomeNews/HomeNews';
import HomePlaylist from '../../components/HomePlaylist/HomePlaylist';
import HomeControl from '../../components/HomeControl/HomeControl';

import socketService from '../../services/socket.service';

import { loadPlaylist } from '../../actions/musicActions';

const status = {
  STOPPED: 'STOPPED',
  PAUSED: 'PAUSED',
  PLAYING: 'PLAYING'
};

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      current: -1,
      selectedSong: '',
      playStatus: status.STOPPED,
      news: ''
    };

    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.resume = this.resume.bind(this);
    this.playSongByIndex = this.playSongByIndex.bind(this);
    this.playFirst = this.playFirst.bind(this);
    this.playNext = this.playNext.bind(this);
    this.playPrev = this.playPrev.bind(this);
    this.subcribeToNews = this.subcribeToNews.bind(this);
  }

  componentDidMount() {
    this.props.loadPlaylist();
    this.subcribeToNews();
  }

  subcribeToNews() {
    const newsChannel = socketService.subscribe('news');

    newsChannel.watch((response) => {
      this.setState({ news: response.news });
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

  play(index) {
    this.playSongByIndex(index);
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
    const { music } = this.props;
    const hasSongs = music && music.songs && music.songs.length > 0;

    return (
      <div className="container home">
        <HomeNews news={this.state.news} />
        <HomePlaylist
          music={music}
          isDisplay={hasSongs}
          play={this.play}
          pause={this.pause}
          resume={this.resume}
          status={status}
          current={this.state.current}
          playStatus={this.state.playStatus}
        />
        <Sound
          url={this.state.selectedSong}
          playStatus={this.state.playStatus}
        />
        <HomeControl
          playPrev={this.playPrev}
          resume={this.resume}
          pause={this.pause}
          playFirst={this.playFirst}
          playNext={this.playNext}
          status={status}
          playStatus={this.state.playStatus}
        />
      </div>
    );
  }
}

Home.propTypes = {
  loadPlaylist: Proptypes.func.isRequired,
  music: Proptypes.shape({
    songs: Proptypes.array,
    isLoading: Proptypes.bool,
    hasError: Proptypes.bool
  }).isRequired
};

const mapStateToProps = state => ({
  music: state.music
});

const mapDispatchToProps = dispatch => ({
  loadPlaylist: bindActionCreators(loadPlaylist, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
