import { render, screen } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import ExerciseSelector from "./ExerciseSelector";
import createFetchMock from "vitest-fetch-mock";
import { MemoryRouter } from "react-router-dom";
import { vi } from "vitest";

const fetchMocker = createFetchMock(vi);

vi.mock("../../services/routine.service.ts", () => {
  return {
    RoutineService: {
      getRoutines: vi.fn().mockImplementation(() => {
        return [
          {
            creation_date: null,
            id_user: 1,
            description: "Ejricicios para mejorar la memoria visual",
            id_routine: 4,
            routine_name: "Memoria Visual",
          },
        ];
      }),
    },
  };
});

vi.mock("../../services/exercise.service", () => {
  return {
    ExerciseService: {
      getExercises: vi.fn().mockImplementation(() => {
        return [
          {
            exercise_name: "Digit-Bash Easy",
            difficulty: 4,
            speed: 4.0,
            experience: 50,
            id_exercise: 1,
          },
        ];
      }),
    },
  };
});

describe("Exercise Selector Page", () => {
  beforeEach(() => {
    fetchMocker.resetMocks();
  });

  it("Should load the list of routines", async () => {
    render(
      <MemoryRouter>
        <ExerciseSelector />
      </MemoryRouter>
    );

    const routineElement = await screen.findByText(/Memoria Visual/i);
    expect(routineElement).not.toBeNull();
  });

  it("Should load the list of exercises", async () => {
    render(
      <MemoryRouter>
        <ExerciseSelector />
      </MemoryRouter>
    );

    const exerciseElement = await screen.findByText(/Digit-Bash Easy/i);
    expect(exerciseElement).not.toBeNull();
  });
});
