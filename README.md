# CampManager Back-end

## Developer features

<br>

#### **Start Server in development mode:**

<br>

```ssh
npm run dev
```

<br>

#### **Seeder functionality:**

<br>

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

#### **Users:**

| Function        | Method | URL                                     |
| --------------- | ------ | --------------------------------------- |
| Get all users   | GET    | http://localhost:5000/api/v1/users      |
| Get single user | GET    | http://localhost:5000/api/v1/users/\_id |
| Update user     | PUT    | http://localhost:5000/api/v1/users/\_id |
| Create a user   | POST   | http://localhost:5000/api/v1/users      |
| Delete a user   | DELETE | http://localhost:5000/api/v1/users/\_id |

<br>

#### **Camps:**

| Function        | Method | URL                                     |
| --------------- | ------ | --------------------------------------- |
| Get all camps   | GET    | http://localhost:5000/api/v1/camps      |
| Get single camp | GET    | http://localhost:5000/api/v1/camps/\_id |
| Update camp     | PUT    | http://localhost:5000/api/v1/camps/\_id |
| Create camp     | POST   | http://localhost:5000/api/v1/camps      |
| Delete camp     | DELETE | http://localhost:5000/api/v1/camps/\_id |

<br>

#### **Filtering:**

| Filter                                        | URL                                                                                 |
| ----------------------------------------------| ------------------------------------------------------------------------------------|
| Filter camps by name                          | http://localhost:5000/api/v1/camps?select=name,edition&sort=-name                   |
| Filter camps by availability                  | http://localhost:5000/api/v1/camps?available=true                                   |
| Filter camps by location                      | http://localhost:5000/api/v1/camps?location=Italy                                   |
| Filter camps by activities                    | http://localhost:5000/api/v1/camps?activities=museum                                |
| Filter camps by tag                           | http://localhost:5000/api/v1/camps?tag=beach                                        |
| Multiple filter (location/activities/tag)     | http://localhost:5000/api/v1/camps?location=Lebanon&tag=mountain&activities=reading |
| Sort camps by name                            | http://localhost:5000/api/v1/camps?select=name&sort=name                            |
| Filter & sort camps by edition                | http://localhost:5000/api/v1/camps?select=edition&sort=edition                      |
| Filter & sort camps by name & edition         | http://localhost:5000/api/v1/camps?select=name,edition&sort=-name                   |
| Camps pagination                              | http://localhost:5000/api/v1/camps?page=2                                           |
| Camps pagination & limit                      | http://localhost:5000/api/v1/camps?page=1&limit=2                                   |