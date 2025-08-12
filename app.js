const { useState, useEffect, useRef, useMemo } = React;

// --- Helper Functions & Initial Data ---

// localStorage helper functions
const STORAGE_KEY = 'wheelOfGains_workouts';
const STORAGE_VERSION_KEY = 'wheelOfGains_version';
const CURRENT_VERSION = '1.0';

const saveWorkoutsToStorage = (workouts) => {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(workouts));
        localStorage.setItem(STORAGE_VERSION_KEY, CURRENT_VERSION);
    } catch (error) {
        console.warn('Failed to save workouts to localStorage:', error);
    }
};

const loadWorkoutsFromStorage = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);
        const version = localStorage.getItem(STORAGE_VERSION_KEY);
        
        if (!saved || version !== CURRENT_VERSION) {
            return null;
        }
        
        const workouts = JSON.parse(saved);
        
        // Validate data structure
        if (!Array.isArray(workouts)) {
            return null;
        }
        
        // Validate each workout object
        for (const workout of workouts) {
            if (!workout.id || !workout.name || !workout.url || typeof workout.multiplier !== 'number') {
                return null;
            }
            // Add default category if missing (for backward compatibility)
            if (!workout.category) {
                workout.category = DEFAULT_CATEGORIES[0];
            }
        }
        
        return workouts;
    } catch (error) {
        console.warn('Failed to load workouts from localStorage:', error);
        return null;
    }
};

const parseWorkoutString = (workoutStr) => {
    const multiplierRegex = /\s*x(\d*\.?\d+)\s*$/;
    const match = workoutStr.match(multiplierRegex);
    if (match) {
        const name = workoutStr.replace(multiplierRegex, '').trim();
        const multiplier = Math.round(parseFloat(match[1]));
        return { name, multiplier: Math.max(1, multiplier) };
    }
    return { name: workoutStr.trim(), multiplier: 1 };
};

const createWorkoutUrl = (name) => `https://www.google.com/search?q=${encodeURIComponent(name + ' workout')}`;

// Default categories
const DEFAULT_CATEGORIES = [
    { id: 'strength', name: 'Strength Training', color: '#3b82f6' },
    { id: 'cardio', name: 'Cardio', color: '#ef4444' },
    { id: 'flexibility', name: 'Flexibility', color: '#22c55e' },
    { id: 'sports', name: 'Sports', color: '#f97316' },
    { id: 'recovery', name: 'Recovery', color: '#8b5cf6' },
    { id: 'custom', name: 'Custom', color: '#14b8a6' }
];

const initialWorkoutStrings = [
    "Simple & Sinister", "ABC x3", "AXE Snatch", "AXE KB Swing",
    "Snatch Test x2", "AXE Macebell Touch Down x.5",
    "AXE Macebell Uppercuts x.5", "Deadlift"
];

const initialMasterWorkouts = initialWorkoutStrings.map(str => {
    const parsed = parseWorkoutString(str);
    // Assign default categories to initial workouts
    const defaultCategory = DEFAULT_CATEGORIES[0]; // Strength Training
    return { 
        id: crypto.randomUUID(), 
        ...parsed, 
        url: createWorkoutUrl(parsed.name),
        category: defaultCategory
    };
});

// Updated color palette for a more classic, bright look
const COLORS = ["#3b82f6", "#22c55e", "#ef4444", "#f97316", "#8b5cf6", "#d946ef", "#14b8a6", "#eab308"];


// --- React Components ---

const KettlebellIcon = () => (
    React.createElement("svg", {className: "w-5 h-5", viewBox: "0 0 24 24", fill: "currentColor"},
        React.createElement("path", {d: "M6 9H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1h1a3 3 0 0 1 3 3v1Zm12 0h-2V8a3 3 0 0 1 3-3h1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2Zm-2.92 2h-6.16a5.51 5.51 0 0 0-5.46 6A5.55 5.55 0 0 0 9.01 22a5.67 5.67 0 0 0 5.53-4.59A5.52 5.52 0 0 0 15.08 11Z M9 5a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v1h4V5ZM15 5v1h4V5a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1Z"})
    )
);

