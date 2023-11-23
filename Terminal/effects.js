function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function zalgo(text) {
    const zalgoChars = [
      '\u0300', '\u0301', '\u0302', '\u0303', '\u0304', '\u0305', '\u0306',
      '\u0307', '\u0308', '\u0309', '\u030A', '\u030B', '\u030C', '\u030D',
      '\u030E', '\u030F', '\u0310', '\u0311', '\u0312', '\u0313', '\u0314',
      '\u0315', '\u0316', '\u0317', '\u0318', '\u0319', '\u031A', '\u031B',
      '\u031C', '\u031D', '\u031E', '\u031F'
    ];

    let zalgoText = '';
    for (let i = 0; i < text.length; i++) {
      zalgoText += text[i];
      const numZalgo = getRandomInt(1, 3); // Adjust as needed
      for (let j = 0; j < numZalgo; j++) {
        const randomZalgoChar = zalgoChars[getRandomInt(0, zalgoChars.length - 1)];
        zalgoText += randomZalgoChar;
      }
    }

    return zalgoText;
  }

  function updateZalgoText() {
    const originalText = 'My Stuff';
    const zalgoText = zalgo(originalText);
    document.getElementById('zalgo-text').innerText = zalgoText;
  }

  setInterval(updateZalgoText, 50); // Update every second
  updateZalgoText(); // Initial update