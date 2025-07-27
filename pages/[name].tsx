'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
import { theme } from '../styles/theme';

interface DateOption {
  id: number;
  title: string;
  description: string;
  location: string;
  duration: string;
  people: string;
  image: string;
  category: string;
}

const dateOptions: DateOption[] = [
        {
          "id": 1,
          "title": "Coffee & Walk in Old Montreal",
          "description": "Let's just keep it simple and go to Café Parvis eh? No pressure, just chill - get our iced lattes and talk about the meaning of life (or your favorite LEGO set)",
          "location": "Café Parvis",
          "duration": "1-2 hours",
          "people": "2 people",
          "image": "https://uoubfkdsc2yugclb.public.blob.vercel-storage.com/Screenshot%202025-07-27%20at%2013.06.28.png",
          "category": "Casual"
        },
        {
            "id": 10,
            "title": "Vinyl Shop + Listening Sesh with Amrik",
            "description": "Amrik's too lazy to go get a Vinyl for his new apartment, perhaps this date could be a perfect excuse for you and him to get one, and browser and buy bunch of records that you think he should definitely vibe to. As a bonus, he'll make you a iced latte himself (he's a coffee snob)",
            "location": "Aux 33 Tours",
            "duration": "1-2 hours",
            "people": "2 people",
            "image": "https://uoubfkdsc2yugclb.public.blob.vercel-storage.com/Screenshot%202025-07-27%20at%2013.08.08.png",
            "category": "Cozy"
          },
        {
          "id": 3,
          "title": "Mount Royal Sunset Picnic",
          "description": "Ahhh the classic, let's just go to a park and watch the sunset. Bring a bottle of wine and some snacks, and just chill and talk about life you know how this goes...",
          "location": "Mount Royal Lookout",
          "duration": "1-2 hours",
          "people": "2 people",
          "image": "https://uoubfkdsc2yugclb.public.blob.vercel-storage.com/Screenshot%202025-07-27%20at%2013.09.05.png",
          "category": "Scenic"
        },
        {
          "id": 7,
          "title": "Drinks & Chill at Parc Laurier",
          "description": "Wait another Parc? I know you're not a fan of this, but it's a classic, and you know how this goes. Just go, and enjoy the vibes.",
          "location": "Parc Laurier, Plateau",
          "duration": "1-2 hours",
          "people": "2 people",
          "image": "https://uoubfkdsc2yugclb.public.blob.vercel-storage.com/Screenshot%202025-07-27%20at%2013.11.07.png",
          "category": "Chill"
        },
        {
            "id": 8,
            "title": "Music & Iced Lattes at Home",
            "description": "Amrik recently got into music...and he's been playing guitar and thinks he's got enough balls to play and sing for you (don't get your hopes high he kinda sucks at it), but you'll get a free iced latte from him (he's a coffee snob) and see some sick art he's got at his place!",
            "location": "Amrik's place",
            "duration": "1-2 hours",
            "people": "2 people",
            "image": "https://uoubfkdsc2yugclb.public.blob.vercel-storage.com/IMG_5578.jpg",
            "category": "Cozy"
          },
          {
            "id": 9,
            "title": "Thrifting + Coffee/Food Hangout",
            "description": "So you're into fashion and vintage stuff too? You also love spending money that you definitely don't have? Well, this is the date for you! We'll hit up a local thrift store or vintage spot, browse fits (and maybe try some on for laughs), then grab coffee or a quick bite after...",
            "location": "Mile End / Plateau thrift shops",
            "duration": "1-2 hours",
            "people": "2 people",
            "image": "https://uoubfkdsc2yugclb.public.blob.vercel-storage.com/Screenshot%202025-07-27%20at%2013.12.31.png",
            "category": "Fun"
          },
];

function DateCard({ date, onSwipe, index }: { date: DateOption; onSwipe: (rating: number) => void; index: number }) {
  const [isSliderInteracting, setIsSliderInteracting] = useState(false);

  return (
    <motion.div
      className={`absolute w-full max-w-sm bg-white rounded-2xl ${theme.shadows.lg} overflow-hidden`}
      initial={{ 
        opacity: 0, 
        y: 50, 
        scale: 0.9,
        rotateY: index === 0 ? 0 : 15
      }}
      animate={{ 
        opacity: 1, 
        y: 0, 
        scale: 1,
        rotateY: 0
      }}
      exit={{
        opacity: 0,
        y: -50,
        scale: 0.9,
        rotateY: -15
      }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.46, 0.45, 0.94]
      }}
    >
      <div className="relative h-64 bg-gradient-to-br from-stone-100 to-amber-100">
        <img 
          src={date.image} 
          alt={date.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
          <span className="text-sm font-medium text-gray-700">{date.category}</span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{date.title}</h3>
        <p className="text-xs text-gray-600 mb-4 leading-relaxed">{date.description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1" />
            {date.location}
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center text-xs text-gray-500">
              <Clock className="w-3 h-3 mr-1" />
              {date.duration}
            </div>
            <div className="flex items-center text-xs text-gray-500">
              <Users className="w-3 h-3 mr-1" />
              {date.people}
            </div>
          </div>
        </div>

        <DateSlider onSwipe={onSwipe} onSliderInteraction={setIsSliderInteracting} />
      </div>
    </motion.div>
  );
}

