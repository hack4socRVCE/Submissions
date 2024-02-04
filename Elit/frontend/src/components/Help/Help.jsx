import React, { lazy, useState } from 'react';
import { Button, ButtonGroup } from 'react-bootstrap';  // Make sure you have the correct import statements
  // Adjust the import path based on your project structure


const AiwithText = lazy(()=>import('./components/AiwithText'));
const AiwithImage = lazy(()=>import('./components/AiwithImage'));
const Particle = lazy(()=>import('../Particle'));

const Help = () => {
  const [aiWith, setAiWith] = useState('text');

  const handleAiWith = (value) => {
    setAiWith(value);
  }

  return (
    <div>
      <ButtonGroup
        style={{
          marginTop: '10rem',
          marginLeft: '50%'
        }}
      >
        <Button
          onClick={() => handleAiWith('text')}
          variant={aiWith === 'text' ? 'primary' : 'secondary'}
          style={{marginRight:'1rem',paddingRight:'1.5rem',paddingLeft:'1rem',borderRadius:'0.5rem'}}
        >
          Text
        </Button>

        <Button
          style={{
            borderRadius:'0.5rem',
            padding: '1rem',
          }}
          onClick={() => handleAiWith('image')}
          variant={aiWith === 'image' ? 'primary' : 'secondary'}
        >
          Image
        </Button>
      </ButtonGroup>

      {aiWith === 'text' ? <AiwithText /> : <AiwithImage />}
      <Particle/>
    </div>
  );
};

export default Help;