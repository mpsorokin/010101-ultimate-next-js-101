import NavLinks from "@/components/navigation/navbar/NavLinks";

const LeftSidebar = () => {
  return (
    <section className="custom-scrollbar">
      <div className="flex flex-1 flex-col gap-6">
        <NavLinks />
      </div>
    </section>
  );
};

export default LeftSidebar;
