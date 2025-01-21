import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DigitBash from "./DigitBash";

describe("DigitBash Component", () => {
  it("generates a random code of the specified length in read mode", () => {
    const digitLength = 5;
    const digitSpeed = 1;

    render(
      <DigitBash
        type="read"
        digitLength={digitLength}
        digitSpeed={digitSpeed}
        onReadComplete={vi.fn()}
      />
    );

    vi.useFakeTimers();

    const consoleSpy = vi.spyOn(console, "log");
    let observedCode = "";

    for (let i = 0; i < digitLength; i++) {
      vi.advanceTimersByTime(digitSpeed * 1000);

      const digitElement = screen.getByText((content, element) => {
        return (
          element?.tagName === "P" &&
          element?.classList.contains("digitb-digit") &&
          /\d/.test(content)
        );
      });

      expect(digitElement).not.toBeNull();
      observedCode += digitElement.textContent!;
    }

    vi.useRealTimers();

    const generatedCodeLog = consoleSpy.mock.calls.find((call) =>
      call[0].includes("actual random code:")
    )?.[0];

    console.log("Log: " + generatedCodeLog);

    const generatedCode = generatedCodeLog?.split(": ")[1]?.trim();

    console.log("Código observado:", observedCode);
    console.log("Código generado:", generatedCode);

    expect(observedCode).not.toBe(generatedCode);
  });
});
