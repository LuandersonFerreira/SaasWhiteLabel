import React from "react";
import { Button, Modal } from "antd";
import List from "./list";
import Form from "./Form"

const InviteList = ({ children }) => {
  const [openFirstModal, setOpenFirstModal] = React.useState(false);
  const [loadingFirst, setLoadingFirst] = React.useState(true);

  const [openSecondModal, setOpenSecondModal] = React.useState(false);
  const [loadingSecond, setLoadingSecond] = React.useState(true);

  const showLoading = () => {
    setOpenFirstModal(true);
    setLoadingFirst(true);

    setTimeout(() => {
      setLoadingFirst(false);
    }, 2000);
  };

  const openSecond = () => {
    setOpenSecondModal(true);
    setLoadingSecond(true);

    setTimeout(() => {
      setLoadingSecond(false);
    }, 1000);
  };

  const closeSecond = () => {
    setOpenSecondModal(false);
    setLoadingSecond(true);
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

      <Button ghost onClick={() => setOpenSecondModal(true)}>
        Lista de Convidados
      </Button>

      <Modal
        width={1000}
        title="Lista de Convidados"
        open={openSecondModal}
        onCancel={() => {
          setOpenSecondModal(false);
          setOnEdit(null);
        }}
        footer={null}
      >
        < Form />
      </Modal>
    </>
  );
};

export default InviteList;