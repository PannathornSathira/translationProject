import React from 'react';
import { useLocation } from "react-router-dom";
import './History.css';

function History() {
  const location = useLocation();
  const engwords = new URLSearchParams(location.search).get("engwords");

  const parseWordsList = (words) => {
    try {
      return JSON.parse(decodeURIComponent(words));
    } catch (error) {
      console.error('Error parsing words list:', error);
      return [];
    }
  };

  const wordsList = parseWordsList(engwords);
  const formattedText = wordsList.map(word => `${word.input} - ${word.translated}`).join('\n');
  return (
    <div className="container">
      <h1>History</h1>
      <div className="flags">
        <div>
         This is the history of your translation. Please be aware that it will be eliminated after you close the page.
        </div>
      </div>
      <div className="history-box">
      <textarea
          value={formattedText}
          readOnly
          className="large-textarea"
          rows={10} // Adjust rows to make the textarea larger
        />
      </div>
      <a href="javascript:history.back()" className="back-button">Back</a>
    </div>
  );
}

export default History;
