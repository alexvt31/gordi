import { memories } from './data.js';

function createMemoryCard(memory, index) {
	return `
		<div class="memory-card" data-index="${index}">
			<img src="${memory.image}" alt="${memory.description}" class="memory-image">
			<div class="memory-description">
				<p>${memory.description}</p>
			</div>
		</div>
	`;
}

function loadMemories() {
	const grid = document.getElementById('memoryGrid');
	grid.innerHTML = memories.map(createMemoryCard).join('');
	applyRandomPostItLook();
}

function applyRandomPostItLook() {
	const cards = document.querySelectorAll('.memory-card');
	const pastelColors = [
		'rgba(255, 245, 157, 0.45)', // soft yellow
		'rgba(187, 222, 251, 0.45)', // soft blue
		'rgba(200, 230, 201, 0.45)', // soft green
		'rgba(255, 204, 188, 0.45)', // soft coral
		'rgba(225, 190, 231, 0.45)', // soft purple
		'rgba(255, 236, 179, 0.45)'  // soft amber
	];
	cards.forEach((card, i) => {
		const rotateDeg = (Math.random() * 4 - 2).toFixed(2); // -2deg to 2deg
		const marginTop = Math.floor(Math.random() * 12); // 0-12px
		const marginBottom = Math.floor(Math.random() * 10); // 0-10px
		const bgColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
		card.style.setProperty('--rotate', rotateDeg + 'deg');
		card.style.marginTop = marginTop + 'px';
		card.style.marginBottom = (40 + marginBottom) + 'px';
		card.style.background = `linear-gradient(180deg, ${bgColor}, rgba(255,255,255,0.92))`;
	});
}

function createFloatingHearts() {
	const heartsContainer = document.getElementById('hearts');
	const heartSymbols = ['💕', '❤️', '💖', '💗', '💙', '💜', '✨', '🌟', '💫'];
	
	// Create floating particles
	for (let i = 0; i < 25; i++) {
		const heart = document.createElement('div');
		heart.className = 'heart';
		heart.textContent = heartSymbols[Math.floor(Math.random() * heartSymbols.length)];
		heart.style.left = Math.random() * 100 + '%';
		heart.style.top = Math.random() * 100 + '%';
		heart.style.animationDelay = Math.random() * 8 + 's';
		heart.style.animationDuration = (Math.random() * 4 + 6) + 's';
		heart.style.fontSize = (Math.random() * 8 + 16) + 'px';
		heart.style.opacity = Math.random() * 0.6 + 0.2;
		heartsContainer.appendChild(heart);
	}
	
	// Add some sparkle effects
	for (let i = 0; i < 15; i++) {
		const sparkle = document.createElement('div');
		sparkle.className = 'sparkle';
		sparkle.textContent = '✨';
		sparkle.style.position = 'absolute';
		sparkle.style.left = Math.random() * 100 + '%';
		sparkle.style.top = Math.random() * 100 + '%';
		sparkle.style.fontSize = (Math.random() * 6 + 12) + 'px';
		sparkle.style.opacity = Math.random() * 0.4 + 0.1;
		sparkle.style.animation = `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`;
		sparkle.style.animationDelay = Math.random() * 5 + 's';
		heartsContainer.appendChild(sparkle);
	}
}

function handleScroll() {
	const cards = document.querySelectorAll('.memory-card');
	const scrollTransition = document.getElementById('scrollTransition');
	const scrollIndicator = document.getElementById('scrollIndicator');
	
	// Animación de las tarjetas
	cards.forEach((card, index) => {
		const cardTop = card.offsetTop;
		const cardHeight = card.offsetHeight;
		const windowTop = window.scrollY;
		const windowBottom = windowTop + window.innerHeight;
		if (windowBottom > cardTop + cardHeight * 0.2 && windowTop < cardTop + cardHeight) {
			if (!card.classList.contains('visible')) {
				setTimeout(() => { card.classList.add('visible'); }, index % 8 * 120);
			}
		} else {
			card.classList.remove('visible');
		}
	});
	
	// Efecto de transición negra
	if (scrollTransition) {
		const documentHeight = document.documentElement.scrollHeight;
		const windowHeight = window.innerHeight;
		const scrollTop = window.scrollY;
		const scrollPercent = scrollTop / (documentHeight - windowHeight);
		
		// Ajustar porcentajes según el dispositivo
		const isMobile = window.innerWidth <= 768;
		const startPercent = isMobile ? 0.96 : 0.85; // Móvil mucho más tarde
		const endPercent = isMobile ? 0.99 : 0.95;   // Móvil mucho más tarde
		
		// Comenzar a mostrar gradiente muy sutil
		if (scrollPercent > startPercent) {
			scrollTransition.classList.add('fade-in');
			
			// Activar transición completa
			if (scrollPercent > endPercent) {
				scrollTransition.classList.add('active');
			} else {
				scrollTransition.classList.remove('active');
			}
		} else {
			scrollTransition.classList.remove('fade-in');
			scrollTransition.classList.remove('active');
		}
	}
	
	// Controlar el indicador de scroll
	if (scrollIndicator) {
		const documentHeight = document.documentElement.scrollHeight;
		const windowHeight = window.innerHeight;
		const scrollTop = window.scrollY;
		const scrollPercent = scrollTop / (documentHeight - windowHeight);
		
		// Ocultar indicador cuando llegue al 70% del scroll
		if (scrollPercent > 0.7) {
			scrollIndicator.classList.add('hidden');
		} else {
			scrollIndicator.classList.remove('hidden');
		}
	}
}

window.addEventListener('load', () => {
	loadMemories();
	createFloatingHearts();
	setTimeout(handleScroll, 120);
});

window.addEventListener('scroll', handleScroll);


document.documentElement.style.scrollBehavior = 'smooth'; 