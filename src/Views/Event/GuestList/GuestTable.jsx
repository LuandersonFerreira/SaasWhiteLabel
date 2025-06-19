import { Table, List, Tag } from "antd";

// eslint-disable-next-line react/prop-types
export default function GuestTable({ columns, guestList, loading }) {
  return (
    <Table
      rowKey="uuid"
      loading={loading}
      scroll={{ x: 600 }}
      columns={columns}
      dataSource={guestList}
      expandable={{
        expandedRowRender: (record) => {
          if (!record.companions || record.companions.length === 0) {
            return <p>Sem acompanhantes.</p>;
          }

          return (
            <List
              size="small"
              bordered
              dataSource={record.companions}
              renderItem={(companion, index) => (
                <List.Item key={index}>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <div>
                      <strong>Nome:</strong> {companion.name || "Não informado"}
                    </div>
                    <div>
                      <strong>Maior de 12 anos:</strong>{" "}
                      <Tag color={companion.isOver12 ? "green" : "red"}>
                        {companion.isOver12 ? "Sim" : "Não"}
                      </Tag>
                    </div>
                  </div>
                </List.Item>
              )}
            />
          );
        },
      }}
    />
  );
}
