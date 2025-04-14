import { Form } from "antd";
import InviteForm from "./Form";
import Header from "./Header";
import { forwardRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";

const CreateInvite = forwardRef((props, ref) => {
  const [form] = Form.useForm();
  const handleSubmit = async () => {
    try {
      const formValues = await form.validateFields();
      console.log("Final JSON:", { ...formValues });
      return formValues;
    } catch (error) {
      console.error("Erro ao enviar:", error);
    }
  };

  useImperativeHandle(ref, () => ({
    setFields: (data) => {
      form.setFieldsValue(data);
    },
    submit: handleSubmit,
    resetFields: () => {
      form.resetFields();
    },
  }));

  return (
    <div>
      <Form
        form={form}
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
        layout="vertical"
        size="large"
        initialValues={{
          name: "Novo Convite",
          description: "Descrição do convite",
        }}
      >
        <Header />
        <InviteForm />
      </Form>
    </div>
  );
});

CreateInvite.displayName = "CreateInvite";

CreateInvite.propTypes = {
  data: PropTypes.object,
};

export default CreateInvite;
