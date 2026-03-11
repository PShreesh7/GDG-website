// Mobile Menu Toggle
function toggleMenu() {
  const menu = document.getElementById("mobileMenu");
  menu.classList.toggle("open");
}

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// YouTube thumbnail auto-loader
function getYouTubeVideoID(url) {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return (match && match[2].length === 11) ? match[2] : null;
}

document.querySelectorAll('.yt-thumbnail').forEach(function (img) {
  const url = img.getAttribute('data-url');
  const videoID = getYouTubeVideoID(url);
  if (videoID) {
    img.src = `https://img.youtube.com/vi/${videoID}/hqdefault.jpg`;
    img.style.borderRadius = '1.5rem';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
  }
});

// =============================================
//  HERO CARD CRISS-CROSS ANIMATION (REFINED)
// =============================================
(function initCardAnimation() {
  var c1 = document.getElementById('card1');
  var c2 = document.getElementById('card2');
  var c3 = document.getElementById('card3');
  if (!c1 || !c2 || !c3) return;

  // Three named "slot" positions centered and fanned
  var slots = [
    { x: '-85%', rotate: '-18deg', zIndex: 2, scale: 0.9 },   // slot 0: left
    { x: '-50%', rotate: '0deg', zIndex: 5, scale: 1.05 },  // slot 1: center
    { x: '-15%', rotate: '18deg', zIndex: 2, scale: 0.9 }    // slot 2: right
  ];

  // slotOf[cardIndex] = which slot that card currently occupies
  var slotOf = [0, 1, 2]; // card1→left, card2→center, card3→right

  function applySlots() {
    var cards = [c1, c2, c3];
    cards.forEach(function (card, i) {
      var s = slots[slotOf[i]];
      card.style.transform = 'translateX(' + s.x + ') rotate(' + s.rotate + ') scale(' + s.scale + ')';
      card.style.zIndex = s.zIndex;
    });
  }

  // Place cards immediately on load
  [c1, c2, c3].forEach(function (c) {
    c.style.transition = 'none';
  });
  applySlots();
  void c1.offsetWidth; // Force reflow
  [c1, c2, c3].forEach(function (c) {
    c.style.transition = 'all 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
  });

  setInterval(function () {
    slotOf = slotOf.map(function (v) { return (v + 1) % 3; });

    // During the crossing transit, raise all cards to avoid clipping
    [c1, c2, c3].forEach(function (c) { c.style.zIndex = 10; });

    var cards = [c1, c2, c3];
    cards.forEach(function (card, i) {
      var s = slots[slotOf[i]];
      card.style.transform = 'translateX(' + s.x + ') rotate(' + s.rotate + ') scale(' + s.scale + ')';
    });

    // Depth swap at midpoint (600ms for 1.2s trans)
    setTimeout(applySlots, 600);
  }, 3500);
})();
