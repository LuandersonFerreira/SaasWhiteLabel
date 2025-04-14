// components/EditableTable.js
import { Table } from "antd";

// eslint-disable-next-line react/prop-types
const EditableTable = ({ columns, dataSource, ...rest }) => {
  return <Table {...rest} dataSource={dataSource} columns={columns} />;
};

export default EditableTable;
