import {
  DownOutlined,
  MinusCircleOutlined,
  PlusOutlined,
  UpOutlined,
} from "@ant-design/icons";
import { Checkbox, Flex, Form, Radio, Typography } from "antd";
import {
  IconButton,
  StyledAddButton,
  StyledFlexColumn,
  StyledFlexRow,
  StyledFormItem,
  UnderlineInput,
} from "./style";
import PropTypes from "prop-types";

const QuestionType = ({ field, onFocus }) => {
  return (
    <Form.Item noStyle shouldUpdate={(prev, curr) => prev !== curr}>
      {({ getFieldValue }) => {
        const questionType = getFieldValue([
          "questions",
          field.name,
          "questionType",
        ]);

        if (questionType === "text") {
          return (
            <div
              key={field.name}
              style={{
                margin: "10px",
              }}
            >
              <Typography.Text
                type="secondary"
                style={{
                  margin: "10px",
                  borderBottom: "1px dashed #000",
                }}
              >
                Texto de resposta curta
              </Typography.Text>
            </div>
          );
        }

        return (
          <Form.List key={field.name} name={[field.name, "answers"]}>
            {(fields, { add, remove, move }) => (
              <StyledFlexColumn>
                {fields.map((subField, index) => (
                  <StyledFormItem key={subField.key} required={false}>
                    <StyledFlexRow>
                      {questionType === "multiple" && <Radio disabled />}
                      {questionType === "checkbox" && <Checkbox disabled />}

                      <Form.Item
                        {...subField}
                        name={[subField.name]}
                        validateTrigger={["onChange", "onBlur"]}
                        noStyle
                      >
                        <UnderlineInput
                          size="large"
                          placeholder="Opção"
                          variant="underlined"
                          style={{ flex: 1 }}
                        />
                      </Form.Item>

                      <Flex
                        style={{
                          gap: "5px",
                          ...(!onFocus && { display: "none" }),
                        }}
                      >
                        <IconButton
                          icon={<UpOutlined />}
                          disabled={index === 0}
                          onClick={() => index > 0 && move(index, index - 1)}
                        />
                        <IconButton
                          icon={<DownOutlined />}
                          disabled={index === fields.length - 1}
                          onClick={() =>
                            index < fields.length - 1 && move(index, index + 1)
                          }
                        />
                        <IconButton
                          icon={<MinusCircleOutlined />}
                          onClick={() => remove(subField.name)}
                        />
                      </Flex>
                    </StyledFlexRow>
                  </StyledFormItem>
                ))}

                <Form.Item
                  style={{
                    ...(!onFocus && { display: "none" }),
                  }}
                >
                  <StyledAddButton
                    type="dashed"
                    onClick={() => add(`Opção ${fields.length + 1}`)}
                    icon={<PlusOutlined />}
                  >
                    Adicionar opção
                  </StyledAddButton>
                </Form.Item>
              </StyledFlexColumn>
            )}
          </Form.List>
        );
      }}
    </Form.Item>
  );
};

QuestionType.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  }).isRequired,
  onFocus: PropTypes.bool,
};

export default QuestionType;
