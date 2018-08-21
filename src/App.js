import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {authorize} from './store/actions';
import './styles/main.styl';

const dynamicImportPage = (view) => {
  return class DynamicPage extends Component {
    constructor(props) {
      super(props);
      this.state = {
        Component: null
      }
    }

    componentDidMount() {
      const self = this;

      import(`${view}`).then((module) => {
        self.setState({
          Component: module.default
        })
      })
    }

    render() {
      const {Component} = this.state;
      const View = () => Component ? <Component {...this.props}></Component> : <h1>Loading...</h1>;

      return (
        <div>
          {View()}
        </div>
      )
    }
  }
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      init: false
    }
  }

  async componentDidMount() {
    await this.props.authorize();
    this.setState({
      init: true
    })
  }

  render() {
    if (!this.state.init) return (<h1>Init.......</h1>);

    return (
      <Router>
        <div className="App">
          <Switch>
            <Route exact path="/" component={dynamicImportPage("./views/index")}/>
            <Route exact path="/admin" component={dynamicImportPage("./views/admin/index")}/>
            <Route component={dynamicImportPage("./views/v404")}/>
          </Switch>
        </div>
      </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  }
};

export default connect(mapStateToProps, {authorize})(App);
