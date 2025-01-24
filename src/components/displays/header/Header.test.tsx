import { render } from "@testing-library/react";
import { describe, it } from "vitest";
import Header from "./Header";

describe("Function Header", () => {
  it("Header to render", () => {
    render(<Header />);
  });
});
