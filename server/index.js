const { GraphQLServer } = require('graphql-yoga');
const mongoose = require('mongoose');

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });

// create Todo model
const Todo = mongoose.model('Todo', {
    text: String,
    complete: Boolean
});

// structure
const typeDefs = `
  type Query {
    hello(name: String): String!
    todos: [Todo]
  }
  type Todo {
      id: ID!
      text: String!
      complete: Boolean!
  }
  type Mutation {
      createTodo(text: String!): Todo
      updateTodo(id: ID!, complete: Boolean!): Boolean
      removeTodo(id: ID!): Boolean
  }
`;

// action
const resolvers = {
    Query: {
        hello: (_, { name }) => `Hello ${name || 'World'}`,
        todos: () => Todo.find()
    },
    Mutation: {
        createTodo: async (_, { text }) => {
            // create (pass false as default because the todo is not complete)
            const todo = new Todo({ text, complete: false });
            // save when ready (returns a Promise)
            await todo.save();
            return todo;
        },
        updateTodo: async (_, { id, complete }) => {
            // find by id and change complete
            await Todo.findByIdAndUpdate(id, { complete });
            return true;
        },
        removeTodo: async (_, { id }) => {
            await Todo.findByIdAndRemove(id);
            return true;
        }
    }
}

const server = new GraphQLServer({ typeDefs, resolvers });
// when connect to mongo db
mongoose.connection.once("open", function () {
    // start the server
    server.start(() => console.log('Server is running on localhost:4000')); 
});