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
import { useEvents } from "../hook/useEvents";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;

export default function CreateEventForm() {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [base64Image, setBase64Image] = useState(null);
  const [fileList, setFileList] = useState([]);

  const { createEvent } = useEvents(null, false);

  const handleFileChange = (info) => {
    const { file } = info;

    if (file.status === "removed") {
      setFileList([]);
      form.setFieldsValue({ banner: null });
      setBase64Image(null);
      return;
    }

    const selectedFile = file.originFileObj;
    if (!selectedFile) return;

    if (!selectedFile.type.startsWith("image/")) {
      message.error("Por favor, selecione uma imagem válida.");
      return;
    }

    const uploadingFile = {
      uid: file.uid,
      name: file.name,
      status: "uploading",
    };
    setFileList([uploadingFile]);

    const reader = new FileReader();
    reader.onload = () => {
      const base64 = reader.result.split(",")[1];
      setBase64Image(base64);
      form.setFieldsValue({ banner: base64 });

      setFileList([
        {
          ...uploadingFile,
          url: reader.result,
          status: "done",
        },
      ]);
    };

    reader.onerror = () => {
      message.error("Erro ao ler o arquivo.");
      setFileList([
        {
          ...uploadingFile,
          status: "error",
        },
      ]);
    };

    reader.readAsDataURL(selectedFile);
  };

  const onFinish = async (values) => {
    try {
      const payload = {
        ...values,
        date: values.date.toISOString(), // garante UTC
        banner: base64Image,
      };

      await createEvent(payload);
      message.success("Evento criado com sucesso!");
      navigate("/");
    } catch (err) {
      message.error(err.response.data);
      console.error("Falha ao criar evento", err.response.data);
    }
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
          name="title"
          rules={[{ required: true, message: "O nome é obrigatório" }]}
        >
          <Input placeholder="Digite o nome do evento" />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="description"
          rules={[{ required: false }]}
        >
          <Input placeholder="Descrição do evento" />
        </Form.Item>

        <Form.Item label="Fotos do Evento" name="banner">
          <Upload
            listType="picture"
            fileList={fileList}
            onChange={handleFileChange}
            maxCount={1}
          >
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

        <Form.Item label="Número Máximo de Convidados" name="maxGuests">
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
