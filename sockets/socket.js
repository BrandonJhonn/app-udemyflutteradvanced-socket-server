const { io } = require('../index');

// Mensaje de confirmacion de conexion
io.on('connection', (cliente) => {
  console.log('Cliente conectado');
  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  cliente.on('mensaje', (payload) => {
    console.log('Mensaje recibido: ', payload);
    io.emit('mensaje', {admin: 'Nuevo mensaje'});
  });

  cliente.on('emitir-mensaje', (payload) => {
    //io.emit('nuevo-mensaje', payload);  // Emite a todos los clientes
    cliente.broadcast.emit('nuevo-mensaje', payload); // Emite a todos los clientes excepto al que lo envia
  })
});