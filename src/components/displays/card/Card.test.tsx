import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Card from "./Card";
import "@testing-library/jest-dom";

describe("Card component", () => {
  it("should render image with correct src and alt", () => {
    render(<Card image="image.jpg" alt="Sample image" />);

    const imgElement = screen.getByAltText("Sample image");
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute("src", "images/image.jpg");
  });

  it("should render text if 'text' prop is provided", () => {
    render(<Card image="image.jpg" alt="Sample image" text="Sample text" />);

    const textElement = screen.getByText("Sample text");
    expect(textElement).toBeInTheDocument();
  });

  it("should not render text if 'text' prop is not provided", () => {
    render(<Card image="image.jpg" alt="Sample image" />);

    const textElement = screen.queryByText("Sample text");
    expect(textElement).toBeNull();
  });

  it("should call onClick when card is clicked", () => {
    const onClick = vi.fn();
    render(<Card image="image.jpg" alt="Sample image" onClick={onClick} />);

    const cardElement = screen.getByAltText("Sample image");
    fireEvent.click(cardElement);

    expect(onClick).toHaveBeenCalled();
  });

  it("should not call onClick when no onClick is passed", () => {
    const onClick = vi.fn();
    render(<Card image="image.jpg" alt="Sample image" />);

    const cardElement = screen.getByRole("img");
    fireEvent.click(cardElement);

    expect(onClick).not.toHaveBeenCalled();
  });
});
