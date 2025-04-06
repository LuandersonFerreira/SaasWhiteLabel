import { Form, Radio, Checkbox, Select } from "antd";
import PropTypes from "prop-types";
import { mockInvite } from "../../mock/invite";
import {
  StyledButton,
  StyledForm,
  StyledFormItem,
  StyledInput,
  StyledSelect,
} from "./style";

const InviteForm = ({ invite }) => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Respostas do formulário:", values);
  };

  return (
    <StyledForm form={form} layout="vertical" onFinish={onFinish}>
      <h1 style={{ fontSize: "24px", textAlign: "center" }}>{invite.name}</h1>
      <p
        style={{ fontSize: "18px", textAlign: "center", marginBottom: "24px" }}
      >
        {invite.description}
      </p>

      {invite.questions.map((question, index) => (
        <StyledFormItem
          key={index}
          label={question.questionName}
          name={question.questionName}
          rules={
            question.required
              ? [{ required: true, message: "Campo obrigatório!" }]
              : []
          }
        >
          {question.questionType === "text" && (
            <StyledInput placeholder="Digite sua resposta" />
          )}
          {question.questionType === "multiple" && (
            <Radio.Group options={question.answers} />
          )}
          {question.questionType === "checkbox" && (
            <Checkbox.Group options={question.answers} />
          )}
          {question.questionType === "list" && (
            <StyledSelect placeholder="Selecione uma opção">
              {question.answers.map((option, idx) => (
                <Select.Option key={idx} value={option}>
                  {option}
                </Select.Option>
              ))}
            </StyledSelect>
          )}
        </StyledFormItem>
      ))}

      <Form.Item>
        <StyledButton type="primary" htmlType="submit">
          Enviar
        </StyledButton>
      </Form.Item>
    </StyledForm>
  );
};

InviteForm.propTypes = {
  invite: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    description: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    questions: PropTypes.arrayOf(
      PropTypes.shape({
        questionName: PropTypes.string.isRequired,
        required: PropTypes.bool.isRequired,
        questionType: PropTypes.oneOf(["text", "multiple", "checkbox", "list"])
          .isRequired,
        answers: PropTypes.arrayOf(PropTypes.string),
      })
    ).isRequired,
  }).isRequired,
};

export default function InvitePage() {
  return <InviteForm invite={mockInvite} />;
}
