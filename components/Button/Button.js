import styles from "./button-styles.module.scss";

function Button({ children, onClick, title, type, disabled, className = "" }) {
  return (
    <button
      className={`${styles.button} ${className} ${
        disabled ? styles["button--diasbled"] : ""
      }`}
      aria-disabled={disabled}
      type={type}
      title={title}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
