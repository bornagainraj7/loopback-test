module.exports = function() {
    return (req, res, next) => {
        console.log('Datetime Middleware');
        res.send('Hello');
    }
}