// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import App from './App.jsx';
import './index.css';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);
root.render(<App />);

// createRoot(document.getElementById('root')).render(
//   // <StrictMode >
//   <App />
//   // </StrictMode>
// );

// let app = document.getElementById('root');
// if (app) {
//   // 1. Set up the browser history with the updated location
//   // (minus the # sign)
//   const path = (/#!(\/.*)$/.exec(location.hash) || [])[1];
//   if (path) {
//     history.replace(path);
//   }

//   // 2. Render our app
//   const root = createRoot(app);
//   root.render(<App />);
// }

// Render the application within the BrowserRouter
