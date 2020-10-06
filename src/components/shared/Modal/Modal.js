import React from 'react';
import PropTypes from 'prop-types';

import './Modal.scss';

export default class Modal extends React.Component {
  static propTypes = {
    viewImage: PropTypes.func.isRequired,
  }

  closeModal = (e) => {
    console.log('closeModal');
    this.props.viewImage();
  }

  render() {
    if (!this.props.show) {
      return null;
    }
    return (
      <div className="modal-container">
        <div className="modal-body">
          {this.props.children}
          <div>
            <button className="btn btn-danger btn-sm modal-btn" onClick={this.closeModal}>Close</button>
          </div>
        </div>
      </div>
    );
  }
}
