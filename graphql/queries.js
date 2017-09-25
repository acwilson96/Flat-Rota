const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLSchema,
    GraphQLList,
    GraphQLNonNull
} = require('graphql');

const mongoose = require('mongoose');

// Connect to Mongoose.
mongoose.Promise = require('bluebird');
mongoose.connect('mongodb://localhost:27017/flatrota', {useMongoClient: true});

const { Topup, TopupType } = require('../models/topup.js');

// Root Query
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        topups: {
            type: new GraphQLList(TopupType),
            resolve(parentValue, args) {
                return new Promise((resolve, reject) => {
                    Topup.find().then(topups => resolve(topups));
                }).then(topups => topups);
                
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});