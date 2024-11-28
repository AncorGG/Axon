export type Exercise = {
  id_exercise: number;
  exercise_name: string;
  difficulty: number;
  speed: number;
  experience: number;
};

export type ExerciseResponse = {
  exercise: Exercise;
  sequenceOrder: number;
};
