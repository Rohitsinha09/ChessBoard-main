import { useEffect, useState } from "react";
import { Chess, Square } from "chess.js";
import { Unicodes } from "@/server/unicodes";
import { Socket } from "socket.io-client";
import { useToast } from "@/components/ui/use-toast";

type DefaultEventsMap = {
  [event: string]: (...args: any[]) => void;
};

interface RenderBoardProps {
  role: string;
  newSocket: Socket<DefaultEventsMap, DefaultEventsMap> | null;
  EnterCode: string;
  opponentRole: string;
}

const RenderBoard: React.FC<RenderBoardProps> = ({ role, newSocket, EnterCode, opponentRole }) => {
  const [chess, setChess] = useState(new Chess());
  const { toast } = useToast();
  const [selectedPiece, setSelectedPiece] = useState<{ row: number; col: number } | null>(null);
  const [validMoves, setValidMoves] = useState<string[]>([]);
  const [lastMove, setLastMove] = useState<{ from: string; to: string } | null>(null);
  const [color, setColor] = useState("#f97316");
  const moveSound = new Audio("/Move.mp3");
  const capturedSound = new Audio("/Checkmate.wav");
  const winSound = new Audio('/Win.wav');
  useEffect(() => {
    if (newSocket) {
      newSocket.emit("boardState", EnterCode);
      
      newSocket.on("boardState", (fen) => {
        console.log("Board state received:", fen);
        const newChess = new Chess(fen);
        setChess(newChess);
      });

      newSocket.on("move", (move) => {
        const newChess = new Chess(chess.fen());
        newChess.move(move);
        setChess(newChess);
        setLastMove({ from: move.from, to: move.to });
        checkGameStatus(newChess);
      });
    }

    return () => {
      if (newSocket) {
        newSocket.off("boardState");
        newSocket.off("move");
      }
    };
  }, [newSocket, EnterCode, opponentRole,lastMove]);

  const checkGameStatus = (game: any) => {
    if (game.in_checkmate()) {
      winSound.play();
      toast({
        title: "Game Over",
        description: `${game.turn() === 'w' ? 'Black' : 'White'} wins by checkmate!`,
      });
    } else if (game.in_stalemate()) {
      winSound.play();
      toast({
        title: "Game Over",
        description: "The game is a stalemate!",
      });
    } else if (game.in_draw()) {
      winSound.play();
      toast({
        title: "Game Over",
        description: "The game is a draw!",
      });
    } else if (game.insufficient_material()) {
      winSound.play();
      toast({
        title: "Game Over",
        description: "Draw due to insufficient material!",
      });
    } else if (game.in_threefold_repetition()) {
      winSound.play();
      toast({
        title: "Game Over",
        description: "Draw by threefold repetition!",
      });
    } else if (game.in_fifty_moves()) {
      winSound.play();
      toast({
        title: "Game Over",
        description: "Draw by fifty-move rule!",
      });
    }
  };

  const handlePieceClick = (row: number, col: number) => {
    if (role === "spectator") {
      return toast({
        title: "😒 Sorry!",
        description: <div className="flex flex-row gap-2 text-white">You are not Playing This Game!</div>
      });
    }
    if (!opponentRole) {
      return toast({
        title: "OOps! 🤐",
        description: <div className="flex flex-row gap-2 text-white">Other Team Haven't Started the Game</div>
      });
    }
    const piece = chess.board()[row][col];
    if (piece && piece.color === role.charAt(0)) {
      setSelectedPiece({ row, col });
      const square = `${String.fromCharCode(97 + col)}${8 - row}` as Square;
      const moves = chess.moves({ square, verbose: true });
      setValidMoves(moves.map((move) => move.to));
      
    } else if (selectedPiece) {
      handleMove(row, col);
    }
  };

  useEffect(()=>{
    console.log("validMoves",validMoves);
  },[validMoves]);
  const handleMove = (row: number, col: number) => {
    if (selectedPiece) {
      const source = { row: selectedPiece.row, col: selectedPiece.col };
      const target = { row, col };
      const move = {
        from: String.fromCharCode(97 + source.col) + (8 - source.row) as Square,
        to: String.fromCharCode(97 + target.col) + (8 - target.row) as Square,
        promotion: "q" // Always promote to queen for simplicity
      };

      const moveResult = chess.move(move);
      console.log("moveResult",moveResult);
      if (moveResult) {
        if (moveResult.captured) {
          capturedSound.play();
        } else {
          moveSound.play();
        }
        if (newSocket) {
          newSocket.emit("move", move, EnterCode);
        }

        setSelectedPiece(null);
        setValidMoves([]);
        setLastMove({ from: move.from, to: move.to });
        checkGameStatus(chess);
      }
    }
  };
  

const handleColor = (e: React.ChangeEvent<HTMLInputElement>) => {
  setColor(e.target.value);
}
//

  const board = chess.board();
  console.log("Board",board);

  return (
    <>
    <div className={` ${
                    role === "black" ? "-rotate-180  flex justify-center flex-row gap-2 items-center  mb-5" : " hidden"  }`}>
      <div className="flex rounded-full h-10 w-10  overflow-hidden "> <input type="color" value={color} className="h-full w-full  scale-150" 
      onChange={handleColor}></input></div>
      <h1 className="  text-xl font-semibold">Pick Your Color</h1>
      </div>
    
      {board.map((row, rowIndex) => (
       
        <div key={rowIndex} className="flex">
          {row.map((square, squareIndex) => {
            const isLightSquare = (rowIndex + squareIndex) % 2 === 0;
            const squareStyle = isLightSquare ? { backgroundColor: "#FBF5DE" } : { backgroundColor: color } ;
            // const squareStyle = isLightSquare ? "bg-light-200" : "bg-orange-500";
            const type = square?.color === "w" ? square?.type : square?.type.toUpperCase();
            //P 
            const piece = type ? Unicodes[type] : null;
            const squarePosition = `${String.fromCharCode(97 + squareIndex)}${8 - rowIndex}`; 
            const isValidMove = validMoves.includes(squarePosition);
            console.log("isValidMove",isValidMove);
            const isLastMoveFrom = lastMove?.from === squarePosition;
            const isLastMoveTo = lastMove?.to === squarePosition;

            return (
              
              <div
                key={squareIndex}
                className={` w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center ${
                  isValidMove ? "validMoves border-[0.2px] border-slate-50 !important"  : ""
                } ${isLastMoveFrom || isLastMoveTo && !isValidMove? "lastMove  border-[0.1px]  border-stone-50 !important" : ""}`}
               style={squareStyle}
              
                onClick={() => handlePieceClick(rowIndex, squareIndex)}
              >
                {piece && (
                  <span
                    className={`text-4xl font-bold ${square?.color === "w" ? "text-white" : "text-black-100"} ${
                      role === "black" ? "rotate-180" : ""
                    } ${square?.color === role.charAt(0) ? "hover:cursor-pointer" : ""}`}
                  >
                    {piece}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      ))}
      <div className={` ${
                    role === "black" ? " hidden" : "  flex justify-center flex-row gap-2 items-center mt-5"  }`}>
      <div className="flex rounded-full h-10 w-10  overflow-hidden "> 
        <input type="color" value={color} className="h-full w-full  scale-150" 
      onChange={handleColor}></input></div>
      <h1 className="  text-xl font-semibold">Pick Your Color</h1>
      </div>
    </>
  );
};

export default RenderBoard;
