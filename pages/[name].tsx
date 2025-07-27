'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
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

// Simple rating buttons - no complex sliders
function RatingButtons({ onRate }: { onRate: (rating: number) => void }) {
  const ratings = [
    { value: 20, label: "TF BRO", emoji: "💀" },
    { value: 40, label: "Perhaps", emoji: "🤨" },
    { value: 60, label: "It's alright", emoji: "🫡" },
    { value: 80, label: "Hell yeah", emoji: "🔥" },
    { value: 100, label: "LFG!!!", emoji: "🤑" }
  ];

  return (
    <div className="space-y-3">
      <p className="text-center text-sm text-gray-600 mb-4">
        Yay or Nay?
      </p>
      
      <div className="grid grid-cols-5 gap-2">
        {ratings.map((rating) => (
          <button
            key={rating.value}
            onClick={() => onRate(rating.value)}
            className="flex flex-col items-center p-3 bg-white border-2 border-gray-200 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all duration-200"
          >
            <span className="text-2xl mb-1">{rating.emoji}</span>
            <span className="text-xs font-medium text-gray-700">{rating.label}</span>
            <span className="text-xs text-gray-500">{rating.value}%</span>
          </button>
        ))}
      </div>
    </div>
  );
}

function DateCard({ date, onRate }: { date: DateOption; onRate: (rating: number) => void }) {
  return (
    <motion.div
      className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.9 }}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
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
          </div>
        </div>

        <RatingButtons onRate={onRate} />
      </div>
    </motion.div>
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
      const decodedName = name.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      setDisplayName(decodedName);
    }
  }, [name]);

  const handleRate = (rating: number) => {
    const currentDate = dateOptions[currentIndex];
    console.log('Rating submitted:', { title: currentDate.title, rating });
    
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

  // Show results when all dates are rated
  if (currentIndex >= dateOptions.length) {
    const topRatedDate = ratedDates
      .sort((a, b) => b.rating - a.rating)[0];

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

          {/* All ratings debug */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm font-medium text-gray-700 mb-2">All Your Ratings:</p>
            <div className="space-y-1 text-xs">
              {ratedDates
                .sort((a, b) => b.rating - a.rating)
                .map((rated) => (
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
          Pick your rating for each date idea!
        </motion.p>
      </motion.div>

      <div className="w-full max-w-sm mb-8">
        <DateCard 
          date={dateOptions[currentIndex]} 
          onRate={handleRate}
        />
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-500">
          {currentIndex + 1} of {dateOptions.length} • {ratedDates.filter(r => r.rating >= 70).length} highly rated
        </p>
      </div>
    </div>
  );
} 