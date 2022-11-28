import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { EmailConfirmationFeedback } from "./containers/EmailConfirmationFeedback";
import { Home } from "./containers/Home";

export const AppRoutes = () => (
  <HashRouter>
    <Routes>
      <Route index element={<Home />} />
      <Route path="validar-email/:type/:code" element={<EmailConfirmationFeedback />} />
    </Routes>
  </HashRouter>
);
