import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect"; 
import App from "../App";

// Mocking window.scrollTo
beforeAll(() => {
  window.scrollTo = jest.fn();
});

// Reset the mock before each test
beforeEach(() => {
  window.scrollTo.mockClear();
});

describe("App Routing", () => {

  test("renders Login component when navigating to '/login'", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Email")).toBeInTheDocument();
  });

});

