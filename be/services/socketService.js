const socketService = (io) => {
    io.on('connection', (socket) => {
        console.log('Client connected:', socket.id);

        socket.on('start-stream', (data) => {
            console.log('Start streaming with data:', data);
            io.emit('stream-data', { /* dữ liệu streaming */ });
        });

        socket.on('stop-stream', () => {
            console.log('Stop streaming');
            io.emit('stream-stopped');
        });

        socket.on('disconnect', () => {
            console.log('Client disconnected:', socket.id);
        });
    });
};

module.exports = socketService;
