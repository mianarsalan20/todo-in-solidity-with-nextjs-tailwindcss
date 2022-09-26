import Button from "./../../components/Button/Button";
import { Trash } from "./../../components/icons/";
import styles from "./todo-styles.module.scss";

const TodoItem = ({
  taskTitle,
  createdAt,
  checked,
  completedAt,
  onClickRemove,
  onClickComplete,
}) => {
  return (
    <li className={styles.task}>
      <label className={styles["task__label"]}>
        <input
          type="checkbox"
          className={styles["task__check"]}
          onClick={onClickComplete(checked)}
          //onChange={(event) => handleChecked(todoListItem, event)}
          defaultChecked={checked}
        />

        <span className={styles["task__text"]}>{taskTitle}</span>
        <div className={styles["task__date-completed"]}>
          Created At: {createdAt} &nbsp;&nbsp;-&nbsp;&nbsp;
          {checked && (
            <span className={styles["task__completed"]}>
              Done: {completedAt}
            </span>
          )}
        </div>
      </label>

      <div className={styles.task__actions}>
        <Button type="submit" title="Remove task" onClick={onClickRemove}>
          <Trash />
        </Button>
      </div>
    </li>
  );
};

export default TodoItem;
