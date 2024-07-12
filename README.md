## Backend For SIMARQA

This program is a project 3 management asset with have Data Master, Transaction and Report


## Before use API Spesification down there, you need install some preperation that needed, there is: 

- NodeJS v20 or latest
- NPM v10 or latest
- MySQL
- PHPMYADMIN or Anything source management tool that support MySQL
- Browser (Anything you want to choose)
- Postman or API Platform alternative

## Instalation
1. Create Database first 

2. Clone this repository to your computer: 
    ```bash
    Backend: git clone https://github.com/pausii/SimaRQA.git

3. Open your repository with this command: 
    
    ```bash
    cd name_repository

4. Install package module with this command:
    ```bash
    npm install

5. Make new file with name `.env` then settings with program and your database

    ```bash
    DB_PORT=3000 or your number port want to use it (*disclaimer you need check index.js for that port) 
    JWT_SECRET=.......

    DEVELOPMENT_USERNAME=.....
    DEVELOPMENT_PASSWORD=.....
    DEVELOPMENT_DATABASE=......
    DEVELOPMENT_HOST=......

    TEST_USERNAME=.....
    TEST_PASSWORD=.....
    TEST_DATABASE=......_test
    TEST_HOST=......

    PRODUCTION_USERNAME=.....
    PRODUCTION_PASSWORD=.....
    PRODUCTION_DATABASE=......
    PRODUCTION_HOST=......
    ```

    or you can see in `.env.example`

6. Do migration and seeder data to your database : 

    ```bash
    npm run reset

    (* that command will migration migration data to your database)

    npm run seeder

    (* that command will migration migration seed data to your database)

7. Finish Process, that you can use API Platform and using down there API Spesification


npm v9.8.1
node v18.18.2

# ** API SPECIFICATION FOR SIMARQA **

base-url: localhost:3000

## **Login**

**Request** :
- Method : POST

- Endpoint : `(base-url)/api/auth/login`

- Header :
    - Content-Type : applcation/json
    - Accept : application/json
       
- Body :
```json
{
    "username": "string",
    "password": "string"
}
```

- Authetication - Bearer Token `<token key>`
    **Response** :

```json
{
    "message": "Login Sukses!",
    "user_id": "integer",
    "token": "string",
    "username": "string",
    "password": "string",
    "role": "enum",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "address": "text"
}
```
# **Statistics**

## **Get All Statistics (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/statistics/)`

**Response** :

```json
{
    "auditorium": "integer",
    "musholla": "integer",
    "perpustakaan": "integer",
    "borrowedReturn": "integer",
    "maintenance": "integer",
    "users": "integer",
    "categories": "integer",
    "utilitas": "integer"
}
```

# **Data User**

## **Get All Users (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/users/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Berhasil mendapatkan semua user!",
    "data": {
        "user_id": "integer",
        "username": "string",
        "password": "string",
        "role": "enum",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "address": "text"
    }
}
```

## **Get User By Id (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/user/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Berhasil mendapatkan user berdasarkan ID:id !",
    "data": {
        "user_id": "integer",
        "username": "string",
        "password": "string",
        "role": "enum",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "address": "text"
    }
}
```

## **Create User (administrator)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/api/users/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "username": "string",
    "password": "string",
    "role": "enum",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "address": "text"
}
```

**Response** :

```json
{
    "message": "Data user berhasil ditambahkan!",
    "data": {
        "user_id": "integer",
        "username": "string",
        "password": "string",
        "role": "enum",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "address": "text"
    }
}
```

## **Update User (administrator)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/api/user/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "username": "string",
    "password": "string",
    "role": "enum",
    "first_name": "string",
    "last_name": "string",
    "phone_number": "string",
    "address": "text"
}
```

**Response** :

```json
{
    "message": "Data user berhasil diperbarui!",
    "data": {
        "user_id": "integer",
        "username": "string",
        "password": "string",
        "role": "enum",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "address": "text"
    }
}
```

