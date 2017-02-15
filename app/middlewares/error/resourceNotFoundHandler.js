export default function resourceNotFoundHandler(req, res, next) {
res.status(404).json({
    statusCode: 404,
    message: '404 - Not Found'
});
}
