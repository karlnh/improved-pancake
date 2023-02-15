const User = require('./User');
const ChatSession = require('./ChatSession');

ChatSession.hasMany(User, {
    foreignKey: 'user_id',
});

User.belongsTo(ChatSession, {
    foreignKey: 'user_id',
});

module.exports = { User, ChatSession };