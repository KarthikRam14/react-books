import React from "react";
import { Link } from 'react-router-dom';

class FormExample extends React.Component {
  state = {
    name: "",
    email: "",
    nameError: "",
    emailError: "",
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value, nameError: "" });
  };

  handleEmailChange = (e) => {
    const email = e.target.value;
    const emailRegex =
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@gmail.com/;  

    this.setState(() => ({
      email: email,
      emailError: emailRegex.test(email) ? "" : "Invalid email format",
    }));
  };

  handleSubmit = (e) => {
    e.preventDefault();

    if (this.state.name === "") {
      this.setState({ nameError: "Name is required" });
    }
    if (this.state.email === "") {
      this.setState({ emailError: "Email is required" });
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div>{this.handleSubmit?(<p>Successfull</p>):null}</div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={this.state.name}
          onChange={this.handleNameChange}
        />
        {this.state.nameError && <p>{this.state.nameError}</p>}
        <br />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={this.state.email}
          onChange={this.handleEmailChange}
        />
        {this.state.emailError && <p>{this.state.emailError}</p>}
        <br />
        <button type="submit">Submit</button>
        <button><Link className='link' to='/book'>Back</Link></button>
      </form>
    );
  }
}

export default FormExample;
