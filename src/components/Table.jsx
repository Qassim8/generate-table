import DataTable from "react-data-table-component";
import PropTypes from "prop-types";

const Table = ({ title, columns, data, selectableRows = false, pagination = true }) => {
    return (
        <div className="p-4 mb-10 border rounded-lg shadow-md bg-white">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <DataTable
                columns={columns}
                data={data}
                selectableRows={selectableRows} // Allows row selection
                pagination={pagination} // Enables pagination
                highlightOnHover
                responsive
            />
        </div>
    );
};

// Add prop types validation
Table.propTypes = {
    title: PropTypes.string.isRequired,
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
    selectableRows: PropTypes.bool,
    pagination: PropTypes.bool,
};

// Set default values for optional props
Table.defaultProps = {
    selectableRows: false,
    pagination: true,
};

export default Table;
