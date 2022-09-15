import React, { useState, useEffect } from 'react';
import { MovieApi } from '../../api/index';

//parameters
const data = {
  category: 'movies',
  language: 'kannada',
  genre: 'all',
  sort: 'voting',
};

const Dashboard = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    MovieApi(data)
      .then((response) => {
        setMovies(response.data.result);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      {movies.map((data,index) => (
        <body key={index} className="antialiased font-sans">
          <div className="flex items-center justify-center mt-10">
            <div className="max-w-md md:max-w-2xl px-2">
              <div className="bg-white shadow-xl rounded-lg overflow-hidden md:flex">
                <div className="bg-cover bg-bottom h-56 md:h-auto md:w-56">
                  <img src={data.poster} alt="poster" />
                </div>
                <div>
                  <div className="p-4 md:p-5">
                    <p className="font-bold text-xl md:text-2xl">
                      {data.title}
                    </p>
                    <p className="text-gray-700 md:text-lg">
                    Genre: {data.genre}
                    </p>
                    <p className="text-gray-700 md:text-lg">
                    Director: {data.director} stars
                    </p>
                    <p className="text-gray-700 md:text-lg">
                    Staring: {data.stars[0]} 
                    </p>
                  </div>
                  <div className="p-4 md:p-5 bg-gray-100">
                    <div className="sm:flex sm:justify-between sm:items-center">
                      <div>
                        <div className="text-lg text-gray-700">
                          <span className="text-gray-900 font-bold">{data.voting}</span> Voting
                          <span className="text-gray-900 font-bold ml-1">{data.pageViews}</span> Views
                        </div>
                      </div>
                      <button className="mt-3 sm:mt-0 py-2 px-5 md:py-3 md:px-6 bg-indigo-700 hover:bg-indigo-600 font-bold text-white md:text-lg rounded-lg shadow-md">
                        Book now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      ))}
    </>
  );
};

export default Dashboard;