## **Delete User (administrator)**

**Request** : 
- Method    : DELETE
- Endpoint  : `(base-url)/api/user/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "User berhasil dihapus !",
    "data": {
        "user_id": "integer",
        "username": "string",
        "password": "string",
        "role": "enum",
        "first_name": "string",
        "last_name": "string",
        "phone_number": "string",
        "address": "text"
    }
}
```

# **Data Category**

## **Get All Category (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/category/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Categorys Successfully!",
    "data": {
        "category_id": "integer",
        "category_name": "string"
    }
}
```

## **Get Category By Id (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/category/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Category Successfully By ID:id !",
    "data": {
        "category_id": "integer",
        "category_name": "string"
    }
}
```

## **Create Category (administrator && division)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/api/category/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "category_name": "string"
}
```

**Response** :

```json
{
    "message": "Create Category Successfully!",
    "data": {
        "category_id": "integer",
        "category_name": "string"
    }
}
```

## **Update User (administrator && division)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/api/category/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "category_name": "string"
}
```

**Response** :

```json
{
    "message": "Update Category Successfully at ID:id !",
    "data": {
        "category_id": "integer",
        "category_name": "string"
    }
}
```

## **Delete Category (administrator & division)**

**Request** : 
- Method    : DELETE
- Endpoint  : `(base-url)/api/category/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Delete Category Successfully at ID:id !",
    "data": {
        "category_id": "integer",
        "category_name": "string"
    }
}
```


# **Data Ruang Asset Musholla**

## **Get All Assets Musholla (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/musholla/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Assets Musholla Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Asset Musholla By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/musholla/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Musholla Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Create Asset Musholla (administrator && division)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/api/musholla/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum",
    "last_maintenance_date": null
}
```

**Response** :

```json
{
    "message": "Create Asset Musholla Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Update Asset Musholla (administrator && division)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/api/musholla/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum",
    "last_maintenance_date": null
}
```

**Response** :

```json
{
    "message": "Update Asset Musholla Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Delete Asset Musholla (administrator & division)**

**Request** : 
- Method    : DELETE
- Endpoint  : `(base-url)/api/musholla/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Delete Asset Musholla Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

# **Data Ruang Asset Auditorium**

## **Get All Assets Auditorium (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/auditorium/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Assets Auditorium Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Asset Auditorium By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/auditorium/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Asset Auditorium Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Create Asset Auditorium (administrator && division)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/api/auditorium/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum",
    "last_maintenance_date": null
}
```

**Response** :

```json
{
    "message": "Create Asset Auditorium Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Update Asset Auditorium (administrator && division)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/api/auditorium/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum",
    "last_maintenance_date": null
}
```

**Response** :

```json
{
    "message": "Update Asset Auditorium Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Delete Asset Auditorium (administrator & division)**

**Request** : 
- Method    : DELETE
- Endpoint  : `(base-url)/api/auditorium/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Delete Asset Auditorium Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

# **Data Ruang Asset Perpustakaan**

## **Get All Assets Perpustakaan (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/perpustakaan/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Assets Perpustakaan Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Asset Perpustakaan By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/perpustakaan/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Asset Perpustakaan Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Create Asset Perpustakaan (administrator && division)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/api/perpustakaan/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum",
    "last_maintenance_date": null
}
```

**Response** :

```json
{
    "message": "Create Asset Perpustakaan Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Update Asset Perpustakaan (administrator && division)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/api/perpustakaan/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum"
}
```

**Response** :

```json
{
    "message": "Update Asset Perpustakaan Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Delete Asset Perpustakaan (administrator & division)**

**Request** : 
- Method    : DELETE
- Endpoint  : `(base-url)/api/perpustakaan/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Delete Asset Perpustakaan Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

# **Data Ruang Asset Utilitas**

## **Get All Assets Utilitas (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/utilitas/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Assets Utilitas Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Asset Utilitas By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/api/utilitas/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Asset Utilitas Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Create Asset Utilitas (administrator && division)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/api/utilitas/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum",
    "last_maintenance_date": null
}
```

**Response** :

```json
{
    "message": "Create Asset Utilitas Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Update Asset Utilitas (administrator && division)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/api/utilitas/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "asset_name": "string",
    "category": "enum",
    "asset_stock": "integer",
    "asset_price": "integer",
    "purchase_date": "datetime",
    "asset_condition": "enum",
    "last_maintenance_date": null
}
```

**Response** :

```json
{
    "message": "Update Asset Utilitas Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```

## **Delete Asset Utilitas (administrator & division)**

**Request** : 
- Method    : DELETE
- Endpoint  : `(base-url)/api/utilitas/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Delete Asset Utilitas Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": null
    }
}
```


# **Report Ruang Asset Musholla**

## **Get All Reports Musholla (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/musholla-reports/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Reports Musholla Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Report Asset Musholla By Id (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/musholla-reports/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Report Asset Musholla Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Export Excel Report Ruang Asset Musholla (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/musholla-reports/export/excel)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "Export Excel Downloading"
}
```


# **Report Ruang Asset Auditorium**

## **Get All Report Auditorium (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/auditorium-reports/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Report Auditorium Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Report Asset Auditorium By Id (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/auditorium-reports/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Report Asset Auditorium Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Export Excel Report Ruang Asset Auditorium (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/auditorium-reports/export/excel)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "Export Excel Downloading"
}
```


