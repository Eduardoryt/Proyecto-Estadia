import { createContext, useContext, useState } from "react";
import { getSoli,createSoli,deleteSoli,getUnaSoli,updateSoli } from "../api/soli.js";
const TaskContext = createContext();

export const useTasks = () => {
    const context = useContext(TaskContext);
    if (!context) throw new Error("useTasks must be used within a TaskProvider");
    return context;
  };
export function  SoliProvider({ children }) {
    // const [tasks, setTasks] = useState([]);
  
    // const getSoli = async () => {
    //   const res = await getSoli();
    //   setTasks(res.data);
    // };

    return(

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
    );
}