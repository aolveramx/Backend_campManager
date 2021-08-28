# CampManager Back-end

## Developer features

### **Start Server in development mode:**

```ssh
npm run dev
```

### **Seeder functionality:**

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

| Function                   | Method | Auth      | URL                                                         |
| -------------------------- | ------ | --------- | ----------------------------------------------------------- |
| Register user              | POST   | All roles | http://localhost:5000/api/v1/auth/register                  |
| Login user                 | POST   | All roles | http://localhost:5000/api/v1/auth/login                     |
| Logout user                | GET    | All roles | http://localhost:5000/api/v1/auth/logout                    |
| Get current logged in user | GET    | All roles | http://localhost:5000/api/v1/auth/me                        |
| Forgot Password            | PUT    | All roles | http://localhost:5000/api/v1/auth/forgotpassword            |
| Reset Password             | PUT    | All roles | http://localhost:5000/api/v1/auth/resetpassword/:resettoken |

#### **Users:**

| Function          | Method | Auth            | URL                                           |
| ----------------- | ------ | --------------- | --------------------------------------------- |
| Get all users     | GET    | admin           | http://localhost:5000/api/v1/users            |
| Get single user   | GET    | admin           | http://localhost:5000/api/v1/users/\_id       |
| Update user       | PUT    | admin           | http://localhost:5000/api/v1/users/\_id       |
| Upload photo      | PUT    | All roles       | http://localhost:5000/api/v1/users/\_id/photo |
| Upload CV         | PUT    | All roles       | http://localhost:5000/api/v1/users/\_id/cv    |
| Delete my account | DELETE | guest or helper | http://localhost:5000/api/v1/users/\_id       |

<br>

#### **Camps:**

| Function        | Method | Auth      | URL                                     |
| --------------- | ------ | --------- | --------------------------------------- |
| Get all camps   | GET    | everybody | http://localhost:5000/api/v1/camps      |
| Get single camp | GET    | everybody | http://localhost:5000/api/v1/camps/\_id |
| Update camp     | PUT    | admin     | http://localhost:5000/api/v1/camps/\_id |
| Create camp     | POST   | admin     | http://localhost:5000/api/v1/camps      |
| Delete camp     | DELETE | admin     | http://localhost:5000/api/v1/camps/\_id |

<br>

#### **Filtering:**

| Filter                                    | URL                                                                                 |
| ----------------------------------------- | ----------------------------------------------------------------------------------- |
| Filter camps by name                      | http://localhost:5000/api/v1/camps?select=name,edition&sort=-name                   |
| Filter camps by availability              | http://localhost:5000/api/v1/camps?available=true                                   |
| Filter camps by location                  | http://localhost:5000/api/v1/camps?location=Italy                                   |
| Filter camps by activities                | http://localhost:5000/api/v1/camps?activities=museum                                |
| Filter camps by tag                       | http://localhost:5000/api/v1/camps?tag=beach                                        |
| Multiple filter (location/activities/tag) | http://localhost:5000/api/v1/camps?location=Lebanon&tag=mountain&activities=reading |
| Sort camps by name                        | http://localhost:5000/api/v1/camps?select=name&sort=name                            |
| Filter & sort camps by edition            | http://localhost:5000/api/v1/camps?select=edition&sort=edition                      |
| Filter & sort camps by name & edition     | http://localhost:5000/api/v1/camps?select=name,edition&sort=-name                   |
| Camps pagination                          | http://localhost:5000/api/v1/camps?page=2                                           |
| Camps pagination & limit                  | http://localhost:5000/api/v1/camps?page=1&limit=2                                   |
