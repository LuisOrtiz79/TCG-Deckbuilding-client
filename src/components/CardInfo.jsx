import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { SERVER_URL } from '../services/SERVER_URL';
import Searchbar from './Searchbar';

const CardInfo = ({main, extra, side, getDeckInfo}) => {
  const [cards, setCards] = useState([]);
  const [searchCard, setSearchCard ]=  useState('');
  const [pages, setPages] = useState({previous: 0, nextPages: 20})
  const { deckId } = useParams();

  const addCard = async (cardId, type) => {
    if(extra <= 15 && type === 'fusion' || type === 'synchro' || type === 'xyz' || type === 'link') {
      axios
        .put(`${SERVER_URL}/decks/extra/${deckId}`, { cardId })
        .then((response) => {
          console.log(response.data);
          getDeckInfo();
        })
        .catch((error) => console.log(error));
    }else if (main <= 60 && type !== 'fusion' || type !== 'synchro' || type !== 'xyz' || type !== 'link' || type !== 'skill') {
      axios
        .put(`${SERVER_URL}/decks/main/${deckId}`, { cardId })
        .then((response) => {
          console.log(response.data);
          getDeckInfo();
        })
        .catch((error) => console.log(error));
    }

    if(main > 60 && extra > 15  && side > 15 && type !== 'skill'){
      axios
        .put(`${SERVER_URL}/decks/side/${deckId}`, { cardId })
        .then((response) => {
          console.log(response.data);
          getDeckInfo();
        })
        .catch((error) => console.log(error));
    }
  };

  const addSideCard = async (cardId, type) => {
    if(side <= 15 && type !== 'skill'){
      axios
        .put(`${SERVER_URL}/decks/side/${deckId}`, { cardId })
        .then((response) => {
          console.log(response.data);
          getDeckInfo();
        })
        .catch((error) => console.log(error));
    }
  };

  const getCardPage = () => {
    axios
      .get(`${SERVER_URL}/cards/new/${pages.previous}/${pages.nextPages}`)
      .then((response) => {
        console.log(response.data);
        setCards(response.data);
      })
      .catch((error) => console.log(error));
  }

  const queryChange = () => {
    clearTimeout(filterTimeout)
  
      if (searchCard) {
          filterTimeout = setTimeout(() => {
              axios
              .get(`${SERVER_URL}/cards/search/${searchCard}`)
              .then((response) => {
                  console.log("Found Cards ===>", response.data)
                  setCards(response.data)
              })
              .catch((err) => {
                console.log(err)
              })
          }, 500)
      }
  }

  useEffect(() => {
    queryChange()
  }, [searchCard])
  

  useEffect(() => {
    // axios
    //   .get(`${SERVER_URL}/cards`)
    //   .then((response) => {
    //       setCards(response.data);
    //   })
    //   .catch((error) => console.log(error));

    getCardPage();
  }, [pages]);

  let filtered = searchCard ? cards.filter((card) => card.name.toLowerCase().includes(searchCard.toLowerCase())) : cards;

  return (
    <div>
      <Searchbar searchCard={searchCard} setSearchCard={setSearchCard}/>

      <button>Sort by name</button>
      <button>Sort by type</button>

      {cards && filtered.slice(pages.previous, pages.nextPages).map((cards) => (
        <div key={cards._id}>
          <img src={cards.card_images[0].image_url} alt='cardBox' width={'60vw'} height={'60vh'}/> 
          <p>{cards.name}</p>
          {cards.frameType === 'fusion' || cards.frameType === 'synchro' || cards.frameType === 'xyz' || cards.frameType === 'link' ?
            <button onClick={() => addCard(cards._id, cards.frameType)}>extra</button>
            :
            <button onClick={() => addCard(cards._id, cards.frameType)}>main</button>  
          }
          <button onClick={() => addSideCard(cards._id, cards.frameType)}>side</button>  
        </div>
      ))}

      <div>
        <button onClick={() => pages.nextPages >= cards.length + 20 ? alert('This is the last page') : setPages(prev => ({previous: prev.previous + 20, nextPages: prev.nextPages + 20 }))}> Next </button>
        <button onClick={() => pages.previous === 0 ? alert('This is the first page') : setPages(prev => ({previous: prev.previous - 20, nextPages: prev.nextPages - 20 }))}> Previous </button>
      </div>
    </div>
  );
};

export default CardInfo;