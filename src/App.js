import React from "react";

function Header(props) {
  return (
    <nav className="navbar navbar-light">
      <div className="navbar-brand">
        <i className="fa fa-shopping-cart fa-lg m-2" aria-hidden="true" />
        <span
          className="badge badge-pill badge-info m-2"
          style={{ width: 50, fontSize: "24px" }}
        >
          {props.items}
        </span>
        Items
      </div>
    </nav>
  );
}

class Counter extends React.Component {

  formatCount = () => {
    if (this.props.counter.count === 0) return "Zero";
    return this.props.counter.count;
  };
  getBadgeClasses = () => {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.count === 0 ? "warning" : "primary";
    return classes;
  };

  render() {
    const id = this.props.counter.id;
    return (
      <div>
        <div className="row">
          <div className="">
            <span style={{ fontSize: 24 }} className={this.getBadgeClasses()}>
              {this.formatCount()}
            </span>
          </div>
          <div className="">
            <button
              className="btn btn-secondary"
              onClick={() => this.props.onIncrement(id)}
            >
              <i className="fa fa-plus-circle" aria-hidden="true" />
            </button>
            <button
              className="btn btn-info m-2"
              onClick={() => this.props.onDecrement(id)}
              disabled={this.props.counter.count === 0 ? "disabled" : ""}
            >
              <i className="fa fa-minus-circle" aria-hidden="true" />
            </button>
            <button className="btn btn-danger" onClick={()=>this.props.onDelete(id)}>
              <i className="fa fa-trash-o" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

class Counters extends React.Component {
  render() {
    const counters = this.props.counters;
    return (
      <div>
        <div className="row">
          <div className="">
            <button
              className="btn btn-success m-2"
              onClick={this.props.onReset}
              disabled={this.props.counters.length === 0 ? true : false}
            >
              <i className="fa fa-refresh" aria-hidden="true" />
            </button>
            <button
              className="btn btn-primary m-2"
              onClick={this.props.onRestart}
              disabled={this.props.counters.length !== 0 ? true : false}
            >
              <i className="fa fa-recycle" aria-hidden="true" />
            </button>
          </div>
        </div>
        {counters.map((e) => {
          return (
            <Counter
              counter={e}
              onDecrement={this.props.onDecrement}
              onIncrement={this.props.onIncrement}
              onDelete={this.props.onDelete}
            ></Counter>
          );
        })}
      </div>
    );
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      counters: [
        { id: 1, count: 0 },
        { id: 2, count: 0 },
        { id: 3, count: 0 },
        { id: 4, count: 0 },
      ],
    };
  }

  onIncrement = (id) => {
    const counters = this.state.counters.map((e) => {
      if (e.id === id) {
        return { id: id, count: e.count + 1 };
      }
      return e;
    });
    this.setState({ counters });
  };

  onDecrement = (id) => {
    const counters = this.state.counters.map((e) => {
      if (e.id === id) {
        return { id: id, count: e.count - 1 };
      }
      return e;
    });
    this.setState({ counters });
  };

  onDelete = (id) => {
    const counters = this.state.counters.filter((e) => e.id !== id);
    this.setState({ counters });
  };

  onReset = () => {
    const counters = this.state.counters.map((e) => {
      return { id: e.id, count: 0 };
    });
    this.setState({ counters });
  };

  onRestart = () => {
    const counters = [
      { id: 1, count: 0 },
      { id: 2, count: 0 },
      { id: 3, count: 0 },
      { id: 4, count: 0 },
    ];
    this.setState({ counters });
  };

  render() {
    return (
      <div className="main__wrap">
        <main className="container">
          <div className="card__box">
            <Header
              items={this.state.counters.filter((c) => c.count > 0).length}
            ></Header>
            <Counters
              counters={this.state.counters}
              onReset={this.onReset}
              onRestart={this.onRestart}
              onDecrement={this.onDecrement}
              onIncrement={this.onIncrement}
              onDelete={this.onDelete}
            ></Counters>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
