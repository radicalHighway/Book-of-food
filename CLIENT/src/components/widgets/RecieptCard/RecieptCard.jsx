
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router"

import { useState, useEffect } from "react-router"

export default function RecieptCard({reciept}) {
const [ingridients, setIngidients] = useState([])

console.log('reciept.ingridients',ingridients);

useEffect(() => {
  if (reciept.ingridients) {
    setIngidients(reciept.ingridients.split(','));
  }
}, [reciept.ingridients]); 





  return (
    <>
    <Card style={{ width: '18rem', position: 'relative' }}>
      <Card.Img variant="top" src={reciept.url} />
      <Card.Body>
        <Card.Title>{reciept.name} </Card.Title>
        <Button as={Link} to={`/${reciept.id}`} variant="primary" >Go somewhere</Button>
      </Card.Body>
      <Card.Text>
      Время приготовления: {reciept.time} минут
    </Card.Text>
    <Card.Text>
      Количество ингредиентов: {ingridients.length}
    </Card.Text>

      <Button
        variant="outline-danger"
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          border: '0px',
          padding: '5px',
        }}
        // onClick={handleLike}
      >
        ❤️
      </Button>
    </Card>
    </>
  )
}
