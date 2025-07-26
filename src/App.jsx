import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './acceuil/Navbar';
import ThreeDCharacter from './acceuil/ThreeDCharacter';
import MainContent from './acceuil/MainContent';

function App() {
	const [scrollProgress, setScrollProgress] = useState(0);
	const [currentSection, setCurrentSection] = useState(0);

	useEffect(() => {
		const handleScroll = (e) => {
			e.preventDefault();
			const newProgress = (scrollProgress + (e.deltaY > 0 ? 0.02 : -0.02));
			setScrollProgress(newProgress < 0 ? 1 + newProgress : newProgress % 1);
		};

		window.addEventListener('wheel', handleScroll, { passive: false });
		return () => window.removeEventListener('wheel', handleScroll);
	}, [scrollProgress]);

	return (
		<div className="flex flex-col h-screen relative overflow-hidden bg-black">
			<div className="absolute inset-0 w-full h-full z-0">
				<ThreeDCharacter scrollProgress={scrollProgress} setCurrentSection={setCurrentSection} />
			</div>

			<div className="relative z-10">
				<Navbar />
				<MainContent 
					currentSection={currentSection}
					scrollProgress={scrollProgress}
					setCurrentSection={setCurrentSection}
				/>
			</div>
		</div>
	);
}

export default App;
