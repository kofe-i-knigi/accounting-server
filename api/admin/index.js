/**
 * @apiDefine NotAuthorizedError
 *
 * @apiError ((401) NotAuthorized неверные логин или пароль
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Not Authorized
 *     {
 *       "error": "Not Authorized"
 *     }
 */

/**
 * @apiDefine BadRequestError
 *
 * @apiError (400) BadRequest ошибка в запросе
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 400 Not Authorized
 *     {
 *       "error": "Provide id"
 *     }
 */
