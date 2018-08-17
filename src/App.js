import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { authorize, init } from './store/actions';
import './styles/main.styl';

import v404 from './views/v404';

const dynamicImportPage = (view) => {
    return class DynamicPage extends React.Component {

        state = {
            Component: null
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
            const { Component } = this.state;
            const View = () => Component ? <Component {...this.props}></Component> : <h1>Loading...</h1>;

            // return this.props.children(View)
            return (
                <div>
                    {View()}
                </div>
            )
        }
    }
}

class App extends Component {
  async componentDidMount() {
    await this.props.authorize();
    this.props.init();
  }

  render() {
    if(!this.props.stateInit) return (<h1>Init.......</h1>);

    return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={dynamicImportPage("./views/index")} />
              <Route exact path="/admin" component={dynamicImportPage("./views/admin/index")} />
              <Route component={dynamicImportPage("./views/v404")} />
            </Switch>
          </div>
        </Router>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    stateInit: state.init,
    auth: state.auth
  }
}

export default connect(mapStateToProps, {authorize, init})(App);
