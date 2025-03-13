import TableOptions from "../../components/TableOptions";
import TableContent from "../../components/TableContent";
import Navbar from "../../components/Navbar";
import { Trash } from "@phosphor-icons/react";
import { useContext } from "react";
import { tableContext } from "../../context/TableProvider";
import TableModal from "../../components/TableModal";

function TableList() {
  const { clearTable } = useContext(tableContext);

  return (
    <Navbar pageName="Generate Table">
      <TableModal />
      <TableOptions />
      <div className="my-10">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 pb-5">
          Lectures table
        </h2>
        <TableContent />
        <button
          onClick={clearTable}
          className="flex justify-center items-center gap-2 my-5 py-2 px-6 bg-red-500 text-white rounded-md cursor-pointer"
        >
          <Trash />
          <span>Clear Table</span>
        </button>
      </div>
    </Navbar>
  );
}

export default TableList;
