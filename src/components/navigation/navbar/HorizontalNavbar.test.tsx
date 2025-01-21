import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useLocation } from "react-router-dom";
import HorizontalNavbar from "./HorizontalNavbar";
import "@testing-library/jest-dom";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/home",
    }),
  };
});

describe("HorizontalNavbar component", () => {
  it("should render all navigation options", () => {
    render(
      <MemoryRouter>
        <HorizontalNavbar />
      </MemoryRouter>
    );

    const options = [
      { text: "Home", icon: "BsHouseDoor" },
      { text: "Exercises", icon: "BsController" },
      { text: "Milestones", icon: "BsTrophy" },
      { text: "Profile", icon: "BsPerson" },
      { text: "Settings", icon: "BsGear" },
    ];

    options.forEach(({ text }) => {
      const navOption = screen.getByText(text);
      expect(navOption).toBeInTheDocument();
    });
  });

  it("should navigate to the correct route when an option is clicked", () => {
    render(
      <MemoryRouter>
        <HorizontalNavbar />
      </MemoryRouter>
    );

    const homeOption = screen.getByText("Home");
    fireEvent.click(homeOption);
    expect(mockNavigate).toHaveBeenCalledWith("/home");

    const exerciseOption = screen.getByText("Exercises");
    fireEvent.click(exerciseOption);
    expect(mockNavigate).toHaveBeenCalledWith("/exercise");
  });

  it("should apply the 'option-selected' class to the selected route", () => {
    vi.mock("react-router-dom", async () => {
      const actual = await vi.importActual("react-router-dom");
      return {
        ...actual,
        useNavigate: () => mockNavigate,
        useLocation: () => ({
          pathname: "/milestones",
        }),
      };
    });

    render(
      <MemoryRouter>
        <HorizontalNavbar />
      </MemoryRouter>
    );

    const milestonesOption = screen.getByText("Milestones");
    expect(milestonesOption.parentElement).toHaveClass("option-selected");

    const otherOption = screen.getByText("Home");
    expect(otherOption.parentElement).not.toHaveClass("option-selected");
  });
});
