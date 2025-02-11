import { useState, useEffect } from "react";
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
import { BsArrowRepeat, BsFileEarmarkArrowDown } from "react-icons/bs";
import LostConnection from "../../components/displays/lost-connection/LostConnection";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import Return from "../../components/navigation/return/Return";
import ExtraDisplay from "../../components/displays/extra-display/ExtraDisplay";
import Navbar from "../../components/navigation/navbar/Navbar";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const ReportPage = () => {
  const [routines, setRoutines] = useState<Routine[]>([]);
  const [exercises, setExercises] = useState<ExerciseResponse[]>([]);
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
        } else {
          setError("Exercises not found for the selected routine");
        }
        setLoading(false);
      } catch (err) {
        setError("Error fetching exercises");
        setLoading(false);
      }
    } else {
      setError("Routine Id not valid");
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

  const handlePrintPDF = () => {
    const input = document.getElementById("report-content");
    if (input) {
      html2canvas(input, { scale: 1 }).then((canvas) => {
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");

        const pageWidth = pdf.internal.pageSize.getWidth();
        const pageHeight = pdf.internal.pageSize.getHeight();
        const maxImgWidth = pageWidth - 20; //Márgenes
        const imgHeight = (canvas.height * maxImgWidth) / canvas.width;

        let finalWidth = maxImgWidth;
        let finalHeight = imgHeight;

        if (imgHeight > pageHeight - 20) {
          const scaleFactor = (pageHeight - 20) / imgHeight;
          finalWidth *= scaleFactor;
          finalHeight *= scaleFactor;
        }

        const xOffset = (pageWidth - finalWidth) / 2;
        const yOffset = 10;

        pdf.addImage(imgData, "PNG", xOffset, yOffset, finalWidth, finalHeight);
        pdf.save("reporte.pdf");
      });
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <BsArrowRepeat className="loading-icon" />
        <p>Loading report ...</p>
      </div>
    );
  }

  if (error) {
    return <LostConnection text={error} />;
  }

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="hompage-card-list">
          <header className="report-header">
            <h1>Routine and exercise report</h1>
            <p>
              This report shows the routines and the exercises added to each one
              of them.
            </p>
          </header>

          <section id="report-container">
            <h2>My Routines</h2>
            <div className="routines-list">
              {routines.map((routine) => (
                <div
                  className="routines-list-item"
                  key={routine.id_routine}
                  onClick={() => handleRoutineClick(routine.id_routine)}
                >
                  <p className="routines-list-text">{routine.routine_name}</p>
                </div>
              ))}
              <div className="routines-list-item">
                <p
                  className="routines-list-text b"
                  onClick={handleTotalExercisesClick}
                >
                  Total Ejercicios
                </p>
              </div>
            </div>

            {exercises.length > 0 && !isTotalExercises && (
              <div id="report-content" className="table-container">
                <h3>Exercise details</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Exercise</th>
                      <th>Sequence</th>
                      <th>Difficulty</th>
                      <th>Speed</th>
                      <th>Experience</th>
                    </tr>
                  </thead>
                  <tbody>
                    {exercises.map((item, index) => (
                      <tr key={index}>
                        <td data-label="Exercise">
                          {item.exercise?.exercise_name}
                        </td>
                        <td data-label="Sequence">{item.sequenceOrder}</td>
                        <td data-label="Difficulty">
                          {item.exercise.difficulty}
                        </td>
                        <td data-label="Speed">{item.exercise.speed}</td>
                        <td data-label="Experience">
                          {item.exercise.experience}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="report-btn" onClick={handlePrintPDF}>
                  <BsFileEarmarkArrowDown /> Export to PDF
                </button>
              </div>
            )}

            {isTotalExercises && totalExercises.size > 0 && (
              <div id="report-content">
                <div className="chart-container">
                  <h2>Exercise total graph</h2>
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
                      <Bar dataKey="count" fill="#a6bd5b" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>

                <div className="table-container">
                  <h3>Exercise summary</h3>
                  <table>
                    <thead>
                      <tr>
                        <th>Exercise</th>
                        <th>Ammount in routines</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[...totalExercises].map(([name, count], index) => (
                        <tr key={index}>
                          <td data-label="Name">{name}</td>
                          <td data-label="Ammount">{count}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button className="report-btn" onClick={handlePrintPDF}>
                  <BsFileEarmarkArrowDown /> Export to PDF
                </button>
              </div>
            )}
          </section>
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
};

export default ReportPage;
