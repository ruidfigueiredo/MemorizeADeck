const { connection } = require('./connection')

exports.getCardAssociations = () => {
    return connection.send('cardAssociations.getAll');
}