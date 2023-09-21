const movingElements = document.querySelectorAll('.movingButton');
// let easing = 0.08;

const elementsData = Array.from(movingElements).map(element => ({
    targetX: 0,
    targetY: 0,
    currentX: 0,
    currentY: 0,
    element
}));

function updateElementPosition(data) {
    const { element, targetX, targetY } = data;
    const deltaX = targetX - data.currentX;
    const deltaY = targetY - data.currentY;
    data.currentX += deltaX * easing;
    data.currentY += deltaY * easing;
    element.style.transform = `translate(${data.currentX}px, ${data.currentY}px)`;

    requestAnimationFrame(() => updateElementPosition(data));
}

function moveElement(data, mouseX, mouseY) {
    const rect = data.element.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = mouseX - centerX;
    const deltaY = mouseY - centerY;

    const maxDistance = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
    const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);

    const angle = Math.atan2(deltaY, deltaX);
    const moveX = Math.cos(angle) * distance;
    const moveY = Math.sin(angle) * distance;

    data.targetX = (moveX / maxDistance) * 10; // Adjust this value for slower movement
    data.targetY = (moveY / maxDistance) * 10; // Adjust this value for slower movement
}

function handleMouseMove(event) {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    elementsData.forEach(data => moveElement(data, mouseX, mouseY));
}

movingElements.forEach((element, index) => {
    element.addEventListener('mousemove', (event) => {
        handleMouseMove(event);
    });

    element.addEventListener('mouseleave', () => {
        elementsData[index].targetX = 0;
        elementsData[index].targetY = 0;
    });

    requestAnimationFrame(() => updateElementPosition(elementsData[index]));
});




const movingButton = document.getElementById('movingButton');
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  const easing = 0.08;
  
  function updateButtonPosition() {
      const deltaX = targetX - currentX;
      const deltaY = targetY - currentY;
      currentX += deltaX * easing;
      currentY += deltaY * easing;
      movingButton.style.transform = `translate(${currentX}px, ${currentY}px)`;
  
      requestAnimationFrame(updateButtonPosition);
  }
  
  function moveButton(event) {
      const rect = movingButton.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = event.clientX;
      const mouseY = event.clientY;
      const deltaX = mouseX - centerX;
      const deltaY = mouseY - centerY;
  
      const maxDistance = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
      const distance = Math.min(Math.sqrt(deltaX ** 2 + deltaY ** 2), maxDistance);
  
      const angle = Math.atan2(deltaY, deltaX);
      const moveX = Math.cos(angle) * distance;
      const moveY = Math.sin(angle) * distance;
  
      targetX = (moveX / maxDistance) * 10;
      targetY = (moveY / maxDistance) * 10;
  }
  
  movingButton.addEventListener('mousemove', moveButton);
  requestAnimationFrame(updateButtonPosition);
  
  movingButton.addEventListener('mouseleave', () => {
      targetX = 0;
      targetY = 0;
  });