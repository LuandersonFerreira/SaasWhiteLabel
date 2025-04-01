import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Breadcrumb,
  Button,
  Dropdown,
  Layout,
  Menu,
  Space,
  theme,
} from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { Header, Sider, Content, Footer } = Layout;

const siderStyle = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const menuItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: "Criar convite",
    href: "/Event/Create-invite",
  },
  {
    key: "2",
    icon: <UserOutlined />,
    label: "Responder convite",
    href: "/invite/riks",
  },
];

const HomeLayout = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });

  const [collapsed, setCollapsed] = useState(isSmallScreen ? true : false);
  const [selectedKey, setSelectedKey] = useState("");

  const handleSignOut = () => {};

  const dropdownItems = [
    {
      key: "1",
      label: <a>Alterar Conta</a>,
    },
    {
      key: "2",
      label: <a onClick={handleSignOut}>Sair</a>,
      icon: <SmileOutlined />,
    },
  ];

  const pathSnippets = location.pathname.split("/").filter((i) => i);
  const breadcrumbItems = [
    { title: "Home", path: "/" },
    ...pathSnippets.map((snippet, index) => ({
      title: snippet,
      path: `/${pathSnippets.slice(0, index + 1).join("/")}`,
    })),
  ];

  useEffect(() => {
    const matchedItem = menuItems.find(
      (item) => item.href === location.pathname
    );
    setSelectedKey(matchedItem ? matchedItem.key : "");
  }, [location.pathname]);

  return (
    <Layout>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          ...siderStyle,
          background: colorBgContainer,
          position: isSmallScreen ? "fixed" : "sticky", // Alterar para fixed no mobile
          zIndex: isSmallScreen && !collapsed ? 999 : 0, // Para que o sidebar fique por cima quando expandido
        }}
        collapsedWidth={0}
      >
        {isSmallScreen && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        )}
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems.map((item) => ({
            key: item.key,
            icon: item.icon,
            label: <a href={item.href}>{item.label}</a>,
          }))}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            position: "sticky",
            top: 0,
            backgroundColor: colorBgContainer,
            zIndex: 1,
            padding: "16px",
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
            }}
          />
          <Breadcrumb
            items={breadcrumbItems.map(({ title, path }) => ({
              title,
              href: path,
            }))}
          />
          <Dropdown menu={{ items: dropdownItems }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <Avatar icon={<UserOutlined />} style={{ cursor: "pointer" }} />
              </Space>
            </a>
          </Dropdown>
        </Header>
        <Content
          style={{
            margin: "10px 30px",
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          InviteMe ©{new Date().getFullYear()} Created by NeoDigital
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
