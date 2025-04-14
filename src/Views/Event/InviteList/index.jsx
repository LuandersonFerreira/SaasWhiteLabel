import React from "react";
import { Modal } from "antd";
import List from "./list";

const InviteList = ({ children }) => {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const showLoading = () => {
    setOpen(true);
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };

  return (
    <>
      {children(showLoading)}

      <Modal
        width={1200}
        title={<p>Lista de convites</p>}
        loading={loading}
        open={open}
        onCancel={() => setOpen(false)}
      >
        <List />
      </Modal>
    </>
  );
};

export default InviteList;
