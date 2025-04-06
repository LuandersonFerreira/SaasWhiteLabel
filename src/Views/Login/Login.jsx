import { useState } from "react";
import { Form, Input, Button, Checkbox, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Container, StyledForm } from "./style";

const { Title, Link } = Typography;

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    alert(`Enviando os dados: ${username} - ${password}`);
  };

  return (
    <Container>
      <StyledForm name="login-form" onFinish={handleSubmit} layout="vertical">
        <Title level={3} style={{ textAlign: "center", color: "#fff" }}>
          Crie seu evento
        </Title>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Insira seu e-mail!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Insira seu e-mail"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: "Insira sua senha!" }]}
        >
          <Input.Password
            prefix={<LockOutlined />}
            placeholder="Insira sua senha"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>

        <Form.Item style={{ marginBottom: "10px" }}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Checkbox>Lembre de mim</Checkbox>
            <Link href="#">Esqueceu a senha?</Link>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Enviar código de verificação
          </Button>
        </Form.Item>

        <div style={{ textAlign: "center", color: "#fff" }}>
          <Link href="#">Criar conta</Link>
        </div>
      </StyledForm>
    </Container>
  );
};

export default Login;
