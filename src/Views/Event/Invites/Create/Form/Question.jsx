import { DeleteOutlined } from "@ant-design/icons";
import { Card, Form, Input, Select, Switch, Divider, Flex } from "antd";
import QuestionType from "./QuestionType";
import { useWatch } from "antd/es/form/Form";
import PropTypes from "prop-types";

const { Option } = Select;

const Question = ({ field, remove, onFocus }) => {
  const questionType = useWatch([field.name, "questionType"]);

  return (
    <Card
      size="default"
      style={{
        transition: "border 0.3s ease-in-out",
        border: "1px solid #ddd",
        ...(onFocus && { border: "1px solid #000" }),
      }}
    >
      <Flex gap="10px">
        <Form.Item name={[field.name, "questionName"]} style={{ flex: 1 }}>
          <Input size="large" variant="underlined" placeholder="Pergunta" />
        </Form.Item>

        <Form.Item
          name={[field.name, "questionType"]}
          style={{ flex: 1, ...(!onFocus && { display: "none" }) }}
        >
          <Select>
            <Option value="text">Resposta curta</Option>
            <Option value="multiple">Múltipla escolha</Option>
            <Option value="checkbox">Caixas de seleção</Option>
            <Option value="list">Lista</Option>
          </Select>
        </Form.Item>
      </Flex>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <QuestionType
            field={field}
            questionType={questionType}
            onFocus={onFocus}
          />
        )}
      </Form.Item>

      <Divider
        style={{ margin: "15px", ...(!onFocus && { display: "none" }) }}
      />

      <Flex
        justify="flex-end"
        style={{
          ...(!onFocus && { display: "none" }),
        }}
      >
        <DeleteOutlined
          onClick={() => remove(field.name)}
          title="Remover"
          style={{
            cursor: "pointer",
            fontSize: "20px",
          }}
        />
        <Divider type="vertical" />

        <Form.Item
          name={[field.name, "required"]}
          valuePropName="checked"
          noStyle
        >
          <Switch checkedChildren="Obrigatório" unCheckedChildren="Opcional" />
        </Form.Item>
      </Flex>
    </Card>
  );
};

Question.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  remove: PropTypes.func.isRequired,
  onFocus: PropTypes.bool,
};

export default Question;
