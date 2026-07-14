import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import booksData, { Level, categories, generateQuizQuestions } from './data/books.js';
import { useProgress, useProfile, StatsDashboard, PrayerTracker, ProgressBar, VideoPlayer, QuizModal } from './hooks/useTadarruj.js';

// ==================== Main App Component ====================
function App() {
  const { progress } = useProgress();
  const { profile, updateProfile } = useProfile();
  const [selectedLevel, setSelectedLevel] = useState(Level.Intro);

  return (
    <Router>
      <div className="app">
        <Header profile={profile} streak={progress.streak} hasanat={progress.hasanat} />
        
        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <HomePage
                selectedLevel={selectedLevel}
                setSelectedLevel={setSelectedLevel}
                progress={progress}
              />
            } />
            <Route path="/book/:bookId" element={<BookPage progress={progress} />} />
            <Route path="/lecture/:lectureId" element={<LecturePage progress={progress} />} />
            <Route path="/progress" element={<ProgressPage progress={progress} profile={profile} />} />
            <Route path="/settings" element={<SettingsPage profile={profile} updateProfile={updateProfile} />} />
          </Routes>
        </main>
        
        <BottomNav />
      </div>
    </Router>
  );
}

// ==================== Header Component ====================
function Header({ profile, streak, hasanat }) {
  return (
    <header className="header bg-emerald-600 text-white p-4 sticky top-0 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="text-3xl">📚</div>
          <div>
            <h1 className="text-xl font-bold">تدرُّج</h1>
            <p className="text-xs opacity-80">رحلة العلم والعمل</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <span className="text-2xl">🔥</span>
            <span className="font-bold">{streak}</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-2xl">💎</span>
            <span className="font-bold">{hasanat}</span>
          </div>
          <div className="text-sm">
            مرحبًا، {profile.name}
          </div>
        </div>
      </div>
    </header>
  );
}

