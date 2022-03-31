import * as ReactDOMClient from "react-dom/client";
import React from "react";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import { Goals } from "./Goals";
import { Goal } from "./Goal";

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = ReactDOMClient.createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="goals" element={<Goals />}>
            <Route path=":goal" element={<Goal />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
