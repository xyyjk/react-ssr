import React from 'react';
import { withRouter } from 'react-router-dom';

function isCurUrl() {
  if (!window.__INITIAL_DATA__) { return false; }
  const { pathname, search } = document.location;
  const locUrl = `${pathname}${search}`;
  return locUrl === window.__INITIAL_DATA__.url;
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

    const { fetchData, match } = this.props;
    const data = await fetchData({ req: {}, match });

    this.setState({ data });
  }

  render() {
    return this.props.render(this.state);
  }
}

export default withRouter(Content);
