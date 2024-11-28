import {
  BsChevronDown,
  BsChevronUp,
  BsFloppy,
  BsPlus,
  BsTrash,
} from "react-icons/bs";
import ExtraDisplay from "../../components/navigation/extra-display/ExtraDisplay";
import HorizontalNavbar from "../../components/navigation/navbar/HorizontalNavbar";
import Navbar from "../../components/navigation/navbar/Navbar";
import Return from "../../components/navigation/return/Return";
import "./Routines.css";
import { Select } from "antd";
import { useEffect, useState } from "react";
import { Routine } from "../../../public/models/RoutineListType";
import { useNavigate, useParams } from "react-router-dom";

interface RoutineContentProps {
  title: string;
  description: string;
  isNew: boolean;
}

const RoutineContent = ({
  title: initialTitle,
  description: initialDescription,
  isNew,
}: RoutineContentProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const navigate = useNavigate();
  const { id_routine } = useParams();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const routineData = {
      routine_name: title,
      description: description,
      id_user: 1,
    };

    if (isNew) {
      console.log("Creating new routine:", routineData);
      try {
        // const createdRoutine = await RoutineService.createRoutine(routineData);
      } catch (error) {
        console.error("Error creating new routine:", error);
      }
    } else if (id_routine) {
      console.log("Updating routine:", routineData);
      try {
        // const updatedData = await RoutineService.updateRoutine(Number(id_routine), routineData);
      } catch (error) {
        console.error("Error updating routine:", error);
      }
    }
    navigate("/exercise");
  };

  return (
    <div className="main-container">
      <HorizontalNavbar />
      <div className="scrolleable-container">
        <Return />
        <div className="routine-container">
          <div className="routine-info-container">
            <form onSubmit={handleSubmit}>
              <div className="routine-info-header">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="routine-info-title"
                  placeholder="Enter routine title"
                />
                <BsFloppy
                  size={26}
                  color="#48612c"
                  className="routine-icon"
                  onClick={handleSubmit}
                />
              </div>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="routine-info-textarea"
                placeholder="Enter routine description"
              />
            </form>
          </div>
          <div className="routine-list-container">
            <p className="routine-list-title">Exercises</p>
            <div className="routine-card">
              <img
                src="/images/brain.jpg"
                alt="Exercise icon"
                className="routine-card-image"
              />
              <div className="routine-card-info">
                <div className="routine-card-header">
                  <p className="routine-card-text">Name</p>
                  <BsTrash size={24} color="#ff0e0e" className="routine-icon" />
                </div>
                <Select
                  defaultValue="Easy"
                  style={{ width: 120 }}
                  options={[
                    { value: "1", label: "Easy" },
                    { value: "2", label: "Medium" },
                    { value: "3", label: "Hard" },
                    { value: "4", label: "Extreme" },
                  ]}
                />
              </div>
              <div className="routine-card-selectors">
                <BsChevronUp className="routine-icon" />
                <BsChevronDown className="routine-icon" />
              </div>
            </div>

            <div className="routine-add-card">
              <BsPlus size={45} className="routine-plus-icon" />
            </div>
          </div>
        </div>
      </div>
      <ExtraDisplay />
      <Navbar />
    </div>
  );
};

export function Routines() {
  const { id_routine } = useParams();
  const [routine, setRoutine] = useState<Routine | null>(null);
  const [isCreatingNew, setIsCreatingNew] = useState(false);

  useEffect(() => {
    const fetchRoutine = async () => {
      if (id_routine === "new") {
        setIsCreatingNew(true);
        setRoutine(null);
        return;
      }

      const id = id_routine ? Number(id_routine) : null;

      if (id !== null) {
        try {
          // Fetch routine using RoutineService (uncomment when service is implemented)
          // const data = await RoutineService.getRoutineById(id);
          // setRoutine(data);
        } catch (error) {
          console.error(`Error fetching routine for ID ${id_routine}:`, error);
        }
      } else {
        console.error("Invalid routine ID");
      }
    };

    fetchRoutine();
  }, [id_routine]);

  if (isCreatingNew) {
    return (
      <RoutineContent
        title="Create New Routine"
        description="Fill out the details to create a new routine."
        isNew={true}
      />
    );
  }

  if (routine) {
    return (
      <RoutineContent
        title={routine.routine_name}
        description={routine.description}
        isNew={false}
      />
    );
  }

  // Default case
  return <div>Loading routine...</div>;
}
