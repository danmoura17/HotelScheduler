![Logo](https://dwglogo.com/wp-content/uploads/2017/01/ALTEN-Logo-01.png)

    
# Hotel Scheduler
 
HotelScheduler is a ASP.NET Core and ReactJS tool for managing hotel rooms (in this case one room 😅 ).

You can check in the link: https://hotelscheduler.herokuapp.com/ 

## Features
 
- Reservations:
   - Create reservation
   - Delete reservation
   - Update reservations
   - List all reservation
   - Get specific reservation
 
- Users:
   - Register new user
   - User login
 
- User authentication
- Internationalization
   - English (🇬🇧 )
   - Franch (🇫🇷 )
   - Spanish (🇪🇸 )
   - Portuguese (🇧🇷 )

## Tech Stack

**Client:** React

**Server:** ASP.NET Core WebAPI

  ## Run Locally
 
Clone the project
 
```bash
 git clone https://github.com/danmoura17/HotelScheduler.git
```
 
 
Go to the project directory
 
```bash
 cd HotelScheduler
```
 
**API**:
 
Go to the project directory
 
```bash
 cd API
```
Start the api
 
```bash
 dotnet run
```
 
**Client**:
 
Go to the project directory
 
```bash
 cd client-app
```
 
Install dependencies
 
```bash
 npm install
```
 
Start the server
 
```bash
 npm run start
```

(It's necessary PostgreSQL installed)
 

  
## API Reference

### Reservertions

#### Get all items

```http
  GET /api​/Reservations
```

| Parameter | 
| :-------- | 
| No parameters |

| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |

#### Create a reservation

```http
  POST /api​/Reservations
```

| Parameter | 
| :-------- | 
| No parameters |

* Request body example

```http
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reservationDate": "2021-07-28T03:45:31.641Z",
  "checkinDate": "2021-07-28T03:45:31.641Z",
  "checkoutDate": "2021-07-28T03:45:31.641Z",
  "attendedBy": "string",
  "firstName": "string",
  "lastName": "string",
  "city": "string",
  "country": "string",
  "email": "string",
  "phone": "string"
}
```

| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |


#### Get a specific reservation

```http
  GET /api​/Reservations​/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id  | string($uuid) | **Required**. Reservation's id |


| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |

#### Update reservation

```http
  PUT /api/Reservations/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id  | string($uuid) | **Required**. Reservation's id |

| Parameter | 
| :-------- | 
| No parameters |

*  Request body example

```http
{
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "reservationDate": "2021-07-28T03:45:31.641Z",
  "checkinDate": "2021-07-28T03:45:31.641Z",
  "checkoutDate": "2021-07-28T03:45:31.641Z",
  "attendedBy": "string",
  "firstName": "string",
  "lastName": "string",
  "city": "string",
  "country": "string",
  "email": "string",
  "phone": "string"
}
```

| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |


#### Delete reservation

```http
  DELETE /api​/Reservations​/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| id  | string($uuid) | **Required**. Reservation's id |


| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |

### Users

#### Account login

```http
  POST /api/Account/login
```

| Parameter | 
| :-------- | 
| No parameters |

* Request body example

```http
  {
  "email": "string",
  "password": "string"
}
```

| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |

* Response example

```http
{
  "displayName": "string",
  "token": "string",
  "userName": "string",
  "image": "string",
}
```

#### Register account

```http
  POST /api/Account/register
```

| Parameter | 
| :-------- | 
| No parameters |

* Request body example

```http
{
  "displayName": "string",
  "email": "user@example.com",
  "password": "string",
  "username": "string"
}
```

| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |

* Response example

```http
{
  "displayName": "string",
  "token": "string",
  "userName": "string",
  "image": "string",
  "country": "string",
  "city": "string",
  "phone": "string"
}
```

#### Get account

```http
  GET /api​/Account
```

| Parameter | 
| :-------- | 
| No parameters |

| Responses |             |
|-----------|-------------|
| **Code**      | **Description** |
| 200       | Success     |

* Response example

```http
{
  "displayName": "string",
  "token": "string",
  "userName": "string",
  "image": "string",
  "country": "string",
  "city": "string",
  "phone": "string"
}
```


  
## 🔗 Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/daniel-moura-da-silva/)

  