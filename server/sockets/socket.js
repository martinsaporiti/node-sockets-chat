const { io } = require('../server');
const { ContactsAdmin } = require('../model/contacts-admin');
const { createMessage } = require('../utils/utils')

const contacts = new ContactsAdmin();

io.on('connection', (client) => {

    client.on('beginChat', (contact, callback) => {
        
        if(!contact.name || !contact.room ){
            return callback({
                error: true,
                message: 'Name and room are required'
            })
        }

        client.join(contact.room);

        contacts.addContact(client.id, contact.name, contact.room);
        
        client.broadcast.to(contact.room).emit('listContacts', contacts.getContactsInRoom(contact.room));

        callback(contacts.getContactsInRoom(contact.room));
    });


    // Event for createMessage ... 
    client.on('createMessage', (data) => {

        let contact = contacts.getContact(client.id);

        let message = createMessage( contact.name, data.message );
        client.broadcast.to(contact.room).emit('createMessage', message);

    });


    // Event for disconnect.
    // send an event notifying all users that a contact 
    // has disconnected.
    client.on('disconnect', () => {
        
        // Delete contact from the connected list.
        let deletedContact = contacts.deleteContact(client.id);

        // Send message notifying all users that an conctact left the chat... 
        client.broadcast.to(deletedContact.room).emit('createMessage', createMessage('admin', `${deletedContact.name} left the chat`));

        // Sends an updated list of all connected users.
        client.broadcast.to(deletedContact.room).emit('listContacts', contacts.getContactsInRoom(deletedContact.room));

    }); 


    // Private Messages
    client.on('privateMessage', (data) => {

        console.log(data);
        let contact = contacts.getContact(client.id);

        // Send the message to a specific contact.
        client.broadcast.to(data.to).emit('privateMessage', createMessage(contact.name, data.message));

    })

});

