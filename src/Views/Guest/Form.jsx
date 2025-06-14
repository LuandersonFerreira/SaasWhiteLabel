import { Card, Form, Input, Button, Select, Typography } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const { Option } = Select;
const { Title } = Typography;

export default function GuestForm({ guest, form, event, handleSubmit }) {
  useEffect(() => {
    if (guest) {
      form.setFieldsValue(guest);
    }
  }, [guest, form]);

  const backgroundStyle = {
    backgroundImage: `url(${event?.photo})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    padding: 40,
    minHeight: "100vh",
  };

  const overlayStyle = {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    maxWidth: 500,
    margin: "auto",
    borderRadius: 8,
    padding: 24,
  };

  return (
    <div style={backgroundStyle}>
      <Card
        style={overlayStyle}
        title={<Title level={3}>Confirme sua presença</Title>}
      >
        <Form layout="vertical" form={form} onFinish={handleSubmit}>
          <Form.Item
            label="Nome"
            name="name"
            rules={[{ required: true, message: "Digite seu nome" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[{ type: "email", message: "Email inválido" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Telefone" name="phone">
            <Input />
          </Form.Item>

          <Form.Item
            label="Status"
            name="status"
            rules={[{ required: true, message: "Escolha seu status" }]}
          >
            <Select placeholder="Selecione o status de presença">
              <Option value="pending">Pendente</Option>
              <Option value="confirmed">Confirmado</Option>
              <Option value="declined">Recusado</Option>
            </Select>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Confirmar Presença
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}

GuestForm.propTypes = {
  guest: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.string,
    eventId: PropTypes.string,
    status: PropTypes.string,
  }),
  form: PropTypes.object.isRequired,
  event: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    photo: PropTypes.string,
    address: PropTypes.string,
    date: PropTypes.string,
    maxGuests: PropTypes.number,
  }),
  handleSubmit: PropTypes.func.isRequired,
};
