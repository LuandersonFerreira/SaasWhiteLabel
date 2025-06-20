import { Form, Input, Button, Select, Checkbox } from "antd";
import { useEffect } from "react";
import PropTypes from "prop-types";

const { Option } = Select;

export default function GuestForm({ guest, form, handleSubmit, loading }) {
  useEffect(() => {
    if (guest) {
      form.setFieldsValue(guest);
      // Ajusta os companions iniciais se já existir (ex: em edit)
      if (guest.ticketCount && guest.companions) {
        form.setFieldsValue({ companions: guest.companions });
      }
    }
  }, [guest, form]);

  const handleTicketCountChange = (value) => {
    const currentCompanions = form.getFieldValue("companions") || [];

    let newCompanions = [...currentCompanions];

    if (value > currentCompanions.length) {
      const companionsToAdd = value - currentCompanions.length;
      for (let i = 0; i < companionsToAdd; i++) {
        newCompanions.push({ name: "", isOver12: false });
      }
    } else if (value < currentCompanions.length) {
      newCompanions = newCompanions.slice(0, value);
    }

    form.setFieldsValue({
      companions: newCompanions,
      ticketCount: value,
    });
  };
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
        label="Quantidade de acompanhantes"
        name="ticketCount"
        rules={[
          { required: true, message: "Escolha a quantidade de acompanhantes" },
        ]}
      >
        <Select
          placeholder="Selecione a quantidade de acompanhantes"
          onChange={handleTicketCountChange}
        >
          {Array.from(
            { length: guest.maxTicketCount + 1 }, // +1 para incluir o maxTicketCount
            (_, index) => (
              <Select.Option key={index} value={index}>
                {index}
              </Select.Option>
            )
          )}
        </Select>
      </Form.Item>

      <Form.List name="companions">
        {(fields) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <div
                key={key}
                style={{
                  marginBottom: 16,
                  padding: 12,
                  border: "1px solid #ddd",
                  borderRadius: 8,
                }}
              >
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  label={`Nome do acompanhante ${name + 1}`}
                  rules={[
                    {
                      required: true,
                      message: "Nome do acompanhante obrigatório",
                    },
                  ]}
                >
                  <Input placeholder="Nome" />
                </Form.Item>

                <Form.Item
                  {...restField}
                  name={[name, "isOver12"]}
                  valuePropName="checked"
                >
                  <Checkbox>Maior de 12 anos?</Checkbox>
                </Form.Item>
              </div>
            ))}
          </>
        )}
      </Form.List>

      <Form.Item
        label="Status"
        name="status"
        rules={[{ required: true, message: "Escolha seu status" }]}
      >
        <Select placeholder="Selecione seu status de presença">
          <Option value="pending">Ainda pensando… 🤔</Option>
          <Option value="confirmed">Com certeza vou! 🎉</Option>
          <Option value="declined">Infelizmente não posso 😢</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" block loading={loading}>
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
    maxTicketCount: PropTypes.number,
    ticketCount: PropTypes.number,
    companions: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        isOver12: PropTypes.bool,
      })
    ),
  }),
  form: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};