// ==================== Home Page ====================
function HomePage({ selectedLevel, setSelectedLevel, progress }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  
  const levelNames = {
    [Level.Intro]: 'المستوى التمهيدي',
    [Level.Qualifying]: 'المستوى التأهيلي',
    [Level.Advanced]: 'المستوى المتقدم'
  };

  const filteredBooks = booksData.filter(book => {
    const matchesLevel = book.level === selectedLevel;
    const matchesCategory = selectedCategory === 'all' || book.category === selectedCategory;
    const matchesSearch = book.title.includes(searchTerm) || 
                          book.description?.includes(searchTerm);
    return matchesLevel && matchesCategory && matchesSearch;
  });

  return (
    <div className="container mx-auto p-4">
      {/* Level Selector */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
        {Object.values(Level).map(level => (
          <button
            key={level}
            onClick={() => setSelectedLevel(level)}
            className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-all ${
              selectedLevel === level
                ? 'bg-emerald-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {levelNames[level]}
          </button>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="mb-6 space-y-4">
        <input
          type="text"
          placeholder="ابحث عن كتاب..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none"
        />
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
              selectedCategory === 'all' ? 'bg-emerald-600 text-white' : 'bg-gray-100'
            }`}
          >
            الكل
          </button>
          {Object.values(categories).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-sm whitespace-nowrap ${
                selectedCategory === cat ? 'bg-emerald-600 text-white' : 'bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <StatsDashboard progress={progress} />

      {/* Books Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {filteredBooks.map(book => (
          <BookCard key={book.id} book={book} progress={progress} />
        ))}
      </div>

      {/* Total count */}
      <div className="mt-6 text-center text-gray-500">
        {filteredBooks.length} كتاب • {filteredBooks.reduce((acc, b) => acc + b.lectures.length, 0)} محاضرة
      </div>
    </div>
  );
}

// ==================== Book Card ====================
function BookCard({ book, progress }) {
  const completedCount = progress.completedLectures.filter(id => id.startsWith(book.id)).length;
  const totalLectures = book.lectures.length;
  const isCompleted = completedCount === totalLectures;
  const isInProgress = completedCount > 0 && completedCount < totalLectures;

  const getLevelIcon = (level) => {
    switch(level) {
      case Level.Intro: return '🌱';
      case Level.Qualifying: return '📖';
      case Level.Advanced: return '🎓';
      default: return '📚';
    }
  };

  return (
    <Link to={`/book/${book.id}`} className="block">
      <div className={`card p-4 hover:shadow-lg transition-all cursor-pointer ${
        isCompleted ? 'border-2 border-emerald-500 bg-emerald-50' : ''
      }`}>
        <div className="flex items-start gap-3">
          <div className="text-3xl">{getLevelIcon(book.level)}</div>
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{book.title}</h3>
            <p className="text-sm text-gray-500 mb-2">{book.category}</p>
            
            <div className="flex items-center gap-2 mb-2">
              <ProgressBar 
                value={completedCount} 
                max={totalLectures} 
                color={isCompleted ? '#10b981' : '#3b82f6'} 
              />
            </div>
            
            <div className="flex justify-between text-xs text-gray-400">
              <span>{completedCount} / {totalLectures} محاضرة</span>
              {isInProgress && <span>تعلمت {Math.round((completedCount / totalLectures) * 100)}%</span>}
              {isCompleted && <span className="text-emerald-600 font-bold">✓ مكتمل</span>}
            </div>
          </div>
        </div>
        
        {isCompleted && (
          <div className="mt-3 flex items-center gap-1 text-emerald-600 text-sm">
            <span>🎉</span>
            <span className="font-bold">أحسنت! أنجزت الكتاب</span>
          </div>
        )}
      </div>
    </Link>
  );
}

// ==================== Book Page ====================
function BookPage({ progress }) {
  const { bookId } = useParams();
  const book = booksData.find(b => b.id === bookId);
  const [showQuiz, setShowQuiz] = useState(false);

  if (!book) {
    return <div className="p-4 text-center">الكتاب غير موجود</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {/* Back button */}
      <Link to="/" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
        <span>→</span>
        <span>العودة للرئيسية</span>
      </Link>

      {/* Book header */}
      <div className="bg-gradient-to-br from-emerald-600 to-emerald-700 text-white p-6 rounded-xl mb-6">
        <h1 className="text-2xl font-bold mb-2">{book.title}</h1>
        <p className="opacity-90">{book.description}</p>
        
        <div className="flex items-center gap-4 mt-4 text-sm">
          <span>📚 {book.lectures.length} محاضرة</span>
          <span>{book.category}</span>
        </div>

        <button
          onClick={() => setShowQuiz(true)}
          className="mt-4 px-4 py-2 bg-white text-emerald-700 rounded-lg font-bold hover:bg-emerald-50 transition-colors"
        >
          📝 اختبر معلوماتك
        </button>
      </div>

      {/* Progress */}
      <div className="card p-4 mb-6">
        <h3 className="font-bold mb-3">التقدم</h3>
        <ProgressBar 
          value={progress.completedLectures.filter(id => id.startsWith(bookId)).length}
          max={book.lectures.length}
        />
      </div>

      {/* Lectures list */}
      <div className="space-y-3">
        {book.lectures.map((lecture, index) => (
          <LectureItem 
            key={lecture.id} 
            lecture={lecture} 
            index={index + 1}
            isCompleted={progress.completedLectures.includes(lecture.id)}
          />
        ))}
      </div>

      {/* Quiz Modal */}
      {showQuiz && (
        <QuizModal
          bookName={book.title}
          onClose={() => setShowQuiz(false)}
          onComplete={(score, total) => console.log(`Quiz completed: ${score}/${total}`)}
        />
      )}
    </div>
  );
}

// ==================== Lecture Item ====================
function LectureItem({ lecture, index, isCompleted }) {
  return (
    <Link 
      to={`/lecture/${lecture.id}`}
      className={`block p-4 rounded-lg border-2 ${
        isCompleted 
          ? 'border-emerald-500 bg-emerald-50' 
          : 'border-gray-200 hover:border-emerald-300'
      } transition-all`}
    >
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${
          isCompleted ? 'bg-emerald-500 text-white' : 'bg-gray-100'
        }`}>
          {isCompleted ? '✓' : index}
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium">{lecture.title}</h4>
          <p className="text-xs text-gray-500">المحاضرة {index}</p>
        </div>
        
        <div className="text-gray-400">
          ▶
        </div>
      </div>
    </Link>
  );
}

// ==================== Lecture Page ====================
function LecturePage({ progress }) {
  const { lectureId } = useParams();
  const { completeLecture } = useProgress();
  
  // Find lecture in all books
  let lecture = null;
  let book = null;
  for (const b of booksData) {
    const found = b.lectures.find(l => l.id === lectureId);
    if (found) {
      lecture = found;
      book = b;
      break;
    }
  }

  if (!lecture) {
    return <div className="p-4 text-center">المحاضرة غير موجودة</div>;
  }

  const isCompleted = progress.completedLectures.includes(lectureId);

  return (
    <div className="container mx-auto p-4">
      {/* Back to book */}
      <Link 
        to={`/book/${book.id}`} 
        className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4"
      >
        <span>→</span>
        <span>العودة لكتاب {book.title}</span>
      </Link>

      {/* Video Player */}
      <div className="mb-6">
        <VideoPlayer
          videoId={lecture.videoId}
          title={lecture.title}
          onComplete={() => {
            if (!isCompleted) {
              completeLecture(lectureId);
            }
          }}
        />
      </div>

      {/* Lecture info */}
      <div className="card p-4">
        <h2 className="text-xl font-bold mb-2">{lecture.title}</h2>
        <p className="text-gray-500 mb-4">كتاب: {book.title}</p>
        
        {isCompleted ? (
          <div className="flex items-center gap-2 text-emerald-600 font-bold">
            <span>✓</span>
            <span>تم إكمال المحاضرة</span>
          </div>
        ) : (
          <button 
            onClick={() => completeLecture(lectureId)}
            className="btn btn-primary w-full"
          >
            ✓ أكملت المحاضرة
          </button>
        )}
      </div>
    </div>
  );
}

// ==================== Progress Page ====================
function ProgressPage({ progress, profile }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">📊 تقدمي</h1>
      
      {/* Stats */}
      <StatsDashboard progress={progress} />

      {/* Prayer Tracker */}
      <div className="mt-6">
        <PrayerTracker prayers={progress.prayers} onPrayer={() => {}} />
      </div>

      {/* Recent activity */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">المحاضرات المكتملة</h2>
        <p className="text-gray-500">{progress.completedLectures.length} محاضرة</p>
      </div>

      {/* Books progress */}
      <div className="mt-6">
        <h2 className="text-lg font-bold mb-3">الكتب المكتملة</h2>
        <p className="text-gray-500">{progress.completedBooks.length} كتاب</p>
      </div>
    </div>
  );
}

// ==================== Settings Page ====================
function SettingsPage({ profile, updateProfile }) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">⚙️ الإعدادات</h1>
      
      <div className="space-y-4">
        <div className="card p-4">
          <label className="block mb-2">الاسم</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => updateProfile({ name: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200"
          />
        </div>

        <div className="card p-4">
          <label className="block mb-2">الهدف اليومي (ساعات)</label>
          <input
            type="number"
            value={profile.dailyGoalHours}
            onChange={(e) => updateProfile({ dailyGoalHours: parseInt(e.target.value) })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200"
          />
        </div>

        <div className="card p-4">
          <label className="block mb-2">السمة</label>
          <select
            value={profile.theme}
            onChange={(e) => updateProfile({ theme: e.target.value })}
            className="w-full px-4 py-2 rounded-lg border border-gray-200"
          >
            <option value="light">فاتح</option>
            <option value="dark">داكن</option>
          </select>
        </div>
      </div>
    </div>
  );
}

// ==================== Bottom Navigation ====================
function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2">
      <div className="container mx-auto flex justify-around">
        <Link to="/" className="flex flex-col items-center p-2 text-emerald-600">
          <span className="text-xl">🏠</span>
          <span className="text-xs">الرئيسية</span>
        </Link>
        <Link to="/progress" className="flex flex-col items-center p-2 text-gray-500">
          <span className="text-xl">📊</span>
          <span className="text-xs">تقدمي</span>
        </Link>
        <Link to="/settings" className="flex flex-col items-center p-2 text-gray-500">
          <span className="text-xl">⚙️</span>
          <span className="text-xs">الإعدادات</span>
        </Link>
      </div>
    </nav>
  );
}

export default App;
