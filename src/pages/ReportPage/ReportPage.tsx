import React, { useState, useEffect } from "react";
import { RoutineService } from "../../services/routine.service";
import { RoutineExerciseService } from "../../services/routine.exercise.service";
import "./reportPage.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Routine } from "../../../public/models/RoutineListType";
import { ExerciseResponse } from "../../../public/models/ExerciseListType";
import { getUserByUsername } from "../../services/user.service";

const ReportPage = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
  const [exerciseCount, setExerciseCount] = useState<Map<string, number>>(
    new Map()
  );
  const [totalExercises, setTotalExercises] = useState<Map<string, number>>(
    new Map()
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isTotalExercises, setIsTotalExercises] = useState<boolean>(false);

  useEffect(() => {
    const fetchRoutines = async () => {
      const username = sessionStorage.getItem("username");
      if (username) {
        try {
          const user = await getUserByUsername(username);
          if (user?.id) {
            const data = await RoutineService.getRoutinesByUserId(user.id);
            setRoutines(data);
            setLoading(false);
          } else {
            setLoading(true);
          }
        } catch (err) {
          setError("Error al obtener las rutinas");
          setLoading(false);
        }
      }
    };

    fetchRoutines();
  }, []);

  const handleRoutineClick = async (routineId?: number | undefined) => {
    setIsTotalExercises(false);
    if (routineId !== undefined) {
      setLoading(true);
      try {
        const response = await RoutineExerciseService.getExerciseByRoutineId(
          routineId
        );
        if (response !== null) {
          setExercises(response);
          const countMap = new Map<string, number>();
          response.forEach((exercise) => {
            const name = exercise.exercise?.exercise_name;
            if (name) {
              countMap.set(name, (countMap.get(name) || 0) + 1);
            }
          });
          setExerciseCount(countMap);
        } else {
          setError("No se encontraron ejercicios para esta rutina");
        }
        setLoading(false);
      } catch (err) {
        setError("Error al obtener los ejercicios");
        setLoading(false);
      }
    } else {
      setError("ID de rutina no válido");
      setLoading(false);
    }
  };

  const handleTotalExercisesClick = async () => {
    setIsTotalExercises(true);
    setLoading(true);
    try {
      const totalCountMap = new Map<string, number>();
      for (const routine of routines) {
        if (routine.id_routine !== undefined) {
          const response = await RoutineExerciseService.getExerciseByRoutineId(
            routine.id_routine
          );
          if (response !== null) {
            response.forEach((exercise) => {
              const name = exercise.exercise?.exercise_name;
              if (name) {
                totalCountMap.set(name, (totalCountMap.get(name) || 0) + 1);
              }
            });
          }
        }
      }
      setTotalExercises(totalCountMap);
      setLoading(false);
    } catch (err) {
      setError("Error al obtener el total de ejercicios");
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="report-page">
      <header className="report-header">
        <h1>Reporte de Rutinas y Ejercicios</h1>
        <p>
          Este reporte muestra las rutinas de ejercicios y los ejercicios que
          has añadido a cada una de ellas.
        </p>
      </header>

      <section className="report-content">
        <div className="routines-list">
          <h2>Mis Rutinas</h2>
          <ul>
            {routines.map((routine) => (
              <li
                key={routine.id_routine}
                onClick={() => handleRoutineClick(routine.id_routine)}
              >
                {routine.routine_name}
              </li>
            ))}
            <li onClick={handleTotalExercisesClick}>Total Ejercicios</li>
          </ul>
        </div>

        {exercises.length > 0 && !isTotalExercises && (
          <>
            <div className="table-container">
              <h3>Detalle de Ejercicios</h3>
              <table>
                <thead>
                  <tr>
                    <th>Ejercicio</th>
                    <th>Secuencia</th>
                    <th>Dificultad</th>
                    <th>Velocidad</th>
                    <th>Experiencia</th>
                  </tr>
                </thead>
                <tbody>
                  {exercises.map((item, index) => (
                    <tr key={index}>
                      <td>{item.exercise?.exercise_name}</td>
                      <td>{item.sequenceOrder}</td>
                      <td>{item.exercise.difficulty}</td>
                      <td>{item.exercise.speed}</td>
                      <td>{item.exercise.experience}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}

        {isTotalExercises && totalExercises.size > 0 && (
          <>
            <div className="chart-container">
              <h2>Gráfico Total de Ejercicios</h2>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={[...totalExercises].map(([name, count]) => ({
                    exercise_name: name,
                    count,
                  }))}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="exercise_name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#82ca9d" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="table-container">
              <h3>Total de Ejercicios</h3>
              <table>
                <thead>
                  <tr>
                    <th>Ejercicio</th>
                    <th>Total en Todas las Rutinas</th>
                  </tr>
                </thead>
                <tbody>
                  {[...totalExercises].map(([name, count], index) => (
                    <tr key={index}>
                      <td>{name}</td>
                      <td>{count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default ReportPage;
