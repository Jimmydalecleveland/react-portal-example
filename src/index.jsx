import React from "react";
import { render, createPortal } from "react-dom";

// COULD THIS BE PASSED DOWN AS A COMPLETED COMPONENT THROUGH PROPS INSTEAD?
// This is a sibling element to the #root element
const portalElement = document.querySelector("#portal");

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showModal1: false, showModal2: false };
  }

  render() {
    const { showModal1, showModal2 } = this.state;

    return (
      <div
        style={{
          // important style
          position: "relative",

          // This will effect the nested modal, but not the portal
          textAlign: "center",
          fontFamily: "sans-serif",

          // unimportant styling
          margin: "200px auto",
          backgroundColor: "#f2f2f2",
          padding: "20px",
          width: "90%",
          maxWidth: "1000px",
        }}
      >
        <h1>Oh herro</h1>
        <p>I am just a page.</p>
        <button onClick={() => this.setState({ showModal1: !showModal1 })}>
          I show modal 1
        </button>
        <button onClick={() => this.setState({ showModal2: !showModal2 })}>
          I show modal 2
        </button>

        {showModal1 && (
          <Modal>
            <h3>Default React child modal</h3>
            <p>
              This modal is stuck within the relatively positioned parent, even
              thought it is positioned absolutely. Our intent was for it to be
              in the top right corner of the whole viewport.
            </p>
            <button onClick={() => this.setState({ showModal1: false })}>
              Ok, I get it.
            </button>
          </Modal>
        )}
        {showModal2 && (
          <ModalWrapper>
            <h3>React Portal modal</h3>
            <p>
              This modal goes where we want it, because it is attached to a
              pre-existing element that is a sibling of the #root element react
              is attached to.
            </p>
            <p>
              Notice that it doesn't inherit styles from the parent, either, yet
              it can still have a button passed to it that controls the state of
              it's "React parent".
            </p>
            <button onClick={() => this.setState({ showModal2: false })}>
              Well that is gory cool!
            </button>
          </ModalWrapper>
        )}
      </div>
    );
  }
}

function ModalWrapper(props) {
  return createPortal(<Modal>{props.children}</Modal>, portalElement);
}

function Modal(props) {
  return (
    <div
      role="dialog"
      style={{
        // important styles
        position: "absolute",
        top: 0,
        right: 0,

        // unimportant styling
        padding: "20px",
        backgroundColor: "#00d1ff",
        color: "#fff",
        boxShadow: "1px 3px 3px #ccc",
        borderRadius: "4px",
        maxWidth: "400px",
        fontWeight: "600"
      }}
    >
      {props.children}
    </div>
  );
}

render(<App />, document.getElementById("root"));
