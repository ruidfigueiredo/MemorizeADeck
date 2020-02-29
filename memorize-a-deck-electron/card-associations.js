const { connection } = require('./connection')

exports.getCardAssociations = () => {
    return connection.send('cardAssociations.getAll');
}

exports.saveCardAssociations = newAssociations => {
    return connection.send('cardAssociations.save', newAssociations)
}