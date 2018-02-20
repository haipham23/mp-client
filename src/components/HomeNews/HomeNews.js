import React, { PureComponent } from 'react';
import Proptypes from 'prop-types';

class HomeNews extends PureComponent {
  render() {
    return (
      <div className="home__news">
        { this.props.news }
      </div>
    );
  }
}

HomeNews.propTypes = {
  news: Proptypes.string.isRequired
};

export default HomeNews;
