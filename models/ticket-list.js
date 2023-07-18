const Ticket = require('./ticket');

class TicketList{
    constructor(){
        this.lastNumber = 0;
        this.pendingTickets = [];
        this.assigned = [];
        this.finished = [];
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

    //Retorna los tickets finalizados
    get finishedTickets(){
        return this.finished.slice(0,13);
    }

    /**
     * Creamos un nuevo ticket
     * y lo agregamos al arreglo de tickets pendientes
     * @returns {Ticket}
     */
    newTicket(){
        const newTicket = new Ticket( this.nextNumber );
        this.pendingTickets.push( newTicket );
        return newTicket;
    }

    /**
     * Asignamos un ticket a un escritorio
     * @param {*} agent - Agente que atendera el ticket
     * @param {*} desk  - Escritorio al que se asignara el ticket
     * @returns 
     */
    attendTicket( user, finishedTicket ){

        const { agent, desk } = user;

        //Si tickets pendientes es igual a 0 retorna null
        if( this.pendingTickets.length === 0 ){
            return null;
        }

        //Elimina el primer ticket del arreglo y lo retorna
        const nextTicket = this.pendingTickets.shift();
        
        //Asignamos el escritorio y el agente al ticket
        nextTicket.desk = desk;
        nextTicket.agent = agent;

        //Agregamos el siguiente ticket al inicio del arreglo
        this.assigned.unshift( nextTicket );

        //Removemos el ticket finalizado del arreglo de tickets asignados
        //y lo agregamos al arreglo de tickets finalizados
        if( finishedTicket ){
            this.assigned = this.assigned.filter( ticket => ticket.number !== finishedTicket.number );
            this.finished.unshift( finishedTicket );
        }

        return nextTicket;
    }

}

module.exports = TicketList;