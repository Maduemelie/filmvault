import React from 'react';
// import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import { StarRatings } from './StarRatings';

// function Test() {
//   const [movieRating, setMovieRating] = useState(0);
//   return (
//     <div>
//       <StarRatings
//         maxRating={10}
//         message={['Terrible', 'Bad', 'Average', 'Good', 'Excellent']}
//         onSetRating={setMovieRating}
//       />
//       <p>this movie was rated {movieRating} stars</p>
//     </div>
//   );
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRatings
      maxRating={10}
      message={['Terrible', 'Bad', 'Average', 'Good', 'Excellent']}
    />
    <Test />
    <StarRatings maxRating={10} size={15} color="red" defaultRating={3} /> */}
  </React.StrictMode>
);
