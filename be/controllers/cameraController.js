const asyncHandler = require("express-async-handler");
const { Cam } = require('onvif');
const { spawn } = require('child_process');
const onvif = require('node-onvif');

let ffmpegProcess = null;

// connect cam
const connectCamera = asyncHandler(async (req, res, io) => {
    const { cameraConfig } = req.body;
    
    if (!cameraConfig) return res.status(400).json({ error: 'Missing camera configuration' });

    const cam = new Cam(cameraConfig, async function (err) {
        if (err) return res.status(500).json({ error: 'Failed to connect' });
        cam.getProfiles((err, profiles) => {
            if (err) return res.status(500).json({ error: 'Failed to get profiles' });

            const profileToken = profiles[0].$.token;
            cam.getStreamUri({ protocol: 'RTSP', ProfileToken: profileToken }, (err, stream) => {
                if (err) return res.status(500).json({ error: 'Failed to get RTSP URI' });

                const streamUri = stream.uri.replace('rtsp://', `rtsp://${cameraConfig.username}:${cameraConfig.password}@`);
                io.emit('cameraConnected', { message: 'Connected to camera', streamUri });
                res.json({ message: 'Connected to camera', streamUri });
            });
        });
    });
});
// start stream
const startStream = asyncHandler(async (req, res, io) => {
    const { streamUri, youtubeStreamKey } = req.body;
    if (ffmpegProcess) return res.json({ message: 'Streaming already running' });
    if (!streamUri) return res.status(400).json({ error: 'Not having signal from camera' });
    if (!youtubeStreamKey) return res.status(400).json({ error: 'Missing youtube stream key' });
    if (ffmpegProcess) return res.json({ message: 'Streaming already running' });

    const youtubeRtmpUrl = `rtmp://a.rtmp.youtube.com/live2/${youtubeStreamKey}`;
    ffmpegProcess = spawn('ffmpeg', [
        '-rtsp_transport', 'tcp',
        '-i', streamUri,
        '-f', 'flv',
        '-vcodec', 'copy',
        '-acodec', 'aac',
        '-b:a', '128k',
        '-ar', '44100',
        '-preset', 'ultrafast',
        '-f', 'flv', youtubeRtmpUrl
    ]);

    ffmpegProcess.stdout.on('data', (data) => {
        io.emit('ffmpegOutput', data.toString());
    });

    ffmpegProcess.stderr.on('data', (data) => {
        io.emit('ffmpegError', data.toString());
    });

    ffmpegProcess.on('close', (code) => {
        io.emit('ffmpegClose', `FFmpeg process closed with code ${code}`);
    });

    res.json({ message: 'Streaming started' });
});

const stopStream = asyncHandler(async (req, res, io) => {
    // check if ffmpeg process is running
    if (!ffmpegProcess) return res.json({ message: 'Streaming already stopped' });
    
    ffmpegProcess.kill('SIGINT');
    ffmpegProcess = null;
    io.emit('streamStopped', { message: 'Streaming stopped' });
    res.json({ message: 'Streaming stopped' });
});

const controlCamera = asyncHandler(async (req, res, io) => {
    try {
        const { cameraConfig, action, speedStep } = req.body;

        if (!cameraConfig) return res.status(400).json({ error: 'Missing camera configuration' });
        if (!action) return res.status(400).json({ error: 'Missing action' });
        if (speedStep === undefined || speedStep < -1.0 || speedStep > 1.0) {
            return res.status(400).json({ error: 'Invalid speed. Must be between -1.0 and 1.0' });
        }
    
        const { hostname, username, password } = cameraConfig;

        // Khởi tạo thiết bị ONVIF
        const device = new onvif.OnvifDevice({
            xaddr: `http://${hostname}/onvif/device_service`,
            user: username,
            pass: password
        });

        // Kết nối với camera
        await device.init();

        // Kiểm tra xem camera có hỗ trợ PTZ không
        if (!device.services.ptz) {
            return res.status(500).json({ error: 'Thiết bị không hỗ trợ PTZ' });
        }

        // Xác định tốc độ di chuyển PTZ
        let params = {
            speed: { x: 0, y: 0, z: 0 },
            timeout: 1 // Giây
        };

        // Ánh xạ hành động từ client vào tốc độ PTZ
        switch (action) {
            case 'up':
                params.speed.y = speedStep; // Di chuyển lên trên
                break;
            case 'down':
                params.speed.y = -speedStep; // Di chuyển xuống dưới
                break;
            case 'left':
                params.speed.x = -speedStep; // Xoay sang trái
                break;
            case 'right':
                params.speed.x = speedStep; // Xoay sang phải
                break;
            case 'zoomIn':
                params.speed.z = speedStep; // Zoom vào
                break;
            case 'zoomOut':
                params.speed.z = -speedStep; // Zoom ra
                break;
            default:
                return res.status(400).json({ error: 'Hành động không hợp lệ' });
        }

        // Thực hiện lệnh di chuyển camera
        await device.ptzMove(params);
        console.log(`Lệnh ${action} đã được thực thi.`);

        // Phát sự kiện tới tất cả client kết nối
        io.emit('ptzCommandExecuted', { message: `Lệnh ${action} đã được thực thi`, action });

        // Gửi phản hồi về client
        res.json({ message: `Lệnh ${action} đã được thực thi` });

        // Dừng camera sau 1 giây
        setTimeout(async () => {
            try {
                await device.ptzStop();
                console.log('Đã dừng camera.');
            } catch (error) {
                console.error('Lỗi khi dừng camera:', error);
            }
        }, 1000);

    } catch (error) {
        console.error('Lỗi khi điều khiển camera:', error);
        res.status(500).json({ error: 'Không thể kết nối hoặc điều khiển camera' });
    }
});

module.exports = { connectCamera, startStream, stopStream, controlCamera };