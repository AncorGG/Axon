import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DigitBash from "./DigitBash";
import "@testing-library/jest-dom";

describe("DigitBash Component", () => {
  it("generates a 4 digit sequence with non repeteable numbers", async () => {
    const digitLength = 4;

    const sleep = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms));

    await act(async () => {
      render(
        <DigitBash type="read" digitSpeed={1} digitLength={digitLength} />
      );
    });

    let codeElement = "";
    let previousDigit = "";

    for (let i = 0; i < digitLength; i++) {
      await act(async () => {
        const digit = await screen.getByText((content, element) => {
          return (
            element?.tagName === "P" &&
            element?.classList.contains("digitb-digit") &&
            /\d/.test(content)
          );
        });
        const currentDigit = digit.textContent!;

        expect(currentDigit).not.toBe(previousDigit);
        codeElement += currentDigit;
        previousDigit = currentDigit;
      });

      await act(async () => {
        await sleep(1000);
      });
    }

    console.log("Observed Number: " + codeElement);
    expect(codeElement).toMatch(/^\d{4}$/);
  });
});
