# School Management System APIs

This project provides a set of Node.js APIs for managing school data. The APIs allow users to add new schools and retrieve a list of schools sorted by proximity to a specified location.

## Objective

Develop APIs using Node.js, Express.js, and MySQL to manage school data effectively.

---

## Database Setup

### Schools Table

Create a table in MySQL with the following structure:

| Column    | Data Type | Constraints                 |
| --------- | --------- | --------------------------- |
| id        | INT       | Primary Key, Auto Increment |
| name      | VARCHAR   | Not NULL                    |
| address   | VARCHAR   | Not NULL                    |
| latitude  | FLOAT     | Not NULL                    |
| longitude | FLOAT     | Not NULL                    |

### Example SQL Query

```sql
CREATE TABLE schools (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    latitude FLOAT NOT NULL,
    longitude FLOAT NOT NULL
);
```

---

## API Development

### Add School API

- **Endpoint**: `/addSchool`
- **Method**: POST
- **Payload**:
  ```json
  {
      "name": "School Name",
      "address": "School Address",
      "latitude": 12.345678,
      "longitude": 98.765432
  }
  ```
- **Functionality**:
  - Validates the input data.
  - Adds a new school record to the `schools` table.
- **Validation Rules**:
  - `name`: Non-empty string.
  - `address`: Non-empty string.
  - `latitude`: Valid float value.
  - `longitude`: Valid float value.

### List Schools API

- **Endpoint**: `/listSchools`
- **Method**: GET
- **Parameters**:
  - `latitude`: User's latitude.
  - `longitude`: User's longitude.
- **Functionality**:
  - Fetches all schools from the database.
  - Sorts them by proximity to the user's specified location using the Haversine formula for geographical distance.
  - Returns the sorted list.

---

## Sorting Mechanism

The proximity is calculated using the Haversine formula:

### Formula

```
d = 2 * r * asin(sqrt(
    sin^2((lat2 - lat1) / 2) +
    cos(lat1) * cos(lat2) * sin^2((lon2 - lon1) / 2)
))
```

Where:

- `d` is the distance.
- `r` is the Earth's radius (approximately 6371 km).
- `lat1`, `lon1` are the user's coordinates.
- `lat2`, `lon2` are the school's coordinates.

---

## Example Usage

### Adding a School

**Request**:

```bash
POST /addSchool
Content-Type: application/json

{
    "name": "Green Valley High School",
    "address": "123 Main St, Springfield",
    "latitude": 34.052235,
    "longitude": -118.243683
}
```

**Response**:

```json
{
    "success": true,
    "message": "School added successfully."
}
```

### Listing Schools

**Request**:

```bash
GET /listSchools?latitude=34.052235&longitude=-118.243683
```

**Response**:

```json
[
    {
        "id": 1,
        "name": "Green Valley High School",
        "address": "123 Main St, Springfield",
        "latitude": 34.052235,
        "longitude": -118.243683,
        "distance": 0.0
    },
    {
        "id": 2,
        "name": "Sunnydale Elementary",
        "address": "456 Oak St, Springfield",
        "latitude": 34.045123,
        "longitude": -118.250456,
        "distance": 1.23
    }
]
```

---

## Project Setup

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the server:
   ```bash
   npx nodemon index.js
   ```

---

## Future Enhancements

- Implement user authentication for secure API access.
- Add pagination to the `listSchools` API for handling large datasets.
- Include detailed error handling and logging.

---

## Contact

For questions or issues, please contact [satishsurani60@gmail.com](mailto\:satishsurani60@gmail.com).

