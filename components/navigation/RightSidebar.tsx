const hotQuestions = [
  { _id: "1", title: "How to create a custom hook in React?" },
  { _id: "2", title: "How to use React Query?" },
  { _id: "3", title: "How to use Redux?" },
  { _id: "4", title: "How to use React Router?" },
];

const RightSidebar = () => {
  return (
    <section
      className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen
      w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden"
    >
      <div>
        <h3 className="h3-bold text-dark200_light900">Top questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]"></div>
      </div>
    </section>
  );
};

export default RightSidebar;
