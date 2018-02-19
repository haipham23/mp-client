import React, { PureComponent } from 'react';
import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

import Home from '../../containers/Home/Home';

class Router extends PureComponent {
  render() {
    return (
      <div>
        <Switch>
          <Route component={Home} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(Router);
