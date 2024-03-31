import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import App from '../App'; // Adjust the import path as necessary

describe('App Routing', () => {
  // Define your test cases with paths and expected content unique to each page
  const routes = [
    { path: "/home", content: "LifeQuest" }, // Use visible text content expected on the page
    { path: "/login", content: "Email" }, // Use visible text content expected on the page
    { path: "/quests", content: "Quests Page" }, // Use visible text content expected on the page
    { path: "/quiz", content: "Strongly Agree" }, // Use visible text content expected on the page
    { path: "/settings", content: "Settings" }, // Use visible text content expected on the page
  ];

  routes.forEach(({ path, content }) => {
    test(`navigating to "${path}" renders the correct page`, () => {
      render(
        <MemoryRouter initialEntries={[path]}>
          <App />
        </MemoryRouter>
      );

      // Attempt to find an element with the expected text content.
      expect(screen.getByText(content, { exact: false })).toBeInTheDocument();
    });
  });
});

