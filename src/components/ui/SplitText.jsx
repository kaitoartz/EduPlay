import React from 'react';

const SplitText = ({ text, className = "" }) => {
  const words = text.split(" ");
  return (
    <span className={className}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split("").map((char, cIdx) => (
            <span key={cIdx} className="inline-block overflow-hidden relative leading-none">
              <span className="split-char inline-block translate-y-full opacity-0">
                {char}
              </span>
            </span>
          ))}
        </span>
      ))}
    </span>
  );
};

export default SplitText;
