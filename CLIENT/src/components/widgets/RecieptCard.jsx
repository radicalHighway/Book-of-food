
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


export default function RecieptCard({reciept}) {

  

  return ( 
    <Card style={{ width: '18rem', position: 'relative' }}>
      <Card.Img variant="top" src={reciept.url} />
      <Card.Body>
        <Card.Title>{reciept.name}</Card.Title>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>

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

  )
}
