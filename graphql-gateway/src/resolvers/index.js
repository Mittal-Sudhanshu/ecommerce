const { mergeResolvers } = require('@graphql-tools/merge');
const userResolvers = require('./userResolvers');
const productResolvers = require('./productResolvers');
const orderResolvers = require('./orderResolvers');

const resolvers = mergeResolvers([userResolvers, productResolvers, orderResolvers]);

module.exports = resolvers;
