import React from "react";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
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
  test("default route is Skeleton", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Skeleton/i)).toBeInTheDocument();
  });

  test("navigates to the login page", () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText(/Login/i)).toBeInTheDocument();
  });

});

describe("App useEffect Behavior", () => {
  test("scrolls to top on navigation that is not 'POP'", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );
    // Simulate navigation
    userEvent.click(screen.getByText(/Settings/i));
    expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
  });

});
