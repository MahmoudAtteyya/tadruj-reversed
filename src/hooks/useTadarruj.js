import React, { useState, useEffect, useCallback } from 'react';

// تدرّج - رحلة العلم والعمل
// منصة تعليمية إسلامية شاملة

const STORAGE_KEYS = {
  PROFILE: 'tadarruj_profile_v2',
  PROGRESS: 'tadarruj_progress_v2',
  HELP_ACK: 'tadarruj_help_ack'
};

// ==================== Hooks ====================

/**
 * Custom hook for localStorage with state sync
 */
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);

  return [storedValue, setValue];
};

/**
 * Hook for managing user progress
 */
export const useProgress = () => {
  const initialProgress = {
    completedLectures: [],
    completedBooks: [],
    hasanat: 0,
    streak: 0,
    lastActive: null,
    prayers: {},
    completedAdhkar: [],
    lessonNotes: {}
  };

  const [progress, setProgress] = useLocalStorage(STORAGE_KEYS.PROGRESS, initialProgress);

  const completeLecture = useCallback((lectureId, hasanat = 10) => {
    setProgress(prev => {
      if (prev.completedLectures.includes(lectureId)) return prev;
      return {
        ...prev,
        completedLectures: [...prev.completedLectures, lectureId],
        hasanat: prev.hasanat + hasanat,
        lastActive: new Date().toISOString()
      };
    });
  }, [setProgress]);

  const completeBook = useCallback((bookId, hasanat = 100) => {
    setProgress(prev => {
      if (prev.completedBooks.includes(bookId)) return prev;
      return {
        ...prev,
        completedBooks: [...prev.completedBooks, bookId],
        hasanat: prev.hasanat + hasanat
      };
    });
  }, [setProgress]);

  const updateStreak = useCallback(() => {
    setProgress(prev => {
      const today = new Date().toDateString();
      const lastActiveDate = prev.lastActive ? new Date(prev.lastActive).toDateString() : null;
      
      if (lastActiveDate === today) return prev;
      
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      const isYesterday = lastActiveDate === yesterday.toDateString();
      
      return {
        ...prev,
        streak: isYesterday ? prev.streak + 1 : 1,
        lastActive: new Date().toISOString()
      };
    });
  }, [setProgress]);

  const markPrayer = useCallback((prayerName) => {
    setProgress(prev => {
      const today = new Date().toDateString();
      return {
        ...prev,
        prayers: {
          ...prev.prayers,
          [today]: {
            ...prev.prayers[today],
            [prayerName]: true
          }
        },
        hasanat: prev.hasanat + 50
      };
    });
  }, [setProgress]);

  const addNote = useCallback((lectureId, note) => {
    setProgress(prev => ({
      ...prev,
      lessonNotes: {
        ...prev.lessonNotes,
        [lectureId]: note
      }
    }));
  }, [setProgress]);

  return {
    progress,
    completeLecture,
    completeBook,
    updateStreak,
    markPrayer,
    addNote
  };
};

/**
 * Hook for managing user profile
 */
export const useProfile = () => {
  const initialProfile = {
    name: 'طالب علم',
    dailyGoalHours: 1,
    joinedDate: new Date().toISOString(),
    theme: 'light',
    fontFamily: 'Tajawal',
    uiScale: 1,
    accentColor: '#10b981'
  };

  const [profile, setProfile] = useLocalStorage(STORAGE_KEYS.PROFILE, initialProfile);

  const updateProfile = useCallback((updates) => {
    setProfile(prev => ({ ...prev, ...updates }));
  }, [setProfile]);

  return { profile, updateProfile };
};

/**
 * Hook for quiz functionality
 */
export const useQuiz = (bookName) => {
  const questions = generateQuizQuestions(bookName);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [answers, setAnswers] = useState([]);

  const answerQuestion = useCallback((answerIndex) => {
    const isCorrect = answerIndex === questions[currentIndex].correctIndex;
    
    setAnswers(prev => [...prev, { 
      questionIndex: currentIndex, 
      answerIndex, 
      isCorrect 
    }]);
    
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    
    if (currentIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentIndex(prev => prev + 1);
      }, 1500);
    } else {
      setTimeout(() => {
        setShowResult(true);
      }, 1500);
    }
  }, [currentIndex, questions]);

  const resetQuiz = useCallback(() => {
    setCurrentIndex(0);
    setScore(0);
    setShowResult(false);
    setAnswers([]);
  }, []);

  return {
    currentQuestion: questions[currentIndex],
    currentIndex,
    totalQuestions: questions.length,
    score,
    showResult,
    answers,
    answerQuestion,
    resetQuiz,
    progress: ((currentIndex + 1) / questions.length) * 100
  };
};

// ==================== Components ====================

/**
 * Video Player Component
 */
