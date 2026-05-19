import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCw, CheckCircle2, Clock, Trophy, ChevronRight, RefreshCcw, Hand } from 'lucide-react';

// --- DATA ---
const wordLists = {
  'Year 1': {
    1: ['the', 'a', 'do', 'to', 'today', 'of', 'said', 'says', 'are', 'were', 'was', 'is', 'his', 'has', 'I'],
    2: ['you', 'your', 'they', 'be', 'he', 'me', 'she', 'we', 'no', 'go', 'so', 'by', 'my', 'here', 'there'],
    3: ['where', 'love', 'come', 'some', 'one', 'once', 'ask', 'friend', 'school', 'put', 'push', 'pull', 'full', 'house', 'our'],
    4: ['door', 'floor', 'poor', 'because', 'find', 'kind', 'mind', 'behind', 'child', 'children', 'wild', 'climb', 'most', 'only', 'both'],
    5: ['old', 'cold', 'gold', 'hold', 'told', 'every', 'everybody', 'even', 'great', 'break', 'steak', 'pretty', 'beautiful', 'after', 'fast'],
    6: ['last', 'past', 'father', 'class', 'grass', 'pass', 'plant', 'path', 'bath', 'hour', 'move', 'prove', 'improve', 'sure', 'sugar'],
    7: ['eye', 'could', 'should', 'would', 'who', 'whole', 'any', 'many', 'clothes', 'busy', 'people', 'water', 'again', 'half', 'money'],
    8: ['Mr', 'Mrs', 'parents', 'Christmas', 'everybody', 'even', 'great', 'break', 'steak', 'pretty', 'beautiful', 'after', 'fast', 'last', 'past']
  },
  'Year 2': {
    1: ['door', 'floor', 'poor', 'because', 'find', 'kind', 'mind', 'behind', 'child', 'children', 'wild', 'climb', 'most', 'only', 'both'],
    2: ['old', 'cold', 'gold', 'hold', 'told', 'every', 'everybody', 'even', 'great', 'break', 'steak', 'pretty', 'beautiful', 'after', 'fast'],
    3: ['last', 'past', 'father', 'class', 'grass', 'pass', 'plant', 'path', 'bath', 'hour', 'move', 'prove', 'improve', 'sure', 'sugar'],
    4: ['eye', 'could', 'should', 'would', 'who', 'whole', 'any', 'many', 'clothes', 'busy', 'people', 'water', 'again', 'half', 'money'],
    5: ['Mr', 'Mrs', 'parents', 'Christmas', 'everybody', 'even', 'great', 'break', 'steak', 'pretty', 'beautiful', 'after', 'fast', 'last', 'past'],
    6: ['father', 'class', 'grass', 'pass', 'plant', 'path', 'bath', 'hour', 'move', 'prove', 'improve', 'sure', 'sugar', 'eye', 'could'],
    7: ['should', 'would', 'who', 'whole', 'any', 'many', 'clothes', 'busy', 'people', 'water', 'again', 'half', 'money', 'Mr', 'Mrs'],
    8: ['parents', 'Christmas', 'everybody', 'even', 'great', 'break', 'steak', 'pretty', 'beautiful', 'after', 'fast', 'last', 'past', 'father', 'class']
  },
  'Year 3/4': {
    1: ['accident', 'accidentally', 'actual', 'actually', 'address', 'answer', 'appear', 'arrive', 'believe', 'bicycle', 'breath', 'breathe', 'build', 'busy', 'business'],
    2: ['calendar', 'caught', 'centre', 'century', 'certain', 'circle', 'complete', 'consider', 'continue', 'decide', 'describe', 'different', 'difficult', 'disappear', 'early'],
    3: ['earth', 'eight', 'eighth', 'enough', 'exercise', 'experience', 'experiment', 'extreme', 'famous', 'favourite', 'February', 'forward', 'forwards', 'fruit', 'grammar'],
    4: ['group', 'guard', 'guide', 'heard', 'heart', 'height', 'history', 'imagine', 'increase', 'important', 'interest', 'island', 'knowledge', 'learn', 'length'],
    5: ['library', 'material', 'medicine', 'mention', 'minute', 'natural', 'naughty', 'notice', 'occasion', 'occasionally', 'often', 'opposite', 'ordinary', 'particular', 'peculiar'],
    6: ['perhaps', 'popular', 'position', 'possess', 'possession', 'possible', 'potatoes', 'pressure', 'probably', 'promise', 'purpose', 'quarter', 'question', 'recent', 'regular'],
    7: ['reign', 'remember', 'sentence', 'separate', 'special', 'straight', 'strange', 'strength', 'suppose', 'surprise', 'therefore', 'though', 'although', 'thought', 'through'],
    8: ['various', 'weight', 'woman', 'women', 'accident', 'actual', 'address', 'answer', 'appear', 'arrive', 'believe', 'bicycle', 'breath', 'build', 'busy']
  },
  'Year 5/6': {
    1: ['accommodate', 'accompany', 'according', 'achieve', 'aggressive', 'amateur', 'ancient', 'apparent', 'appreciate', 'attached', 'available', 'average', 'awkward', 'bargain', 'bruise'],
    2: ['category', 'cemetery', 'committee', 'communicate', 'community', 'competition', 'conscience', 'conscious', 'controversy', 'convenience', 'correspond', 'criticise', 'curiosity', 'definite', 'desperate'],
    3: ['determined', 'develop', 'dictionary', 'disastrous', 'embarrass', 'environment', 'equip', 'equipped', 'equipment', 'especially', 'exaggerate', 'excellent', 'existence', 'explanation', 'familiar'],
    4: ['foreign', 'forty', 'frequently', 'government', 'guarantee', 'harass', 'hindrance', 'identity', 'immediate', 'immediately', 'individual', 'interfere', 'interrupt', 'language', 'leisure'],
    5: ['lightning', 'marvellous', 'mischievous', 'muscle', 'necessary', 'neighbour', 'nuisance', 'occupy', 'occur', 'opportunity', 'parliament', 'persuade', 'physical', 'prejudice', 'privilege'],
    6: ['profession', 'programme', 'pronunciation', 'queue', 'recognise', 'recommend', 'relevant', 'restaurant', 'rhyme', 'rhythm', 'sacrifice', 'secretary', 'shoulder', 'signature', 'sincere'],
    7: ['sincerely', 'soldier', 'stomach', 'sufficient', 'suggest', 'symbol', 'system', 'temperature', 'thorough', 'twelfth', 'variety', 'vegetable', 'vehicle', 'yacht', 'accommodate'],
    8: ['accompany', 'according', 'achieve', 'aggressive', 'amateur', 'ancient', 'apparent', 'appreciate', 'attached', 'available', 'average', 'awkward', 'bargain', 'bruise', 'category']
  }
};

