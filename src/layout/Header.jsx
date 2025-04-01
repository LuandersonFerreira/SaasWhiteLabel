import { Dropdown, Avatar, Space } from "antd";
import { UserOutlined, SmileOutlined, EditOutlined } from "@ant-design/icons";
import PropTypes from "prop-types";
import Breadcrumbs from "./Breadcrumbs";

const HeaderCustom = ({ isSmallScreen, location }) => {
  const dropdownItems = [
    { key: "1", label: <a href="#">Alterar Conta</a>, icon: <EditOutlined /> },
    {
      key: "2",
      label: (
        <a href="#" onClick={() => console.log()}>
          Sair
        </a>
      ),
      icon: <SmileOutlined />,
    },
  ];

  if (isSmallScreen) return null;

  return (
    <div>
      <Breadcrumbs location={location} isSmallScreen={isSmallScreen} />

      <Dropdown menu={{ items: dropdownItems }}>
        <a onClick={(e) => e.preventDefault()}>
          <Space>
            <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
};

HeaderCustom.propTypes = {
  isSmallScreen: PropTypes.bool.isRequired,
  location: PropTypes.string.isRequired,
};

export default HeaderCustom;
