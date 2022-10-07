const Ticket = require('./ticket');

class TicketList{
    constructor(){
        this.lastNumber = 0;
        this.pendingTickets = [];
        this.assigned = [];
    }

    //retorna el siguiente ticket
    get nextNumber(){
        this.lastNumber++;
        return this.lastNumber;
    }

    //retorna los ultimos 13 tickets
    get last13(){
        return this.assigned.slice(0,13);
    }

    //Crea un nuevo ticket
    newTicket(){
        const newTicket = new Ticket( this.nextNumber );
        this.pendingTickets.push( newTicket );
        return newTicket;
    }

    //Asigna un ticket a un escritorio
    attendTicket( agent, desk ){
        //Si tickets pendientes es igual a 0 retorna null
        if( this.pendingTickets.length === 0 ){
            return null;
        }

        const nextTicket = this.pendingTickets.shift();
        nextTicket.desk = desk;
        nextTicket.agent = agent;

        this.assigned.unshift( nextTicket );

        return nextTicket;
    }

}

module.exports = TicketList;