import { useState } from 'react';

function App() {
  const [count, setCount] = useState(0); // Sayaç için state tanımlama

  const compTask = (uuid, isDone) => {
    // isDone değerine göre sayaçı arttırma veya azaltma
    if (isDone) {
      setCount(prevCount => prevCount + 1);
    } else {
      setCount(prevCount => prevCount - 1);
    }

    // Diğer işlemler...
  };

  return (
    <div>
      <p>Üstü çizilen kelimeler: {count}</p>
      {/* Diğer içerikler ve listeler */}
    </div>
  );
}

export default App;
