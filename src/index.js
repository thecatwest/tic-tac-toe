import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// React Square Component
// renders single button
class Square extends React.Component {
  // to "remember" things, like a click, components use State
  // components can have state by settings this.state in constructor. this.state is considered as private to component it's defined in
  // add constructor class to initialize state
  // note: in JS classes, always need to call super when defining constructor of a subclass. ALL React component classes that have a constructor should start with a super(props) call
  constructor(props) {
    super(props);
    this.state = {
      value: null,
    };
  }

  render() {
    // pass prop called value to child Square component from parent Board component using this.props.value
    return (
      <button
        className="square"
        // using arrow fn, pass in a fn as onClick prop
        // set onClick event handler to this.setState({...}) so React will re-render that Square whenever <button> is clicked.
        // after render update, Square's this.state.value will be 'X'
        // when you call setState in a component, React auto updates child components inside too
        onClick={() => this.setState({ value: "X" })}
      >
        {/* To display current state's value when clicked, change Square's render to this.state.value instead of this.props.value */}
        {this.state.value}
      </button>
    );
  }
}

// React Board Component
// renders 9 sqaures, three in each row, for tic-tac-toe board
class Board extends React.Component {
  // renderSquare method; pass prop called value to child Square component from parent Board component
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

// React Game Component
// renders Board component
class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

// ---------------------------------- <Notes below this line> ------------------------------------------

// React is declarative, efficient, flexible JS library for building UIs.
// allows you to compose complex UIs from small & isolated pieces of code called "components"

// React.Component subclasses:
// class ShoppingList extends React.Component {
//     render() {
//         return (
//             <div className="shopping-list">
//                 <h1>Shopping List for {this.props.name}</h1>
//                 <ul>
//                     <li>Instagram</li>
//                     <li>WhatsApp</li>
//                     <li>Oculus</li>
//                 </ul>
//             </div>
//         );
//     }
// }
// use Components to tell React what we want to see on the screen. When data changes, React will efficiently update and re-render the components
// here, ShoppingList is a React Component class (or component type).
// component takes in parameters, called props, and returns hierarchy of views to display via the render method
// render method returns a description of what you want to see on the screen
// React takes description and displays the result.
// in particular, render returns a React element, which is a lightweight description of what to render.
// JSX syntax is transformed at build time to React.createElement('div') (for example)
// Can now refer to the entire shopping list component using <ShoppingList />
// because each React component is encapsulated and can operate independently, can build complex UIs from simple components
