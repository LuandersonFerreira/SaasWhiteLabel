import { Layout, Menu } from "antd";
import PropTypes from "prop-types";

const { Sider } = Layout;

const Sidebar = ({ menuItems }) => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="0"
      style={{ position: "fixed", height: "100vh", zIndex: 999 }}
    >
      <Menu
        mode="inline"
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={menuItems}
      />
    </Sider>
  );
};

Sidebar.propTypes = {
  menuItems: PropTypes.bool.isRequired,
};

export default Sidebar;
