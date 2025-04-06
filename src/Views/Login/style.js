import styled from "styled-components";
import { Form } from "antd";

export const Container = styled.div`
  width: 450px;
  margin: 100px auto;
  background-color: rgba(187, 187, 198, 1);
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 1);
  padding: 40px;
  border-radius: 10px;
`;

export const StyledForm = styled(Form)`
  .ant-input,
  .ant-input-password {
    border-radius: 40px;
    height: 45px;
    padding: 0 15px;
  }

  .ant-input-prefix {
    color: #999;
  }

  .ant-btn-primary {
    height: 45px;
    border-radius: 40px;
    font-weight: bold;
  }

  .ant-typography {
    color: #fff;
  }

  .ant-checkbox-wrapper {
    color: #fff;
  }
`;
