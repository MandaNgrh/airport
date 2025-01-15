function magnify(imgID, zoom) {
  const img = document.getElementById(imgID);

  /* Create magnifier glass: */
  const glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Use natural dimensions for scaling accuracy */
  const naturalWidth = img.naturalWidth;
  const naturalHeight = img.naturalHeight;

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize = `${naturalWidth * zoom}px ${naturalHeight * zoom}px`;

  const bw = 3; // Border width
  const w = glass.offsetWidth / 2;
  const h = glass.offsetHeight / 2;

  /* Add event listeners for mouse and touch movements: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);

  function moveMagnifier(e) {
    e.preventDefault();

    const pos = getCursorPos(e);
    let x = pos.x;
    let y = pos.y;

    /* Prevent the magnifier glass from being positioned outside the image: */
    x = Math.max(w / zoom, Math.min(x, img.width - w / zoom));
    y = Math.max(h / zoom, Math.min(y, img.height - h / zoom));

    /* Set the position of the magnifier glass: */
    glass.style.left = `${x - w}px`;
    glass.style.top = `${y - h}px`;

    /* Display what the magnifier glass "sees": */
    const scaleX = naturalWidth / img.width; // Scaling factor for X
    const scaleY = naturalHeight / img.height; // Scaling factor for Y

    glass.style.backgroundPosition = `-${(x * scaleX * zoom - w + bw)}px -${(y * scaleY * zoom - h + bw)}px`;
  }

  function getCursorPos(e) {
    const a = img.getBoundingClientRect();
    const x = e.pageX - a.left - window.pageXOffset;
    const y = e.pageY - a.top - window.pageYOffset;
    return { x, y };
  }
}

/* Apply the magnify effect to multiple images */
magnify("image1", 2); // Example: 2x zoom
magnify("image2", 2);
magnify("image3", 2);
magnify("image4", 2);
