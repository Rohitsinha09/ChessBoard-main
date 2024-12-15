import { useNavigate } from "react-router-dom";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import ThreeModel from "./3DModel/ThreeModel";
import { Button } from "./ui/Magicbutton";
import { Input } from "./ui/input";
import ChooseCharacter from "./3DModel/ChooseCharacter"
import {  useState } from "react";
import CreateGameCode from "./CreateGameCode";
import { Serverapi } from "@/server";
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { SendHorizontal } from 'lucide-react';

const Hero = () => {
    
  const [chooseChar , setChooseChar] =  useState(false);
 const [EnterCode,setEnterCode] = useState("");
 const navigate = useNavigate();
 const { toast } = useToast()
 const handleInput= (e:any) =>{
  console.log(e.target.value);
     setEnterCode(e.target.value);
    
 }

 const handleData = async ()=>{
  try{
    const is_GameCreated = await axios.get(`${Serverapi.ValidGameCode.url}/${EnterCode}`);
    console.log("res", is_GameCreated);
    navigate(`/Start-ChessGame/${EnterCode}`);
  }
  catch(err){
    if (axios.isAxiosError(err)) {
      console.log('Axios error', err.response?.data);
      toast({
        variant: "destructive",
        title: "Error",
        description: err.response?.data.message,
        action: <ToastAction altText="Try again">Try again</ToastAction>
     })
    } else {
      console.log('Unexpected error', err);
    }
  }
 
 }
 const handleSend = async(e:any)=>{
  if(e.key=="Enter" &&  EnterCode){
    handleData()
  }
 }
  const handleChooseCharacter =()=>{
    setChooseChar(prev => !prev);
  }
  return (
      <div className=" max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
        {
          chooseChar ?  <ChooseCharacter/> : <ThreeModel/>

        }
      
      <div className=" flex flex-row  mt-2 items-center  gap-4">
      <h1 className="uppercase 
      tracking-widest  text-sm text-center text-white-200 ">Checkmate in Pixels</h1>
       <Button className=" md:min-w-44" onClick={handleChooseCharacter}>
     <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
     <span className={`inline-flex  h-full  w-full cursor-pointer items-center justify-center  rounded-2xl bg-slate-950 px-4   gap-2 text-base font-medium text-white backdrop-blur-3xl`}>
     {chooseChar ? "Show 3D Models" : "Pick Your Favorite"}
      </span>
      </Button>
      </div>
      
      <TextGenerateEffect className=" text-center text-[40px] md:text-5xl ld:text-6xl"
      words="Transforming chess into a seamless online experience"/>
      <p className="text-center  md:tracking-wider mb-4 text-sm md:text-xl lg:text-2xl">
        Hii There, Welcome To Online ChessBoard Game !
      </p>
      <div className="flex flex-col md:flex-row items-center gap-4">
     <CreateGameCode/>
     <div className="flex  h-14  rounded-2xl flex-row   justify-end items-center">
    <Input  onChangeCapture={handleInput} value={EnterCode} onKeyDown={handleSend}
    placeholder="Enter room Code" className=" text-base  text-purple md:mt-2">
    </Input>
    <SendHorizontal className=" hover:text-neutral-500 mr-2 mt-2 absolute"  onClick={handleData}/>
    </div>
   
    </div>
    <h1 className="uppercase 
      tracking-widest  text-sm text-center text-white-200 md:mt-7  mt-5">Share the Code With Your Friends 😅</h1>
      </div>
   
  )
}

export default Hero