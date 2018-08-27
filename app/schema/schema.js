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
    genres: {
      type: new GraphQLList(GenreType),
      async resolve() {
        const response = await axios.get(`http://localhost:3000/genres`);
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
    },
    directors: {
      type: new GraphQLList(DirectorType),
      async resolve() {
        const response = await axios.get(`http://localhost:3000/directors`);
        return response.data;
      }
    }
  }
})

const mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addVideo: {
      type: VideoType,
      args: {
        price: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        description: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: GraphQLString },
        director: { type: GraphQLString }
      },
      async resolve (parentValue, args) {
        const { price, name, description, genre, director } = args;
        const response = await axios.post(`http://localhost:3000/videos`, {
          price,
          name,
          description,
          directorId: director,
          genreId: genre,
         });
        return response.data;
      }
    },
    deleteVideo: {
      type: VideoType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLString) }, },
      async resolve (parentValue, {id}) {
        const response = await axios.delete(`http://localhost:3000/videos/${id}`);
        return response.data
      }
    },
    updateVideo: {
      type: VideoType,
      args: { 
        id: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: GraphQLString },
        description: { type: GraphQLString},
        price: { type: GraphQLString },
        genre: { type: GraphQLString },
        director: { type: GraphQLString }
        },
      async resolve (parentValue, args) {
        const  {id, name, price, description, genre, director} = args;
        const response = await axios.patch(`http://localhost:3000/videos/${id}`, {
          name,
          description,
          price,
          genreId: genre,
          directorId: director
        });
        return response.data
      }
    },
    addGenre: {
      type: GenreType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString)},
      },
      async resolve (parentValue, { name }) {
        const response = await axios.post(`http://localhost:3000/genres`, { name });
        return response.data;
      }
    },
    deleteGenre: {
      type: GenreType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) }},
      async resolve(parentValue, args) {
        const response = await axios.delete(`http://localhost:3000/genres/${args.id}`);
        return response.data
      }
    },
    addDirector: {
      type: DirectorType,
      args: {
        fullName: { type: new GraphQLNonNull(GraphQLString)}
      },
      async resolve (parentValue, { fullName }) {
        const response = await axios.post(`http://localhost:3000/directors`, { fullName });
        return response.data;
      }
    },
    deleteDirector: {
      type: DirectorType,
      args: { id: { type: new GraphQLNonNull(GraphQLString) }},
      async resolve(parentValue, args) {
        const response = await axios.delete(`http://localhost:3000/directors/${args.id}`);
        return response.data
      }
    }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation,
})
