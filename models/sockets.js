const TicketList = require( './ticket-list' );

class Sockets {

    constructor( io ) {

        this.io = io;

        // Crear nueva instancia del ticketList
        this.ticketList = new TicketList();

        this.socketEvents();

    }

    socketEvents() {

        // On connection
        this.io.on( 'connection', ( socket ) => {

            socket.on( 'request-ticket', ( data, callback ) => {

                const newTicket = this.ticketList.createTicket();
                callback( newTicket );

            } );

            socket.on( 'next-ticket-work', ( { agent, desktop }, callback ) => {

                const nextTicket = this.ticketList.assignTicket( agent, desktop );

                callback( nextTicket );

                this.io.emit( 'last-13-tickets', this.ticketList.last13Tickets );

            } );

        } );

    }

}

module.exports = Sockets;