import { useState, useEffect } from "react";
import moment from "moment";

import AddItem from "./add-item";
import ToDoItem from "./todo-item";
import Button from "./../../components/Button/Button";
import { Plus } from "./../../components/icons/";
import styles from "./todo-styles.module.scss";

import Notification from "../Notification/Notification";
import Summary from "../Summary/Summary";

function ToDoList({ tasks, input, setInput, addTask, removeTask }) {
  const incompletedTasks = tasks.filter((item) => item.isChecked === false);
  const completedTasks = tasks
    .filter((item) => item.isChecked === true)
    .reverse();
  // moment().format("MMMM Do YYYY, h:mm:ss a");

  return (
    <>
      <div className={styles.container}>
        <h2 className="text-4xl bolder  py-8 px-5">TODO DApp</h2>
        <div className="py-3 pl-5">TODAY&apos;S TASKS</div>
        <form className={styles["add-task"]}>
          <input
            type="text"
            className={styles["add-task__input"]}
            placeholder="Add new task"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <Button
            type="submit"
            className={styles["add-task__button"]}
            title="Add Task"
            onClick={addTask}
          >
            <Plus />
          </Button>
        </form>

        <ul className={styles["tasks-list"]}>
          {tasks.map((item) => (
            <ToDoItem
              key={item.id}
              taskTitle={item.title}
              createdAt={item.createdAt}
              compeledAt={item.compeledAt}
              checked={item.isChecked}
              onClick={removeTask(item.id)}

              // taskCompleted={item.completed}
              // taskdelete={item.completedAt}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

export default ToDoList;
