import React, { useState, useEffect } from 'react';
import { LeftArrow, RightArrow } from './arrowSvg'


type ObjectTpe = { label: string, colour: string, direction: string }

const objectsArray: ObjectTpe[] = [
  { label: "A", colour: "bg-blue-500", direction: "left" },
  { label: "B", colour: "bg-green-500", direction: "right" },
  { label: "C", colour: "bg-yellow-500", direction: "left" },
  { label: "D", colour: "bg-purple-500", direction: "right" },
  { label: "E", colour: "bg-pink-500", direction: "left" },
  { label: "F", colour: "bg-indigo-500", direction: "right" },
  { label: "G", colour: "bg-gray-500", direction: "left" },
  { label: "H", colour: "bg-teal-500", direction: "right" },
  { label: "I", colour: "bg-orange-500", direction: "left" },
  { label: "J", colour: "bg-lime-500", direction: "right" },
  { label: "K", colour: "bg-amber-500", direction: "left" },
  { label: "L", colour: "bg-emerald-500", direction: "right" },
  { label: "M", colour: "bg-cyan-500", direction: "left" },
  { label: "N", colour: "bg-fuchsia-500", direction: "right" },
  { label: "O", colour: "bg-rose-500", direction: "left" },
  { label: "P", colour: "bg-violet-500", direction: "right" },
  { label: "Q", colour: "bg-sky-500", direction: "left" },
  { label: "R", colour: "bg-slate-500", direction: "right" },
  { label: "S", colour: "bg-zinc-500", direction: "left" },
  { label: "T", colour: "bg-neutral-500", direction: "right" },
  { label: "U", colour: "bg-stone-500", direction: "left" },
  { label: "V", colour: "bg-red-500", direction: "right" },
  { label: "W", colour: "bg-blue-500", direction: "left" },
  { label: "X", colour: "bg-green-500", direction: "right" },
  { label: "Y", colour: "bg-yellow-500", direction: "left" },
  { label: "Z", colour: "bg-red-500", direction: "right" }
];

const tamilAlphabetArray = [
  { label: "அ", colour: "bg-red-500", direction: "left" },
  { label: "ஆ", colour: "bg-blue-500", direction: "right" },
  { label: "இ", colour: "bg-green-500", direction: "left" },
  { label: "ஈ", colour: "bg-yellow-500", direction: "right" },
  { label: "உ", colour: "bg-purple-500", direction: "left" },
  { label: "ஊ", colour: "bg-pink-500", direction: "right" },
  { label: "எ", colour: "bg-indigo-500", direction: "left" },
  { label: "ஏ", colour: "bg-gray-500", direction: "right" },
  { label: "ஐ", colour: "bg-teal-500", direction: "left" },
  { label: "ஒ", colour: "bg-orange-500", direction: "right" },
  { label: "ஓ", colour: "bg-lime-500", direction: "left" },
  { label: "ஔ", colour: "bg-amber-500", direction: "right" }
];


function App() {
  const [direction, setDirection] = useState(true);
  const [objectList, _setObjectList] = useState<ObjectTpe[]>(tamilAlphabetArray)
  const [currentObject, setCurrentObject] = useState<ObjectTpe | null>(null);
  const [usedObject, setUsedObject] = useState<ObjectTpe[]>([]);
  const [isStopped, setIsStopped] = useState(true)
  const [intervalId, setIntervalId] = useState<any>()
  const [buttonLabel, setButtonLabel] = useState("START")


  useEffect(() => {
    if (!isStopped) {
      const intervalId = setInterval(() => {
        setDirection(!direction);
        setCurrentObject(getRandomAlphabet());
      }, 3000);
      setIntervalId(intervalId)
      return () => clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [direction, isStopped]);

  const getRandomAlphabet = (): ObjectTpe | null => {
    const randomObject = objectList[Math.floor(Math.random() * objectList.length)];
    if (objectList.length === usedObject.length) {
      setIsStopped(true)
      clearInterval(intervalId)
      setButtonLabel('RESTART')
      console.log('used object', usedObject.length)
      setTimeout(() => setUsedObject([]), 2000)
      return null
    }
    if (usedObject.includes(randomObject) || currentObject?.direction === randomObject.direction) {
      return getRandomAlphabet();
    } else {
      setUsedObject([...usedObject, randomObject]);
      return randomObject;
    }
  };

  return (
    <div className="h-screen bg-gray-100 flex justify-center items-center flex-col">
      <div className={`text-6xl`}>
        {currentObject?.direction === 'left' ? (
          <LeftArrow />
        ) : (
          <RightArrow />
        )}

      </div>
      {currentObject === null && (
        <button
          className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
          onClick={() => setIsStopped(false)}
        >
          {buttonLabel}
        </button>
      )}
      {
        currentObject?.label !== 'END' && <div className={`text-9xl scale-150 mt-4`}>{currentObject?.label}</div>
      }

    </div>
  );
}

export default App;