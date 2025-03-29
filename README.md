# React + Vite
live demo:https://reqres-api-brown.vercel.app/login

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

##Project Description

This project is a React-based user management system that fetches user data from an API and allows functionalities like pagination, editing, and deleting users. It integrates Material UI for UI components and styling.

##Running the Project

To start the development server, run:

npm start

The app will be available at http://localhost:3000.

##Dependencies

This project uses the following dependencies:

React

Axios (for API requests)

Material UI (for UI components)

Tailwind CSS (for additional styling)

##Assumptions & Considerations

The API used is https://reqres.in/api/users, which is a mock API for testing.

Changes made to users (edit/delete) are not persisted as the API does not support real updates.

Pagination is implemented based on API responses.

The app uses Material UI colors for consistent styling.
