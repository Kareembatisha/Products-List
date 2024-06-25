import "./App.css";
import React, { Component } from "react";

class App extends Component {
  state = {
    items: [
      { id: 1, product: "Pen", price: 2, quantity: 1 },
      { id: 2, product: "Book", price: 10, quantity: 1 },
    ],
    product: "",
    price: "",
  };

  deleteItem = (id) => {
    let items = this.state.items.filter((item) => item.id !== id);
    this.setState({ items });
  };

  addItem = (e) => {
    e.preventDefault();
    let { product, price } = this.state;
    if (product && price) {
      let newItem = {
        id:
          this.state.items.length > 0
            ? this.state.items[this.state.items.length - 1].id + 1
            : 1,
        product,
        price: parseFloat(price),
        quantity: 1,
      };
      this.setState({
        items: [...this.state.items, newItem],
        product: "",
        price: "",
      });
    }
  };

  increaseQuantity = (id) => {
    let items = this.state.items.map((item) => {
      if (item.id === id) {
        item.quantity += 1;
      }
      return item;
    });
    this.setState({ items });
  };

  decreaseQuantity = (id) => {
    let items = this.state.items.map((item) => {
      if (item.id === id && item.quantity > 1) {
        item.quantity -= 1;
      }
      return item;
    });
    this.setState({ items });
  };

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  render() {
    const total = this.state.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    return (
      <div className="container">
        <h1>Product List React App</h1>
        <div className="table">
          <div className="item-list">
            <div className="item">
              <span>Product</span>
              <span>Price</span>
              <span>Quantity</span>
              <span>Actions</span>
            </div>
            {this.state.items.length ? (
              this.state.items.map((item) => (
                <div className="item" key={item.id}>
                  <span>{item.product}</span>
                  <span>${item.price.toFixed(2)}</span>
                  <span>
                    <button onClick={() => this.decreaseQuantity(item.id)}>
                      -
                    </button>
                    {item.quantity}
                    <button onClick={() => this.increaseQuantity(item.id)}>
                      +
                    </button>
                  </span>
                  <span>
                    <button onClick={() => this.deleteItem(item.id)}>
                      Delete
                    </button>
                  </span>
                </div>
              ))
            ) : (
              <p>No items to show</p>
            )}
          </div>
          <div>
            <form onSubmit={this.addItem}>
              <input
                type="text"
                id="product"
                placeholder="Product"
                onChange={this.handleChange}
                value={this.state.product}
              />
              <input
                type="number"
                id="price"
                placeholder="Price"
                onChange={this.handleChange}
                value={this.state.price}
              />
              <button type="submit">Add Item</button>
            </form>
          </div>
          <div className="total">
            <h3>Total: ${total.toFixed(2)}</h3>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
