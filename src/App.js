import React, { Component } from 'react';
import './App.css';
import { useQuery } from 'react-query';
import axios from 'axios';

class MyToDoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { items: [], text: "" };
    this.valChange = this.valChange.bind(this);
    this.valSubmit = this.valSubmit.bind(this);
    this.storeItems = this.storeItems.bind(this);
    this.getItems = this.getItems.bind(this);
  }

  render() {
    return (
      <div className="App-header">
        <h1>حليب</h1>
        <h2>My Fancy To Do List</h2>
        <TodoList items={this.state.items} />
        <form onSubmit={this.valSubmit}>
          <label htmlFor="new-todo">
            What should we do next?
          </label>
          <input
            id="new-todo"
            onChange={this.valChange}
            value={this.state.text}
          />

          <button>
            Add #{this.state.items.length + 1}
          </button>

          <button onClick={this.storeItems}>
            Store {this.state.items.length} item list
          </button>

          <button onClick={this.getItems}>
            Retrieve last saved list
          </button>

        </form>
      </div>
    );
  }

  valChange(e) {
    this.setState({ text: e.target.value })
  }

  valSubmit(e) {
    e.preventDefault();
    if (!this.state.text.length) {
      return;
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    };

    this.setState(state => ({
      items: state.items.concat(newItem),
      text: ""
    }));
  }

  getItems(e) {
    console.log("Getting Items")
    e.preventDefault();
    var todos = "woop"
    axios.get('http://127.0.0.1:8080/todo').then((response) => {
      todos = response.data;
      console.log(todos)
      todos.forEach(element => {
        const newItem = {
          text: element.todoText,
          id: Date.now()
        };
        this.setState(state => ({
          items: state.items.concat(newItem),
          text: ''
        }));
      })
    });
  }

  storeItems(e) {
    console.log("Storing items")
    e.preventDefault();
    
    var state = this.state;
    console.log(state)
    // First clear the old list in the database:
    axios.delete("http://127.0.0.1:8080/todo", { crossdomain: true }).then((response) => {
      state.items.forEach(element => {
        var requestURI = "http://127.0.0.1:8080/todo?input1=" + element.id + "&input2=" + element.text
        console.log(requestURI)
        axios.post(requestURI)
      })
    })
  }
}


class TodoList extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map(item => (
          <li key={item.id}>{item.text}</li>
        ))}
      </ul>
    );
  }
}

export default MyToDoList;