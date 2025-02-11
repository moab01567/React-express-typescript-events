import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { AllEventPage } from "../src/components/pages/AllEventPage";
import { ProfilePage } from "../src/components/pages/ProfilePage";
import React from "react";
import { FrontPage } from "../src/components/pages/FrontPage";
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

describe("AllEventPage", () => {
  it("should render All Event Page", async () => {
    const frontpage = render(<AllEventPage userinfo={{}} />);
    await waitFor(() => {
      expect(frontpage.getByText("Server Not Response")).toBeDefined();
    });
  });
});

describe("ProfilePage", () => {
  it("should render Profile Page", async () => {
    const profilePage = render(
      <ProfilePage
        userinfo={{
          name: "test",
          admin: false,
          loginType: "google",
          picture: "",
        }}
      />,
    );
    await waitFor(() => {
      expect(profilePage.getByAltText("profile image")).toBeDefined();
    });
  });
});

describe("FrontPage", () => {
  it("should render Front Page", async () => {
    const frontpage = render(<FrontPage />);
    await waitFor(() => {
      expect(frontpage.getByText("Event Creator (eksamen)")).toBeDefined();
    });
  });
});
