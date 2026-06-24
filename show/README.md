# 🛍️ "Me." - E-Commerce Customer Storefront

This is the customer-facing frontend storefront of the **"Me."** e-commerce brand. It is an interactive, premium React single-page application where users can browse catalog collections, select sizing parameters, authenticate (via email or Google), configure their shopping cart, and place orders.

---

## 🚀 How to Open and Run

### 📂 Open the Folder
1. If you are in the workspace root (`FYP-PROJECT`), open a terminal and change directories:
   ```bash
   cd show
   ```
2. Or, open this directory (`FYP-PROJECT/show`) directly in your code editor.

### 🏃 Run the Development Server
Install the node packages and start the Vite local server:
```bash
# Install package dependencies
npm install

# Run the local server in development mode
npm run dev
```
By default, the terminal will launch the client portal on:  
👉 `http://localhost:5173`

---

## 🛠️ Technology Stack & Libraries

The storefront uses a modern, reactive stack:

- **React 19 & React DOM**: For rendering reactive components.
- **Vite**: Rapid compiler and hot-reloads developer server.
- **Redux Toolkit & React Redux (v9)**: Manages global states (e.g. user shopping cart array items, quantity, open/closed drawer).
- **Firebase v12**: Integrates client-side authentication, specifically Google Authentication provider.
- **Axios**: Invokes APIs on the backend Express application.
- **React Router Dom**: Manages web browser page routing links.
- **Tailwind CSS & PostCSS**: Custom modern utility layouts and configurations.
- **React Slick & Slick Carousel**: Powers slick image slides and trending product carousels.
- **React Toastify**: Displays notification popups (e.g., product addition, order success alert).
- **Lucide React & React Icons**: SVG icons.

---

## 📁 Key File Structure & Functionalities

Inside `show/src` and `show/utils`, components are divided logically:

*   **`utils/Firebase.js`**: Core client-side Firebase authentication connector. Initializes the Firebase App configuration and exports `auth` and `provider` instances for Google SSO logic.
*   **`src/redux/`**: State management folder.
    *   `store.js`: Centralized Redux storage configure.
    *   `cartSlice.js`: Exposes shopping cart slice logic and action triggers: `addToCart`, `removeFromCart`, `decreaseQuantity`, `clearCart`, `openCart`, and `closeCart`.
*   **`src/Pages/`**: Storefront page controllers.
    *   `ProductGrid.jsx` *(Shop)*: Main catalog search engine page. Queries backend API using URL parameters: filters items by category (Men/Women/Kids), subcategory, style type (Eastern/Western), and text search.
    *   `ProductDetail.jsx`: Dynamically fetches individual item profiles by MongoDB ID (`/api/product/:id`). Includes size, quantity selectors, descriptions, and related recommendations.
    *   `Cartpage.jsx`: Full-screen shopping cart breakdown page.
    *   `Checkout.jsx`: Cart checkouts checkout flow. Gathers shipping contact values and hits the post `/api/orders/create` endpoint.
    *   `OrderConfirmation.jsx`: Displays transaction receipt after placing order.
    *   `Catagories.jsx`, `Feature.jsx`, `Trending.jsx`, `Timer.jsx`: Modular widgets showing lists, promotion clocks, and sliders on the homepage.
*   **`src/Component/`**: Custom components.
    *   `Navbar/Navbar.jsx`: Core sticky header showing links, live search queries, account states, shopping cart drawers, and logout options.
    *   `Hero/Hero.jsx`: Main promotional banners carousel.
    *   `Login/Login.jsx` & `Sign/signUP.jsx`: Entrance forms. Integrates password authentication and Google SSO token exchange.
    *   `Footer/Footer.jsx`: Footnotes and email newsletter subscriptions.

---

## 🔗 Connected APIs Integration

The storefront hits the backend endpoints running on `http://localhost:8030`:
- Products: `GET /api/product` (with queries `productType`, `category`, `search`)
- Orders: `POST /api/orders/create`
- Auth: `POST /api/signup`, `POST /api/login`, `POST /api/google-signup`, `GET /api/me`, `POST /api/logout`
- Newsletters: `POST /api/subscriber/subscribe`
