
import { logEvents } from '../middlewares/logEvents.mjs';

const errorHandler = (err, req, res, next) => {
    logEvents(`${err.name}: ${err.message}`, 'errors.log');
    console.error(err.name, err.message);
    res.status(err.statusCode || 500).json({ error: 'Internal Server Error', message: err.message });
}

export default errorHandler;