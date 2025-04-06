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
  ConfigProvider,
  Dropdown,
  Layout,
  Menu,
  Space,
} from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useThemeStore } from "../../store/themeStore";
import styled from "styled-components";

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
  zIndex: 2,
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

const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background: ${({ gradientColors = [] }) =>
    gradientColors.length >= 2
      ? `radial-gradient(ellipse at top, ${gradientColors[0]}, transparent), radial-gradient(ellipse at bottom, ${gradientColors[1]}, transparent)`
      : "radial-gradient(ellipse at top, #1a1a1a, transparent), radial-gradient(ellipse at bottom, #666666, transparent)"};
`;

const HomeLayout = () => {
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

  const gradientColors = useThemeStore((state) => state.gradientColors);
  const bodyBg = "background: rgba(255, 255, 255, 0)";

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg,
          },
        },
      }}
    >
      <StyledLayout gradientColors={gradientColors}>
        <Layout>
          <Sider
            trigger={null}
            collapsible
            collapsed={collapsed}
            style={{
              ...siderStyle,
              background: "rgba(0, 0, 0, 0.6)",
              backdropFilter: "blur(20px)",
              position: isSmallScreen ? "fixed" : "sticky",
              zIndex: isSmallScreen && !collapsed ? 999 : 0,
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
              style={{
                background: "rgba(255, 255, 255, 0)",
                border: "none",
              }}
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
                background: "rgba(0, 0, 0, 0.6)",
                backdropFilter: "blur(20px)",
                zIndex: 2,
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
                    <Avatar
                      icon={<UserOutlined />}
                      style={{ cursor: "pointer" }}
                    />
                  </Space>
                </a>
              </Dropdown>
            </Header>
            <Content
              style={{
                margin: "10px 10%",
              }}
            >
              <Outlet />
            </Content>
            <Footer
              style={{
                textAlign: "center",
                background: "rgba(0, 0, 0, 0)",
              }}
            >
              InviteMe ©{new Date().getFullYear()} Created by NeoDigital
            </Footer>
          </Layout>
        </Layout>
      </StyledLayout>
    </ConfigProvider>
  );
};

export default HomeLayout;
