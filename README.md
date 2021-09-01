# CampManager Back-end

CampManager App it is useful for managing activities as events, workshops or in this case camps for disabled people.
There are 3 available roles: guest, helper & admin.

## Developer features

### **Start Server in development mode**

```ssh
npm run dev
```

### **Testing**

```ssh
npm run test
```

### **Seeder functionality**

#### Import data:

```ssh
node seeder -i
```

#### Destroy data:

```ssh
node seeder -d
```

<br>

## API REST features

<br>

#### **Auth:**

| Function                   | Method | Auth | URL                                                         |
| -------------------------- | ------ | ---- | ----------------------------------------------------------- |
| Register user              | POST   | all  | http://localhost:5000/api/v1/auth/register                  |
| Login user                 | POST   | all  | http://localhost:5000/api/v1/auth/login                     |
| Logout user                | GET    | all  | http://localhost:5000/api/v1/auth/logout                    |
| Get current logged in user | GET    | all  | http://localhost:5000/api/v1/auth/me                        |
| Forgot Password            | PUT    | all  | http://localhost:5000/api/v1/auth/forgotpassword            |
| Reset Password             | PUT    | all  | http://localhost:5000/api/v1/auth/resetpassword/:resettoken |

#### **Users:**

| Function          | Method | Auth            | URL                                           |
| ----------------- | ------ | --------------- | --------------------------------------------- |
| Get all users     | GET    | admin           | http://localhost:5000/api/v1/users            |
| Get single user   | GET    | admin           | http://localhost:5000/api/v1/users/\_id       |
| Update user       | PUT    | admin           | http://localhost:5000/api/v1/users/\_id       |
| Upload photo      | PUT    | all             | http://localhost:5000/api/v1/users/\_id/photo |
| Upload CV         | PUT    | all             | http://localhost:5000/api/v1/users/\_id/cv    |
| Delete my account | DELETE | guest or helper | http://localhost:5000/api/v1/users/\_id       |

<br>

#### **Camps:**

| Function                      | Method | Auth            | URL                                                 |
| ----------------------------- | ------ | --------------- | --------------------------------------------------- |
| Get all camps                 | GET    | all             | http://localhost:5000/api/v1/camps                  |
| Get all camps (no pagination) | GET    | all             | http://localhost:5000/api/v1/camps/nopagination     |
| Get single camp               | GET    | all             | http://localhost:5000/api/v1/camps/\_id             |
| Create camp                   | POST   | admin           | http://localhost:5000/api/v1/camps                  |
| Update camp                   | PUT    | admin           | http://localhost:5000/api/v1/camps/\_id             |
| Delete camp                   | DELETE | admin           | http://localhost:5000/api/v1/camps/\_id             |
| Subscribe camp                | PUT    | guest or helper | http://localhost:5000/api/v1/camps/\_id/subscribe   |
| Unsubscribe camp              | PUT    | guest or helper | http://localhost:5000/api/v1/camps/\_id/unsubscribe |

<br>

#### **Filtering:**

| Filter                                | URL                                                               |
| ------------------------------------- | ----------------------------------------------------------------- |
| Filter camps by name                  | http://localhost:5000/api/v1/camps?select=name,edition&sort=-name |
| Filter camps by location              | http://localhost:5000/api/v1/camps?location=Italy                 |
| Filter camps by activities            | http://localhost:5000/api/v1/camps?activities=museum              |
| Sort camps by name                    | http://localhost:5000/api/v1/camps?select=name&sort=name          |
| Filter & sort camps by edition        | http://localhost:5000/api/v1/camps?select=edition&sort=edition    |
| Filter & sort camps by name & edition | http://localhost:5000/api/v1/camps?select=name,edition&sort=-name |
| Camps pagination                      | http://localhost:5000/api/v1/camps?page=2                         |
| Camps pagination & limit              | http://localhost:5000/api/v1/camps?page=1&limit=2                 |

#### **Request for Camps:**

| Function           | Method | Auth            | URL                                                   |
| ------------------ | ------ | --------------- | ----------------------------------------------------- |
| Get all requests   | GET    | admin           | http://localhost:5000/api/v1/soliccamps               |
| Get user request   | GET    | all             | http://localhost:5000/api/v1/users/userId/solics      |
| Get single request | GET    | admin           | http://localhost:5000/api/v1/soliccamps/SolicCampId   |
| Get request status | GET    | guest or helper | http://localhost:5000/api/v1/camps/campId/solicStatus |
| Update request     | PUT    | admin           | http://localhost:5000/api/v1/soliccamps/SolicCampId   |
| Deletye request    | PUT    | admin           | http://localhost:5000/api/v1/soliccamps/SolicCampId   |
