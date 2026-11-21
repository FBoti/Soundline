import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Ez indítja el az alkalmazást: az index.html-ben lévő <div id="root"> helyére rajzolja ki az App-ot.
createRoot(document.getElementById("root")).render(<App />);