# **Report Ruang Asset Perpustakaan**

## **Get All Report Assets Perpustakaan (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/perpustakaan-reports/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Report Assets Perpustakaan Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Report Asset Perpustakaan By Id (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/perpustakaan-reports/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Report Asset Perpustakaan Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Export Excel Report Ruang Asset Perpustakaan (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/perpustakaan-reports/export/excel)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "Export Excel Downloading"
}
```

# **Report Ruang Asset Utilitas**

## **Get All Report Assets Utilitas (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/utilitas-reports/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Report Assets Utilitas Successfully!",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```

## **Get Report Asset Utilitas By Id (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/utilitas-reports/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Report Asset Utilitas Successfully By ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "asset_category": {
            "category_id": "integer",
            "category_name": "string"
        },
        "asset_stock": "integer",
        "asset_price": "integer",
        "purchase_date": "datetime",
        "asset_condition": "enum",
        "last_maintenance_date": "datetime"
    }
}
```


## **Export Excel Report Ruang Asset Utilitas (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/utilitas-reports/export/excel)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "Export Excel Downloading"
}
```

# **Transaksi Pemeliharaan Asset**

## **Get All Transaksi Pemeliharaan Asset (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/maintenance/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Transaksi Pemeliharaan Asset Successfully!",
    "data": {
        "maintenance_id": "integer",
        "maintenance_asset_code": "string",
        "maintenance_asset_name": "string",
        "maintenance_date": "date",
        "maintenance_asset_condition": "enum",
        "price_maintenance": "integer",
        "details_maintenance": "text",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```
## **Get Transaksi Pemeliharaan Asset By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/maintenance/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Transaksi Pemeliharaan Asset Successfully By ID:id !",
    "data": {
        "maintenance_id": "integer",
        "maintenance_asset_code": "string",
        "maintenance_asset_name": "string",
        "maintenance_date": "date",
        "maintenance_asset_condition": "enum",
        "price_maintenance": "integer",
        "details_maintenance": "text",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

## **Create Transaksi Pemeliharaan Asset (administrator && division)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/maintenance/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "maintenance_asset_code": "enum (string)",
    "maintenance_asset_name": "string",
    "maintenance_date": "date",
    "maintenance_asset_condition": "enum",
    "price_maintenance": "integer",
    "details_maintenance": "text",
}
```

**Response** :

```json
{
    "message": "Create Transaksi Pemeliharaan Asset Successfully!",
    "data": {
        "maintenance_asset_code": "enum (string)",
        "maintenance_date": "date",
        "maintenance_asset_condition": "enum",
        "price_maintenance": "integer",
        "details_maintenance": "text",
    }
}
```

## **Update Transaksi Pemeliharaan Asset (administrator && division)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/maintenance/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "maintenance_asset_code": "enum (string)",
    "maintenance_date": "date",
    "maintenance_asset_condition": "enum",
    "price_maintenance": "integer",
    "details_maintenance": "text",
}
```

**Response** :

```json
{
    "message": "Update Transaksi Pemeliharaan Asset Successfully at ID:id !",
    "data": {
        "maintenance_asset_code": "enum (string)",
        "maintenance_asset_name": "string",
        "maintenance_date": "date",
        "maintenance_asset_condition": "enum",
        "price_maintenance": "integer",
        "details_maintenance": "text",
    }
}
```

## **Export Transaksi Pemeliharaan Asset (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/maintenance/export/excel)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "data": {
        "Export Excel Downloading"
    }
}
```

