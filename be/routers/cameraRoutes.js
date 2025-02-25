const {notFound, errHandler} = require('../middleware/errHandler');
const cameraRoutes = require('../controllers/cameraController');

// Trong tệp cameraRoutes.js
const initCameraRoutes = (app, io) => {
    app.post('/api/connect-camera', (req, res) => cameraRoutes.connectCamera(req, res, io));
    app.post('/api/start-stream', (req, res) => cameraRoutes.startStream(req, res, io));
    app.post('/api/stop-stream', (req, res) => cameraRoutes.stopStream(req, res, io));
    app.post('/api/control-camera', (req, res) => cameraRoutes.controlCamera(req, res, io));

    app.use(notFound);
    app.use(errHandler);
};

module.exports = initCameraRoutes;


module.exports = initCameraRoutes;