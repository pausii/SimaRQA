
npm v9.8.1
node v18.18.2

# ** API SPECIFICATION FOR SIMARQA **

base-url: localhost:3000

## **Login**

**Request** :
- Method : POST

- Endpoint : `(base-url)/auth/login`

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
    "message": "login success, welcome!",
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

# **Data User**

## **Get All Users (administrator)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/users/)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get All Users Successfully!",
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
- Endpoint  : `(base-url/user/:id)`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Get User Successfully By ID:id !",
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
- Endpoint  : `(base-url)/users/`
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
    "message": "Create User Successfully!",
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
- Endpoint  : `(base-url)/user/:id`
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
    "message": "Update User Successfully at ID:id !",
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
- Endpoint  : `(base-url)/user/:id`
- Header    : 
    - Content-Type  : application/json
    - Accept        : application/json

**Response** :

```json
{
    "message": "Delete User Successfully at ID:id !",
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
- Endpoint  : `(base-url/categorys/)`
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
- Endpoint  : `(base-url/category/:id)`
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
- Endpoint  : `(base-url)/category/`
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
- Endpoint  : `(base-url)/category/:id`
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
- Endpoint  : `(base-url)/category/:id`
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
- Endpoint  : `(base-url/musholla/)`
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
        "category": {
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
- Endpoint  : `(base-url/musholla/:id)`
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
        "category": {
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
- Endpoint  : `(base-url)/musholla/`
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
        "category": {
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
- Endpoint  : `(base-url)/musholla/:id`
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
        "category": {
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
- Endpoint  : `(base-url)/musholla/:id`
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
        "category": {
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
- Endpoint  : `(base-url/auditorium/)`
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
        "category": {
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
- Endpoint  : `(base-url/auditorium/:id)`
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
        "category": {
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
- Endpoint  : `(base-url)/auditorium/`
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
        "category": {
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
- Endpoint  : `(base-url)/auditorium/:id`
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
        "category": {
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
- Endpoint  : `(base-url)/auditorium/:id`
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
        "category": {
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
- Endpoint  : `(base-url/perpustakaan/)`
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
        "category": {
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
- Endpoint  : `(base-url/perpustakaan/:id)`
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
        "category": {
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
- Endpoint  : `(base-url)/perpustakaan/`
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
        "category": {
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
- Endpoint  : `(base-url)/perpustakaan/:id`
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
    "message": "Update Asset Perpustakaan Successfully at ID:id !",
    "data": {
        "asset_id": "integer",
        "asset_name": "string",
        "category": {
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
- Endpoint  : `(base-url)/perpustakaan/:id`
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
        "category": {
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
- Endpoint  : `(base-url/utilitas/)`
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
        "category": {
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
- Endpoint  : `(base-url/utilitas/:id)`
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
        "category": {
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
- Endpoint  : `(base-url)/utilitas/`
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
        "category": {
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
- Endpoint  : `(base-url)/utilitas/:id`
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
        "category": {
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
- Endpoint  : `(base-url)/utilitas/:id`
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
        "category": {
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

## **Get All Reports Musholla (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/musholla/report/)`
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
        "category": {
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

## **Get Report Asset Musholla By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/musholla/report/:id)`
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
        "category": {
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

## **Print PDF Report Ruang Asset Musholla (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/musholla/report/:id/print)`
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
        "category": {
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


# **Report Ruang Asset Auditorium**

## **Get All Report Auditorium (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/auditorium/report/)`
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
        "category": {
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

## **Get Report Asset Auditorium By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/auditorium/report/:id)`
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
        "category": {
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

## **Print PDF Report Ruang Asset Musholla (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/auditorium/report/:id/print)`
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
        "category": {
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


# **Report Ruang Asset Perpustakaan**

## **Get All Report Assets Perpustakaan (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/perpustakaan/report/)`
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
        "category": {
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

## **Get Report Asset Perpustakaan By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/perpustakaan/report/:id)`
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
        "category": {
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

## **Print PDF Report Ruang Asset Auditorium (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/auditorium/report/:id/print)`
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
        "category": {
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




# **Report Ruang Asset Utilitas**

## **Get All Report Assets Utilitas (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/utilitas/report/)`
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
        "category": {
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

## **Get Report Asset Utilitas By Id (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/utilitas/report/:id)`
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
        "category": {
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


## **Print PDF Report Ruang Asset Utilitas (administrator & division)**

**Request** : 

- Method    : GET
- Endpoint  : `(base-url/utilitas/report/:id/print)`
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
        "category": {
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

> :warning: **Under Process**: Bagian dibawah ini sedang dalam proses pembuatan.

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
- Endpoint  : `(base-url/maintenance/report/:id)`
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
        "maintenance_asset_name": "string",
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

## **Create Transaksi Peminjaman dan Pengembalian Asset (administrator && division)**

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

## **Update Transaksi Peminjaman dan Pengembalian Asset (administrator && division)**

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
    "used_by_program": "enum",
    "borrowed_date": "date",
    "due_date": "date",
    "return_date": "date",
    "status": "enum",
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