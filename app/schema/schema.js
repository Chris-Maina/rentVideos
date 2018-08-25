const { 
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLObjectType,
  GraphQLSchema
} = require('graphql');
const axios = require('axios');


const GenreType = new GraphQLObjectType({
  name: 'Genre',
  fields: () => ({
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    videos: {
      type: new GraphQLList(VideoType),
      async resolve(parentValue, args){
        const response = await axios.get(`http://localhost:3000/genres/${parentValue.id}/videos`);
        return response.data;
      }
    }
  })
});

const DirectorType = new GraphQLObjectType({
  name: 'Director',
  fields: () => ({
    id: { type: GraphQLString},
    fullName: { type: GraphQLString },
    videos: {
      type: new GraphQLList(VideoType),
      async resolve(parentValue, args){
        const response = await axios.get(`http://localhost:3000/directors/${parentValue.id}/videos`);
        return response.data;
      }
    }
  })
});

const VideoType = new GraphQLObjectType({
  name: 'Video',
  fields: {
    createdAt: { type: GraphQLString },
    modifiedAt: { type: GraphQLString },
    id: { type: GraphQLString },
    name: { type: GraphQLString },
    price: { type: GraphQLString },
    description: { type: GraphQLString },
    genre: { 
      type: GenreType,
      async resolve(parentValue, args){
        const response = await axios.get(`http://localhost:3000/genres/${parentValue.genreId}`);
        return response.data;
      }
    },
    director: { 
      type: DirectorType,
      async resolve(parentValue, args){
        const response = await axios.get(`http://localhost:3000/directors/${parentValue.directorId}`);
        return response.data;
      }
    }
  }
})
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    video : {
      type: VideoType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args){
        const response = await axios.get(`http://localhost:3000/videos/${args.id}`);
        return response.data;
      }
    },
    videos: {
      type: new GraphQLList(VideoType),
      async resolve(){
        const response = await axios.get(`http://localhost:3000/videos`);
        return response.data;
      }
    },
    genre: {
      type: GenreType,
      args: { id: { type: GraphQLString }},
      async resolve(parentValue, args) {
        const response = await axios.get(`http://localhost:3000/genres/${args.id}`);
        return response.data;
      }
    },
    director: {
      type: DirectorType,
      args: { id: { type: GraphQLString } },
      async resolve(parentValue, args){
        const response = await axios.get(`http://localhost:3000/directors/${args.id}`);
        return response.data;
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
})
