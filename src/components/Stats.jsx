import { useAuth } from "../context/AuthContext";
import {
  calculateCoffeeStats,
  calculateCurrentCaffeineLevel,
  getTopThreeCoffees,
  statusLevels,
} from "../utils";

function StatCard(props) {
  const { lg, title, children } = props;
  return (
    <div className={"card stat-card " + (lg ? "col-span-2" : "")}>
      <h4>{title}</h4>
      {children}
    </div>
  );
}
export const Stats = () => {
  const { globalData } = useAuth();

  const stats = calculateCoffeeStats(globalData);
  const caffeinceLevel = calculateCurrentCaffeineLevel(globalData);
  const warningLevel =
    caffeinceLevel < statusLevels["low"].maxLevel
      ? "low"
      : caffeinceLevel < statusLevels["moderate"].maxLevel
      ? "moderate"
      : "high";
  return (
    <>
      <div className="section-header">
        <i className="fa-solid fa-chart-simple" />
        <h2>Stats</h2>
      </div>
      <div className="stats-grid">
        <StatCard lg title="Active Caffeine Level">
          <div className="status">
            <p>
              <span className="stat-text">{caffeinceLevel}</span>mg
            </p>
            <h5
              style={{
                color: statusLevels[warningLevel].color,
                background: statusLevels[warningLevel].background,
              }}
            >
              {warningLevel}
            </h5>
          </div>
          <p>{statusLevels[warningLevel].description}</p>
        </StatCard>
        <StatCard title="Daily Caffeine">
          <p>
            <span className="stat-text">{stats.daily_caffeine}</span>mg
          </p>
        </StatCard>
        <StatCard title="Avg # of Coffees">
          <p>
            <span className="stat-text">{stats.average_coffees}</span>mg
          </p>
        </StatCard>
        <StatCard title="Daily Cost($)">
          <p>
            $ <span className="stat-text">{stats.daily_cost}</span>
          </p>
        </StatCard>
        <StatCard title="Total Cost($)">
          <p>
            $ <span className="stat-text">{stats.total_cost}</span>
          </p>
        </StatCard>
        <table className="stat-table">
          <thead>
            <tr>
              <th>Coffee Name</th>
              <th>Number of Purchase</th>
              <th>Percentage of Total</th>
            </tr>
          </thead>
          <tbody>
            {getTopThreeCoffees(globalData).map((value, valueIndex) => {
              return (
                <tr key={valueIndex}>
                  <td>{value.coffeeName}</td>
                  <td>{value.count}</td>
                  <td>{value.percentage}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};
