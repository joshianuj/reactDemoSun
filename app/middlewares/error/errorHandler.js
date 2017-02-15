export default function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || 500;
  res.status(statusCode).send(err.text? err : 'Internal Server Error')
}
