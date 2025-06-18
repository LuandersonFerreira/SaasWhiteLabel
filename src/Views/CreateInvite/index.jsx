import { Button, Form } from "antd";
import InviteForm from "./Form";
import Header from "./Header";

export default function CreateInvite() {
  const [form] = Form.useForm();

  const handleSubmit = async () => {
    try {
      await form.validateFields();
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  return (
    <div>
      <Form
        form={form}
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        layout="vertical"
        initialValues={{
          name: "Novo Convite",
          description: "Descrição do convite",
        }}
        size="large"
      >
        <Header />
        <InviteForm />
        <Button type="primary" onClick={handleSubmit} style={{ marginTop: 20 }}>
          Salvar
        </Button>
      </Form>
    </div>
  );
}
