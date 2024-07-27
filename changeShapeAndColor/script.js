document.addEventListener("DOMContentLoaded", function () {
    let shapeBtn = document.getElementById("shape");
    let elem = document.getElementById("elem");
    let colorBtn = document.getElementById("color");
    let shapeNameDisplay = document.querySelector('#shape-name');
  
    // Define shape names and their corresponding CSS clip-path values
    let shapes = {
      triangle: "polygon(50% 0%, 0% 100%, 100% 100%)",
      circle: "circle(50% at 50% 50%)",
      ellipse: "ellipse(25% 40% at 50% 50%)",
      diamond: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
      rectangle: "inset(0% 0% 0% 0% round 0%)",
      square: "inset(0% 25% 0% 25% round 0%)",
      star: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      hexagon: "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
      parallelogram: "polygon(25% 0%, 75% 0%, 100% 100%, 0% 100%)",
      pentagon: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
      octagon: "polygon(50% 0%, 75% 25%, 100% 50%, 75% 75%, 50% 100%, 25% 75%, 0% 50%, 25% 25%)",
      cross: "polygon(25% 0%, 75% 0%, 75% 25%, 100% 25%, 100% 75%, 75% 75%, 75% 100%, 25% 100%, 25% 75%, 0% 75%, 0% 25%, 25% 25%)",
      heart: "polygon(50% 0%, 58% 6%, 50% 14%, 42% 6%)"
    };
  
    // Get the names of the shapes
    let shapeNames = Object.keys(shapes);
  
    shapeBtn.addEventListener("click", function () {
      // Randomly select a shape name
      let randomShapeName = shapeNames[Math.floor(Math.random() * shapeNames.length)];
      // Get the CSS value for the selected shape
      let currShape = shapes[randomShapeName];
      // Apply the CSS value to the element
      elem.style.clipPath = currShape;
      // Display the shape name
      shapeNameDisplay.innerHTML = `The current shape is ${randomShapeName.charAt(0).toUpperCase() + randomShapeName.slice(1)}`;
    });
  
    colorBtn.addEventListener("click", function () {
      let GenCode = "0123456789ABCDEF";
      let hex = "#";
      for (let i = 0; i < 6; i++) {
        let traverser = Math.floor(Math.random() * 16);
        hex += GenCode[traverser];
      }
      elem.style.backgroundColor = hex;
    });
  });
  