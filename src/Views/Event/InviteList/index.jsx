import React from "react";
import { Modal } from "antd";
import List from "./list";

// eslint-disable-next-line react/prop-types
const InviteList = ({ children }) => {
  const [openFirstModal, setOpenFirstModal] = React.useState(false);

  const showLoading = () => {
    setOpenFirstModal(true);
  };

  return (
    <>
      {children(showLoading)}

      <Modal
        width={1200}
        title={<p>Lista de convites</p>}
        open={openFirstModal}
        onCancel={() => setOpenFirstModal(false)}
        footer={null}
      >
        <List />
      </Modal>
    </>
  );
};

export default InviteList;
