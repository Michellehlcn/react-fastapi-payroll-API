import React, { Component, Fragment } from "react";
import { Button, Modal, ModalHeader, ModalBody } from "reactstrap";

class TimeSheetModal extends Component {
  state = {
    modal: false
  };

  toggle = () => {
    this.setState(previous => ({
      modal: !previous.modal
    }));
  };

  render() {
    const create = this.props.create;

    var title = "TimeSheet Details";
    // var button = <Button onClick={this.toggle}>Edit</Button>;
    // if (create) {
    //   title = "Creating New Student";

    //   button = (
    //     <Button
    //       color="primary"
    //       className="float-right"
    //       onClick={this.toggle}
    //       style={{ minWidth: "200px" }}
    //     >
    //       Create New
    //     </Button>
    //   );
    // }

    return (
      <Fragment>
     
      </Fragment>
    );
  }
}

export default TimeSheetModal;