import io from 'socket.io-client';

const socket = io(import.meta.env.VITE_MESSAGE_URL, {
  path: '/message',
});

export default socket;
