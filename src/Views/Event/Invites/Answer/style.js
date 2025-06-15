import { Button, Form, Input, Select } from "antd";
import styled from "styled-components";

export const StyledForm = styled(Form)`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

export const StyledFormItem = styled(Form.Item)`
  padding: 20px;
  background: #f9f9f9;

  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 24px;

  label {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
`;

export const StyledInput = styled(Input)`
  font-size: 16px;
  padding: 10px;
  border-radius: 6px;
`;

export const StyledSelect = styled(Select)`
  width: 100%;
  font-size: 16px;
`;

export const StyledButton = styled(Button)`
  width: 100%;
  font-size: 18px;
  height: 48px;
`;