function DateSlider({ onSwipe, swipeRating, onSliderInteraction }: { 
  onSwipe: (rating: number) => void; 
  swipeRating?: number;
  onSliderInteraction?: (isInteracting: boolean) => void;
}) {
  const [rating, setRating] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  // Update rating if swipe happened
  useEffect(() => {
    if (swipeRating !== undefined) {
      setRating(swipeRating);
      if (swipeRating >= 80) {
        setShowCelebration(true);
        setTimeout(() => setShowCelebration(false), 2000);
      }
    }
  }, [swipeRating]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setRating(value);
    onSliderInteraction?.(true);
  };

  const handleSliderStart = () => {
    setIsDragging(true);
    onSliderInteraction?.(true);
  };

  const handleSliderEnd = () => {
    setIsDragging(false);
    onSliderInteraction?.(false);
    if (rating >= 80) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 2000);
    }
    onSwipe(rating);
  };

  // Debounced rating update to reduce re-renders
  const debouncedRating = useMemo(() => {
    return Math.round(rating / 5) * 5; // Round to nearest 5
  }, [rating]);

  const getRatingLabel = (value: number) => {
    if (value < 20) return "Jesus tf?";
    if (value < 40) return "Maybe";
    if (value < 60) return "Alrighty";
    if (value < 80) return "Oh Yeah Love it!";
    return "LFGGGGGGGGGG!!!!";
  };

  const getRatingColor = (value: number) => {
    if (value < 20) return "text-stone-600";
    if (value < 40) return "text-amber-700";
    if (value < 60) return "text-amber-600";
    if (value < 80) return "text-amber-500";
    return "text-amber-400";
  };

  return (
    <div className="space-y-4 relative">
      {/* Celebration Animation */}
      {showCelebration && (
        <motion.div
          className="absolute inset-0 flex items-center justify-center pointer-events-none z-10"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
        >
          <div className="text-4xl">✨</div>
        </motion.div>
      )}
      
      <div className="text-center">
        <div 
          className={`text-lg font-semibold ${getRatingColor(debouncedRating)} mb-1 transition-colors duration-200`}
        >
          {getRatingLabel(debouncedRating)}
        </div>
        <div className="text-sm text-gray-500">
          How much you fuck with this idea?
        </div>
      </div>

      <div className="relative">
        {/* Earthy slider track */}
        <div className="relative h-3 bg-gradient-to-r from-stone-200 via-amber-200 to-amber-300 rounded-full overflow-hidden">
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-stone-400 via-amber-400 to-amber-500 rounded-full transition-all duration-150 ease-out"
            style={{ width: `${debouncedRating}%` }}
          />
          
          {/* Earthy slider thumb */}
          <div 
            className="absolute top-1/2 transform -translate-y-1/2 w-6 h-6 bg-white border-4 border-amber-700 rounded-full shadow-lg cursor-pointer transition-all duration-150 ease-out hover:scale-110 hover:shadow-xl"
            style={{ 
              left: `calc(${debouncedRating}% - 12px)`,
              boxShadow: isDragging ? "0 15px 35px rgba(0,0,0,0.3)" : "0 4px 15px rgba(0,0,0,0.1)"
            }}
          />
        </div>

        {/* Slider input (hidden but functional) */}
        <input
          type="range"
          min="0"
          max="100"
          value={rating}
          onChange={handleSliderChange}
          onMouseDown={handleSliderStart}
          onTouchStart={handleSliderStart}
          onMouseUp={handleSliderEnd}
          onTouchEnd={handleSliderEnd}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
        />
      </div>

      <div className="flex justify-between text-xs text-gray-400">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>

      <button
        onClick={useCallback(() => {
          console.log('Button clicked with rating:', rating);
          onSwipe(rating);
        }, [rating, onSwipe])}
        className={`w-full bg-gradient-to-r ${theme.gradients.button} text-white py-3 rounded-lg font-medium transition-all duration-200 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98]`}
      >
        Submit Rating ({debouncedRating}%)
      </button>
    </div>
  );
}

