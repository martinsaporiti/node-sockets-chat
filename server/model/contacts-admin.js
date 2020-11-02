
class ContactsAdmin {


    constructor() {
        this.contacts = [];
    }

    addContact(id, name, room){

        let contact = {
            id,
            name,
            room
        }

        this.contacts.push(contact);
        return this.contacts;
    }


    getContact(id) {
        let contact = this.contacts.filter( contact => {return contact.id === id})[0];
        return contact;
    }

    getContacts() {
        return this.contacts;
    }

    getContactsInRoom(room) {

        let contactsInRoom = this.contacts.filter( contact => {
            return contact.room === room
        })

        return contactsInRoom;
    }

    deleteContact(id) {

        let contactToDelete = this.getContact(id);

        this.contacts = this.contacts.filter( contact => {
            return contact.id !== id;
        })

        return contactToDelete;
    }


}



module.exports = {
    ContactsAdmin
}