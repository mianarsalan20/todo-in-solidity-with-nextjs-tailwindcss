import Button from "./../../components/Button/Button";
import { Trash } from "./../../components/icons/";
import styles from "./todo-styles.module.scss";

const TodoItem = ({ taskTitle, createdAt, checked, compeledAt, onClick }) => {
  return (
    <li className={styles.task}>
      <label className={styles["task__label"]}>
        <input type="checkbox" className={styles["task__check"]} />
        {taskTitle}
        <div className={styles["task__date-completed"]}>
          Created At: {createdAt} &nbsp;&nbsp;-&nbsp;&nbsp;
          {checked && (
            <span className={styles["task__completed"]}>Done: {createdAt}</span>
          )}
        </div>
      </label>

      <div className={styles.task__actions}>
        <Button type="submit" title="Remove task" onClick={onClick}>
          <Trash />
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
