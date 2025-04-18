# URL Shortener Project

## Description

This project is a simple URL shortener built with **Node.js**, **Express**, **MongoDB**, and **EJS** for front-end rendering. It allows users to input a long URL, which is then shortened to a unique, user-friendly short URL. The app also generates a QR code for the shortened URL, which can be scanned by mobile devices for easy access.

When the short URL is accessed, it redirects the user to the original long URL.

### Features:
- **URL Shortening**: Users can input any long URL, and the app will generate a short URL.
- **QR Code Generation**: Once the short URL is created, the app also generates a QR code that links to the short URL.
- **Database Storage**: The original URL, short URL, and short URL ID are saved in a MongoDB database to maintain persistent data.

---

## How It Works

1. **User Input**:
   - The user enters a URL into a form on the main page.
   - When the user clicks the **Shorten** button, the form data (the original URL) is sent to the backend (Express server) via a `POST` request.

2. **Short URL Generation**:
   - The backend generates a unique short URL using the **nanoid** library. It creates a short ID that is appended to the base URL (e.g., `http://localhost:5000/shortId`).

3. **Database Storage**:
   - The short URL and original URL are stored in a **MongoDB** database to ensure they can be retrieved later.
   
4. **QR Code Generation**:
   - After the URL is shortened and stored, a **QR code** representing the short URL is generated using the **QRCode** library. The QR code is returned to the user and displayed on the page.

5. **Redirecting to the Original URL**:
   - When the user accesses the short URL (e.g., `http://localhost:5000/shortId`), the server looks up the corresponding original URL in the database and redirects the user to it.

---

## Libraries & Modules Used

### 1. **express**:
   - **Purpose**: A minimal and flexible Node.js web application framework.
   - **How It's Used**: Used to handle HTTP requests, manage routing, and serve static files.
   - **Installation**: `npm install express`

### 2. **mongoose**:
   - **Purpose**: MongoDB object modeling tool designed to work in an asynchronous environment.
   - **How It's Used**: Used to define the schema and model for storing URLs (both the original and the short version) in MongoDB.
   - **Installation**: `npm install mongoose`

### 3. **body-parser**:
   - **Purpose**: Middleware for parsing incoming request bodies in a middleware before your handlers, available under the `req.body` property.
   - **How It's Used**: Used to parse the URL data from the form submission, which is sent in the body of the `POST` request.
   - **Installation**: `npm install body-parser`

### 4. **qrcode**:
   - **Purpose**: A library for generating QR codes.
   - **How It's Used**: Generates a QR code that represents the short URL, which is then displayed to the user.
   - **Installation**: `npm install qrcode`

### 5. **nanoid**:
   - **Purpose**: A tiny, secure, URL-friendly, unique string ID generator.
   - **How It's Used**: Generates a short, unique identifier for each URL to create a shortened version of the original URL.
   - **Installation**: `npm install nanoid`

### 6. **ejs**:
   - **Purpose**: Embedded JavaScript templating.
   - **How It's Used**: Renders dynamic HTML content on the frontend. It allows you to embed variables (like the short URL and QR code) into the HTML view.
   - **Installation**: `npm install ejs`

---

## Installation

### Step 1: Clone the Repository

```bash
git clone https://github.com/yourusername/url-shortener.git
cd url-shortener
```

### Step 2: Install Dependencies

Run the following command to install all the required dependencies.

```bash
npm install
```

### Step 3: Set Up MongoDB

Make sure you have **MongoDB** installed and running. You can install it locally or use a cloud database like **MongoDB Atlas**. 

For a local MongoDB setup, ensure that the MongoDB service is running:

```bash
mongod
```

### Step 4: Run the Application

Start the application by running:

```bash
node server.js
```

### Step 5: Access the Application

Once the server is running, open your browser and go to:

```
http://localhost:5000
```

From there, you can start shortening URLs and generating QR codes.

---

## Folder Structure

```
url-shortener/
│
├── server.js           # Main server file, where Express app is configured
├── views/              # EJS views for rendering the UI
│   └── index.ejs       # Main page where users can shorten URLs
├── public/             # Public folder to serve static assets like CSS, images, etc.
│   └── styles.css      # Custom styles for the app
└── package.json        # Node.js dependencies and scripts
```

---

## Application Flow

1. **User submits a URL**: The user enters a long URL into the input field and clicks the "Shorten" button.
2. **Server generates a short URL**: The server receives the URL, generates a unique short URL, and stores it in MongoDB.
3. **QR code generation**: A QR code corresponding to the short URL is generated.
4. **Display results**: The short URL and QR code are shown to the user.
5. **Redirect on short URL access**: When the user visits the short URL, the server looks up the original URL and redirects the user to it.

---

## Screenshots

1. **URL Shortener Form**: Where users input the original URL.
   ![Form](assets/form.jpg)

2. **Result Page**: Shows the shortened URL and the generated QR code.
   ![Result](assets/result.jpg)

---

## Future Enhancements

- **Custom Short URLs**: Allow users to customize their short URL.
- **Analytics**: Track the number of clicks on each shortened URL.
- **Authentication**: Allow users to manage and track their shortened URLs with authentication.
- **Mobile App**: Create a mobile app that integrates with this URL shortener for quick shortening and QR code scanning.

---

## License

This project is open-source and available under the MIT License.

---
