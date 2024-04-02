import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "../App";
import "../global.css";

// Mock createRoot function
jest.mock("react-dom/client", () => ({
  createRoot: jest.fn(),
}));

describe("index.js", () => {
  let mockRender;

  beforeEach(() => {
    // Mock render function
    mockRender = jest.fn();

    // Mock createRoot implementation
    createRoot.mockReturnValue({
      render: mockRender,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("sets up the root element and renders App within BrowserRouter", () => {
    // Require index.js to execute the setup
    require("../index");

    // Verify createRoot is called with the root container
    expect(createRoot).toHaveBeenCalledTimes(1);
    expect(createRoot).toHaveBeenCalledWith(document.getElementById("root"));

    // Verify App component is rendered within BrowserRouter
    expect(mockRender).toHaveBeenCalledTimes(1);
    expect(mockRender.mock.calls[0][0]).toEqual(
      <BrowserRouter>
        <App data-testid="app-root" />
      </BrowserRouter>
    );
  });
});
