document.addEventListener("DOMContentLoaded", function() {

    const leafContainer = document.createElement('div');
    leafContainer.style.position = 'fixed';
    leafContainer.style.top = '0';
    leafContainer.style.left = '0';
    leafContainer.style.width = '100%';
    leafContainer.style.height = '100%';
    leafContainer.style.pointerEvents = 'none';
    leafContainer.style.zIndex = '1000';
    document.body.appendChild(leafContainer);

    const leafColors = ['#6a7d52', '#8ca36d', '#d4a373', '#a98467'];

    function createLeaf() {
        const leaf = document.createElement('div');
        leaf.className = 'leaf';
        const startX = Math.random() * window.innerWidth;
        const size = Math.random() * 15 + 10;
        const duration = Math.random() * 5 + 8;
        
        leaf.style.left = startX + 'px';
        leaf.style.top = '-20px';
        leaf.style.width = size + 'px';
        leaf.style.height = (size * 0.7) + 'px';
        leaf.style.backgroundColor = leafColors[Math.floor(Math.random() * leafColors.length)];
        leaf.style.opacity = Math.random() * 0.6 + 0.2;
        leaf.style.position = 'fixed';
        leaf.style.borderRadius = '2px 15px';
        
        leafContainer.appendChild(leaf);

        leaf.animate([
            { transform: `translate(0, 0) rotate(0deg)` },
            { transform: `translate(${Math.random() * 200 - 100}px, ${window.innerHeight + 100}px) rotate(${Math.random() * 1000}deg)` }
        ], {
            duration: duration * 1000,
            easing: 'linear'
        }).onfinish = () => leaf.remove();
    }
    setInterval(createLeaf, 600);

    const observerOptions = {
        threshold: 0.15, 
        rootMargin: "0px 0px -50px 0px" 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                
            } else {
                
                entry.target.classList.remove('reveal');
            }
        });
    }, observerOptions);

    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        observer.observe(card);
    });
});
