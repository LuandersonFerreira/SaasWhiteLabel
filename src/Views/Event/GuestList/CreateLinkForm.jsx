import { forwardRef, useImperativeHandle, useState } from "react";
import { Form, Input, Typography } from "antd";

const { Text } = Typography;

// eslint-disable-next-line react/prop-types
const CreateLinkForm = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      return formValues;
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    setFields: (data) => {
      form.setFieldsValue(data);
      setError(null);
    },
    submit: handleSubmit,
    resetFields: () => {
      form.resetFields();
      setError(null);
    },
  }));

  return (
    <Form
      form={form}
      layout="vertical"
      size="large"
      style={{ maxWidth: 600, margin: "auto" }}
    >
      <Form.Item label="Nome" name="name">
        <Input placeholder="Nome do convidado" />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ type: "email", message: "Email inválido" }]}
      >
        <Input placeholder="Email do convidado" />
      </Form.Item>

      <Form.Item label="Telefone" name="phone">
        <Input placeholder="Telefone do convidado" />
      </Form.Item>

      <Form.Item
        label="Quantidade de senhas"
        name="maxTicketCount"
        rules={[{ required: true, message: "Quantidade mínima é 1" }]}
      >
        <Input
          placeholder="Quantidade"
          type="number"
          min={1}
          defaultValue={1}
          onBlur={() => {
            const current = form.getFieldValue("maxTicketCount");
            if (!current || current < 1) {
              form.setFieldsValue({ maxTicketCount: 1 });
            }
          }}
        />
      </Form.Item>

      {error && <Text type="danger">{error}</Text>}
    </Form>
  );
});

CreateLinkForm.displayName = "CreateLinkForm";

export default CreateLinkForm;
