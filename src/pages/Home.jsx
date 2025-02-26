import ColumnChart from "../components/ColumnChart"
import Navbar from "../components/Navbar"
import StatisticBox from "../components/StatisticBox"
import TableContent from "../components/TableContent"

const Home = () => {
  return (
    <Navbar pageName="Dashboard">
      <StatisticBox />
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 pt-6 pb-10">
        Lectures Table
      </h2>
      <TableContent />
    </Navbar>
  );
}

export default Home