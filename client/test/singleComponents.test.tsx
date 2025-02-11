import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import React from "react";
import { App } from "../src/App";
import { Header } from "../src/components/header/Header";

afterEach(() => {
  cleanup();
});
vi.mock("react-router-dom", () => ({
  ...vi.importActual("react-router-dom"),
  useNavigate: () => vi.fn(),
  BrowserRouter: () => vi.fn(),
  Routes: () => vi.fn(),
  Route: () => vi.fn(),
}));

describe("Header", () => {
  it("should render Header", () => {
    const header = render(<Header />);
    expect(header.getByText("All Events")).toBeDefined();
    expect(header.getByText("Events Attending")).toBeDefined();
    expect(header.getByText("Events Organizing")).toBeDefined();
    expect(header.getByText("Profile")).toBeDefined();
  });
});

describe("App", () => {
  it("should render App", async () => {
    const app = render(<App />);
    await waitFor(() => {
      expect(
        app.getByText("We have problems with the server you can not login"),
      ).toBeDefined();
    });
  });
});
