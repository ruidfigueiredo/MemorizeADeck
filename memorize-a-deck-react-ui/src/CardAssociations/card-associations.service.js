import { connection } from '../connection.service';


export function getCardAssociations() {
    return connection.send('cardAssociations.getAll');
}

export function saveCardAssociations(newAssociations) {
    return connection.send('cardAssociations.save', newAssociations)
}
