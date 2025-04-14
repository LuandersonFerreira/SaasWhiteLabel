import { Button, Modal, Space } from "antd";
import EditableTable from "../../../components/Table/EditableTable";
import { mockInvites } from "../../../mock/invites";
import React, { useRef } from "react";
import CreateInvite from "../Invites/Create";

const List = () => {
  const [open, setOpen] = React.useState(false);
  const [inviteData, setInviteData] = React.useState(null);
  const inviteRef = useRef();

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Ações",
      key: "action",
      render: (record) => (
        <Space size="middle">
          <a onClick={() => openInvite(record)}>Editar</a>
          <a>Excluir</a>
        </Space>
      ),
    },
  ];

  const handleAction = (record) => {
    console.log(`Ação: ${record}`);
  };

  const openInvite = async (record) => {
    setOpen(true);
    setTimeout(() => {
      inviteRef.current?.setFields(record);
    }, 0);
  };

  const handleSubmit = async () => {
    try {
      const values = await inviteRef.current.submit();
      console.log("Valores enviados:", values);
    } catch (error) {
      console.log(error, "riks");
    }
  };

  const handleCancel = async () => {
    try {
      setOpen(false);
      setInviteData(null);
      await inviteRef.current.resetFields();
    } catch (error) {
      console.log(error, "riks");
    }
  };

  return (
    <>
      <Modal
        width={1200}
        height={600}
        title={<p>Novo convite</p>}
        open={open}
        onCancel={handleCancel}
        styles={{
          body: { maxHeight: 600, overflowY: "auto", paddingRight: 16 },
        }}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={handleSubmit}>
            Salvar
          </Button>,
        ]}
      >
        <CreateInvite data={inviteData} ref={inviteRef} />
      </Modal>

      <Button ghost type="primary" onClick={openInvite}>
        Novo tipo de convite
      </Button>

      <EditableTable
        scroll={{ x: 600 }}
        columns={columns}
        dataSource={mockInvites}
        onAction={handleAction}
      />
    </>
  );
};

export default List;
