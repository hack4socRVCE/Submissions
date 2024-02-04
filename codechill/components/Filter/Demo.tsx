// Demo.tsx
import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { Button, Chip, Input } from '@nextui-org/react';
import { FaFilter } from "react-icons/fa6";
import { useChipsStore } from "@/store/useChipsStore";
interface DemoProps {
 
  chips: string[];
}

const Demo: React.FC<DemoProps> = () => {
  const [inputText, setInputText] = useState<string>('');
  const addChip = useChipsStore((state) => state.addChip);
  const [showInput, setShowInput] = useState<boolean>(false);

   const handleGoClick = () => {
    if (inputText.trim() !== '') {
      addChip(inputText);
      setInputText('');
    }
  };
  return (
    <>
      <Popover>
        <PopoverTrigger className="text-xl text-white"><FaFilter color="black "  size={30}/></PopoverTrigger>
        <PopoverContent>
          <div className="pt-4 flex gap-4">
            <Input
              label="Type something..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}

            />
            <div className="pt-2">
            <Button className="hover:bg-[#BA7969] bg-white" onClick={handleGoClick}>Add</Button>
          </div>
          </div>
        </PopoverContent>
      </Popover>

      
    </>
  );
};

export default Demo;
