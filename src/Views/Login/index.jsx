import { useState } from "react";
import { Button, Form, Input, Typography } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { Container, StyledForm } from "./style";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";

const { Title } = Typography;

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async () => {
    const success = await login(email, password);
    if (success) {
      alert("Login feito com sucesso!");
      navigate(`/`);
    } else {
      alert("Falha no login");
    }
  };

  return (
    <Container>
      <StyledForm name="login-form" onFinish={handleSubmit} layout="vertical">
        <Title level={3} style={{ textAlign: "center", color: "#fff" }}>
          Realizar login
        </Title>

        <Form.Item
          name="email"
          rules={[{ required: true, message: "Insira seu e-mail!" }]}
        >
          <Input
            prefix={<UserOutlined />}
            placeholder="Insira seu e-mail"
            onChange={(e) => setEmail(e.target.value)}
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

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Entrar
          </Button>
        </Form.Item>
      </StyledForm>
    </Container>
  );
};

export default Login;
