import { Button, Flex, Form } from "antd";
import Question from "./Question";
import { useState } from "react";

const InviteForm = () => {
  const [onFocus, setOnFocus] = useState(null);

  return (
    <Form.List name="questions">
      {(fields, { add, remove }) => (
        <Flex style={{ gap: "10px" }} vertical>
          {fields.map((field, index) => (
            <div key={field.key} onClick={() => setOnFocus(index)}>
              <Question
                field={field}
                remove={remove}
                onFocus={onFocus === index}
              />
            </div>
          ))}

          <Button
            type="dashed"
            onClick={() => {
              add({
                questionName: `Pergunta ${fields.length + 1}`,
                required: true,
                questionType: "text",
              });
              setOnFocus(fields.length);
            }}
            block
          >
            + Adicionar Pergunta
          </Button>
        </Flex>
      )}
    </Form.List>
  );
};

export default InviteForm;
