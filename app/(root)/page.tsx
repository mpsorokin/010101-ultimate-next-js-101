import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();
  console.log(session);

  return (
    <div>
      <h2 className="h1-bold">Home page</h2>
    </div>
  );
};

export default Home;
