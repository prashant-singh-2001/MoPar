# MoPar - Car Selling eCommerce

MoPar is a feature-rich car selling eCommerce platform developed using the MERN stack (MongoDB, Express.js, React, Node.js). It provides a seamless experience for buying and selling cars online. With powerful features like cloudinary for images, Redux for frontend management, nodemailer, Material UI, Bootstrap, Stripe for payment management, and Axios for connections, MoPar offers an exceptional online car shopping experience.

![MoPar Screenshot](./screenshots/mopar_screenshot.png)

## Table of Contents

1. [Features](#features)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
3. [Usage](#usage)
   - [User Authentication](#user-authentication)
   - [Admin Dashboard](#admin-dashboard)
4. [Technologies Used](#technologies-used)
5. [Screenshots](#screenshots)
6. [Contributing](#contributing)
7. [License](#license)

## Features

- Full-fledged car selling and buying functionality.
- User authentication and authorization.
- Responsive and user-friendly design with Material UI and Bootstrap.
- Cloudinary integration for efficient image management.
- Secure payment processing with Stripe.
- Seamless cart management with Redux.
- Admin dashboard for product management.
- Contact sellers via email using Nodemailer.

## Getting Started

### Prerequisites

Before running MoPar on your local machine, make sure you have the following installed:

- Node.js and npm
- MongoDB
- Cloudinary account (for image storage)
- Stripe account (for payment processing)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/mopar.git
   ```
2. Navigate to Frontend
   ```bash
   cd ./frontend
   ```
4. Navigate to Backend
   ```bash
   cd ./backend
   ```
3. Install Dependencies
   ```bash
   npm i
   ```
4. Create a .env file in the root directory and add your environment variables, including MongoDB connection URI, Cloudinary settings, Stripe API keys, and email credentials for Nodemailer.
5. Start backend
   ```bash
   npm run dev
   ```
6. Start frontend
   ``bash
   npm start
   ```
 ## Usage

### User Authentication

- Users can sign up, log in, and log out.
- User data is securely stored and managed with JWT authentication.

### Admin Dashboard

- Admins can access the dashboard to manage products and user orders.
- Product listings can be added, edited, or removed.
- Orders can be marked as fulfilled or canceled.

## Technologies Used

- MongoDB
- Express.js
- React
- Node.js
- Cloudinary
- Redux
- Material UI
- Bootstrap
- Stripe
- Axios
- Nodemailer

## Screenshots

Here are some screenshots of MoPar in action:

![MoPar Dashboard](./screenshots/dashboard.png)

![MoPar Product Page](./screenshots/product_page.png)
