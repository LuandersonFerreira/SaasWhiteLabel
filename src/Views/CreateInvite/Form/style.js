import { Button, Form, Input } from "antd";
import styled from "styled-components";

export const UnderlineInput = styled(Input)`
  width: 60%;
  border: none;
  border-bottom: 1px solid transparent;
  transition: border-bottom 0.3s ease;
  font-size: 18px;

  &:hover {
    border-bottom-color: inherit;
  }

  &:focus {
    border-bottom-color: inherit;
    box-shadow: none;
  }
`;

export const StyledFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 10px;
  text-align: center;
`;

export const StyledFlexRow = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const StyledFormItem = styled(Form.Item)`
  width: 100%;
`;

export const StyledAddButton = styled(Button)`
  width: 60%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const IconButton = styled(Button)`
  font-size: 20px;
`;
