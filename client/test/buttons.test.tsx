import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, render, waitFor } from "@testing-library/react";
import {
  EventSorter,
  FilterOption,
} from "../src/components/from/eventSorter/EventSorter";
import React from "react";
import { DeleteEventButton } from "../src/components/button/DeleteEventButton";
import { UpdateEventButton } from "../src/components/button/UpdateEventButton";
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

describe("EventSorter", () => {
  it("should render EventSorter", async () => {
    const eventSorter = render(
      <EventSorter
        setFilteredEvents={(filterOption: FilterOption) => filterOption}
      />,
    );
    await waitFor(() => {
      expect(eventSorter.getByText("Filter Events")).toBeDefined();
    });
  });
});

describe("DeleteEventButton", () => {
  it("should render DeleteEventButton", async () => {
    const profilePage = render(
      <DeleteEventButton
        updateEvents={() => console.log()}
        eventStructure={{
          organizer: {},
          _id: "",
          title: "",
          category: 0,
          location: "",
          description: "",
          attendance: [],
          dateTime: "",
        }}
      />,
    );
    await waitFor(() => {
      expect(profilePage.getByText("Delete Event")).toBeDefined();
    });
  });
});

describe("UpdateEventButton", () => {
  it("should render UpdateEventButton", async () => {
    const profilePage = render(
      <UpdateEventButton
        updateEvents={() => console.log()}
        eventStructure={{
          organizer: {},
          _id: "",
          title: "",
          category: 0,
          location: "",
          description: "",
          attendance: [],
          dateTime: "",
        }}
      />,
    );
    await waitFor(() => {
      expect(profilePage.getByText("Update Event")).toBeDefined();
    });
  });
});
