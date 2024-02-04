"use client";
import React , {useState} from 'react'
import { Button , Chip , Input } from '@nextui-org/react';
interface FilterProps {
    
}

const Filter: React.FC = () => {
    const [inputText, setInputText] = useState<string>('');
  const [chips, setChips] = useState<string[]>([]);
  const [showInput, setShowInput] = useState<boolean>(false);

  const handleGoClick = () => {
    if (inputText.trim() !== '') {
      setChips([...chips, inputText]);
      setInputText('');
    }
  };

  const handleFilterClick = () => {
    setShowInput(!showInput);
  };

  return (
    <>
    <div>
      <Button onClick={handleFilterClick}>
        {showInput ? 'Hide Filter' : 'Show Filter'}
      </Button>

      {showInput && (
        <div>
          <Input
            placeholder="Type something..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <Button onClick={handleGoClick}>Go</Button>
        </div>
      )}

   
    </div>
    <div style={{ marginTop: '10px' }}>
        {chips.map((chip, index) => (
          <Chip key={index}>{chip}</Chip>
        ))}
      </div>
    </>
  )
}

export default Filter
