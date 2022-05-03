import io from 'socket.io-client';

const notificationSocket = io(import.meta.env.VITE_MESSAGE_URL, {
  path: '/notification',
});

export default notificationSocket;
