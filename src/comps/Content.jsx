import React from 'react';
import { withRouter } from 'react-router-dom';
import fetchData from '../utils/fetchData';

function isCurUrl() {
  if (!window.__INITIAL_DATA__) { return false; }
  return document.location.href === window.__INITIAL_DATA__.href;
}

class Content extends React.Component {
  constructor(props) {
    super(props);

    const { staticContext = {} } = props;
    let { data = {} } = staticContext;

    if (process.browser && isCurUrl()) {
      data = window.__INITIAL_DATA__.data;
    }

    this.state = { data };
  }

  async componentDidMount() {
    if (isCurUrl()) { return; }
    
    const { match } = this.props;
    const data = await fetchData({ match });

    this.setState({ data });
  }

  render() {
    return this.props.render(this.state);
  }
}

export default withRouter(Content);
