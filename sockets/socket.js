const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();
bands.addBand('AC/DC');
bands.addBand('PXNDX');
bands.addBand('MUSE');
bands.addBand('OCTAVIA');

// Mensaje de confirmacion de conexion
io.on('connection', (cliente) => {
  console.log('Cliente conectado');

  cliente.emit('active-bands', bands.getBands());

  cliente.on('disconnect', () => {
    console.log('Cliente desconectado');
  });

  cliente.on('mensaje', (payload) => {
    console.log('Mensaje recibido: ', payload);
    io.emit('mensaje', {admin: 'Nuevo mensaje'});
  });

  //cliente.on('emitir-mensaje', (payload) => {
  //  io.emit('nuevo-mensaje', payload);  // Emite a todos los clientes
  //  cliente.broadcast.emit('nuevo-mensaje', payload); // Emite a todos los clientes excepto al que lo envia
  //})

  cliente.on('vote-band', (payload) => {
    bands.voteBand(payload.id);
    io.emit('active-bands', bands.getBands());  // Emite a todos los clientes
  })

  cliente.on('add-band', (payload) => {
    bands.addBand(payload.name);
    io.emit('active-bands', bands.getBands());  // Emite a todos los clientes
  })

  cliente.on('delete-band', (payload) => {
    bands.deleteBand(payload.id);
    io.emit('active-bands', bands.getBands());  // Emite a todos los clientes
  })
});