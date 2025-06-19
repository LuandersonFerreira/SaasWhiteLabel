import { Button, Flex, message, Modal, Space, Tag, Typography } from "antd";
import EditableTable from "../../../components/Table/EditableTable";
import React, { useRef } from "react";
import { useGuest } from "../../../hook/useGuest";
import dayjs from "dayjs";
import CreateLinkForm from "./CreateLinkForm";

const { Text } = Typography;

// eslint-disable-next-line react/prop-types
const List = ({ eventId }) => {
  const { guestList, loading, refresh, createGuest, creating } =
    useGuest(eventId);

  const [open, setOpen] = React.useState(false);
  const formRef = useRef();

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <>{text || "Não informado"}</>,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <>{text || "Não informado"}</>,
    },
    {
      title: "Telefone",
      dataIndex: "phone",
      key: "phone",
      render: (text) => <>{text || "Não informado"}</>,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      filters: [
        { text: "Pendente", value: "pending" },
        { text: "Confirmado", value: "confirmed" },
        { text: "Recusado", value: "declined" },
      ],
      onFilter: (value, record) => record.status === value,
      render: (status) => {
        let color = "";
        let text = "";

        switch (status) {
          case "pending":
            color = "gold";
            text = "Pendente";
            break;
          case "confirmed":
            color = "green";
            text = "Confirmado";
            break;
          case "declined":
            color = "red";
            text = "Recusado";
            break;
          default:
            color = "default";
            text = status;
        }

        return <Tag color={color}>{text}</Tag>;
      },
    },
    {
      title: "Quantidade de senhas",
      dataIndex: "maxTicketCount",
      key: "maxTicketCount",
      render: (maxTicketCount, record) =>
        `${record.ticketCount}/${maxTicketCount}`,
    },
    {
      title: "Criação do link",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt) => (
        <>
          {dayjs(createdAt).add(3, "hour").format("DD/MM/YYYY HH:mm") ||
            "Não informado"}
        </>
      ),
    },
    {
      title: "Última atualização",
      dataIndex: "lastUpdated",
      key: "lastUpdated",
      render: (lastUpdate) =>
        lastUpdate
          ? dayjs(lastUpdate).add(3, "hour").format("DD/MM/YYYY HH:mm")
          : "Ainda não atualizado",
    },
    {
      title: "Link de convite",
      dataIndex: "uuid",
      key: "uuid",
      render: (uuid) => {
        const guestLink = `${window.location.origin}/Convite/${uuid}`;

        const copyToClipboard = () => {
          navigator.clipboard
            .writeText(guestLink)
            .then(() => {
              message.success("Link copiado!");
            })
            .catch(() => {
              message.error("Falha ao copiar o link.");
            });
        };

        return (
          <Button onClick={copyToClipboard} type="link">
            Copiar link
          </Button>
        );
      },
    },
    // {
    //   title: "Ações",
    //   key: "action",
    //   render: (record) => (
    //     <Space size="middle">
    //       <a onClick={() => openInvite(record)}>Editar</a>
    //       <a>Excluir</a>
    //     </Space>
    //   ),
    // },
  ];

  const handleAction = (record) => {
    console.log(`Ação: ${record}`);
  };

  const openInvite = async (record) => {
    setOpen(true);
    setTimeout(() => {
      formRef.current?.setFields(record);
    }, 0);
  };

  const handleSubmit = async () => {
    try {
      const values = await formRef.current.submit();
      const maxCount = parseInt(values.maxTicketCount, 10);

      const guest = {
        ...values,
        maxTicketCount: isNaN(maxCount) ? 1 : maxCount,
      };
      const link = await createGuest(guest);

      if (!link) {
        message.error("Erro ao criar o link de convite.");
        return;
      }

      const copyToClipboard = () => {
        navigator.clipboard
          .writeText(link)
          .then(() => {
            message.success("Link copiado!", 3);
          })
          .catch(() => {
            message.error("Falha ao copiar o link.", 3);
          });
      };

      copyToClipboard();
    } catch {
      message.error("Erro ao criar o link de convite.");
    }
  };

  const handleCancel = async () => {
    setOpen(false);
  };

  const confirmedTicketsCount = guestList
    ? guestList
        ?.filter((g) => g.status === "confirmed")
        ?.reduce((acc, g) => acc + (g.ticketCount || 0), 0)
    : 0;

  return (
    <>
      <Modal
        open={open}
        onCancel={handleCancel}
        styles={{
          body: { maxHeight: 600, overflowY: "auto", paddingRight: 16 },
        }}
        footer={[
          <Button key="cancel" loading={creating} onClick={handleCancel}>
            Cancelar
          </Button>,
          <Button
            key="submit"
            type="primary"
            loading={creating}
            onClick={handleSubmit}
          >
            Criar e copiar link
          </Button>,
        ]}
      >
        <CreateLinkForm ref={formRef} />
      </Modal>

      <Space style={{ display: "flex", justifyContent: "space-between" }}>
        <Flex gap={8}>
          <Button ghost type="primary" onClick={openInvite}>
            Novo link de convite
          </Button>

          <Button loading={loading} ghost type="primary" onClick={refresh}>
            Atualizar lista
          </Button>
        </Flex>

        <Space size="large" style={{ fontWeight: 600, fontSize: 16 }}>
          <Text>
            Quantidade de convites: <Text strong>{guestList.length}</Text>
          </Text>
          <Text>
            Senhas criadas:{" "}
            <Text>
              {guestList.reduce((acc, g) => acc + (g.maxTicketCount || 0), 0)}
            </Text>
          </Text>
          <Text>
            Senhas confirmadas:{" "}
            <Text type="success">{confirmedTicketsCount}</Text>
          </Text>
        </Space>
      </Space>

      <EditableTable
        loading={loading}
        scroll={{ x: 600 }}
        columns={columns}
        dataSource={guestList}
        onAction={handleAction}
      />
    </>
  );
};

export default List;
