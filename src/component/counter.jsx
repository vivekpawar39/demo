import React, { Component } from "react";

class Counter extends Component {
  state = {
    count: 1,
    tags: ["tag1", "tag2", "tag3"]
  };

  /* style = {
    fontSize: 20,
    fontWeight: "bold"
  }; */

  render() {
    return (
      /*<React.Fragment>*/
      <div>
        <span /* style={this.style} */ className={this.getBadgeClasses()}>
          {this.getCount()}
        </span>
        &nbsp;
        <button className="btn btn-secondary btn-sm">Click Button</button>
        <ul>
          {this.state.tags.map(tag => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
      </div>
      /*</React.Fragment>*/
    );
  }

  getBadgeClasses() {
    let classes = "badge m-3 badge-";
    return (classes += this.state.count === 0 ? "warning" : "primary");
  }

  getCount() {
    const { count } = this.state;
    return count === 0 ? "zero" : count;
  }
}

export default Counter;
