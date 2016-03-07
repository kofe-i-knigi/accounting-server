define({ "api": [
  {
    "type": "post",
    "url": "/admin/login",
    "title": "Авторизация",
    "name": "AuthLogin",
    "group": "Auth",
    "description": "<p>Админов нельзя регистрировать. Можно только логиниться с данными указанными в сорцах (до смены пароля).</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "login",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": ""
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>jwt, use it in Authorization header</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/auth.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "(401": [
          {
            "group": "(401",
            "optional": false,
            "field": "NotAuthorized",
            "description": "<p>неверные логин или пароль</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 401 Not Authorized\n{\n  \"error\": \"Not Authorized\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/admin/auth/regtoken",
    "title": "Токен регистрации",
    "name": "RegistrationToken",
    "group": "Auth",
    "description": "<p>Отдает токен, который используется при регистрации юзеров. Генерит новый токен каждый день</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>Админ будет давать этот токен юзерам для регистрации</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "registration token",
          "content": "{\n  \"token\": \"1234567890abcdef\"\n}",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/auth.js",
    "groupTitle": "Auth",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "post",
    "url": "/stores",
    "title": "Создание точки",
    "name": "StoresCreate",
    "group": "Stores",
    "description": "<p>Доступно только админу</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "store",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "store.name",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "store.location",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/stores.js",
    "groupTitle": "Stores",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "store",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "store.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "store.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "store.location",
            "description": "<p>широта,долгота</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "user object:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Родник\",\n  \"location\": \"55.1706042,61.358359\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "delete",
    "url": "/stores/:id",
    "title": "Удаление точки",
    "name": "StoresDelete",
    "group": "Stores",
    "description": "<p>Доступно только админу</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/stores.js",
    "groupTitle": "Stores",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/admin/stores",
    "title": "Список точек-складов-касс",
    "name": "StoresList",
    "group": "Stores",
    "description": "<p>Используется много где. Для начала он нам нужен, чтобы логиниться в клиент</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "stores",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "stores.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stores.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "stores.location",
            "description": "<p>широта,долгота</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "user list:",
          "content": "[{\n  \"id\": 1,\n  \"name\": \"Родник\",\n  \"location\": \"55.1706042,61.358359\"\n}, {\n  \"id\": 2,\n  \"name\": \"МФЦ\",\n  \"location\": \"55.1706042,61.358359\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/stores.js",
    "groupTitle": "Stores",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/stores/:id",
    "title": "Отдельная точка",
    "name": "StoresShow",
    "group": "Stores",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/stores.js",
    "groupTitle": "Stores",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "store",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "store.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "store.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "store.location",
            "description": "<p>широта,долгота</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "user object:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Родник\",\n  \"location\": \"55.1706042,61.358359\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/stores/:id",
    "title": "Обновление точки",
    "name": "StoresUpdate",
    "group": "Stores",
    "description": "<p>Доступно только админу</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "store",
            "description": "<p>объект, содержащий обновляемые поля</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>поле, например, <code>name</code></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/stores.js",
    "groupTitle": "Stores",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "store",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "store.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "store.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "store.location",
            "description": "<p>широта,долгота</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "user object:",
          "content": "{\n  \"id\": 1,\n  \"name\": \"Родник\",\n  \"location\": \"55.1706042,61.358359\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/admin/users",
    "title": "Список бариста",
    "name": "UsersList",
    "group": "Users",
    "description": "<p>не выдает админов</p>",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object[]",
            "optional": false,
            "field": "users",
            "description": "<p>список юзеров</p>"
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "users.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.login",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "users.role",
            "description": "<p>по умолчанию <code>barista</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "user list:",
          "content": "[{\n  \"id\": 1,\n  \"login\": \"vlad\",\n  \"name\": \"Влад\",\n  \"role\": \"barista\"\n}, {\n  \"id\": 2,\n  \"login\": \"anton\",\n  \"name\": \"Антон\",\n  \"role\": \"barista\"\n}]",
          "type": "json"
        }
      ]
    },
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "Users",
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "get",
    "url": "/admin/users/:id",
    "title": "Отдельный пользователь",
    "name": "UsersShow",
    "group": "Users",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.login",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>по умолчанию <code>barista</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "user object:",
          "content": "{\n  \"id\": 1,\n  \"login\": \"vlad\",\n  \"name\": \"Влад\",\n  \"role\": \"barista\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  },
  {
    "type": "put",
    "url": "/admin/users/:id",
    "title": "Обновление пользователя",
    "name": "UsersUpdate",
    "group": "Users",
    "description": "<p>Пока, думаю, админу у юзеров нечего обновлять, но метод пускай будет</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "id",
            "description": ""
          },
          {
            "group": "Parameter",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>объект, содержащий обновляемые поля</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": "<p>поле, например, <code>name</code></p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/users.js",
    "groupTitle": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "Number",
            "optional": false,
            "field": "user.id",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.login",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.name",
            "description": ""
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "user.role",
            "description": "<p>по умолчанию <code>barista</code></p>"
          }
        ]
      },
      "examples": [
        {
          "title": "user object:",
          "content": "{\n  \"id\": 1,\n  \"login\": \"vlad\",\n  \"name\": \"Влад\",\n  \"role\": \"barista\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "optional": false,
            "field": "BadRequest",
            "description": "<p>ошибка в запросе</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Error-Response:",
          "content": "HTTP/1.1 400 Not Authorized\n{\n  \"error\": \"Provide id\"\n}",
          "type": "json"
        }
      ]
    }
  }
] });