# **Transaksi Peminjaman dan Pengembalian Asset**

## **Get All Peminjaman dan Pengembalian Asset (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/borrowed-return/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Peminjaman dan Pengembalian Asset Successfully!",
    "data": {
        "borrowed_id": "integer",
        "borrowed_asset_code": "string",
        "borrowed_asset_name": "string",
        "borrowed_name": "string",
        "used_by_program": "enum",
        "borrowed_date": "date",
        "due_date": "date",
        "return_date": "date",
        "status": "enum",
        "notes": "text",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```
## **Get Transaksi Peminjaman dan Pengembalian Asset By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/borrowed-return/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get Transaksi Peminjaman dan Pengembalian Asset Successfully By ID:id !",
    "data": {
        "borrowed_id": "integer",
        "borrowed_asset_code": "string",
        "borrowed_asset_name": "string",
        "borrowed_name": "string",
        "used_by_program": "enum",
        "borrowed_date": "date",
        "due_date": "date",
        "return_date": "date",
        "status": "enum",
        "notes": "text",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

## **Tambah Transaksi Peminjaman Asset (administrator && division)**

**Request** : 
- Method    : POST
- Endpoint  : `(base-url)/borrowed-return/`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "borrowed_asset_code": "enum (string)",
    "borrowed_name": "string",
    "used_by_program": "enum",
    "borrowed_date": "date",
    "due_date": "date",
    "status": "enum",
    "notes": "text",
}
```

**Response** :

```json
{
    "message": "Create Transaksi Peminjaman dan Pengembalian Asset Successfully!",
    "data": {
        "borrowed_id": "integer",
        "borrowed_asset_code": "string",
        "borrowed_asset_name": "string",
        "borrowed_name": "string",
        "used_by_program": "enum",
        "borrowed_date": "date",
        "due_date": "date",
        "return_date": "date",
        "status": "enum",
        "notes": "text",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

## **Transaksi Pengembalian Asset (administrator && division)**

**Request** : 
- Method    : PUT
- Endpoint  : `(base-url)/borrowed-return/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json
- Body      :

```json
{
    "borrowed_name": "string",
    "return_date": "date",
    "notes": "text",
}
```

**Response** :

```json
{
    "message": "Update Transaksi Pemeliharaan Asset Successfully at ID:id !",
    "data": {
        "borrowed_id": "integer",
        "borrowed_asset_code": "string",
        "borrowed_asset_name": "string",
        "borrowed_name": "string",
        "used_by_program": "enum",
        "borrowed_date": "date",
        "due_date": "date",
        "return_date": "date",
        "status": "enum",
        "notes": "text",
        "createdAt": "date",
        "updatedAt": "date"
    }
}
```

## **Export Transaksi Peminjaman dan Pengembalian Asset (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/borrowed-return/export/excel)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "data": {
        "Export Excel Downloading"
    }
}
```
