import React, {Component} from 'react';
import Transition from 'react-transition-group/Transition';

export default class Fade extends Component {
  static defaultProps = {
    duration: 3000,
    onlyFadeOut: true
  };

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillReceiveProps(newProps) {
    const {string} = this.props;
    const {string: newString} = newProps;
    if(string !== newString && !!newString) {
      this.setState({in: true});
    }
  }

  render() {
    const {show, onlyFadeOut, duration, string} = this.props;

    const durationSec = (onlyFadeOut && show) ? 0 : duration;

    const defaultStyle = {
      transition: `opacity ${durationSec}ms ease-in-out`,
      opacity: 0,
    };

    const transitionStyles = {
      entering: { opacity: 0 },
      entered:  { opacity: 1 },
    };

    return (
      <Transition in={show} timeout={durationSec}>
        {(state) => (
          <div style={{
            ...defaultStyle,
            ...transitionStyles[state]
          }}>
            {string}
          </div>
        )}
      </Transition>
    )
  }
};
