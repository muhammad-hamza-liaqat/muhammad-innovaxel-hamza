
# Movie Reservation System

The **Movie Reservation System** is a Node.js-based application that allows users to manage movie reservations efficiently.

## Installation

To install the project dependencies, execute the following command:

```bash
npm install
```

## Environment Variables

The project requires environment variables for configuration. A sample `.env.dist` file is included in the codebase.

### Steps to Configure:
1. Copy the contents of `.env.dist`.
2. Create a new file named `.env` in the root directory.
3. Paste the contents and provide the required credentials for the variables.

Example:

```env
DATABASE_URL=your_database_url
API_KEY=your_api_key
SECRET_KEY=your_secret_key
```

## API Endpoints

The Postman collection is included in the **dev** branch and has also been sent via email as mentioned in the assessment sheet.

## Running the Project

To start the project, use:

```bash
npm start
```

For development purposes, use:

```bash
npm run dev
```

## Adding Access Token

In Postman:
1. Open the **Headers** section.
2. Set `Authorization` as the key.
3. Paste the token as the value.

## Admin User

When the project is run for the first time, seeders will automatically create an admin user. The credentials for the admin user are available in the `/login` request of the Postman collection.

## `.env.dist`

All the required environment variables are present in the `.env.dist` file. To configure:
1. Create a `.env` file in the root directory.
2. Copy and paste the fields from `.env.dist`.
3. Replace placeholder values with your actual credentials.

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding!
