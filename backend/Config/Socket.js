const { Server } = require('socket.io');
const { Chess } = require('chess.js');

const frontend_URL = "https://frontend-avzc.onrender.com";
let io;
let rooms = {};
let currentPlayer = "w";

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: frontend_URL,
      methods: ['GET', 'POST'],
      credentials: true
    }
  },{ connectionStateRecovery:{}});

  io.on('connection', (socket) => {
    console.log('A user connected');
    console.log("Id", socket.id);
    
  
    socket.on("Join-Room", (EnterCode, cb) => {
      socket.join(EnterCode);
        
      if (!rooms[EnterCode]) {
        rooms[EnterCode] = {
          white: null,
          black: null,
          spectators: [],
          selectedModels: {},
          chess: new Chess()
        };
      }

      let role;
      if (!rooms[EnterCode].white) {
        rooms[EnterCode].white = socket.id;
        role = 'white';
      } else if (!rooms[EnterCode].black) {
        rooms[EnterCode].black = socket.id;
        role = 'black';
      } else {
        rooms[EnterCode].spectators.push(socket.id);
        role = 'spectator';
        io.to(EnterCode).emit("spectatorCount", rooms[EnterCode].spectators.length);

        const whiteModel = rooms[EnterCode].selectedModels[rooms[EnterCode].white] || null;
        const blackModel = rooms[EnterCode].selectedModels[rooms[EnterCode].black] || null;
        socket.emit("currentGameState", {
          white: { model: whiteModel, role: 'white' },
          black: { model: blackModel, role: 'black' }
        });
      }
      socket.emit("playerRole", role);
      if(role==='spectator'){
        socket.emit('boardState', rooms[EnterCode].chess.fen());
      }
      if (role !== 'spectator') {
        const otherRole = role === 'white' ? 'black' : 'white';
        const otherPlayerId = rooms[EnterCode][otherRole];
        if (otherPlayerId && rooms[EnterCode].selectedModels[otherPlayerId]) {
          socket.emit("receivedMessage", rooms[EnterCode].selectedModels[otherPlayerId], otherRole);
        }
      }

      cb(`${EnterCode} Joined the room. White: ${rooms[EnterCode].white}, Black: ${rooms[EnterCode].black}`);
      console.log(`${EnterCode} Joined the room. White: ${rooms[EnterCode].white}, Black: ${rooms[EnterCode].black}`);
    });

    socket.on("sendMessage", (message, EnterCode, role) => {
      console.log(`Message: ${message} sent to room: ${EnterCode}`);
      rooms[EnterCode].selectedModels[socket.id] = message;
      socket.to(EnterCode).emit("receivedMessage", message, role);
    });

    socket.on("sendBackMessage", (message, EnterCode, role) => {
      console.log(`Back Message: ${message} sent to room: ${EnterCode}`);
      socket.to(EnterCode).emit("receivedBackMessage", message, role);
    });

    socket.on("move", (move, EnterCode) => {
      console.log("Move received:", move);
      try {
        const chess = rooms[EnterCode].chess;
        if (chess.turn() === "w" && socket.id !== rooms[EnterCode].white) {
          console.log("Invalid move: Not white's turn");
          return;
        }
        if (chess.turn() === "b" && socket.id !== rooms[EnterCode].black) {
          console.log("Invalid move: Not black's turn");
          return;
        }
    
        const result = chess.move(move);
        if (result) {
          console.log("Move successful:", result);
          io.to(EnterCode).emit('boardState', chess.fen());
          currentPlayer = chess.turn();
          io.to(EnterCode).emit("turn",currentPlayer);
          io.to(EnterCode).emit("move", move, EnterCode);
          io.to(EnterCode).emit("boardState", chess.fen());
          
        } else {
          console.log("Invalid move:", move);
          socket.emit("Invalid Move", move);
        }
      } catch (err) {
        console.log(err);
        socket.emit("Invalid Move", move);
      }
    });
    
   
   
    socket.on('disconnect', () => {
      console.log('A user disconnected the room');
      for (let room in rooms) {
        if (rooms[room].white === socket.id) {
          rooms[room].white = null;
          rooms[room].chess = new Chess();
          io.to(room).emit('disconnected', 'white',room);
          console.log("player left white");
        } else if (rooms[room].black === socket.id) {
          rooms[room].black = null;
          rooms[room].chess = new Chess();
          io.to(room).emit('disconnected', 'black',room);
          console.log("player left black");
          
        } else {
          const index = rooms[room].spectators.indexOf(socket.id);
          if (index > -1) {
            rooms[room].spectators.splice(index, 1);
            io.to(room).emit("spectatorCount", rooms[room].spectators.length);
          }
        }
      }
    });
    


    
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};

module.exports = {
  initializeSocket,
  getIO
};
