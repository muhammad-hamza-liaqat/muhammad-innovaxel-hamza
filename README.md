# Movie Reservation System

This is a Movie Reservation System built with Node.js.

## Installation

To install the project dependencies, run the following command:

```bash
npm install
```

## Environment Variables

An `.env.dist` file is included in the codebase. Follow these steps to set up your environment variables:

1. Copy the contents of the `.env.dist` file.
2. Create a new file named `.env` in the root directory of the project.
3. Paste the contents and provide the required credentials for the variables.

Example:

```env
DATABASE_URL=your_database_url
API_KEY=your_api_key
SECRET_KEY=your_secret_key
```

## API Endpoints

The following endpoints are available for making requests to the system:

### User Authentication

- **POST** `/api/auth/register`

  - Register a new user.
  - **Payload:**
    ```json
    {
      "name": "John Doe",
      "email": "john@example.com",
      "password": "password123"
    }
    ```

- **POST** `/api/auth/login`
  - Authenticate an existing user.
  - **Payload:**
    ```json
    {
      "email": "john@example.com",
      "password": "password123"
    }
    ```

### Movies

- **GET** `/api/movies`

  - Fetch a list of available movies.

- **GET** `/api/movies/:id`
  - Fetch details of a specific movie by ID.

### Reservations

- **POST** `/api/reservations`

  - Create a reservation for a movie.
  - **Payload:**
    ```json
    {
      "movieId": "123",
      "userId": "456",
      "seats": 2
    }
    ```

- **GET** `/api/reservations/:userId`
  - Fetch all reservations for a specific user.

### Admin

- **POST** `/api/admin/movies`

  - Add a new movie to the system (Admin only).
  - **Payload:**
    ```json
    {
      "title": "Movie Title",
      "description": "Movie description",
      "duration": 120,
      "releaseDate": "2024-01-01"
    }
    ```

- **DELETE** `/api/admin/movies/:id`
  - Delete a movie from the system (Admin only).

## Running the Project

To start the project, run:

```bash
npm start
```

For development purposes, use:

```bash
npm run dev
```

## License

This project is licensed under the [MIT License](LICENSE).

---

Happy coding!
