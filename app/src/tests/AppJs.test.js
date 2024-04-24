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
    expect(screen.getByText("LifeQuest")).toBeInTheDocument();
  });

  test("renders Home component when navigating to '/home'", () => {
    render(
      <MemoryRouter initialEntries={["/home"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("LifeQuest")).toBeInTheDocument();
  });

  test("renders Settings component when navigating to '/settings'", () => {
    render(
      <MemoryRouter initialEntries={["/settings"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Settings Page")).toBeInTheDocument();
  });

  test("renders Quests component when navigating to '/quests'", () => {
    render(
      <MemoryRouter initialEntries={["/quests"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Quests Page")).toBeInTheDocument();
  });

  test("renders Quiz component when navigating to '/quiz'", () => {
    render(
      <MemoryRouter initialEntries={["/quiz"]}>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText("Start Quiz")).toBeInTheDocument();
  });

// Start of AI code (Antonio)
// Conversation link ->

test("scrolls to top when navigation to a new page", () => {
  render(
    <MemoryRouter initialEntries = {["/login"]}>
      <App />
    </MemoryRouter>
  );
  expect(window.scrollTo).toHaveBeenCalledWith(0, 0);
});

test("updates document title and meta description", () => {
  render(
    <MemoryRouter initialEntries = {["/"]}>
      <App />
    </MemoryRouter>
});  
// expect calls go here if needed

});
