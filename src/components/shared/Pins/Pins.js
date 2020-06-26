import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { ListGroupItem } from 'reactstrap';

import './Pins.scss';

class Pins extends React.Component {
  static propTypes = {
    pin: PropTypes.object.isRequired,
  }

  render() {
    const { pin } = this.props;
    const singlePinLink = `/pin/${pin.id}`;
    const editPinLink = `/pin/edit/${pin.id}`;

    return (
      <ListGroupItem className="text-left">
        <span className="font-weight-bold">{pin.name}</span>
        <span className="float-right">
          <Link className="btn btn-primary btn-sm mx-1" to={singlePinLink}>View</Link>
          <Link className="btn btn-warning btn-sm mx-1" to={editPinLink}>Edit</Link>
          <button className="btn btn-danger btn-sm mx-1">Delete</button>
        </span>
      </ListGroupItem>
    );
  }
}

export default Pins;
