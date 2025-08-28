import NavLinks from "@/components/navigation/navbar/NavLinks";

const LeftSidebar = () => {
  return (
    <section
      className="custom-scrollbar background-light900_dark200 light-border sticky left-0 top-0
    h-screen flex flex-col justify-between overflow-y-auto border-r p-6 pt-36 shadow-light-300"
    >
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>
    </section>
  );
};

export default LeftSidebar;
