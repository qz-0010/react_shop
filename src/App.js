import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './styles/main.styl';

import v404 from './views/v404';

import Hello from './components/Hello';

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
  render() {
    return (
        <Router>
          <div className="App">
            <Switch>
              <Route exact path="/" component={dynamicImportPage("./views/index")} />
              <Route component={dynamicImportPage("./views/v404")} />
            </Switch>
          </div>
        </Router>
    )
  }
}

export default App;
