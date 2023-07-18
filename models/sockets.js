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
            /**
             * Evento para generar un nuevo ticket
             */
            socket.on('new-ticket', (data, callback) => {
                const newTicket = this.ticketList.newTicket();
                callback(newTicket);
            });

            socket.on('next-ticket', ({ user, finishedTicket }, callback) => {
                const newTicket = this.ticketList.attendTicket(user, finishedTicket);
                callback(newTicket);
                //Emite los ultimos 13 tickets asignados
                this.io.emit('last-ticket', this.ticketList.last13);
                //Removemos el ticket finalizado
                this.io.emit('end-ticket', this.ticketList.finishedTickets);
            });
        });
    }

}


module.exports = Sockets;