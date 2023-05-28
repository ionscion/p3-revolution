import { Form } from "react-router-dom";

export default function Login() {
  return (
    <div id="contact">
      <div>
        <h2>Please login to continue</h2>
      </div>

      <div className="book-create">
        <Form onSubmit={handleSubmit}>
          <label>Email address</label>
          <input
            className="input"
            value={emailAddress}
            onChange={handleChange}
          />
          <label>Password</label>
          <input className="input" value={password} onChange={handleChange} />

          <button className="button">Login</button>
        </Form>
      </div>
    </div>
  );
}
