import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, useNavigate } from "react-router-dom";
import Close from "./Close";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Function Close", () => {
  it("should navigate to '/home' when action is 'home'", () => {
    render(
      <MemoryRouter>
        <Close action="home" />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith("/home");
  });

  it("should navigate back when action is undefined", () => {
    render(
      <MemoryRouter>
        <Close />
      </MemoryRouter>
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
