import { useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase/config';
// styles
import './Edit.css';

export default function Edit() {
  const { urlId } = useParams(); 
  const navigate = useNavigate(); 

  const titleRef = useRef(null);
  const authorRef = useRef(null);
  const descriptionRef = useRef(null);

  useEffect(() => {
    
    const ref = doc(db, 'articles', urlId);
    getDoc(ref)
      .then((snapshot) => {
        if (snapshot.exists()) {
          const article = snapshot.data(); 
          
          titleRef.current.value = article.title;
          authorRef.current.value = article.author;
          descriptionRef.current.value = article.description;
        } else {
          console.log('No such document!');
          navigate('/'); 
        }
      })
      .catch((error) => {
        console.error('Error fetching document:', error);
        navigate('/'); 
      });
  }, [urlId, navigate]); 

  const handleSubmit = async (e) => {
    e.preventDefault(); 

   
    const updatedArticle = {
      title: titleRef.current.value,
      author: authorRef.current.value,
      description: descriptionRef.current.value,
    };

    const ref = doc(db, 'articles', urlId); 

    try {
      
      await updateDoc(ref, updatedArticle);
      navigate(`/articles/${urlId}`);
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div className="edit">
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Title:</span>
          <input
            type="text"
            name="title"
            ref={titleRef}  
            required
          />
        </label>

        <label>
          <span>Author:</span>
          <input
            type="text"
            name="author"
            ref={authorRef}  
            required
          />
        </label>

        <label>
          <span>Description:</span>
          <textarea
            name="description"
            ref={descriptionRef}  
            required
          />
        </label>

        <button type="submit" className="btn">Update Article</button>
      </form>
    </div>
  );
}
