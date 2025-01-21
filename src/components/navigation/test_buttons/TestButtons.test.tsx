import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter } from "react-router-dom";
import TestButtons from "./TestButtons";
import "@testing-library/jest-dom";

describe("Function TestButtons", () => {
  it("should call onContinue when 'Continue' button is clicked and active", () => {
    const onContinue = vi.fn();

    render(
      <MemoryRouter>
        <TestButtons onContinue={onContinue} isActive={true} />
      </MemoryRouter>
    );

    const continueButton = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(continueButton);

    expect(onContinue).toHaveBeenCalled();
  });

  it("should not call onContinue when 'Continue' button is clicked and inactive", () => {
    const onContinue = vi.fn();

    render(
      <MemoryRouter>
        <TestButtons onContinue={onContinue} isActive={false} />
      </MemoryRouter>
    );

    const continueButton = screen.getByRole("button", { name: /Continue/i });
    fireEvent.click(continueButton);

    expect(onContinue).not.toHaveBeenCalled();
  });

  it("should reload the page when 'Repeat' button is clicked and is active, with matching URL", () => {
    const repeatUrl = "/current-path";
    window.location.pathname = "/current-path";
    const reloadSpy = vi.spyOn(window.location, "reload");

    render(
      <MemoryRouter>
        <TestButtons repeatUrl={repeatUrl} isActive={true} />
      </MemoryRouter>
    );

    const repeatButton = screen.getByRole("button", { name: /Repeat/i });
    fireEvent.click(repeatButton);

    expect(reloadSpy).toHaveBeenCalled();
  });

  it("should not reload the page when 'Repeat' button is clicked and URL does not match", () => {
    const repeatUrl = "/current-path";
    window.location.pathname = "/another-path";
    const reloadSpy = vi.spyOn(window.location, "reload");

    render(
      <MemoryRouter>
        <TestButtons repeatUrl={repeatUrl} isActive={true} />
      </MemoryRouter>
    );

    const repeatButton = screen.getByRole("button", { name: /Repeat/i });
    fireEvent.click(repeatButton);

    expect(reloadSpy).not.toHaveBeenCalled();
  });

  it("should disable buttons when isActive is false", () => {
    render(
      <MemoryRouter>
        <TestButtons isActive={false} />
      </MemoryRouter>
    );

    const repeatButton = screen.getByRole("button", { name: /Repeat/i });
    const continueButton = screen.getByRole("button", { name: /Continue/i });

    expect(repeatButton).toHaveClass("btn-inactive");
    expect(continueButton).toHaveClass("btn-inactive");

    fireEvent.click(repeatButton);
    fireEvent.click(continueButton);

    expect(repeatButton).not.toHaveClass("btn-repeat");
    expect(continueButton).not.toHaveClass("btn-continue");
  });
});
