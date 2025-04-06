import { ConfigProvider } from "antd";
import { useThemeStore } from "../store/themeStore";
import pt_BR from "antd/locale/pt_BR";

// eslint-disable-next-line react/prop-types
const ThemeProvider = ({ children }) => {
  const { primaryColor, backgroundColor } = useThemeStore();

  return (
    <ConfigProvider
      locale={pt_BR}
      theme={{
        token: {
          colorPrimary: primaryColor,
          colorBgBase: backgroundColor,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};

export default ThemeProvider;
