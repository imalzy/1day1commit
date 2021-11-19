require('dotenv').config()
import http from 'http'
import express, { Express, Request, Response, NextFunction } from 'express'
import morgan from 'morgan'
import routes from './routes/posts'

const rfs = require("rotating-file-stream");
const router: Express = express()

function formatDate(d: any) {
    let month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;
    if (hour.length < 2)
        hour = '0' + hour;

    return [year, month, day, hour].join('-');
}

function log_file_name(time: any, index: any) {
    if (!time) return 'access.log';

    return [formatDate(time), index, 'access.log'].join('-');
}

/* Logging */
const rfsStream = rfs.createStream(process.env.LOG_FILE || log_file_name, {
    size: process.env.LOG_SIZE || '10M',
    interval: process.env.LOG_INTERVAL || '1d',
    compress: 'gzip', // compress rotated files
    path: 'logs/'
});
router.use(morgan(process.env.LOG_FORMAT || "dev", { stream: process.env.LOG_FILE ? rfsStream : process.stdout }))
if (process.env.LOG_FILE) {
    router.use(morgan(process.env.LOG_FORMAT || "dev"));
}

/* Parse the request */
router.use(express.urlencoded({ extended: false }))
/* Takes care of JSON data */
router.use(express.json())

/* Rules of our api */
router.use((req: Request, res: Response, next: NextFunction) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
    // set the CORS method headers
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
        return res.status(200).json({});
    }
    next();
})

/* Routes */
router.use('/', routes)

/** Error handling */
router.use((req: Request, res: Response, next: NextFunction) => {
    const error = new Error('Not found');
    return res.status(404).json({
        message: error.message,
        detail: 'The requested resource / URLs does not exist'
    });
});

/** Server */
const httpServer = http.createServer(router);
const PORT: any = process.env.PORT ?? 6060;
httpServer.listen(PORT, () => console.log(`The server is running on port ${PORT}`));