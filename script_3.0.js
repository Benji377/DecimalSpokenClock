window.onload = function() {
  setInterval(transform_time, 1000);
};

function transform_time() {
  var sting = "";
  let datevar = new Date();
  var min = datevar.getMinutes();
  var hour = datevar.getHours();
  var said_min = formatMins(min);
  if (min > 30) {
    hour += 1;
  }
  var said_hour = numberToWords.toWords(hour);
  var said_time = null;
  if (!said_min) {
    said_time = said_hour.charAt(0).toUpperCase() + said_hour.slice(1);
  } else {
    said_time = said_min + " " + said_hour;
  }
  var said_date = formatDate(datevar);
  document.getElementById("times").innerHTML = said_time;
  document.getElementById("dates").innerHTML = said_date;
  setTime(datevar);
}

function formatMins(min) {
  var out = "";
  if (min == 0) {
    out = "";
  } else if (min == 15) {
    out = "Quarter past";
  } else if (min == 30) {
    out = "Half past";
  } else if (min == 45) {
    out = "Quarter to";
  } else if (min < 30) {
    out = numberToWords.toWords(min).charAt(0).toUpperCase() +
        numberToWords.toWords(min).slice(1);
    if (min == 1) {
      out = out + " minute past";
    } else {
      out = out + " minutes past";
    }
  } else if (min > 30) {
    var mins = (min - 60) * (-1);
    out = numberToWords.toWords(mins).charAt(0).toUpperCase() +
        numberToWords.toWords(mins).slice(1) + " minutes to";
  } else {
    out = "Error";
  }
  return out;
}

function formatDate(date) {
  var day = date.getDate();
  var month = date.getMonth() + 1;
  var year = date.getFullYear();
  var said_day = numberToWords.toWordsOrdinal(day).charAt(0).toUpperCase() +
              numberToWords.toWordsOrdinal(day).slice(1);
  var said_month = numberToWords.toWordsOrdinal(month).charAt(0).toUpperCase() +
              numberToWords.toWordsOrdinal(month).slice(1);
  var said_year = numberToWords.toWords(year).charAt(0).toUpperCase() +
                numberToWords.toWords(year).slice(1);
  return said_day + " / " + said_month + " / " + said_year.split(",").join("");
}

function setTime(d) {
  var day = d.getDate();
  var month = d.getMonth() + 1;
  var year = d.getFullYear();
  var time = d.toLocaleTimeString();
  document.getElementById("realtime").innerHTML = `Numeric date: ${day}/${month}/${year}, ${time}`;
}

function speakClock() {
    let speech = new SpeechSynthesisUtterance();
    speech.lang = "en";
    var spoken_string = "It is " + document.getElementById("times").innerHTML + ", of"
      + document.getElementById("dates").innerHTML;
    speech.text = spoken_string;
    window.speechSynthesis.speak(speech);
}
