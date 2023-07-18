//Servidor de Express
const express = require('express');
//servidor de socket
const http = require('http');
const socketio = require('socket.io');
const path = require('path');
const cors = require('cors');

const Sockets = require('./sockets');


class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);

        //Configuración del socket server
        this.io = socketio(this.server, {
            /* Configuraciones */
        });

        //Inicializar sockets
        this.sockets = new Sockets(this.io);
    }

    middlewares() {
        //Desplegar el directorio público
        this.app.use(express.static(path.resolve(__dirname, '../', 'public')));

        //CORS
        this.app.use(cors(
            {
                origin: process.env.URL_FRONTEND,
                credentials: true
            }
        ));

        //Get de los últimos tickets
        this.app.get('/last-ticket', (req, res) => {
            res.json({
                lastTicket: this.sockets.ticketList.last13
            })
        });

        //Get Ticket finalizados
        this.app.get('/finished-ticket', (req, res) => {
            res.json({
                finishedTicket: this.sockets.ticketList.finishedTickets
            })
        });

    }

    execute() {

        //Inicializar middlewares
        this.middlewares();


        //Inicializar Server
        this.server.listen(this.port, () => {
            console.log(`Servidor on, url: http://localhost:${this.port}`);
        });
    }


}

module.exports = Server;