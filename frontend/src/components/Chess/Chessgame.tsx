import { io, Socket } from "socket.io-client";
import { useEffect, useState } from "react";
import { Serverapi } from "@/server";

import { useParams } from "react-router-dom";
import RenderModel from "./RenderModel";
import { useModel } from '@/components/provider/ModelProvider';
import { Button } from "../ui/Magicbutton";
import RenderBoard from "./RenderBoard";


type DefaultEventsMap = {
  [event: string]: (...args: any[]) => void;
};

const Chessgame = () => {

 
  const { EnterCode } = useParams<{ EnterCode: string }>();
  const { selectedModel } = useModel();
  const [incoming, setIncoming] = useState<string | null>(null);
  const [Currentrole, setCurrentRole] = useState<string>();
  const [opponentRole, setOpponentRole] = useState<string>();
  const [spectatorCount, setSpectatorCount] = useState<number>(0);
  const [playerLeft, setPlayerLeft] = useState<string>();
  const [whiteModel, setWhiteModel] = useState<string | null>(null);
  const [blackModel, setBlackModel] = useState<string | null>(null);
  const [newSocket, setSocket] = useState<Socket<DefaultEventsMap, DefaultEventsMap> | null>(null);

  const [turn , setturn] = useState("w");
  useEffect(() => {
    
    const socket = io(Serverapi.Socket.url);
     setSocket(socket);
     
    socket.on('connect', () => {
      console.log("Hello Connection", socket.id);
     
    });

    socket.emit("Join-Room", EnterCode, (cb: any) => {
      console.log(cb);
    });
    socket.on("playerRole", (role: string) => {
      console.log(`Assigned role: ${role}`);
      setCurrentRole(role);
      
      if (role !== "spectator") {
     
        socket.emit("sendMessage", selectedModel, EnterCode, role);
      }    });

    socket.on("receivedMessage", (message: string, role: string) => {
      console.log(`Received model from ${role}:`, message);
      setIncoming(message);
      setOpponentRole(role);
    
    });
    
    socket.on("receivedBackMessage", (message: string, role: string) => {
      console.log(`Received back model from ${role}:`, message);
      setIncoming(message);
      setOpponentRole(role);
    });

    socket.on("spectatorCount", (count: number) => {
      console.log("Current spectator count:", count);
      setSpectatorCount(count);
    });

    socket.on("disconnected", (player: string) => {
      console.log(`${player} has left the game`);
      setPlayerLeft(`${player} has left the game`);

    });
     
    socket.on("currentGameState", ({ white, black }) => {
      setWhiteModel(white.model);
      setBlackModel(black.model);
    });
     socket.on("turn",(nowturn)=>{
      setturn(nowturn);
     });
    return () => {
      socket.disconnect();
    };
  }, [EnterCode]);
   useEffect(()=>{
    function handlebeforeUnload(e:any){

      e.preventDefault();
      return (e.returnValue='');
    }
    window.addEventListener('beforeunload',handlebeforeUnload)
   })

  return (
    <div className="flex lg:h-[90vh] flex-col gap-4 md:gap-4 h-full  justify-center items-center w-full">
      
      <div className="flex justify-evenly h-full items-center w-full flex-col lg:flex-row">
       
        <div className="flex flex-col items-center gap-6 mt-4 md:mt-0">
          {Currentrole !== "spectator" && (
            <>
              {selectedModel ? <RenderModel model={selectedModel} /> :
              
             
              <h1 className="mt-8">No Character Has been Selected</h1>}
           
              
             
              <h1 className="text-base from-neutral-300 tracking-wider">
                Hurray! 😍 Your Role is {Currentrole}
              </h1>
            </>
          )}
          {Currentrole === "spectator" && whiteModel && (
            <>
              {whiteModel ? <RenderModel model={whiteModel} /> : <h1>No Character Selected by White</h1>}
              <h1 className="text-base from-neutral-300 tracking-wider">
                White Player's Character
              </h1>
            </>
          )}
        </div>
        <div className={`block  bg-transparent min-h-[10rem] min-w-[10rem] sm:min-h-[20rem] sm:min-w-[20rem]  mt-5 md:mt-0
           ${Currentrole === "black" ? `rotate-180` : ``}`}>
        
      <RenderBoard role={Currentrole ? Currentrole :''}  newSocket={newSocket} EnterCode={EnterCode ?  EnterCode :"" }  opponentRole={opponentRole? opponentRole :""}/>
 
          
        </div>
        <div className="flex flex-col items-center gap-6 mt-4 md:mt-0">
          {opponentRole && Currentrole !== "spectator"  && !playerLeft && (
            <>
              {incoming ? <RenderModel model={incoming} /> : <h1>Opposition Team Not Selected any Character</h1>}
              <h1 className="text-base from-neutral-300 tracking-wider">
                Opposition Team Role: {opponentRole}
              </h1>
            </>
          )}
          {Currentrole === "spectator" && blackModel && (
            <>
              {blackModel ? <RenderModel model={blackModel} /> : <h1>No Character Selected by Black</h1>}
              <h1 className="text-base from-neutral-300 tracking-wider">
                Black Player's Character
              </h1>
            </>
          )}
        </div>
      </div>
      <div className=" flex gap-2 text-lg self-center ">
        <h1 className="text-white"> Now Turn Is : </h1>
        <span className={`text-purple`}>
  {turn === "w" ? "White's player" : "Black's player"}
        </span>
       </div>
      <div className="flex flex-col items-center justify-center gap-4">
        <Button className="min-w-20 md:min-w-0 md:w-max">
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-4 gap-2 text-base font-medium text-white backdrop-blur-3xl">
            {spectatorCount} People Watching This Game
          </span>
        </Button>
        {Currentrole === "spectator" && (
          <>
            <h1 className="text-base from-neutral-300 tracking-wider">
              You are Now Watching this Game
            </h1>
          </>
        )}
        {playerLeft  &&(
          <h1 className="text-base from-neutral-300 tracking-wider">
            {playerLeft}
          </h1>
        )}
      </div>
    </div>
  );
};

export default Chessgame;