const fakeNames = ["Oliver", "Amelia", "Harry", "Isla", "Jack", "Ava", "Charlie", "Mia", "Thomas"];

const getContextSentence = (word) => {
  return `Can you spell the word "${word}"?`;
};

function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }
  return array;
}

export default function App() {
  const [phase, setPhase] = useState('config'); // 'config', 'spin', 'game', 'leaderboard'
  
  // Config State
  const [yearGroup, setYearGroup] = useState('Year 1');
  const [selectedSet, setSelectedSet] = useState(1);
  const [customWordsInput, setCustomWordsInput] = useState('');
  const [wordCount, setWordCount] = useState(10);
  const [isTimed, setIsTimed] = useState(false);

  // Game State
  const [activeWords, setActiveWords] = useState([]);
  
  // Spin State
  const [spinWords, setSpinWords] = useState([]);
  const [isSpinning, setIsSpinning] = useState(false);
  const [spinRotation, setSpinRotation] = useState(0);
  const [selectedSpinWord, setSelectedSpinWord] = useState(null);
  
  // Spelling Game State
  const [gameWordIndex, setGameWordIndex] = useState(0);
  const [gameTime, setGameTime] = useState(0);
  
  // Leaderboard State
  const [playerName, setPlayerName] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);

  // Timer Ref
  const timerRef = useRef(null);

  useEffect(() => {
    if (phase === 'game' && isTimed) {
      timerRef.current = setInterval(() => {
        setGameTime(prev => prev + 1);
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, isTimed]);

  const handlePlay = () => {
    let wordsToUse = [];
    if (yearGroup === 'Custom') {
      wordsToUse = customWordsInput.split(',').map(w => w.trim()).filter(w => w.length > 0);
      if (wordsToUse.length === 0) {
        alert("Please enter some custom words separated by commas.");
        return;
      }
    } else {
      wordsToUse = wordLists[yearGroup][selectedSet] || [];
    }
    
    // Shuffle and pick wordCount words
    const shuffled = shuffle([...wordsToUse]);
    const selectedWords = shuffled.slice(0, Math.min(wordCount, shuffled.length)).map(word => ({
      word,
      sentence: getContextSentence(word)
    }));

    if (selectedWords.length === 0) return;

    setActiveWords(selectedWords);
    setSpinWords([...selectedWords]);
    setGameTime(0);
    setGameWordIndex(0);
    setPhase('spin');
  };

  const handleSpin = () => {
    if (isSpinning || spinWords.length === 0) return;
    setIsSpinning(true);
    setSelectedSpinWord(null);
    
    const extraSpins = 3 * 360; // 3 full extra rotations
    const randomSegment = Math.floor(Math.random() * spinWords.length);
    const segmentAngle = 360 / spinWords.length;
    // Calculate rotation so that the chosen segment ends up at the top (270 degrees on a standard circle, but here we can just align it)
    const targetRotation = spinRotation + extraSpins + (360 - (randomSegment * segmentAngle));
    
    setSpinRotation(targetRotation);
    
    setTimeout(() => {
      setIsSpinning(false);
      setSelectedSpinWord(spinWords[randomSegment]);
    }, 3000); // 3 seconds for animation
  };

  const handleUnderstand = () => {
    const newSpinWords = spinWords.filter(w => w.word !== selectedSpinWord.word);
    setSelectedSpinWord(null);
    
    if (newSpinWords.length === 0) {
      setPhase('game');
    } else {
      setSpinWords(newSpinWords);
    }
  };

  const handleGameComplete = () => {
    setPhase('leaderboard');
    // Generate fake leaderboard
    const generated = fakeNames.map(name => ({
      name,
      time: Math.floor(Math.random() * 120) + 30 // random time between 30 and 150 seconds
    }));
    
    setLeaderboard(generated.sort((a, b) => a.time - b.time));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 font-sans text-gray-800 flex flex-col items-center p-4 sm:p-8">
      {/* Header */}
      <header className="w-full max-w-4xl flex justify-between items-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 tracking-tight flex items-center gap-2">
          <RotateCw className="text-blue-500" size={36} />
          Spelling App
        </h1>
        {phase !== 'config' && (
          <button 
            onClick={() => setPhase('config')}
            className="flex items-center gap-2 text-sm font-semibold text-gray-500 hover:text-gray-700 transition-colors"
          >
            <RefreshCcw size={16} /> Start Over
          </button>
        )}
      </header>

      {/* Main Content Area */}
      <main className="w-full max-w-4xl flex-1 flex flex-col items-center justify-center">
        {phase === 'config' && (
          <ConfigPhase 
            yearGroup={yearGroup} setYearGroup={setYearGroup}
            selectedSet={selectedSet} setSelectedSet={setSelectedSet}
            customWordsInput={customWordsInput} setCustomWordsInput={setCustomWordsInput}
            wordCount={wordCount} setWordCount={setWordCount}
            isTimed={isTimed} setIsTimed={setIsTimed}
            onPlay={handlePlay}
          />
        )}
        
        {phase === 'spin' && (
          <SpinPhase 
            spinWords={spinWords} 
            isSpinning={isSpinning}
            spinRotation={spinRotation}
            selectedSpinWord={selectedSpinWord}
            onSpin={handleSpin}
            onUnderstand={handleUnderstand}
          />
        )}

        {phase === 'game' && (
          <GamePhase 
            activeWords={activeWords}
            gameWordIndex={gameWordIndex}
            setGameWordIndex={setGameWordIndex}
            isTimed={isTimed}
            gameTime={gameTime}
            onComplete={handleGameComplete}
          />
        )}

        {phase === 'leaderboard' && (
          <LeaderboardPhase 
            leaderboard={leaderboard}
            playerName={playerName}
            setPlayerName={setPlayerName}
            gameTime={gameTime}
            isTimed={isTimed}
            onPlayAgain={() => setPhase('config')}
          />
        )}
      </main>
    </div>
  );
}

// --- PHASE 1: CONFIGURATION MENU ---
function ConfigPhase({ 
  yearGroup, setYearGroup, selectedSet, setSelectedSet, 
  customWordsInput, setCustomWordsInput, wordCount, setWordCount, 
  isTimed, setIsTimed, onPlay 
}) {
  const tabs = ['Year 1', 'Year 2', 'Year 3/4', 'Year 5/6', 'Custom'];
  const sets = [1, 2, 3, 4, 5, 6, 7, 8];

  return (
    <div className="w-full bg-white/70 backdrop-blur-md shadow-xl rounded-3xl p-6 md:p-10 flex flex-col gap-8 border border-white/50">
      
      {/* Year Group Tabs */}
      <div className="flex flex-wrap gap-2 justify-center">
        {tabs.map(tab => (
          <button
            key={tab}
            onClick={() => setYearGroup(tab)}
            className={`px-5 py-3 rounded-xl font-bold text-lg transition-all duration-300 shadow-sm ${
              yearGroup === tab 
                ? 'bg-blue-500 text-white shadow-blue-500/30 scale-105' 
                : 'bg-white text-gray-600 hover:bg-blue-50 hover:text-blue-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Set Selection / Custom Input */}
      <div className="flex flex-col items-center bg-blue-50/50 p-6 rounded-2xl">
        <h2 className="text-xl font-bold text-gray-700 mb-4">
          {yearGroup === 'Custom' ? 'Enter Custom Words' : 'Select a Spelling Set'}
        </h2>
        
        {yearGroup === 'Custom' ? (
          <textarea 
            className="w-full max-w-2xl h-32 p-4 rounded-xl border-2 border-blue-200 focus:border-blue-400 focus:ring focus:ring-blue-200 focus:outline-none transition-all resize-none shadow-inner"
            placeholder="e.g. apple, banana, orange..."
            value={customWordsInput}
            onChange={(e) => setCustomWordsInput(e.target.value)}
          />
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full max-w-2xl">
            {sets.map(set => (
              <button
                key={set}
                onClick={() => setSelectedSet(set)}
                className={`py-4 rounded-2xl font-bold text-lg transition-all duration-300 border-2 ${
                  selectedSet === set 
                    ? 'border-green-500 bg-green-500 text-white shadow-lg shadow-green-500/40 scale-105' 
                    : 'border-transparent bg-white text-gray-600 hover:border-green-300 hover:shadow-md'
                }`}
              >
                Set {set}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Settings */}
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        <div className="flex flex-col items-center gap-2">
          <label className="font-bold text-gray-600 text-sm uppercase tracking-wider">Words per game</label>
          <div className="flex items-center gap-4 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
            <button 
              onClick={() => setWordCount(Math.max(1, wordCount - 1))}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 font-bold text-gray-600 transition-colors"
            >-</button>
            <span className="text-xl font-bold w-6 text-center text-blue-600">{wordCount}</span>
            <button 
              onClick={() => setWordCount(Math.min(15, wordCount + 1))}
              className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full hover:bg-gray-200 font-bold text-gray-600 transition-colors"
            >+</button>
          </div>
        </div>

        <div className="flex flex-col items-center gap-2">
          <label className="font-bold text-gray-600 text-sm uppercase tracking-wider">Timed Mode</label>
          <button 
            onClick={() => setIsTimed(!isTimed)}
            className={`relative w-16 h-8 rounded-full transition-colors duration-300 shadow-inner ${isTimed ? 'bg-green-500' : 'bg-gray-300'}`}
          >
            <div className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform duration-300 ${isTimed ? 'left-9' : 'left-1'}`}></div>
          </button>
        </div>
      </div>

      {/* Play Button */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={onPlay}
          className="group relative flex items-center gap-3 bg-gradient-to-r from-blue-500 to-green-400 text-white px-10 py-5 rounded-full font-extrabold text-2xl shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 overflow-hidden"
        >
          <div className="absolute inset-0 bg-white/20 w-full transform -skew-x-12 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          <Play size={28} fill="currentColor" />
          LET'S PLAY!
        </button>
      </div>

    </div>
  );
}

// --- PHASE 2: SPIN & SAY ---
function SpinPhase({ spinWords, isSpinning, spinRotation, selectedSpinWord, onSpin, onUnderstand }) {
  const numSegments = spinWords.length;
  
  // Colors for segments
  const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#14b8a6', '#f43f5e', '#84cc16'];

  const getCoordinatesForPercent = (percent) => {
    const x = Math.cos(2 * Math.PI * percent) * 100;
    const y = Math.sin(2 * Math.PI * percent) * 100;
    return [x, y];
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 animate-in fade-in zoom-in duration-500">
      
      {!selectedSpinWord ? (
        <>
          <h2 className="text-2xl font-bold text-gray-700 mb-2">Spin the Wheel!</h2>
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 drop-shadow-2xl">
            {/* Pointer */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[30px] border-t-gray-800 z-10 drop-shadow-md"></div>
            
            {/* Wheel */}
            <div 
              className="w-full h-full rounded-full overflow-hidden border-8 border-white shadow-inner bg-gray-100"
              style={{ 
                transform: `rotate(${spinRotation}deg)`, 
                transition: isSpinning ? 'transform 3s cubic-bezier(0.25, 0.1, 0.15, 1)' : 'none'
              }}
            >
              <svg viewBox="-100 -100 200 200" className="w-full h-full transform -rotate-90">
                {numSegments === 1 ? (
                  <circle cx="0" cy="0" r="100" fill={colors[0]} />
                ) : (
                  spinWords.map((wordObj, i) => {
                    const startPercent = i / numSegments;
                    const endPercent = (i + 1) / numSegments;
                    const [startX, startY] = getCoordinatesForPercent(startPercent);
                    const [endX, endY] = getCoordinatesForPercent(endPercent);
                    
                    // If segment is > 50%, large arc flag is 1
                    const largeArcFlag = endPercent - startPercent > 0.5 ? 1 : 0;
                    const pathData = [
                      `M 0 0`,
                      `L ${startX} ${startY}`,
                      `A 100 100 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                      `Z`,
                    ].join(' ');

                    return (
                      <path key={wordObj.word} d={pathData} fill={colors[i % colors.length]} stroke="white" strokeWidth="1" />
                    );
                  })
                )}
              </svg>
            </div>

            {/* Center Button */}
            <button 
              onClick={onSpin}
              disabled={isSpinning || numSegments === 0}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white rounded-full shadow-lg border-4 border-gray-100 flex items-center justify-center font-extrabold text-blue-500 hover:scale-110 active:scale-95 transition-transform disabled:opacity-50 disabled:hover:scale-100"
            >
              SPIN
            </button>
          </div>
          <p className="text-gray-500 font-medium mt-4">Words remaining: {numSegments}</p>
        </>
      ) : (
        <div className="w-full max-w-md bg-white rounded-3xl p-8 shadow-2xl border-2 border-blue-100 flex flex-col items-center gap-6 animate-in slide-in-from-bottom-8 duration-500">
          <div className="bg-blue-50 px-8 py-4 rounded-2xl w-full text-center">
            <h3 className="text-5xl font-black text-blue-600 tracking-wider break-all">{selectedSpinWord.word}</h3>
          </div>
          <p className="text-xl text-gray-600 font-medium text-center italic">
            "{selectedSpinWord.sentence}"
          </p>
          <button 
            onClick={onUnderstand}
            className="mt-4 flex items-center gap-2 bg-green-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-green-600 hover:shadow-lg transition-all active:scale-95"
          >
            <CheckCircle2 size={24} />
            I Understand!
          </button>
        </div>
      )}
    </div>
  );
}

// --- PHASE 3: SPELLING GAME ---
function GamePhase({ activeWords, gameWordIndex, setGameWordIndex, isTimed, gameTime, onComplete }) {
  const currentWordObj = activeWords[gameWordIndex];
  const targetWord = currentWordObj?.word || "";
  
  const [placedLetters, setPlacedLetters] = useState(Array(targetWord.length).fill(null));
  const [availableLetters, setAvailableLetters] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (targetWord) {
      // Split word into letters, shuffle them, and create an array of objects to track their origin
      const letters = targetWord.split('');
      const shuffled = shuffle([...letters]).map((char, index) => ({ id: `letter-${index}`, char, used: false }));
      setAvailableLetters(shuffled);
      setPlacedLetters(Array(targetWord.length).fill(null));
      setShowSuccess(false);
    }
  }, [targetWord]);

  useEffect(() => {
    if (!targetWord) return;
    
    // Check if word is complete
    if (placedLetters.every(l => l !== null)) {
      const spelledWord = placedLetters.map(l => l.char).join('');
      if (spelledWord.toLowerCase() === targetWord.toLowerCase()) {
        setShowSuccess(true);
        setTimeout(() => {
          if (gameWordIndex + 1 < activeWords.length) {
            setGameWordIndex(prev => prev + 1);
          } else {
            onComplete();
          }
        }, 1500);
      } else {
        // Incorrect, briefly show red then reset
        const slots = document.querySelectorAll('.letter-slot');
        slots.forEach(slot => {
          slot.classList.add('animate-bounce', 'bg-red-200', 'border-red-500');
        });
        setTimeout(() => {
          slots.forEach(slot => {
            slot.classList.remove('animate-bounce', 'bg-red-200', 'border-red-500');
          });
          // Return letters to pool
          const returnedPool = [...availableLetters];
          placedLetters.forEach(placed => {
            if (placed) {
              const poolLetter = returnedPool.find(l => l.id === placed.id);
              if (poolLetter) poolLetter.used = false;
            }
          });
          setAvailableLetters(returnedPool);
          setPlacedLetters(Array(targetWord.length).fill(null));
        }, 800);
      }
    }
  }, [placedLetters, targetWord, activeWords.length, gameWordIndex, onComplete, availableLetters]);


  const handleAvailableClick = (letterObj) => {
    if (letterObj.used || showSuccess) return;
    
    const firstEmptyIndex = placedLetters.findIndex(l => l === null);
    if (firstEmptyIndex !== -1) {
      const newPlaced = [...placedLetters];
      newPlaced[firstEmptyIndex] = letterObj;
      setPlacedLetters(newPlaced);
      
      const newAvailable = availableLetters.map(l => l.id === letterObj.id ? { ...l, used: true } : l);
      setAvailableLetters(newAvailable);
    }
  };

  const handlePlacedClick = (letterObj, index) => {
    if (!letterObj || showSuccess) return;
    
    const newPlaced = [...placedLetters];
    newPlaced[index] = null;
    setPlacedLetters(newPlaced);
    
    const newAvailable = availableLetters.map(l => l.id === letterObj.id ? { ...l, used: false } : l);
    setAvailableLetters(newAvailable);
  };

  // Drag and drop handlers
  const handleDragStart = (e, letterObj) => {
    if(letterObj.used || showSuccess) {
      e.preventDefault();
      return;
    }
    e.dataTransfer.setData('application/json', JSON.stringify(letterObj));
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, index) => {
    e.preventDefault();
    if(placedLetters[index] !== null || showSuccess) return;
    
    try {
      const letterObj = JSON.parse(e.dataTransfer.getData('application/json'));
      if(letterObj) {
         const newPlaced = [...placedLetters];
         newPlaced[index] = letterObj;
         setPlacedLetters(newPlaced);
         
         const newAvailable = availableLetters.map(l => l.id === letterObj.id ? { ...l, used: true } : l);
         setAvailableLetters(newAvailable);
      }
    } catch(err) {
      // Handle invalid drag data
    }
  };


  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (!targetWord) return null;

  return (
    <div className="w-full flex flex-col items-center animate-in fade-in duration-300">
      
      {/* Top Bar (Progress & Timer) */}
      <div className="w-full flex justify-between items-center mb-8 px-4 sm:px-8">
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full px-4 py-2 font-bold text-blue-600 shadow-sm border border-blue-100">
            Word {gameWordIndex + 1} of {activeWords.length}
          </div>
        </div>
        {isTimed && (
          <div className="flex items-center gap-2 bg-white rounded-full px-4 py-2 font-bold text-orange-500 shadow-sm border border-orange-100">
            <Clock size={20} />
            {formatTime(gameTime)}
          </div>
        )}
      </div>

      <div className="w-full max-w-3xl bg-white/60 backdrop-blur-sm rounded-3xl p-6 sm:p-12 shadow-xl border border-white flex flex-col items-center gap-12 relative overflow-hidden">
        
        {/* Success Overlay */}
        {showSuccess && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/80 backdrop-blur-sm animate-in fade-in">
            <div className="flex flex-col items-center gap-4 animate-celebrate">
              <CheckCircle2 size={80} className="text-green-500" />
              <h2 className="text-4xl font-black text-green-600">Perfect!</h2>
            </div>
          </div>
        )}

        {/* Word Context Context */}
        <p className="text-xl text-gray-500 font-medium italic text-center">
           {currentWordObj.sentence}
        </p>

        {/* Target Slots */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {placedLetters.map((placed, i) => (
            <div 
              key={`slot-${i}`}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, i)}
              onClick={() => handlePlacedClick(placed, i)}
              className={`letter-slot w-14 h-16 sm:w-20 sm:h-24 rounded-2xl flex items-center justify-center text-3xl sm:text-5xl font-black uppercase shadow-inner border-4 transition-all duration-300 ${
                placed 
                  ? 'bg-blue-500 border-blue-600 text-white cursor-pointer hover:bg-blue-600' 
                  : 'bg-gray-100 border-gray-200 text-transparent'
              }`}
            >
              {placed ? placed.char : ''}
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-2 opacity-50"></div>

        {/* Letter Pool */}
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-gray-400 uppercase tracking-widest mb-2">
            <Hand size={16} /> Drag or Click Letters
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {availableLetters.map((letterObj) => (
              <div 
                key={letterObj.id}
                draggable={!letterObj.used}
                onDragStart={(e) => handleDragStart(e, letterObj)}
                onClick={() => handleAvailableClick(letterObj)}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-2xl sm:text-4xl font-bold uppercase transition-all duration-300 ${
                  letterObj.used 
                    ? 'bg-gray-200 text-gray-400 opacity-50 scale-90 cursor-default' 
                    : 'bg-white text-blue-600 shadow-md border-b-4 border-blue-200 hover:-translate-y-1 hover:shadow-lg cursor-grab active:cursor-grabbing active:border-b-0 active:translate-y-1'
                }`}
              >
                {letterObj.char}
              </div>
            ))}
          </div>
        </div>
        
      </div>
    </div>
  );
}

// --- PHASE 4: LEADERBOARD ---
function LeaderboardPhase({ leaderboard, playerName, setPlayerName, gameTime, isTimed, onPlayAgain }) {
  const [submitted, setSubmitted] = useState(false);
  const [fullLeaderboard, setFullLeaderboard] = useState(leaderboard);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!playerName.trim()) return;
    
    if (isTimed) {
      const newEntry = { name: playerName, time: gameTime, isCurrent: true };
      const combined = [...leaderboard, newEntry].sort((a, b) => a.time - b.time);
      setFullLeaderboard(combined);
    }
    setSubmitted(true);
  };

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full max-w-2xl bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col items-center animate-in fade-in zoom-in duration-500">
      
      <div className="flex items-center gap-4 mb-8">
        <Trophy size={48} className="text-yellow-400 drop-shadow-md" />
        <h2 className="text-3xl font-black text-gray-800">Awesome Job!</h2>
      </div>

      {!submitted ? (
        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          <p className="text-lg text-gray-600 text-center font-medium">
            You completed all the spellings {isTimed ? `in ${formatTime(gameTime)}` : ''}!
          </p>
          <div className="w-full relative">
            <input 
              type="text" 
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              placeholder="Enter your name..."
              className="w-full text-center text-2xl font-bold p-4 bg-gray-50 border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 outline-none transition-all"
              autoFocus
              maxLength={15}
            />
          </div>
          <button 
            type="submit"
            disabled={!playerName.trim()}
            className="flex items-center gap-2 bg-blue-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:bg-blue-600 disabled:opacity-50 disabled:hover:bg-blue-500 transition-colors shadow-lg shadow-blue-500/30"
          >
            See Leaderboard <ChevronRight size={24} />
          </button>
        </form>
      ) : (
        <div className="w-full flex flex-col items-center gap-6 animate-in fade-in">
          {isTimed ? (
            <div className="w-full bg-gray-50 rounded-2xl p-4 border border-gray-200 max-h-96 overflow-y-auto">
              <h3 className="font-bold text-gray-500 uppercase tracking-widest text-sm mb-4 text-center">Top Spellers</h3>
              <div className="flex flex-col gap-2">
                {fullLeaderboard.map((entry, index) => (
                  <div 
                    key={index}
                    className={`flex justify-between items-center p-3 rounded-xl ${
                      entry.isCurrent ? 'bg-blue-100 border-2 border-blue-400 font-bold shadow-sm scale-[1.02] transform' : 'bg-white border border-gray-100 font-medium text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-6 text-center ${index < 3 ? 'text-yellow-500 font-black' : 'text-gray-400'}`}>
                        {index + 1}
                      </span>
                      <span className={entry.isCurrent ? 'text-blue-700 text-lg' : ''}>{entry.name}</span>
                    </div>
                    <span className={entry.isCurrent ? 'text-blue-700' : 'text-gray-500'}>
                      {formatTime(entry.time)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
             <div className="w-full text-center py-8 bg-green-50 rounded-2xl border-2 border-green-200">
               <h3 className="text-2xl font-bold text-green-600 mb-2">Hall of Fame</h3>
               <p className="text-xl text-green-800 font-medium">{playerName}</p>
             </div>
          )}

          <button 
            onClick={onPlayAgain}
            className="mt-4 flex items-center gap-2 bg-gradient-to-r from-green-400 to-green-500 text-white px-8 py-4 rounded-xl font-bold text-xl hover:shadow-lg hover:scale-105 transition-all"
          >
            <RotateCw size={24} />
            Play Again!
          </button>
        </div>
      )}
    </div>
  );
}
