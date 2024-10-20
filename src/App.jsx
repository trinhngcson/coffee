import CoffeeForm from "./components/CoffeeForm";
import Hero from "./components/Hero";
import History from "./components/History";
import Layout from "./components/Layout";
import { Stats } from "./components/Stats";
import { useAuth } from "./context/AuthContext";
import { coffeeConsumptionHistory } from "./utils";

function App() {
  const { globalUser, globalData, isLoading } = useAuth();
  const isAuth = globalUser;
  const isData = globalData && !!Object.keys(globalData || {}).length;

  const authContent = (
    <>
      <Stats />
      <History />
    </>
  );
  return (
    <>
      <Layout>
        <Hero />
        <CoffeeForm isAuth={isAuth} />
        {isAuth && isLoading && <p>Loading data...</p>}
        {isAuth && isData && authContent}
      </Layout>
    </>
  );
}

export default App;
