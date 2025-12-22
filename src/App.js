import { ColorModeContext, useMode } from "./theme.js";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import Topbar from "./scenes/global/Topbar.jsx";
import Sidebar from "./scenes/global/Sidebar.jsx";
import Dashboard from "./scenes/dashboard/index.jsx";

function App() {
  const [theme, colorMode] = useMode();
  console.log("Topbar is:", Topbar);
console.log("Sidebar is:", Sidebar);
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme ={theme}>
      <CssBaseline />
       <div className="app">
        <main className="content">
          <Topbar />
        </main>
       </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
