define({ "api": [
  {
    "type": "post",
    "url": "/admin/auth/login",
    "title": "Authenticate admin",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
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
            "description": "<p>jwt</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "api/admin/auth.js",
    "group": "_home_stepan_coding_kik_kik_server_api_admin_auth_js",
    "groupTitle": "_home_stepan_coding_kik_kik_server_api_admin_auth_js",
    "name": "PostAdminAuthLogin",
    "error": {
      "fields": {
        "Error 4xx": [
          {
            "group": "Error 4xx",
            "optional": false,
            "field": "NotAuthorized",
            "description": ""
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
  }
] });
