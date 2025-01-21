import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Header from "./Header";

describe("Function Header", () => {
  it("Header to render", () => {
    render(<Header />);
  });
});
