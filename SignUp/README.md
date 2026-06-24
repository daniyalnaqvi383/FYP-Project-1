# ⚙️ "Me." - E-Commerce REST API Backend Server

This sub-project is the Node.js + Express backend server powering the **"Me."** e-commerce store. It is responsible for handling database persistence (MongoDB), processing multi-image uploads (Cloudinary + Multer), administering user token authentications, and serving a smart fashion assistant chat helper powered by Google Gemini AI.

---

## 🚀 How to Open and Run

### 📂 Open the Folder
1. If you are in the workspace root (`FYP-PROJECT`), open a terminal and change directories:
   ```bash
   cd SignUp
   ```
2. Or, open this directory (`FYP-PROJECT/SignUp`) directly in your code editor.

### ⚙️ Set Up Environment Variables (`.env`)
Before starting the server, ensure that a `.env` file exists inside the `SignUp/` root folder. It must contain the following variables:

```env
PORT=8030
DB_URL=mongodb://127.0.0.1:27017/SignUp
JWT_SECRET=mysupersecretkey

# Admin accounts credentials
admin_email=admin545545@gmail.com
admin_password=admin@12345

# Cloudinary image hosting credentials
CLOUD_NAME=your_cloudinary_name
CLOUD_API_KEY=your_cloudinary_key
CLOUD_API_SECRET=your_cloudinary_secret

# Google Gemini API key
GEMINI_API_KEY=your_gemini_api_key
```

### 🏃 Start the Server
Install packages and start the service (which utilizes nodemon to reload code modifications automatically):
```bash
# Install dependencies
npm install

# Start development server
npm start
```
By default, the server will connect to MongoDB and start listening on:  
👉 `http://localhost:8030`

---

## 🛠️ Technology Stack & Dependencies

- **Node.js**: Underlying runtime platform.
- **Express.js (v5)**: Backend web framework hosting REST routes.
- **MongoDB & Mongoose (v8)**: Document database and Object Data Modeling (ODM) framework.
- **Google Generative AI (`@google/generative-ai` v0.24)**: Accesses the `gemini-2.5-flash` model. Serves an automated fashion styling support chatbot with built-in system prompt instructions.
- **Cloudinary (v2.8)**: Used for cloud-based media file uploads.
- **Multer (v2)**: Middleware for handling multi-part form image uploads.
- **JSONWebToken & BcryptJS**: Secures password authentication, hashing, and signs access tokens.
- **Nodemailer**: Email transmission utility.
- **CORS**: Configures cross-origin resource requests for client apps.
- **Dotenv**: Parses parameters from local `.env` files.

---

## 📁 Key Directories & Logic Files

The backend application follows an MVC-inspired architectural pattern:

*   **`index.js`**: Core setup script. Configures CORS, initializes database connections, registers Express routers, and binds the server to its port.
*   **`config/cloudinary.js`**: Connects and authenticates Cloudinary credentials with the SDK.
*   **`App/Models/`** *(MongoDB Mongoose Schemas)*:
    *   `sign.Model.js`: Stores client credentials (name, email, password, profile photo, auth provider).
    *   `productModel.js`: Models product details (title, description, price, styleType, category, subcategory, sizes, images, trending/featured flags).
    *   `OrderModel.js`: Manages order transactions, linking to items list, buyer details, delivery addresses, status progress, and payment types.
    *   `subscriberModel.js`: Holds active newsletter emails.
*   **`App/Controller/`** *(Business logic request handlers)*:
    *   `signControler.js`: Manages signup, login, logout, and Firebase Google Token validation.
    *   `ProductController.js`: Product CRUD operations, uploading image binaries to Cloudinary storage.
    *   `OrderController.js`: Creating, updating, and fetching orders.
    *   `chatController.js`: Initialized with Google GenAI. Integrates custom fashion stylist system instructions and processes messages using `gemini-2.5-flash`.
    *   `subscriberController.js`: Handles email newsletter signups.
*   **`App/Routes/`** *(Router maps)*:
    *   `Web/signRoutes.js`: Client accounts (`/api/signup`, `/login`, `/google-signup`, `/me`, `/logout`).
    *   `Web/chatRoutes.js`: Gemini chatbot interaction portal (`/api/chat`).
    *   `Web/subscriberRoutes.js`: Newsletter submissions (`/api/subscriber/subscribe`).
    *   `Admin/AdminRoutes.js`: Administrator authentications (`/api/admin/login`, `/me`).
    *   `Admin/ProductRoutes.js`: Product listing and adjustments (`/api/product/`).
    *   `Admin/orderRoutes.js`: Orders logs updates (`/api/orders/`).
*   **`App/Middlewre/`**:
    *   `Middlewere.js`: Decodes visitor JWT tokens to verify active user requests.
    *   `authAdmin.js`: Protects administrative REST endpoints by checking credentials.
    *   `multer.js`: Manages disk storage bounds during image upload processing.