export const VideoPlayer = ({ videoId, title, onComplete }) => {
  const [watched, setWatched] = useState(false);

  useEffect(() => {
    // Track video completion
    const iframe = document.querySelector('iframe');
    if (iframe) {
      // YouTube API would be integrated here
    }
  }, [videoId]);

  return (
    <div className="video-player">
      <div className="video-container">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
      {!watched && (
        <button 
          className="complete-btn"
          onClick={() => {
            setWatched(true);
            onComplete && onComplete();
          }}
        >
          ✓ أكملت المشاهدة
        </button>
      )}
    </div>
  );
};

/**
 * Progress Bar Component
 */
export const ProgressBar = ({ value, max = 100, color = '#10b981' }) => (
  <div className="progress-bar-container">
    <div 
      className="progress-bar-fill" 
      style={{ 
        width: `${(value / max) * 100}%`,
        backgroundColor: color
      }}
    />
    <span className="progress-text">{Math.round((value / max) * 100)}%</span>
  </div>
);

/**
 * Book Card Component
 */
export const BookCard = ({ book, progress, onClick }) => {
  const completedCount = progress?.completedLectures?.filter(id => 
    id.startsWith(book.id)
  ).length || 0;
  
  const progressPercent = (completedCount / book.lectures.length) * 100;

  return (
    <div className="book-card" onClick={onClick}>
      <div className="book-icon">📖</div>
      <h3 className="book-title">{book.title}</h3>
      <p className="book-category">{book.category}</p>
      <ProgressBar value={completedCount} max={book.lectures.length} />
      <p className="lecture-count">
        {completedCount} / {book.lectures.length} محاضرة
      </p>
    </div>
  );
};

/**
 * Quiz Modal Component
 */
export const QuizModal = ({ bookName, onClose, onComplete }) => {
  const {
    currentQuestion,
    currentIndex,
    totalQuestions,
    score,
    showResult,
    answers,
    answerQuestion,
    resetQuiz,
    progress
  } = useQuiz(bookName);

  return (
    <div className="quiz-modal-overlay">
      <div className="quiz-modal">
        <button className="close-btn" onClick={onClose}>×</button>
        
        {!showResult ? (
          <div className="quiz-content">
            <div className="quiz-header">
              <h2>اختبار: {bookName}</h2>
              <ProgressBar value={progress} />
              <p>السؤال {currentIndex + 1} من {totalQuestions}</p>
            </div>
            
            <div className="question-container">
              <h3 className="question-text">{currentQuestion.question}</h3>
              <div className="options">
                {currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    className="option-btn"
                    onClick={() => answerQuestion(index)}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="quiz-result">
            <h2>نتيجة الاختبار</h2>
            <p className="score">{score} / {totalQuestions}</p>
            <p className="percentage">{Math.round((score / totalQuestions) * 100)}%</p>
            <button 
              className="retry-btn"
              onClick={resetQuiz}
            >
              إعادة الاختبار
            </button>
            <button 
              className="finish-btn"
              onClick={() => {
                onComplete && onComplete(score, totalQuestions);
                onClose();
              }}
            >
              إنهاء
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * Prayer Tracker Component
 */
export const PrayerTracker = ({ prayers, onPrayer }) => {
  const prayerList = [
    { name: 'الفجر', icon: '🌅' },
    { name: 'الظهر', icon: '☀️' },
    { name: 'العصر', icon: '🌤️' },
    { name: 'المغرب', icon: '🌅' },
    { name: 'العشاء', icon: '🌙' }
  ];

  const today = new Date().toDateString();
  const todayPrayers = prayers[today] || {};

  return (
    <div className="prayer-tracker">
      <h3>💒 صلوات اليوم</h3>
      <div className="prayer-list">
        {prayerList.map(prayer => (
          <button
            key={prayer.name}
            className={`prayer-btn ${todayPrayers[prayer.name] ? 'completed' : ''}`}
            onClick={() => !todayPrayers[prayer.name] && onPrayer(prayer.name)}
          >
            <span className="prayer-icon">{prayer.icon}</span>
            <span className="prayer-name">{prayer.name}</span>
            {todayPrayers[prayer.name] && <span className="check">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
};

/**
 * Stats Dashboard Component
 */
export const StatsDashboard = ({ progress }) => (
  <div className="stats-dashboard">
    <div className="stat-card">
      <div className="stat-icon">💎</div>
      <div className="stat-value">{progress.hasanat}</div>
      <div className="stat-label">حسنات</div>
    </div>
    <div className="stat-card">
      <div className="stat-icon">📚</div>
      <div className="stat-value">{progress.completedLectures.length}</div>
      <div className="stat-label">محاضرة مكتملة</div>
    </div>
    <div className="stat-card">
      <div className="stat-icon">📖</div>
      <div className="stat-value">{progress.completedBooks.length}</div>
      <div className="stat-label">كتاب مكتمل</div>
    </div>
    <div className="stat-card">
      <div className="stat-icon">🔥</div>
      <div className="stat-value">{progress.streak}</div>
      <div className="stat-label">أيام متتالية</div>
    </div>
  </div>
);

export default {
  useProgress,
  useProfile,
  useQuiz,
  VideoPlayer,
  ProgressBar,
  BookCard,
  QuizModal,
  PrayerTracker,
  StatsDashboard
};
