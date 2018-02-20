import socketCluster from 'socketcluster-client';

import config from '../config';

const socket = socketCluster.connect({
  hostname: config.socketHost,
  port: config.socketPort
});

socket.on('connect', () => console.info('CONNECTED'));
socket.on('error', error => console.error('socket error: ', error));

export default socket;
