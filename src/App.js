import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [quotes, setQuotes] = useState([]);
  const [colorIndex, setColorIndex] = useState(0);
  const colors = [
    "#16a085",
    "#27ae60",
    "#2c3e50",
    "#f39c12",
    "#e74c3c",
    "#9b59b6",
    "#FB6964",
    "#342224",
    "#472E32",
    "#BDBB99",
    "#77B1A9",
    "#73A857",
  ];
  const [index, setIndex] = useState(0);
  const [classes, setClasses] = useState([]);
  const data = async () => {
    try {
      const res = await fetch(
        "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
      );
      const resData = await res.json();
      if (resData.quotes.length > 0) {
        setQuotes(resData.quotes);
      }
    } catch (err) {
      setQuotes([
        { quote: `An Error Occurred, ${err.message}`, author: "Developer :)" },
      ]);
    }
  };
  useEffect(() => {
    data();
    quotes.length > 0 && setIndex(Math.ceil(Math.random() * quotes.length - 1));
    quotes.length > 0 &&
      setColorIndex(Math.ceil(Math.random() * colors.length - 1));
  }, []);

  const handleNext = () => {
    setIndex(Math.ceil(Math.random() * quotes.length - 1));
    quotes.length > 0 && setIndex(Math.ceil(Math.random() * quotes.length - 1));
    quotes.length > 0 &&
      setColorIndex(Math.ceil(Math.random() * colors.length - 1));

    setClasses(["opac"]);
    setTimeout(() => {
      setClasses([]);
    }, 1300);
  };

  return (
    <div className="main" style={{ backgroundColor: colors[colorIndex] }}>
      <div id="quote-box">
        <div id="text">
          <span
            style={{ color: colors[colorIndex] }}
            className={classes.join("")}
          >
            <i className="fa fa-quote-left" aria-hidden="true"></i>
            <p className="p-text">{quotes[index]?.quote}</p>
          </span>
        </div>
        <div
          id="author"
          style={{ color: colors[colorIndex] }}
          className={classes.join("")}
        >
          <p style={{ color: colors[colorIndex] }}>- {quotes[index]?.author}</p>
        </div>
        <div className="footer">
          <div id="links">
            <a
              style={{ backgroundColor: colors[colorIndex] }}
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quotes[index]?.quote}${quotes[index]?.author}`}
              id="tweet-quote"
              title="Tweet this quote!"
            >
              <i className="fa fa-twitter" aria-hidden="true"></i>
            </a>
            <a
              style={{ backgroundColor: colors[colorIndex] }}
              href={`https://www.tumblr.com/widgets/share/tool?posttype=quote&tags=quotes,freecodecamp&caption=Vince%20Lombardi&content=${quotes[index]?.quote}&canonicalUrl=https%3A%2F%2Fwww.tumblr.com%2Fbuttons&shareSource=tumblr_share_button`}
              title="Post this quote on tumblr!"
            >
              <i className="fa fa-tumblr" aria-hidden="true"></i>
            </a>
          </div>
          <div id="new-quote">
            <button
              style={{ backgroundColor: colors[colorIndex] }}
              onClick={handleNext}
            >
              New quote
            </button>
          </div>
        </div>
      </div>
      <p style={{ color: "white" }}>by Solomon</p>
    </div>
  );
}

export default App;
