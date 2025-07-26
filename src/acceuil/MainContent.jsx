import { useState, useEffect } from 'react';

const sections = [
	{
		id: 0,
		subtitle: 'BIENVENUE CHEZ LES CHAMPIONS',
		title: 'CLUB DES PROS DU CANAPÉ',
		description: 'OÙ NE RIEN FAIRE EST UN ART DE VIVRE ET UNE FIERTÉ NATIONALE',
		stats: [
			{ number: '10K', label: 'HEURES DE SIESTE' },
			{ number: '100%', label: 'DE TEMPS LIBRE' }
		]
	},
	{
		id: 1,
		subtitle: 'NOS ACCOMPLISSEMENTS',
		title: 'PALMARÈS DE LA FLEMME',
		description: 'DÉCOUVREZ NOS EXPERTS EN MAXIMISATION DU REPOS',
		features: ['CHAMPION DU CANAPÉ', 'MAÎTRE DU PYJAMA', 'DOCTEUR EN SIESTE']
	},
	{
		id: 2,
		subtitle: 'GRADES À DÉBLOQUER',
		title: 'DEVIENS UNE LÉGENDE',
		description: 'PLUS TU NE TRAVAILLES PAS, PLUS TU DEVIENS HÉROÏQUE',
		techSpecs: ['NIVEAU BRONZE: 1 AN', 'NIVEAU OR: 3 ANS', 'LÉGENDE: 5+ ANS']
	},
	{
		id: 3,
		subtitle: 'REJOINS L\'ÉLITE',
		title: 'CONTACTE LES MAÎTRES',
		description: 'APPRENDS L\'ART DE LA PROCRASTINATION PROFESSIONNELLE',
		contact: {
			email: 'ELITE@PRODUCAPAGE.PRO',
			phone: '+33 00 000 000'
		}
	}
];

function MainContent({ currentSection, scrollProgress, setCurrentSection }) {
	return (
		<div className="relative z-10">
			{/* Éléments verticaux gauche */}
			<div className="fixed left-8 top-32 bottom-32 flex flex-col justify-between items-center w-12">
				<div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
				<div className="rotate-90 tracking-[0.5em] text-yellow-400 text-xs writing-mode-vertical">
					SCROLLE TRANQUILLE
				</div>
				<div className="w-[1px] h-24 bg-gradient-to-b from-transparent via-yellow-400 to-transparent"></div>
			</div>

			{/* Éléments verticaux droite */}
			<div className="fixed right-8 top-32 flex flex-col items-end space-y-4">
				<div className="flex items-center space-x-2">
					<div className="w-2 h-2 rounded-full bg-yellow-400 animate-pulse"></div>
					<div className="text-xs text-yellow-400">RELAX</div>
				</div>
				<div className="h-32 w-[1px] bg-gradient-to-b from-yellow-400/50 to-transparent mx-auto"></div>
				<div className="text-xs text-gray-400 tracking-wider">
					{new Date().getFullYear()}
				</div>
			</div>

			{/* En-tête horizontale */}
			<div className="fixed top-32 left-32 right-32">
				<div className="flex justify-between items-center">
					<div className="flex items-center space-x-4">
						<div className="text-xs text-yellow-400 tracking-[0.3em]">
							NIVEAU DE FLEMME {currentSection + 1}/4
						</div>
						<div className="w-12 h-[1px] bg-gradient-to-r from-yellow-400 to-transparent"></div>
					</div>
					<div className="flex items-center space-x-8">
						{['ACCUEIL', 'GRADES', 'EXPLOITS', 'ÉLITE'].map((item, index) => (
							<div
								key={index}
								className={`text-xs tracking-[0.2em] transition-colors duration-300 ${
									currentSection === index ? 'text-yellow-400' : 'text-blue-300'
								}`}
							>
								{item}
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Contenu principal existant */}
			<div className="fixed inset-x-0 bottom-20 px-8">
				<div className="max-w-7xl mx-auto">
					<div className="flex items-end justify-between">
						{/* Texte principal à gauche */}
						<div className="text-white space-y-4 w-1/2">
							<div className="overflow-hidden">
								<p className="text-yellow-400 text-sm tracking-[0.3em] font-light mb-2 animate-slide-up">
									{sections[currentSection].subtitle}
								</p>
							</div>
							<div className="overflow-hidden">
								<h2 className="text-6xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent animate-slide-up">
									{sections[currentSection].title}
								</h2>
							</div>
							<div className="overflow-hidden max-w-md">
								<p className="text-blue-200 font-light tracking-wider animate-slide-up">
									{sections[currentSection].description}
								</p>
							</div>
						</div>

						{/* Détails à droite */}
						<div className="text-white w-1/3">
							{sections[currentSection].stats && (
								<div className="grid grid-cols-2 gap-8">
									{sections[currentSection].stats.map((stat, index) => (
										<div key={index} className="text-right">
											<div className="text-4xl font-bold text-yellow-400">{stat.number}</div>
											<div className="text-sm tracking-widest text-blue-200">{stat.label}</div>
										</div>
									))}
								</div>
							)}
							{sections[currentSection].features && (
								<div className="space-y-4 text-right">
									{sections[currentSection].features.map((feature, index) => (
										<div key={index} className="text-sm tracking-[0.2em] text-blue-200">
											<span className="text-yellow-400 mr-2">🍺</span>
											{feature}
										</div>
									))}
								</div>
							)}
							{sections[currentSection].techSpecs && (
								<div className="text-right space-y-2">
									{sections[currentSection].techSpecs.map((spec, index) => (
										<div key={index} className="inline-block px-4 py-1 border border-yellow-400/30 rounded-full text-xs tracking-wider text-yellow-400 mr-2 hover:bg-blue-900/30">
											{spec}
										</div>
									))}
								</div>
							)}
							{sections[currentSection].contact && (
								<div className="text-right space-y-4">
									<p className="text-2xl font-light text-yellow-400">{sections[currentSection].contact.email}</p>
									<p className="text-xl font-light text-blue-200">{sections[currentSection].contact.phone}</p>
								</div>
							)}
						</div>
					</div>

					{/* Indicateur de section */}
					<div className="absolute left-8 bottom-0 flex items-center space-x-4">
						{sections.map((_, index) => (
							<div
								key={index}
								className={`h-[1px] transition-all duration-300 ${
									currentSection === index ? 'w-12 bg-yellow-400' : 'w-4 bg-blue-800'
								}`}
							/>
						))}
					</div>
				</div>
			</div>

			{/* Timeline verticale */}
			<div className="fixed right-32 top-1/2 -translate-y-1/2">
				<div className="flex flex-col space-y-8">
					{sections.map((_, index) => (
						<div key={index} className="flex items-center space-x-4">
							<div className={`text-xs ${currentSection === index ? 'text-yellow-400' : 'text-blue-300'}`}>
								{(index + 1).toString().padStart(2, '0')}
							</div>
							<div
								className={`w-[1px] h-12 transition-all duration-300 ${
									currentSection === index ? 'bg-yellow-400' : 'bg-blue-800'
								}`}
							/>
						</div>
					))}
				</div>
			</div>
		</div>
	);
}

export default MainContent;
