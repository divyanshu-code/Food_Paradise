# Food Paradise

Welcome to Food Paradise — a simple restaurant ordering web application with a user-facing frontend, admin panel, and a Node.js + MongoDB backend.

## About Food Paradise

Food Paradise is a full-stack web app that lets customers browse food items, add them to a cart, and place orders. Administrators can add, update, and remove menu items and manage orders.

## Inspiration

- The project was inspired by building a lightweight, real-world restaurant ordering system to learn practical patterns for React frontends, Express APIs, and MongoDB data modeling. It focuses on a clean UX and straightforward admin workflows.

- I made this for my maternal uncle's restaurant to help him manage online orders more efficiently.

## Key Features

- Browse menu items with images and descriptions
- Add to cart and manage cart quantities
- Place orders and view order history
- Admin panel to create, edit, and delete food items
- Authentication for users and admin (JWT-based)
- Image upload support for menu items
- Interactive animations using GSAP for smooth UI effects
- Responsive design for mobile and desktop
- added payment gateway integration using Razorpay

## Tech Stack

- Frontend: React, Vite
- Admin Panel: React, Vite
- Backend: Node.js, Express
- Database: MongoDB with Mongoose
- Authentication: JSON Web Tokens (JWT)
- File uploads: Multer 
- Linting / tooling: Vite
- Animations / UI effects: GSAP


## Tools & Deployment

Environment variables:
- `MONGODB_URI` — MongoDB connection string
- `JWT_SECRET` — secret key for signing tokens
- `PORT` — backend port 

Local development (from repository root):

```bash
cd backend
npm install
npm run dev

# in a separate terminal
cd frontend
npm install
npm run dev

# if using the admin panel
cd admin
npm install
npm run dev
```

Build for production:

```bash
cd frontend
npm run build

# deploy the `dist`/`build` folder to Vercel, Netlify, or a static host.

cd backend
# ensure environment variables are set, then run
npm start
```

Recommended deployment options:
- Frontend/Admin: Vercel, Netlify
- Backend: Render, Heroku, DigitalOcean App Platform
- Database: MongoDB Atlas

## Contributing

Contributions are welcome — open an issue or submit a pull request.

## Files

The project contains frontend, admin, and backend folders. See [README.md](README.md) for this overview.
