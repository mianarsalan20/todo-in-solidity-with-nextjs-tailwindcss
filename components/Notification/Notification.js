import styles from "./notification-styles.module.scss";

function Notification({ message }) {
  const styles = {
    wrapper: `fixed z-2 bottom-2 inline-block bg-white my-0 mx-4 border border-gray-300 border-solid px-2 py-4 text-left rounded`,

    message: ` text-sm text-gray-500 mt-0 mx-auto mb-6 leading-5 m-0`,

    /*container: `h-full w-full flex flex-col ml-[20px] -mt-[150px]`,
    // selectMainContainer: `h-full w-full flex`, w-1/2
    selectContainer: `h-full flex flex-col ml-[20px] -mt-[50px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    input: `flex flex-col items-center border-2 mb-8 py-2 px-3 rounded-2xl pl-2 w-full outline-none`,
    cards: `flex items-center  flex-wrap gap-[80px]`,*/
  };

  return (
    <div className={styles.wrapper}>
      <p className={styles.message}>{message}</p>
    </div>
  );
}

export default Notification;
