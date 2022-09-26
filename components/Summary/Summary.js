const Summary = ({ completed, total }) => {
  const summaryMessage = () => {
    const styles = {
      summary: `text-center w-full text-sm text-gray-500 mt-0 mx-auto mb-6`,

      /*container: `h-full w-full flex flex-col ml-[20px] -mt-[150px]`,
    // selectMainContainer: `h-full w-full flex`, w-1/2
    selectContainer: `h-full flex flex-col ml-[20px] -mt-[50px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    input: `flex flex-col items-center border-2 mb-8 py-2 px-3 rounded-2xl pl-2 w-full outline-none`,
    cards: `flex items-center  flex-wrap gap-[80px]`,*/
    };

    if (completed > 0 && completed !== total) {
      return (
        <>
          Completed tasks: <b>{completed}</b> of <b>{total}</b>
        </>
      );
    } else if (completed === total) {
      return (
        <>
          <b>All done!</b> 🎉
        </>
      );
    } else {
      return (
        <>
          Total tasks: <b>{total}</b>
        </>
      );
    }
  };

  return (
    <>{total > 0 && <div className={styles.summary}>{summaryMessage()}</div>}</>
  );
};

export default Summary;
