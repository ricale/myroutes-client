import React, {Component} from 'react';

export default class RouteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: (props.route || {}).name || '',
    };
    this.handleChangeName = this.handleChangeName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }

  handleChangeName(event) {
    const name = event.target.value;
    this.setState({name}, () => {
      const {onChangeName} = this.props;
      onChangeName && onChangeName(name);
    });
  }

  handleSubmit() {
    const {onSubmit} = this.props;
    const {name} = this.state;

    onSubmit && onSubmit({name});
  }

  render() {
    const {name, onSubmit} = this.state;

    return (
      <div>
        <input
          name='name'
          type='text'
          value={name}
          onChange={this.handleChangeName}
          />

        <button onClick={this.handleSubmit}>저장</button>
      </div>
    ) 
  }
}