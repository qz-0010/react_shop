import React, { Fragment } from 'react';

function withPopup(WrappedComponent) {
    return class extends React.Component {

      constructor(props) {
        super(props);

        this.close = this.close.bind(this);
        this.open = this.open.bind(this);
        this.renderPopup = this.renderPopup.bind(this);
      }

      state = {
        active: false
      }

      close() {
        this.setState({
            active: false 
        });
      }

      open() {
        this.setState({
            active: true 
        });
      }

      renderPopup(PopupComponent, _props) {
        if(!this.state.active) return

        return (
            <div className="popup">
                <button className="popup__close" onClick={this.close}>Закрыть</button>
                <div className="popup__body">
                    <PopupComponent {..._props}/>
                </div>
            </div>
        )
      }

      render() {

        return (
            <Fragment>
                <WrappedComponent renderPopup={this.renderPopup} openPopup={this.open} closePopup={this.close} isActivePopup={this.state.active} {...this.props} />
            </Fragment>
        );
      }
    }
}

export default withPopup;
