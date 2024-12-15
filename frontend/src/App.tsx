import Hero from "./components/Hero"
import { ThemeProvider } from "@/components/provider/theme-provider"
import { ModelProvider } from '@/components/provider/ModelProvider';
import { Toaster } from "./components/ui/toaster";
import HomeLayout from "./components/HomeLayout";
import { Route, Routes } from "react-router-dom";
import  Chess  from "./components/Chess/Chessgame";

function App() {

return (
  <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
    <ModelProvider>
    <main className="relative bg-black-100 flex justify-center items-center flex-col overflow-hidden mx-auto sm:px-10 px-5">
        
    <Routes>
      <Route element={<HomeLayout/>}>
      <Route index element={<Hero/>}/> 
      <Route path="/Start-ChessGame/:EnterCode" element={<Chess/>}/>
      </Route>
    </Routes>
    </main>
    <Toaster />
    </ModelProvider>
    </ThemeProvider>
  )
}

export default App
