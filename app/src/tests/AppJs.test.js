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
    expect(screen.getByText("Strongly Agree")).toBeInTheDocument();
  });

});

