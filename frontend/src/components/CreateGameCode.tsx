import { Navigation, Copy} from "lucide-react";
import { Button } from "./ui/Magicbutton";
import axios from 'axios';
import { Serverapi } from "@/server";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";

const CreateGameCode = () => {
  const [isCode, setisCode] = useState(false);
  const [code, setCode] = useState("");
  const { toast } = useToast();

  const handleCreateCode = async () => {
    try {
      const GameCode = await axios.get(Serverapi.GameCode.url);
      setCode(GameCode.data); 
      toast({
        title: "Hurry! 😍 Game created!",
        description: (
          <div className="flex flex-row gap-2 text-white">
           Share this code to Your Friends --{GameCode.data}
          </div>
        ),
      });
      console.log(GameCode.data);
      setisCode(true);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(code).then(() => {
      toast({
        title: "Code copied to clipboard!",
        description: `${code}`,
      });
      console.log("Code copied to clipboard!");
    }).catch(err => {
      console.log("Failed to copy the code: ", err);
    });
  };

  return (
    <div>
      {isCode ? (
        <Button>
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center rounded-2xl bg-slate-950 px-4 gap-4 md:justify-between text-base font-medium text-white backdrop-blur-3xl">
            {code}
            <Copy onClick={handleCopyCode} />
          </span>
        </Button>
      ) : (
        <Button onClick={handleCreateCode}>
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-2xl bg-slate-950 px-4 gap-2 text-base font-medium text-white backdrop-blur-3xl">
            Create Code
            <Navigation />
          </span>
        </Button>
      )}
    </div>
  );
};

export default CreateGameCode;