export default function PersonalDatePage() {
  const router = useRouter();
  const { name } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ratedDates, setRatedDates] = useState<Array<{ date: DateOption; rating: number }>>([]);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (name && typeof name === 'string') {
      // Convert URL-safe name back to display name
      const decodedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      setDisplayName(decodedName);
    }
  }, [name]);

  const handleRating = (rating: number) => {
    const currentDate = dateOptions[currentIndex];
    console.log('Submitting rating:', { 
      title: currentDate.title, 
      rating, 
      currentIndex,
      dateId: currentDate.id 
    });
    setRatedDates(prev => {
      const newRatedDates = [...prev, { date: currentDate, rating }];
      console.log('Updated ratedDates:', newRatedDates.map(r => ({ title: r.date.title, rating: r.rating })));
      return newRatedDates;
    });
    setCurrentIndex(prev => prev + 1);
  };

  const resetApp = () => {
    setCurrentIndex(0);
    setRatedDates([]);
  };

  const goBack = () => {
    router.push('/');
  };

  if (currentIndex >= dateOptions.length) {
    const topRatedDate = ratedDates
      .sort((a, b) => b.rating - a.rating)[0];

    // Debug: Log all ratings to console
    console.log('All ratings:', ratedDates.map(r => ({ title: r.date.title, rating: r.rating })));
    console.log('Top rated date:', topRatedDate);

    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradients.background} flex items-center justify-center p-4`}>
        <div className={`bg-white rounded-2xl ${theme.shadows.lg} p-8 max-w-md w-full text-center`}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">You got through his stupid little date list! {displayName}!</h2>
          <p className="text-gray-600 mb-6">
            You rated {ratedDates.length} date options. Here&apos;s your top pick:
          </p>
          
          {topRatedDate ? (
            <div className="mb-6">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-6 border border-amber-200">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-bold text-gray-900 text-lg mb-2">{topRatedDate.date.title}</div>
                <div className="text-sm text-gray-600 mb-3">{topRatedDate.date.location}</div>
                <div className="text-xs text-gray-700 mb-4 leading-relaxed">{topRatedDate.date.description}</div>
                <div className="text-xs text-amber-600 font-medium">Your Rating: {topRatedDate.rating}%</div>
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-500">No dates rated! Try again!</p>
            </div>
          )}

          {/* Debug section to show all ratings */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">All Your Ratings (Debug):</p>
            <div className="space-y-1 text-xs">
              {ratedDates
                .sort((a, b) => b.rating - a.rating)
                .map((rated, index) => (
                  <div key={rated.date.id} className="flex justify-between items-center">
                    <span className="text-gray-600 truncate">{rated.date.title}</span>
                    <span className="font-medium text-amber-600">{rated.rating}%</span>
                  </div>
                ))}
            </div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-gray-600 italic">
              💡 Please tell Amrik what you got at the end...he&apos;s too lazy to finish building it to notify this to him... although he may add it in future (I know he won&apos;t)
            </p>
          </div>
          
          <div className="space-y-3">
            <button
              onClick={resetApp}
              className={`w-full bg-gradient-to-r ${theme.gradients.button} text-white px-6 py-3 rounded-full font-medium hover:bg-gradient-to-r ${theme.gradients.buttonHover} transition-all`}
            >
              Start Over
            </button>
            <button
              onClick={goBack}
              className="w-full bg-gray-100 text-gray-700 px-6 py-3 rounded-full font-medium hover:bg-gray-200 transition-all"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${theme.gradients.background} flex flex-col items-center justify-center p-4`}>
      <button
        onClick={goBack}
        className="absolute top-4 left-4 flex items-center text-gray-600 hover:text-gray-900 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 mr-2" />
        Back
      </button>

      <motion.div 
        className="text-center mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <motion.h1 
          className="text-3xl font-bold text-gray-900 mb-2"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Bonjour {displayName}! 🙂‍↔️
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Move the slider left and right, you know how it rolls.
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-sm h-[600px] mb-8">
        {dateOptions.slice(currentIndex, currentIndex + 2).map((date, index) => (
          <div key={date.id} className="absolute inset-0">
            <DateCard 
              date={date} 
              onSwipe={handleRating}
              index={index}
            />
          </div>
        ))}
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          {currentIndex + 1} of {dateOptions.length} • {ratedDates.filter(r => r.rating >= 70).length} highly rated
        </p>
      </div>
    </div>
  );
} 