const CategoryBadge = ({ category }) => (
    React.createElement("div", {
        className: "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium text-white mr-2",
        style: { backgroundColor: category.color }
    }, category.name)
);

const FilterPanel = ({ categories, activeFilters, onFilterChange }) => {
    const toggleFilter = (categoryId) => {
        const newFilters = activeFilters.includes(categoryId) 
            ? activeFilters.filter(id => id !== categoryId)
            : [...activeFilters, categoryId];
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        onFilterChange([]);
    };

    return React.createElement("div", {className: "bg-white p-4 rounded-lg shadow-sm border border-slate-200 mb-4 lg:mb-6"},
        React.createElement("h3", {className: "text-lg font-bold text-slate-800 mb-3"}, "Filter by Category"),
        React.createElement("div", {className: "flex flex-wrap gap-2 mb-3"},
            categories.map(category => 
                React.createElement("button", {
                    key: category.id,
                    onClick: () => toggleFilter(category.id),
                    className: `px-3 py-2 rounded-md text-sm font-medium transition-colors min-h-[44px] ${
                        activeFilters.includes(category.id) 
                            ? 'text-white shadow-md'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`,
                    style: activeFilters.includes(category.id) ? { backgroundColor: category.color } : {}
                }, category.name)
            )
        ),
        activeFilters.length > 0 && React.createElement("button", {
            onClick: clearFilters,
            className: "text-sm text-slate-500 hover:text-slate-700 font-medium min-h-[44px] px-2"
        }, "Clear All Filters")
    );
};

