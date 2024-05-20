import React, { useState } from 'react';
import './Engtothai.css';
import { Link, useHistory } from "react-router-dom";

function EngToThai() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [wordsList, setWordsList] = useState([]);

  const handleTranslate = async () => {
    try {
      const response = await fetch('http://127.0.0.1:5000/translateEng2thai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setWordsList([...wordsList, { input: inputText, translated: data.translated_text }]);
      setTranslatedText(data.translated_text);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };

  const serializeWordsList = (list) => {
    return encodeURIComponent(JSON.stringify(list));
  };

  return (
    <div className="container">
      <div className="header">Hello World!</div>
      <h3>Model : Bart</h3>
      <div className="flags">
        <div className="flag">
          <img src="https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg" alt="English" width="50" />
          <div>English</div>
        </div>
        <div className="flag">
          <Link to="/thai2eng">⇄</Link>
        </div>
        <div className="flag">
          <img src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Flag_of_Thailand.svg" alt="Thai" width="50" />
          <div>Thai</div>
        </div>
      </div>
      <div>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to translate"
        />
        <textarea
          value={translatedText}
          readOnly
          placeholder="Translation will appear here"
        />
      </div>
      <button onClick={handleTranslate}>Translate</button>
      <p></p>
      <Link to="/eng2thaiTransformer"><button>Change model</button></Link>
      <div className="footer">
        <Link to={`/history?engwords=${serializeWordsList(wordsList)}`}>History</Link>
        <Link to="/">Feedback</Link>
      </div>
    </div>
  );
}

export default EngToThai;
