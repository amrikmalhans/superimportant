'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { motion, PanInfo, useMotionValue, useTransform } from 'framer-motion';
import { Heart, X, MapPin, Clock, Users, ArrowLeft } from 'lucide-react';
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
    id: 1,
    title: "Cozy Coffee Date",
    description: "Perfect first date at a charming local café",
    location: "Downtown Coffee Co.",
    duration: "1-2 hours",
    people: "2 people",
    image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400&h=300&fit=crop",
    category: "Casual"
  },
  {
    id: 2,
    title: "Sunset Beach Walk",
    description: "Romantic stroll along the shoreline",
    location: "Santa Monica Beach",
    duration: "2-3 hours",
    people: "2 people",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    category: "Outdoor"
  },
  {
    id: 3,
    title: "Art Gallery Tour",
    description: "Explore contemporary art together",
    location: "LACMA",
    duration: "3-4 hours",
    people: "2 people",
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=300&fit=crop",
    category: "Cultural"
  },
  {
    id: 4,
    title: "Food Truck Adventure",
    description: "Taste the city's best street food",
    location: "Grand Central Market",
    duration: "2-3 hours",
    people: "2 people",
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop",
    category: "Food"
  },
  {
    id: 5,
    title: "Rooftop Bar & Views",
    description: "Drinks with stunning city skyline",
    location: "Perch LA",
    duration: "2-3 hours",
    people: "2 people",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=400&h=300&fit=crop",
    category: "Nightlife"
  }
];

function SwipeableCard({ date, onSwipe, index }: { date: DateOption; onSwipe: (rating: number) => void; index: number }) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-100, 100], [-15, 15]);
  const opacity = useTransform(x, [-100, -50, 0, 50, 100], [0, 1, 1, 1, 0]);
  const scale = useTransform(x, [-100, 100], [0.95, 1.05]);
  const [hasSwiped, setHasSwiped] = useState(false);
  const [isSliderInteracting, setIsSliderInteracting] = useState(false);

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.x > 50) {
      console.log('Swiped right - submitting 100%');
      setHasSwiped(true);
      onSwipe(100);
    } else if (info.offset.x < -50) {
      console.log('Swiped left - submitting 0%');
      setHasSwiped(true);
      onSwipe(0);
    }
  };

  return (
    <motion.div
      className={`absolute w-full max-w-sm bg-white rounded-2xl ${theme.shadows.lg} overflow-hidden ${isSliderInteracting ? 'cursor-default' : 'cursor-grab active:cursor-grabbing'}`}
      style={{ x, rotate, opacity, scale }}
      drag={isSliderInteracting ? false : "x"}
      dragConstraints={{ left: -100, right: 100 }}
      dragElastic={0.1}
      onDragEnd={handleDragEnd}
      whileTap={{ scale: 0.95 }}
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
        <p className="text-gray-600 mb-4">{date.description}</p>
        
        <div className="space-y-2 mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            {date.location}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Clock className="w-4 h-4 mr-2" />
            {date.duration}
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="w-4 h-4 mr-2" />
            {date.people}
          </div>
        </div>

        {!hasSwiped && <DateSlider onSwipe={onSwipe} onSliderInteraction={setIsSliderInteracting} />}
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
    if (value < 20) return "Not for me";
    if (value < 40) return "Maybe";
    if (value < 60) return "Sounds fun";
    if (value < 80) return "Love it!";
    return "Absolutely!";
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
          How likely are you to try this date?
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
    console.log('Submitting rating:', { title: currentDate.title, rating });
    setRatedDates(prev => [...prev, { date: currentDate, rating }]);
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
    const topRatedDates = ratedDates
      .filter(item => item.rating >= 70)
      .sort((a, b) => b.rating - a.rating);

    // Debug: Log all ratings to see what's happening
    console.log('All ratings:', ratedDates.map(r => ({ title: r.date.title, rating: r.rating })));
    console.log('Top rated dates:', topRatedDates.map(r => ({ title: r.date.title, rating: r.rating })));

    return (
      <div className={`min-h-screen bg-gradient-to-br ${theme.gradients.background} flex items-center justify-center p-4`}>
        <div className={`bg-white rounded-2xl ${theme.shadows.lg} p-8 max-w-md w-full text-center`}>
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">All Done, {displayName}!</h2>
          <p className="text-gray-600 mb-6">
            You rated {ratedDates.length} date options. Here are your top picks:
          </p>
          
          {topRatedDates.length > 0 ? (
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Your Highest Rated Dates:</h3>
              <div className="space-y-2">
                {topRatedDates.map(({ date, rating }) => (
                  <div key={date.id} className="bg-amber-50 rounded-lg p-3">
                    <div className="font-medium text-gray-900">{date.title}</div>
                    <div className="text-sm text-gray-600">{date.location}</div>
                    <div className="text-xs text-amber-600 font-medium">Rating: {rating}%</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="mb-6">
              <p className="text-gray-500">No dates rated above 70%. Try again!</p>
            </div>
          )}
          
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
          Hey {displayName}! 👋
        </motion.h1>
        <motion.p 
          className="text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Rate how likely you are to try each date idea!
        </motion.p>
        <motion.p 
          className="text-sm text-gray-500 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          💡 Tip: You can also swipe left (0%) or right (100%) on the card
        </motion.p>
      </motion.div>

      <div className="relative w-full max-w-sm h-[600px] mb-8">
        {dateOptions.slice(currentIndex, currentIndex + 2).map((date, index) => (
          <div key={date.id} className="absolute inset-0">
            <SwipeableCard 
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