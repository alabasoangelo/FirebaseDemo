import { useNavigate, useParams } from "react-router-dom";
import { getDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/config';
import { useEffect, useState } from 'react';

export default function Article() {
  const { urlId } = useParams(); 
  const navigate = useNavigate(); 

  const [article, setArticle] = useState(null);

  useEffect(() => {
    const ref = doc(db, 'articles', urlId); 
    getDoc(ref)
      .then((snapshot) => {
        if (snapshot.exists()) {
          setArticle(snapshot.data());
        } else {
          console.log("No document found!");
          navigate('/'); 
        }
      })
      .catch((error) => {
        console.error("Error fetching document:", error);
        navigate('/'); 
      });
  }, [urlId, navigate]); 

 

  return (
    <div>
      {!article ? (
        <p>Loading...</p> 
      ) : (
        <div key={urlId}>
          <h2>{article.title}</h2>
          <p>By {article.author}</p>
          <p>{article.description}</p>
          <button onClick={() => navigate(`/edit/${urlId}`)}>Edit</button>
        </div>
      )}
    </div>
  );
}
