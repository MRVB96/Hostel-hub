import React from 'react';

const Logo = ({ className = "w-10 h-10" }) => {
  const dx = 10;
  const dy = 5.5;
  const dh = 11;

  const proj = (x, y, z) => {
    const px = 50 + (x - y) * dx;
    const py = 65 + (x + y) * dy - z * dh;
    return `${px.toFixed(2)},${py.toFixed(2)}`;
  };

  const poly = (pts) => pts.map(p => proj(...p)).join(' ');

  const lightColor = '#d8b4fe'; // e.g. purple-300
  const darkColor = '#7e22ce';  // e.g. purple-700
  
  // The logo has light faces on the left, dark faces on top and right.
  const faces = [
    // TOP FACES (dark)
    { pts: [[0,0,5], [1,0,5], [1,1,5], [0,1,5]], fill: darkColor }, // Middle
    { pts: [[1,0,3], [3,0,3], [3,1,3], [1,1,3]], fill: darkColor }, // Right Bar
    { pts: [[3,0,4], [4,0,4], [4,1,4], [3,1,4]], fill: darkColor }, // Right Pillar
    { pts: [[0,1,3], [1,1,3], [1,3,3], [0,3,3]], fill: darkColor }, // Left Bar
    { pts: [[0,3,4], [1,3,4], [1,4,4], [0,4,4]], fill: darkColor }, // Left Pillar

    // FRONT-RIGHT FACES (x=const) -> appear on LEFT side of screen (light)
    { pts: [[1,0,0], [1,1,0], [1,1,2], [1,0,2]], fill: lightColor }, // Middle Bottom
    { pts: [[1,0,3], [1,1,3], [1,1,5], [1,0,5]], fill: lightColor }, // Middle Top
    { pts: [[4,0,0], [4,1,0], [4,1,4], [4,0,4]], fill: lightColor }, // Right Pillar
    { pts: [[1,1,2], [1,3,2], [1,3,3], [1,1,3]], fill: lightColor }, // Left Bar
    { pts: [[1,3,0], [1,4,0], [1,4,4], [1,3,4]], fill: lightColor }, // Left Pillar

    // FRONT-LEFT FACES (y=const) -> appear on RIGHT side of screen (dark)
    { pts: [[0,1,0], [1,1,0], [1,1,2], [0,1,2]], fill: darkColor }, // Middle Bottom
    { pts: [[0,1,3], [1,1,3], [1,1,5], [0,1,5]], fill: darkColor }, // Middle Top
    { pts: [[0,4,0], [1,4,0], [1,4,4], [0,4,4]], fill: darkColor }, // Left Pillar
    { pts: [[1,1,2], [3,1,2], [3,1,3], [1,1,3]], fill: darkColor }, // Right Bar
    { pts: [[3,1,0], [4,1,0], [4,1,4], [3,1,4]], fill: darkColor }, // Right Pillar
  ];

  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className}
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {faces.map((face, i) => (
        <polygon 
          key={i} 
          points={poly(face.pts)} 
          fill={face.fill} 
          stroke={face.fill}
          strokeWidth="0.5" 
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
};

export default Logo;