const Wheel = ({ displayWorkouts, onSpinFinish }) => {
    const canvasRef = useRef(null);
    const [isSpinning, setIsSpinning] = useState(false);
    const [currentRotation, setCurrentRotation] = useState(0);

    // Responsive canvas sizing
    const getCanvasSize = () => {
        if (typeof window === 'undefined') return 600;
        const screenWidth = window.innerWidth;
        if (screenWidth < 640) return 300; // Small mobile
        if (screenWidth < 768) return 400; // Large mobile
        if (screenWidth < 1024) return 500; // Tablet
        return 600; // Desktop
    };

    const [canvasSize, setCanvasSize] = useState(getCanvasSize);

    // Update canvas size on window resize
    useEffect(() => {
        const handleResize = () => {
            setCanvasSize(getCanvasSize());
        };
        
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const numOptions = displayWorkouts.length;
        const arcSize = numOptions > 0 ? (2 * Math.PI) / numOptions : 0;
        const size = canvasSize; // Use responsive size
        const center = size / 2;
        const radius = center - 2;

        // Update canvas dimensions
        canvas.width = size;
        canvas.height = size;

        ctx.clearRect(0, 0, size, size);
        ctx.save();
        ctx.translate(center, center);
        ctx.rotate(currentRotation);
        ctx.translate(-center, -center);

        if (numOptions === 0) {
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, 2 * Math.PI);
            ctx.fillStyle = '#f8fafc';
            ctx.fill();
            ctx.strokeStyle = '#e2e8f0';
            ctx.lineWidth = 2;
            ctx.stroke();

            ctx.fillStyle = '#64748b';
            ctx.font = `500 ${size * 0.07}px 'Inter'`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('Add Workouts', center, center);
            ctx.restore();
            return;
        }

        for (let i = 0; i < numOptions; i++) {
            const angle = i * arcSize;
            // Draw wedge
            ctx.beginPath();
            ctx.arc(center, center, radius, angle, angle + arcSize);
            ctx.lineTo(center, center);
            ctx.closePath();
            ctx.fillStyle = COLORS[i % COLORS.length];
            ctx.fill();
            
            // Draw separator lines
            ctx.save();
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.lineTo(center + Math.cos(angle) * radius, center + Math.sin(angle) * radius);
            ctx.stroke();
            ctx.restore();

            // Draw text
            ctx.save();
            ctx.fillStyle = 'white';
            const textAngle = angle + arcSize / 2;
            const textRadius = radius * 0.6;
            const textX = center + Math.cos(textAngle) * textRadius;
            const textY = center + Math.sin(textAngle) * textRadius;
            
            ctx.translate(textX, textY);
            let rotation = textAngle;
            if (rotation > Math.PI / 2 && rotation < 3 * Math.PI / 2) {
                rotation += Math.PI;
            }
            ctx.rotate(rotation);

            const text = displayWorkouts[i].name;
            const maxTextWidth = radius * 0.45;
            let fontSize = size * 0.035;
            ctx.font = `600 ${fontSize}px 'Inter'`;
            while (ctx.measureText(text).width > maxTextWidth && fontSize > 8) {
                fontSize--;
                ctx.font = `600 ${fontSize}px 'Inter'`;
            }
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(text, 0, 0);
            ctx.restore();
        }
        ctx.restore();

        // Add a center circle for a cleaner look
        ctx.beginPath();
        ctx.arc(center, center, size * 0.1, 0, 2 * Math.PI);
        ctx.fillStyle = '#1e293b'; // Slate 800
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 4;
        ctx.stroke();

    }, [displayWorkouts, currentRotation, canvasSize]);

    const handleSpin = () => {
        if (isSpinning || displayWorkouts.length === 0) return;
        setIsSpinning(true);

        const totalRotations = Math.floor(Math.random() * 5) + 8;
        const randomStopAngle = Math.random() * 2 * Math.PI;
        const targetRotation = totalRotations * 2 * Math.PI + randomStopAngle;
        
        const start = performance.now();
        const duration = 7000;

        const animate = (time) => {
            const elapsed = time - start;
            if (elapsed >= duration) {
                const finalRotation = targetRotation % (2 * Math.PI);
                setCurrentRotation(finalRotation);
                finishSpin(finalRotation);
                return;
            }
            const progress = elapsed / duration;
            const easedProgress = 1 - Math.pow(1 - progress, 4);
            setCurrentRotation(targetRotation * easedProgress);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
    };

    const finishSpin = (finalRotation) => {
        const numOptions = displayWorkouts.length;
        const arcSize = (2 * Math.PI) / numOptions;
        const finalAngle = (2 * Math.PI - (finalRotation % (2 * Math.PI)) + (1.5 * Math.PI)) % (2 * Math.PI);
        const winnerIndex = Math.floor(finalAngle / arcSize);
        const winner = displayWorkouts[winnerIndex];
        
        onSpinFinish(winner);
        setIsSpinning(false);
    };

    return (
        <div className="lg:col-span-2 bg-white p-2 sm:p-4 lg:p-6 rounded-lg shadow-sm border border-slate-200">
            <div className="relative w-full pt-[100%] h-0">
                <div className="absolute left-1/2 top-[-10px] sm:top-[-15px] -translate-x-1/2 w-0 h-0 border-l-[10px] sm:border-l-[15px] border-l-transparent border-r-[10px] sm:border-r-[15px] border-r-transparent border-t-[15px] sm:border-t-[25px] border-t-slate-800 z-10"></div>
                <canvas ref={canvasRef} width={canvasSize} height={canvasSize} className="absolute top-0 left-0 w-full h-full"></canvas>
                <button 
                    onClick={handleSpin} 
                    disabled={isSpinning}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-slate-800 text-white border-4 border-white font-semibold cursor-pointer z-20 flex items-center justify-center text-sm sm:text-lg uppercase transition-all ease-in-out shadow-lg hover:not-disabled:bg-slate-700 disabled:cursor-not-allowed disabled:bg-slate-400 font-['Inter'] tracking-wider min-h-[44px] min-w-[44px]"
                >
                    SPIN
                </button>
            </div>
        </div>
    );
};

