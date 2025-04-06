import React, { useState } from "react";
import {
  LaptopOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  NotificationOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Breadcrumb,
  Layout,
  Menu,
  Dropdown,
  theme,
  Avatar,
  Space,
  Button,
  Input,
} from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

const { Content, Sider } = Layout;

const { Search } = Input;

const items2 = [UserOutlined, LaptopOutlined, NotificationOutlined].map(
  (icon, index) => {
    const key = String(index + 1);
    return {
      key: `sub${key}`,
      icon: React.createElement(icon),
      label: `subnav ${key}`,
      children: Array.from({ length: 4 }).map((_, j) => {
        const subKey = index * 4 + j + 1;
        return {
          key: subKey,
          label: `option${subKey}`,
        };
      }),
    };
  }
);

const LayoutCustom = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const [collapsed, setCollapsed] = useState(false);

  const dropdownItems = [
    {
      key: "1",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.antgroup.com"
        >
          Alterar Conta
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.aliyun.com"
        >
          Sair
        </a>
      ),
      icon: <SmileOutlined />,
      disabled: true,
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

  return (
    <Layout>
      <Layout>
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          collapsedWidth={isSmallScreen ? "0" : "0"}
          breakpoint="lg"
          style={{
            position: "fixed",
            height: "100vh",
            zIndex: 999, // Ensure the sidebar is below the button
            background: colorBgContainer,
          }}
        >
          {/* Contêiner para o botão e o campo de pesquisa */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between", // Alinha os itens nas extremidades
              padding: "16px", // Espaçamento interno
            }}
          >
            {/* Botão de alternância de visibilidade do sidebar */}
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
            />

            {/* Campo de busca */}
          </div>

          {/* Menu */}
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{ height: "100%", borderRight: 0 }}
            items={items2}
          />
        </Sider>

        <Layout
          style={{
            marginLeft: isSmallScreen && collapsed ? 0 : 200, // Adjusted the margin
            padding: "0 24px 24px",
          }}
        >
          <Content
            style={{
              margin: 0,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              position: "relative",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: isSmallScreen ? "space-between" : "flex-start", // Align on the left for larger screens
                alignItems: "center",
                marginBottom: "16px",
                position: "sticky",
                top: 0,
                backgroundColor: colorBgContainer,
                zIndex: 1,
                padding: "16px",
              }}
            >
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
            </div>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default LayoutCustom;
