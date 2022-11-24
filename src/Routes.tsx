import { BrowserRouter, Route, Routes } from "react-router-dom";
import { EmailConfirmationFeedback } from "./containers/EmailConfirmationFeedback";
import { Home } from "./containers/Home";

export const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route index path="home" element={<Home />} />
      <Route path="validar-email/:code" element={<EmailConfirmationFeedback />} />
      <Route index element={<Home />} />
    </Routes>
  </BrowserRouter>
);
