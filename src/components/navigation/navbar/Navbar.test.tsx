import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { vi, describe, expect, it } from "vitest";
import "@testing-library/jest-dom";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = (await importOriginal()) as Record<string, unknown>;
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({
      pathname: "/home",
    }),
  };
});

describe("Navbar Component", () => {
  it("renders Navbar with correct icons", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    expect(screen.getByTestId("exercise-icon")).toBeInTheDocument();
    expect(screen.getByTestId("milestones-icon")).toBeInTheDocument();
    expect(screen.getByTestId("home-icon")).toBeInTheDocument();
    expect(screen.getByTestId("settings-icon")).toBeInTheDocument();
    expect(screen.getByTestId("user-icon")).toBeInTheDocument();
  });

  it("correct icon class applied based on location", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeIcon = screen.getByTestId("home-icon");
    expect(homeIcon).toHaveClass("nav-icon-selected");

    const exerciseIcon = screen.getByTestId("exercise-icon");
    expect(exerciseIcon).not.toHaveClass("nav-icon-selected");
  });

  it("navigates when icons are clicked", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByTestId("home-icon"));
    expect(mockNavigate).toHaveBeenCalledWith("/home");

    fireEvent.click(screen.getByTestId("settings-icon"));
    expect(mockNavigate).toHaveBeenCalledWith("/settings");
  });
});
