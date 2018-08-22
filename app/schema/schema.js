const { 
  GraphQLNonNull,
  GraphQLString,
  GraphQLInt,
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql');
const axios = require('axios');


const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: {
    id: { type: GraphQLString },
    name: { type: GraphQLString }
  }
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: {
    id: { type: GraphQLString},
    fullName: { type: GraphQLString }
  }
});

const VideoType = new GraphQLObjectType({
  name: 'Video',
  fields: {
    createdAt: { type: GraphQLString },
    modifiedAt: { type: GraphQLString },
    genre: { type: [GenreType] },
    director: { type: [DirectorType] },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLString }
  }
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    video : {
      type: VideoType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args){
        const response = axios.get(`http://localhost:3000/videos/${args.id}`);
        return response.data;
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
})
