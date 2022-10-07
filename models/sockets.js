const TicketList = require('./ticket-list');

class Sockets {
    constructor(io) {
        this.io = io;
        this.ticketList = new TicketList();
        this.socketEvents();
    }

    socketEvents() {
        //On connection
        this.io.on('connection', (socket) => {
            //Escuchar evetos del cliente
            socket.on('new-ticket', (data, callback) => {
                const newTicket = this.ticketList.newTicket();
                callback(newTicket);
            });

            socket.on('next-ticket', ({ agent, desk }, callback) => {
                const myTicket = this.ticketList.attendTicket(agent, desk);
                callback(myTicket);
                this.io.emit('last-ticket', this.ticketList.last13);
            });

        });
    }

}


module.exports = Sockets;