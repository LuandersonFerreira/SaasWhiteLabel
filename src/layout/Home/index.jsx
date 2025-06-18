import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PlusCircleOutlined,
  SmileOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, ConfigProvider, Dropdown, Layout, Menu, Tooltip } from "antd";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { useThemeStore } from "../../store/themeStore";
import styled from "styled-components";
import { logout } from "../../hook/useAuth";

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
    label: "HomePage",
    href: "/",
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
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ maxWidth: 768 });
  const { setGradientColors, gradientColors } = useThemeStore((state) => state);

  const [collapsed, setCollapsed] = useState(isSmallScreen ? true : false);
  const [selectedKey, setSelectedKey] = useState("");

  const handleSignOut = () => {
    logout();
  };

  const dropdownItems = [
    {
      key: "1",
      label: <a>Alterar Conta</a>,
    },
    {
      key: "2",
      label: (
        <Link to="/login">
          <a onClick={handleSignOut}>Sair</a>
        </Link>
      ),
      icon: <SmileOutlined />,
    },
  ];

  // const pathSnippets = location.pathname.split("/").filter((i) => i);
  // const breadcrumbItems = [
  //   { title: "Home", path: "/" },
  //   ...pathSnippets.map((snippet, index) => ({
  //     title: snippet,
  //     path: `/${pathSnippets.slice(0, index + 1).join("/")}`,
  //   })),
  // ];

  useEffect(() => {
    const matchedItem = menuItems.find(
      (item) => item.href === location.pathname
    );
    setSelectedKey(matchedItem ? matchedItem.key : "");

    // se não estiver em rota de evento, seta o gradiente padrão
    const isEventPage = location.pathname.startsWith("/Event/");
    if (!isEventPage) {
      setGradientColors(["#1a1a1a", "#333333", "#666666"]);
    }
  }, [location.pathname]);

  const bodyBg = "background: rgba(255, 255, 255, 0)";

  return (
    <ConfigProvider
      theme={{
        components: {
          Layout: {
            bodyBg,
          },
          Breadcrumb: {
            linkColor: "#fff",
            separatorColor: "#fff",
            linkHoverColor: "rgba(255,255,255,0.5)",
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
                label: <a onClick={() => navigate(item.href)}>{item.label}</a>,
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

              {/* <Breadcrumb
                items={breadcrumbItems.map(({ title, path }) => ({
                  title: <a onClick={() => navigate(path)}>{title}</a>,
                }))}
              /> */}

              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Tooltip title="Criar novo evento">
                  <Button
                    shape="circle"
                    icon={<PlusCircleOutlined />}
                    style={{
                      backgroundColor: "rgba(255, 255, 255, 0.85)",
                    }}
                    onClick={() => navigate("/CriarEvento")}
                  />
                </Tooltip>

                <Dropdown menu={{ items: dropdownItems }}>
                  <a onClick={(e) => e.preventDefault()}>
                    <Button
                      shape="circle"
                      icon={<UserOutlined />}
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.85)",
                      }}
                    />
                  </a>
                </Dropdown>
              </div>
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
                color: "#fff",
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
