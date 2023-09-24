import { useState } from "react";
import "./App.css";
import { Box, Container, Typography, IconButton } from "@mui/material";
import OutputDrop from "./ui/OutputDrop";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { ObjData } from "./parser/MapParser";
import DataView from "./ui/DataView";
import { Routes, Route, Outlet } from "react-router-dom";

function Layout() {
  return (
    <Container maxWidth="lg">
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          <IconButton href="./gcc-output-map-web-renderer.zip" size="large">
            <CloudDownloadIcon color="action" />
          </IconButton>
          output.map viewer
        </Typography>
        <Outlet />
      </Box>
    </Container>
  );
}

function Home() {
  const [data, setData] = useState<ObjData>(new ObjData());

  return (
    <div>
      <OutputDrop OnLoaded={setData} />

      <DataView data={data} />
    </div>
  );
}

const App = (): JSX.Element => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
    </Routes>
  );
};

export default App;