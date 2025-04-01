import { Button, Image, Space, Table } from "antd";
import { useEvents } from "../../../hook/useEvent";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";

export default function TableEvents() {
  const { events, loading } = useEvents(true);
  const navigate = useNavigate();

  const columns = [
    {
      title: "Foto de capa",
      dataIndex: "photo",
      render: (photo) => (
        <Image
          src={photo}
          preview={false}
          style={{
            minWidth: 100,
            maxHeight: 100,
            objectFit: "contain",
          }}
        />
      ),
      width: "150px",
    },
    { title: "Nome do evento", dataIndex: "name", width: "150px" },
    {
      title: "Data do eventos",
      dataIndex: "date",
      render: (date) => <>{dayjs(date).format("DD/MM/YYYY")}</>,
    },
    { title: "Endereço", dataIndex: "address" },
    { title: "Quantidade máxima de convidados", dataIndex: "maxGuests" },
    {
      title: "Ações",
      dataIndex: "actions",
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => navigate(`/Event/${record.id}`, { state: record })}>
            Detalhes
          </a>
          <a>Deletar</a>
        </Space>
      ),
    },
  ];

  return (
    <div>
      {events.length === 0 && !loading ? (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <p>Nenhum evento encontrado.</p>
          <Button type="primary" onClick={() => console.log("Criar Evento")}>
            Criar Evento
          </Button>
        </div>
      ) : (
        <div>
          <h2>Lista de Eventos</h2>
          <Table
            scroll={{ x: "95vw" }}
            loading={loading}
            dataSource={events}
            columns={columns}
            rowKey="id"
          />
        </div>
      )}
    </div>
  );
}
