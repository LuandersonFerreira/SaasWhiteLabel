// components/EditableTable.js
import { Table, Tag, Space, Button } from "antd";

// eslint-disable-next-line react/prop-types
const EditableTable = ({ columns, dataSource, onAction }) => {
  // eslint-disable-next-line react/prop-types
  const editableColumns = columns.map((col) => ({
    ...col,
    render: (text, record) => {
      if (col.dataIndex === "actions") {
        return (
          <Space>
            {col.actions.map((action, index) => (
              <Button
                key={index}
                type={action.type || "link"}
                onClick={() => onAction(action.name, record)}
              >
                {action.label}
              </Button>
            ))}
          </Space>
        );
      }

      if (col.dataIndex === "tags") {
        return (
          <>
            {text.map((tag) => (
              <Tag color="blue" key={tag}>
                {tag.toUpperCase()}
              </Tag>
            ))}
          </>
        );
      }

      return text;
    },
  }));

  return <Table dataSource={dataSource} columns={editableColumns} />;
};

export default EditableTable;
