import React from "react";
import { Table, Space, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";
import { toast } from "react-toastify";

const InviteTable = ({ users, setUsers, setOnEdit }) => {
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/${id}`);
      setUsers(users.filter((user) => user.id !== id));
      toast.success("Convidado removido!");
      setOnEdit(null);
    } catch (error) {
      toast.error("Erro ao excluir: " + error.message);
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Telefone",
      dataIndex: "fone",
      key: "fone",
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EditOutlined />}
            onClick={() => setOnEdit(record)}
          />
          <Button
            icon={<DeleteOutlined />}
            danger
            onClick={() => handleDelete(record.id)}
          />
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={users} />;
};

export default InviteTable;