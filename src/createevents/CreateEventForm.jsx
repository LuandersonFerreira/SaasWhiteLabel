import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Upload,
  Button,
  Typography,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useEvents } from "../hook/useEvents";

const { Title } = Typography;

export default function CreateEventForm() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { createEvent } = useEvents(null, false);

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        date: values.date.toISOString(), // garante UTC
      };

      console.log("Payload do evento:", payload);

      await createEvent(payload);
      message.success("Evento criado com sucesso!");
    } catch (err) {
      console.error("Falha ao criar evento", err);
    }
    // navigate("/");
  };

  return (
    <div
      style={{
        maxWidth: 600,
        margin: "0 auto",
        padding: 24,
        background: "#fff",
        borderRadius: 8,
      }}
    >
      <Title level={2}>Criar Novo Evento</Title>
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nome do Evento"
          name="name"
          rules={[{ required: true, message: "O nome é obrigatório" }]}
        >
          <Input placeholder="Digite o nome do evento" />
        </Form.Item>

        <Form.Item label="Fotos do Evento" name="photo">
          <Upload listType="picture" beforeUpload={() => false} multiple>
            <Button icon={<UploadOutlined />}>Selecionar Foto</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          label="Data do Evento"
          name="date"
          rules={[{ required: true, message: "A data é obrigatória" }]}
        >
          <DatePicker
            showTime
            format="DD/MM/YYYY HH:mm"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="Endereço"
          name="address"
          rules={[{ required: true, message: "O endereço é obrigatório" }]}
        >
          <Input placeholder="Digite o endereço do evento" />
        </Form.Item>

        <Form.Item label="Número Máximo de Convidados" name="maxguests">
          <InputNumber
            min={1}
            placeholder="Digite o número máximo de convidados"
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Criar Evento
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
