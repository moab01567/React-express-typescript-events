import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import { AnonymousEvent } from "../src/components/event/anonymous/AnonymousEvent";
import { AnonymousEvents } from "../src/components/event/anonymous/AnonymousEvents";
import { OrganizerEvents } from "../src/components/event/organizer/OrganizerEvents";
import { AttendingEvents } from "../src/components/event/attending/AttendingEvents";
import React from "react";

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

describe("AnonymousEvent", () => {
  it("should render AnonymousEvent", () => {
    const anonymousEvent = render(<AnonymousEvent title={"event"} id={"1"} />);
    expect(anonymousEvent.getByText("event")).toBeDefined();
  });
});

describe("AnonymousEvents", () => {
  it("should render AnonymousEvent", async () => {
    const anonymousEvent = render(<AnonymousEvents />);
    await waitFor(() => {
      expect(
        anonymousEvent.getByText(
          "Oops we couldn't load your events, please try again in a few minutes",
        ),
      ).toBeDefined();
    });
  });
});

describe("OrganizerEvents", () => {
  it("should render AnonymousEvent", async () => {
    const organizerEvents = render(<OrganizerEvents userinfo={{}} />);
    await waitFor(() => {
      expect(
        organizerEvents.getByText(
          "Oops we couldn't load your events, please try again in a few minutes",
        ),
      ).toBeDefined();
    });
  });
});

describe("AttendingEvents", () => {
  it("should render AttendingEvents", async () => {
    const attendingEvents = render(<AttendingEvents userinfo={{}} />);
    await waitFor(() => {
      expect(
        attendingEvents.getByText(
          "Oops we couldn't load your events, please try again in a few minutes",
        ),
      ).toBeDefined();
    });
  });
});
