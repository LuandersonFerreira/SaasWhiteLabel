import { Card, Form, Input } from "antd";

export default function Header() {
  return (
    <Card
      size="small"
      style={{
        marginBottom: "14px",
        padding: "18px",
        border: "1px solid #ddd",
      }}
    >
      <Form.Item
        name="name"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input
          placeholder="Nome do convite"
          variant="underlined"
          style={{ fontSize: "24px", fontWeight: "bold" }}
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[{ required: true, message: "Campo obrigatório" }]}
      >
        <Input
          placeholder="Descrição"
          variant="underlined"
          style={{ fontSize: "18px", marginTop: "10px" }}
        />
      </Form.Item>
    </Card>
  );
}
