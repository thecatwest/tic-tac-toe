import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

// replace Square class component with function component instead
// fn components are simpler way to write components that only contain a render method and don't have their own state
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}
// React Square Component
// renders single button
// class Square extends React.Component {
//   // to "remember" things, like a click, components use State
//   // components can have state by settings this.state in constructor. this.state is considered as private to component it's defined in
//   // add constructor class to initialize state
//   // note: in JS classes, always need to call super when defining constructor of a subclass. ALL React component classes that have a constructor should start with a super(props) call
// //   delete this constructor because it no longer keeps track of game's state
// //   constructor(props) {
// //     super(props);
// //     this.state = {
// //       value: null,
// //     };
// //   }

//   render() {
//     // pass prop called value to child Square component from parent Board component using this.props.value
//     return (
//       <button
//         className="square"
//         // using arrow fn, pass in a fn as onClick prop
//         // set onClick event handler to this.setState({...}) so React will re-render that Square whenever <button> is clicked.
//         // after render update, Square's this.state.value will be 'X'
//         // when you call setState in a component, React auto updates child components inside too
//         onClick={() => this.props.onClick()}
//       >
//         {/* To display current state's value when clicked, change Square's render to this.state.value instead of this.props.value */}
//         {this.props.value}
//       </button>
//     );
//   }
// }

// React Board Component
// renders 9 sqaures, three in each row, for tic-tac-toe board
class Board extends React.Component {
  // set up Board component to receive squares and onClick props from Game component
  // Since we now have single click handler in Board for many Squares, must pass the location of each Square into the onClick hander to indicate which square was clicked

  //   // to collect data from multiple children or have to child components communicate w/ each other, must declare shared state in their parent component instead
  //   // parent component can pass state back down to children by using props, keeping child comps in sync w/ each other and parent
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       // set Board's initial state to contain array of 9 nulls corresponding to 9 squares
  //       squares: Array(9).fill(null),
  //       // set first move to be 'X' by default; xIsNext is a boolean that will be flipped to determine which player goes next (flipped in the handleClick class below), and game state is saved
  //       xIsNext: true,
  //     };
  //   }

  // add handleClick to Board class
  //   move handleClick method from Board component to Game component
  //   handleClick(i) {
  //     //   move handleClick method from Board component to Game component
  //     // call .slice() to create a copy of the squares array to modify instead of modifying existing array. Essentially, mutating data by saving the old version and making a new copy in its place
  //     // immutability makes complex features easier to implement. Allows you to reuse previous data versions
  //     // detecting changes in immutable objects is also easier than in mutable objects because it can be compared to previous version
  //     const squares = current.squares.slice();
  //     // set up functionality to return early by ignoring a click if someone has won the game or if a square is already filled
  //     if (calculateWinner(squares) || squares[i]) {
  //       return;
  //     }
  //     squares[i] = this.state.xIsNext ? "X" : "O";
  //     this.setState({
  //       squares: squares,
  //       xIsNext: !this.state.xIsNext,
  //     });
  //   }

  // renderSquare method; pass this.state.squares to instruct each individual Square about its current value
  renderSquare(i) {
    return (
      <Square
        //   replace this.state.squares with this.props.squares
        value={this.props.squares[i]}
        // Pass down fn from Board to the Square, and have Square call that fn when a square is clicked.
        // Since state is considered private to a component that defines it, must pass down the fn as noted above
        // replace this.handleClick with this.props.onClick
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    //   Game component is now rendering game's status, can remove the corresponding code from this render method:
    // const winner = calculateWinner(this.state.squares);
    // let status;
    // if (winner) {
    //     status = 'Winner' + winner;
    // } else {
    //     status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    // }

    return (
      <div>
        {/* Game component is now rendering game's status, can remove the corresponding code from this render method: */}
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
  // set up initial state within constructor
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        },
      ],
      stepNumber: 0,
      xIsNext: true,
    };
  }

  handleClick(i) {
    // replace this.state.history with this.state.history.slice... to ensure that if user goes back in time and then makes a new move, all future "move" data history is thrown away and only current info is kept
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      // concatenate new history entries onto history
      // note: unlike push() method, concat() method does not mutate original array
      history: history.concat([
        {
          squares: squares
        },
      ]),
      // add stepNumber to Game component's state to indicate which step is currently being viewed
      // set stepNumber to history.length to ensure it doesn't get stuck showing the same move after a new one has been made
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  // define jumpTo method in Game to update stepNumber. Also set xIsNext to true if number that stepNumber is being changed to is even
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  // update Game component's render fn to use most recent history entry to determine & display game's status
  render() {
    // concatenate new history entries onto history
    const history = this.state.history;
    // update current variable from always rendering last move to rendering currently selected move according to stepNumber
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    // using map method, map our history of moves to React elements representing buttons on the screen, and display list of buttons to "past" moves
    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        // must implement a key for the moves: React takes each list's items and checks for changes. W/o a proper key, React does not know the ID of each component on a re-render. Very important for dynamic lists!
        // keys do not need to be globally unique, just unique between components and siblings
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }
    // const squares = current.squares.slice();

    // // set up functionality to return early by ignoring a click if someone has won the game or if a square is already filled
    // if (calculateWinner(squares) || squares[i]) {
    //   return;
    // }
    // squares[i] = this.state.xIsNext ? "X" : "O";
    // this.setState({
    //   history: history.concat([
    //     {
    //       squares: squares,
    //     },
    //   ]),
    //   xIsNext: !this.state.xIsNext,
    // });

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          {/* add moves buttons */}
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================


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
