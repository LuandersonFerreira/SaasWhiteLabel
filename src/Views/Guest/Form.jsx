import { Form, Input, Button, Select } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const { Option } = Select;

export default function GuestForm({ guest, form, handleSubmit }) {
  useEffect(() => {
    if (guest) {
      form.setFieldsValue(guest);
    }
  }, [guest, form]);

  return (
    <Form
      size="large"
      style={{ width: "100%" }}
      layout="vertical"
      form={form}
      onFinish={handleSubmit}
    >
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
          Confirmar
        </Button>
      </Form.Item>
    </Form>
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
  handleSubmit: PropTypes.func.isRequired,
};
