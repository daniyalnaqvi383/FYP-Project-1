# 🛠️ "Me." - E-Commerce Admin Panel

This sub-project is a modern, responsive, and performance-optimized Admin Dashboard for the "Me." clothing e-commerce portal. It is built as a single-page application (SPA) using React 19, Vite, and Tailwind CSS v4, and connects directly to the backend API server.

---

## 🚀 How to Open and Run

### 📂 Open the Folder
1. If you are in the workspace root (`FYP-PROJECT`), open your terminal and change directories:
   ```bash
   cd Admin
   ```
2. Or, open this directory (`FYP-PROJECT/Admin`) directly in your code editor.

### 🏃 Run the Development Server
Install the node packages and start the Vite local server:
```bash
# Install package dependencies
npm install

# Run the local server in development mode
npm run dev
```
By default, the terminal will print the local host URI, which is typically:  
👉 `http://localhost:5174` (or `http://localhost:5175`)

---

## 🛠️ Technology Stack & Libraries

The Admin panel uses a contemporary frontend stack:

- **React 19 & React DOM**: For component-driven user interface construction.
- **Vite**: Superfast tooling, module bundler, and development environment.
- **Tailwind CSS v4** & **@tailwindcss/vite**: Used for writing responsive and modern utility-based styles.
- **Axios**: Promised-based client utilized to invoke REST endpoints on the backend API server.
- **React Router Dom (v7)**: Manages declarative client-side route navigation.
- **Framer Motion**: Enables modern component transition animations.
- **GSAP**: GreenSock libraries used to manage advanced animations.
- **Swiper**: Embedded touch-carousel element.
- **Lucide React & React Icons**: Icon packs for clean UI navigation and buttons.

---

## 📁 Key File Structure & Functionalities

Here is an overview of the directories and code paths within the `src/` folder:

*   **`src/main.jsx`**: The application entry script rendering the React DOM node inside `index.html`.
*   **`src/App.jsx`**: Root rendering component. It performs validation using the `AdminDataContext`. If no admin credentials/token are stored, it defaults directly to the `<Login />` view; otherwise, it unlocks the sidebar router paths.
*   **`src/Context/`**: Contains global shared states.
    *   `AuthContext.jsx`: Holds the base backend REST API endpoint server URL: `http://localhost:8030`.
    *   `AdminContext.jsx`: Manages current admin user status, token verification queries, and login/logout state checks.
*   **`src/Pages/`**: Core views of the dashboard.
    *   `Login.jsx`: Secure administrator entrance screen. Connects to the backend admin check route and sets the returned JWT token to local storage.
    *   `Home.jsx`: General dashboard screen.
    *   `Add.jsx`: Product creation interface. Admins upload up to 3 product pictures (processed through multer/cloudinary) and define sizes, pricing, and categories.
    *   `Lists.jsx`: Live inventory data table displaying active products. Allows admins to inspect existing records and issue DELETE commands.
    *   `Order.jsx`: Live client orders desk showing active orders, buyers, payments, and dropdown options to modify delivery status (e.g. *Order Placed*, *Shipped*, *Delivered*).
*   **`src/Compontent/`** *(UI Layout elements)*:
    *   `Navbar.jsx`: Top navigation headers.
    *   `Sidebar.jsx`: Sidebar menu items link buttons corresponding to App paths.
*   **`src/assets/`**: Visual assets, images, and brand resources.

---

## 🛡️ Connection Configurations

The app queries the Express server. Verify the URL matches:
*   File Location: [`src/Context/AuthContext.jsx`](file:///e:/clown/FYP-PROJECT/Admin/src/Context/AuthContext.jsx#L6)
*   Value: `let serverUrl = "http://localhost:8030";`
