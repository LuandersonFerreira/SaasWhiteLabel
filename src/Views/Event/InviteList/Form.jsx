import React, { useEffect } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
import { toast } from "react-toastify";

const InviteForm = ({ getUsers, onEdit, setOnEdit }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (onEdit) {
      form.setFieldsValue(onEdit);
    }
  }, [onEdit]);

  const onFinish = async (values) => {
    try {
      if (onEdit) {
        await axios.put(`http://localhost:3000/${onEdit.id}`, values);
        toast.success("Convidado atualizado com sucesso!");
      } else {
        await axios.post("http://localhost:3000", values);
        toast.success("Convidado adicionado com sucesso!");
      }
      form.resetFields();
      setOnEdit(null);
      getUsers();
    } catch (error) {
      toast.error("Erro ao salvar: " + error.message);
    }
  };

  return (
    <Form form={form} layout="inline" onFinish={onFinish}>
      <Form.Item name="nome" rules={[{ required: true, message: "Nome obrigatório" }]}>
        <Input placeholder="Nome" />
      </Form.Item>
      <Form.Item name="email" rules={[{ required: true, message: "Email obrigatório" }]}>
        <Input placeholder="Email" />
      </Form.Item>
      <Form.Item name="fone" rules={[{ required: true, message: "Telefone obrigatório" }]}>
        <Input placeholder="Telefone" />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Convidar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default InviteForm;
