import RouteConfig from "./RouteConfig";
import "./App.css";
import ThemeProvider from "./styles/ThemeProvider";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";

dayjs.locale("pt-br");

function App() {
  return (
    <ThemeProvider>
      <RouteConfig />
    </ThemeProvider>
  );
}

export default App;
