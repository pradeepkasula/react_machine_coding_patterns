// <------------- Using manual calculations and scroll event listeners ------> //

import { useState, useEffect } from 'react';
import '../App.css';

function InfiniteScroll() {
  const [images, setImages] = useState(
    Array.from({ length: 5 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/200/200?random=${i + 1}`,
    }))
  );
  const [isFetching, setIsFetching] = useState(false);
  const [nextImageId, setNextImageId] = useState(6);

  const fetchImages = () => {
    setIsFetching(true);

    // Fetch a batch of new images
    setTimeout(() => {
      const newImages = Array.from({ length: 5 }, (_, i) => ({
        // 6+0 to 6+4 (6 to 10)
        id: nextImageId + i,
        url: `https://picsum.photos/200/200?random=${nextImageId + i}`,
      }));

      setImages((currentImages) => [...currentImages, ...newImages]);
      // 6+5 (which is 11, so in the next series it will be 11+0 to 11+4)
      setNextImageId(nextImageId + 5);
      setIsFetching(false);
    }, 1000);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100 &&
      !isFetching
    ) {
      //if the scroll has reached near to the rock bottom then we should call our core logic function to fetch newImages
      fetchImages();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [nextImageId, isFetching, handleScroll]);

  return (
    <div className='container'>
      <div className='image-container'>
        {images.map((image) => (
          <img
            key={image.id}
            src={image.url}
            alt={`Random ${image.id}`}
            className='image'
          />
        ))}
      </div>
      {isFetching && (
        <div className='loader'>
          <h2>Loading...</h2>
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;

// <------------- Using Intersection Observer API ------> //

// import { useState, useEffect, useRef, useCallback } from 'react';
// import '../App.css';

// function InfiniteScroll() {
//   const [images, setImages] = useState(
//     Array.from({ length: 5 }, (_, i) => ({
//       id: i + 1,
//       url: `https://picsum.photos/200/200?random=${i + 1}`,
//     }))
//   );
//   const [isFetching, setIsFetching] = useState(false);
//   const [nextImageId, setNextImageId] = useState(6);

//   const loaderRef = useRef(null); // Ref for the observer target

//   const fetchImages = useCallback(() => {
//     setIsFetching(true);
//     setTimeout(() => {
//       const newImages = Array.from({ length: 5 }, (_, i) => ({
//         id: nextImageId + i,
//         url: `https://picsum.photos/200/200?random=${nextImageId + i}`,
//       }));
//       setImages((current) => [...current, ...newImages]);
//       setNextImageId((prev) => prev + 5);
//       setIsFetching(false);
//     }, 1000);
//   }, [nextImageId]);

//   useEffect(() => {
//     const observer = new window.IntersectionObserver(
//       (entries) => {
//         if (entries[0].isIntersecting && !isFetching) {
//           fetchImages();
//         }
//       },
//       {
//         root: null,
//         rootMargin: '0px',
//         threshold: 0.1,
//       }
//     );
//     if (loaderRef.current) {
//       observer.observe(loaderRef.current);
//     }
//     return () => {
//       if (loaderRef.current) observer.unobserve(loaderRef.current);
//       observer.disconnect();
//     };
//   }, [fetchImages, isFetching]);

//   return (
//     <div className='container'>
//       <div className='image-container'>
//         {images.map((image) => (
//           <img
//             key={image.id}
//             src={image.url}
//             alt={`Random ${image.id}`}
//             className='image'
//           />
//         ))}
//       </div>
//       {/* Sentinel div observed by IntersectionObserver */}
//       <div ref={loaderRef} className='loader'>
//         {isFetching && <h2>Loading...</h2>}
//       </div>
//     </div>
//   );
// }

// export default InfiniteScroll;
