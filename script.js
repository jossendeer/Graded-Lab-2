// Jossen Deer (2001616)
// Web Programming UM2
// Graded Lab #2 - Rent Receipt Page - https://jossendeer.github.io/Graded-Lab-2/

// Simple JS placeholders for Graded Lab 2
document.querySelectorAll('.action-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    alert(`You clicked the ${btn.textContent} button.`);
  });
});
