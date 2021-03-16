define({ "api": [
  {
    "type": "delete",
    "url": "/auth",
    "title": "Delete user's cookie upon signing out",
    "name": "DeleteAuth",
    "group": "Auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "delete:true",
            "description": "<p>when a cookie is succesfully deleted</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"delete\": true\n}",
          "type": "cookie"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "server/routes/signin.js",
    "groupTitle": "Auth"
  },
  {
    "type": "get",
    "url": "/auth",
    "title": "Request to sign a user in the system",
    "name": "GetAuth",
    "group": "Auth",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>&quot;username:password&quot; uses Basic Auth</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is found and password matches</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Authentication successful!&quot;&quot;</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>JSON Web Token</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 OK\n{\n  \"success\": true,\n  \"message\": \"Authentication successful!\",\n  \"token\": \"eyJhbGciO...abc123\",\n  \"username\": NameHere\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400: Missing Authorization Header": [
          {
            "group": "400: Missing Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing Authorization Header&quot;</p>"
          }
        ],
        "400: Malformed Authorization Header": [
          {
            "group": "400: Malformed Authorization Header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Malformed Authorization Header&quot;</p>"
          }
        ],
        "404: User Not Found": [
          {
            "group": "404: User Not Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;User not found&quot;</p>"
          }
        ],
        "400: Invalid Credentials": [
          {
            "group": "400: Invalid Credentials",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Credentials did not match&quot;</p>"
          }
        ],
        "400: Invalid input(s)": [
          {
            "group": "400: Invalid input(s)",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid input(s)&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/signin.js",
    "groupTitle": "Auth"
  },
  {
    "type": "post",
    "url": "/auth",
    "title": "Request to register a user",
    "name": "PostAuth",
    "group": "Auth",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "first",
            "description": "<p>a users first name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "last",
            "description": "<p>a users last name</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>a users email *unique</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>a users password</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": true,
            "field": "username",
            "description": "<p>a username *unique, if none provided, email will be used</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"first\":\"Charles\",\n    \"last\":\"Bryan\",\n    \"username\":\"abc123\",\n    \"email\":\"cfb3@fake.email\",\n    \"password\":\"test12345\",\n    \"retypePassword\": \"test12345\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 201": [
          {
            "group": "Success 201",
            "type": "boolean",
            "optional": false,
            "field": "success",
            "description": "<p>true when the name is inserted</p>"
          },
          {
            "group": "Success 201",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>the email of the user inserted</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "400: Missing Parameters": [
          {
            "group": "400: Missing Parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing required information&quot;</p>"
          }
        ],
        "400: Username exists": [
          {
            "group": "400: Username exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Username exists&quot;</p>"
          }
        ],
        "400: Email exists": [
          {
            "group": "400: Email exists",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Email exists&quot;</p>"
          }
        ],
        "400: Invalid email format": [
          {
            "group": "400: Invalid email format",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid email format&quot;</p>"
          }
        ],
        "400: Invalid password": [
          {
            "group": "400: Invalid password",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid password(s)! Passwords require at least 1 upper case character and length greater than 7&quot;</p>"
          }
        ],
        "400: Invalid retype-password": [
          {
            "group": "400: Invalid retype-password",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid password(s)! Passwords mismatch&quot;</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/register.js",
    "groupTitle": "Auth"
  },
  {
    "type": "delete",
    "url": "orders",
    "title": "Delete selected previous order",
    "name": "DeleteOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"orderId\": 1\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n     success: true,\n     message: \"Order is deleted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400: Missing authorization header": [
          {
            "group": "400: Missing authorization header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing authorization header&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "400: Missing parameters": [
          {
            "group": "400: Missing parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing parameters&quot;</p>"
          }
        ],
        "400: Invalid parameters": [
          {
            "group": "400: Invalid parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid parameters&quot;</p>"
          }
        ],
        "400: Fail to delete order": [
          {
            "group": "400: Fail to delete order",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Fail to delete order&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "get",
    "url": "/orders",
    "title": "Request to get all Order entries in the DB",
    "name": "GetOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Query-Example:",
          "content": "https://hungvu-mcsandwich.herokuapp.com/order",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "orders",
            "description": "<p>List of Orders in the database</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "404: No Orders Found": [
          {
            "group": "404: No Orders Found",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;No Orders&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/orders.js",
    "groupTitle": "Orders"
  },
  {
    "type": "post",
    "url": "orders",
    "title": "Place orders by putting orders information into DB",
    "name": "PostOrders",
    "group": "Orders",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "authorization",
            "description": "<p>Valid JSON Web Token JWT</p>"
          }
        ]
      }
    },
    "parameter": {
      "examples": [
        {
          "title": "Request-Body-Example:",
          "content": "{\n    \"size\": \"large\",\n    \"color\": \"green\",\n    \"option1\": \"true\",\n    \"option2\": \"false\",\n    \"option3\": \"true\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 200 OK\n{\n  \"success\": true,\n  \"message\": \"Order is inserted\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400: Missing authorization header": [
          {
            "group": "400: Missing authorization header",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing authorization header&quot;</p>"
          }
        ],
        "400: JSON Error": [
          {
            "group": "400: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;malformed JSON in parameters&quot;</p>"
          }
        ],
        "400: Missing parameters": [
          {
            "group": "400: Missing parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Missing parameters&quot;</p>"
          }
        ],
        "400: Invalid parameters": [
          {
            "group": "400: Invalid parameters",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Invalid parameters&quot;</p>"
          }
        ],
        "400: Fail to insert order": [
          {
            "group": "400: Fail to insert order",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Fail to insert order&quot;</p>"
          }
        ],
        "403: JSON Error": [
          {
            "group": "403: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Token is not valid&quot; when a JWT is provided but it is expired or otherwise not valid</p>"
          }
        ],
        "401: JSON Error": [
          {
            "group": "401: JSON Error",
            "type": "String",
            "optional": false,
            "field": "message",
            "description": "<p>&quot;Auth token is not supplied&quot; when a JWT is not provided or it is provided in an incorrect format</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "server/routes/orders.js",
    "groupTitle": "Orders"
  }
] });
