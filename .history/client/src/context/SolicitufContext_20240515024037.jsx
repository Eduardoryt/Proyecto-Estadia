import { createContext, useContext, useState } from "react";
import { getSoli } from "../api/soli";
const TaskContext = createContext();

export function  SoliProvider({ children }) {
    const [tasks, setTasks] = useState([]);
  
    const getSoli = async () => {
      const res = await getSoli();
      setTasks(res.data);
    };

<TaskContext.Provider
value={{
  tasks,
  getTasks,
  deleteTask,
  createTask,
  getTask,
  updateTask,
}}
>
{children}
</TaskContext.Provider>

}