const WorkoutManager = ({ workouts, setWorkouts }) => {
    const addWorkout = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.workoutName.value.trim();
        const url = form.workoutUrl.value.trim();
        const multiplier = parseInt(form.workoutMultiplier.value, 10) || 1;
        const categoryId = form.workoutCategory.value;
        const category = DEFAULT_CATEGORIES.find(cat => cat.id === categoryId) || DEFAULT_CATEGORIES[0];
        
        if (name && url) {
            setWorkouts(prev => [...prev, { 
                id: crypto.randomUUID(), 
                name, 
                url, 
                multiplier,
                category
            }]);
            form.reset();
            form.workoutMultiplier.value = 1;
            form.workoutCategory.value = DEFAULT_CATEGORIES[0].id;
        }
    };

    const deleteWorkout = (id) => {
        setWorkouts(prev => prev.filter(w => w.id !== id));
    };

    return (
        <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-xl sm:text-2xl text-center mb-4 text-slate-800 font-bold uppercase tracking-widest">Workout Arsenal</h2>
            
            <div className="flex-grow overflow-y-auto pr-2 mb-6 max-h-[250px] sm:max-h-[300px] lg:max-h-none workout-list">
                {workouts.length === 0 ? (
                    <div className="text-center py-8 sm:py-10 border-2 border-dashed border-slate-200 rounded-md">
                      <p className="text-slate-500 text-sm sm:text-base">Your arsenal is empty.</p>
                      <p className="text-slate-400 text-xs sm:text-sm">Add a workout below.</p>
                    </div>
                ) : (
                    <div className="space-y-2">
                        {workouts.map((workout) => (
                            <div key={workout.id} className="flex items-center justify-between bg-slate-50 p-2 sm:p-3 rounded-md border border-slate-200">
                                <div className="flex-grow truncate pr-2">
                                    <div className="flex items-center gap-2 mb-1">
                                        <CategoryBadge category={workout.category} />
                                        <span className="font-medium text-slate-700 text-sm sm:text-base truncate">{workout.name} <span className="text-slate-500 text-xs font-semibold">(x{workout.multiplier})</span></span>
                                    </div>
                                </div>
                                <button onClick={() => deleteWorkout(workout.id)} className="flex-shrink-0 text-slate-400 hover:text-red-500 transition-colors p-2 sm:p-1 rounded-full min-h-[44px] min-w-[44px] sm:min-h-auto sm:min-w-auto">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div>
                <h3 className="text-lg sm:text-xl text-center mb-4 text-slate-800 font-bold uppercase tracking-widest">Add Challenge</h3>
                <form onSubmit={addWorkout} className="space-y-3">
                    <input type="text" name="workoutName" placeholder="Workout Name" required className="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]" />
                    <input type="url" name="workoutUrl" placeholder="Workout URL" required className="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]" />
                    <input type="number" name="workoutMultiplier" defaultValue="1" min="1" step="1" required title="Repetitions on Wheel" className="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]" />
                    <select name="workoutCategory" defaultValue={DEFAULT_CATEGORIES[0].id} className="mt-1 block w-full bg-slate-50 border border-slate-300 rounded-md shadow-sm py-3 sm:py-2 px-3 text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-500 focus:border-slate-500 min-h-[44px]">
                        {DEFAULT_CATEGORIES.map(category => 
                            React.createElement("option", {key: category.id, value: category.id}, category.name)
                        )}
                    </select>
                    <button type="submit" className="w-full flex justify-center items-center gap-2 py-3 sm:py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-semibold text-white bg-slate-800 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 transition-colors min-h-[44px]">
                        <KettlebellIcon /> Add to Arsenal
                    </button>
                </form>
            </div>
        </div>
    );
};

const ResultModal = ({ winner, onClose }) => {
    if (!winner) return null;

    return (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
            <div className="bg-white rounded-lg shadow-2xl p-6 sm:p-8 text-center max-w-md w-full transform transition-all scale-100">
                <h2 className="text-xs sm:text-sm font-bold text-teal-600 uppercase tracking-widest">Your Destiny Awaits...</h2>
                <p className="text-2xl sm:text-4xl font-bold text-slate-800 my-3 break-words">{winner.name}</p>
                <div className="mt-6 flex flex-col gap-3 justify-center">
                    <button onClick={() => { window.open(winner.url, '_blank'); onClose(); }} className="w-full py-3 sm:py-2.5 px-6 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 min-h-[44px]">Start Workout!</button>
                    <button onClick={onClose} className="w-full py-3 sm:py-2.5 px-6 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-md transition-colors focus:outline-none min-h-[44px]">Spin Again</button>
                </div>
            </div>
        </div>
    );
};

function App() {
    const [masterWorkouts, setMasterWorkouts] = useState(() => {
        // Try to load from localStorage first, fallback to initial data
        const savedWorkouts = loadWorkoutsFromStorage();
        return savedWorkouts || initialMasterWorkouts;
    });
    const [winner, setWinner] = useState(null);
    const [activeFilters, setActiveFilters] = useState([]);
    
    // Save workouts to localStorage whenever they change
    useEffect(() => {
        saveWorkoutsToStorage(masterWorkouts);
    }, [masterWorkouts]);

    // Filter workouts based on active filters
    const getFilteredWorkouts = (workouts, filters) => {
        if (filters.length === 0) return workouts;
        return workouts.filter(workout => 
            filters.includes(workout.category.id)
        );
    };
    
    const displayWorkouts = useMemo(() => {
        const filteredWorkouts = getFilteredWorkouts(masterWorkouts, activeFilters);
        const expanded = [];
        filteredWorkouts.forEach(workout => {
            for (let i = 0; i < workout.multiplier; i++) {
                expanded.push(workout);
            }
        });
        for (let i = expanded.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [expanded[i], expanded[j]] = [expanded[j], expanded[i]];
        }
        return expanded;
    }, [masterWorkouts, activeFilters]);

    return React.createElement('div', {className: "min-h-screen bg-slate-100 font-['Inter'] text-slate-800"},
        React.createElement('style', {}, `
            .workout-list::-webkit-scrollbar { width: 8px; }
            .workout-list::-webkit-scrollbar-track { background: #e2e8f0; border-radius: 10px; }
            .workout-list::-webkit-scrollbar-thumb { background: #94a3b8; border-radius: 10px; }
            .workout-list::-webkit-scrollbar-thumb:hover { background: #64748b; }
        `),
        
        React.createElement('div', {className: "container mx-auto p-4 md:p-6 lg:p-8 max-w-7xl"},
            React.createElement('header', {className: "text-center mb-8 lg:mb-10"},
                React.createElement('h1', {className: "text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 uppercase"},
                    React.createElement('span', {className: "block"}, "Wheel"),
                    React.createElement('span', {className: "block text-teal-600 -mt-1 sm:-mt-2 md:-mt-3"}, "Of Gains")
                ),
                React.createElement('p', {className: "text-slate-500 mt-3 text-base sm:text-lg px-4"}, "Spin the wheel to choose your path to glory!")
            ),

            React.createElement('main', {className: "grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6"},
                React.createElement('div', {className: "lg:col-span-3"},
                    React.createElement(FilterPanel, {
                        categories: DEFAULT_CATEGORIES, 
                        activeFilters: activeFilters, 
                        onFilterChange: setActiveFilters
                    })
                ),
                React.createElement(Wheel, {displayWorkouts: displayWorkouts, onSpinFinish: setWinner}),
                React.createElement(WorkoutManager, {workouts: masterWorkouts, setWorkouts: setMasterWorkouts})
            )
        ),

        winner && React.createElement(ResultModal, {winner: winner, onClose: () => setWinner(null)})
    );
}

// Render the app
ReactDOM.render(React.createElement(App), document.getElementById('root'));