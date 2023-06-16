import { useState, useEffect } from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';


function NotifyMe() {
  const [formData, setfromData] = useState({
    email: "",
    startDate: "",
    endDate: "",
    title: "",
    body:""
  })
  const {email, startDate, endDate, title, body} = formData;

  const onChange = (e) => {
    setfromData((prevState)=> ({
        ...prevState,
        [e.target.name]: e.target.value
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(email, startDate, endDate, title, body);
    const fileIcs = generateIcsFile();
    sendMail(fileIcs)
  }

const event = {
  title: "My Title",
  description: "My Description",
  startTime: "2018-10-07T10:30:00+10:00",
  endTime: "2018-10-07T12:00:00+10:00",
  location: "10 Carlotta St, Artarmon NSW 2064, Australia"
};


const generateIcsFile = () => {
const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//My Company//EN
BEGIN:VEVENT
UID:${generateUid()}@mycompany.com
DTSTAMP:${formatDate(new Date())}
DTSTART:${formatDate(new Date(event.startTime))}
DTEND:${formatDate(new Date(event.endTime))}
SUMMARY:${event.title}
DESCRIPTION:${event.description}
LOCATION:${event.location}
END:VEVENT
END:VCALENDAR`;

const base64Data = btoa(unescape(encodeURIComponent(icsContent)));
console.log(base64Data);
return base64Data
};

const generateUid = () => {
// Generate a unique ID using any desired algorithm or library
// This is just a simple example
return Math.random().toString(36).substr(2, 9);
};

const formatDate = (date) => {
const year = date.getFullYear();
const month = String(date.getMonth() + 1).padStart(2, '0');
const day = String(date.getDate()).padStart(2, '0');
const hours = String(date.getHours()).padStart(2, '0');
const minutes = String(date.getMinutes()).padStart(2, '0');
const seconds = String(date.getSeconds()).padStart(2, '0');

return `${year}${month}${day}T${hours}${minutes}${seconds}`;
};

  function sendMail(file) {


    window.Email.send({
      SecureToken: "40e5bd95-02f3-458c-b6c2-9c1969a23e2a",
      To: 'sbrozzi.patrizio@gmail.com',
      From: "tommasoversetto@gmail.com",
      Subject: "subjec different4",
      Body: "festa del coffee1",
      Attachments: [
        {
          name: 'event.ics',
          data: file
        }
      ]
    }).then(
      message => alert(message)
    );
  }


  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form className="mb-3" onSubmit={onSubmit}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="mail@mail.com" name="email" value={email} onChange={onChange} />
              </Form.Group>

              <div style={{display: "flex"}}>
                <Form.Group className="mb-3 me-2" controlId="formBasicEmail" style={{width:"50%"}}>
                  <Form.Label>Inizio evento</Form.Label>
                  <Form.Control type="date" placeholder="mail@mail.com" name="startDate" value={startDate} onChange={onChange}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail" style={{width:"50%"}}>
                  <Form.Label>Fine evento</Form.Label>
                  <Form.Control type="date" placeholder="mail@mail.com" name="endDate" value={endDate} onChange={onChange}/>
                </Form.Group>
              </div>

              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Titolo</Form.Label>
                <Form.Control type="text" placeholder="Inserisci titolo" name="title" value={title} onChange={onChange}/>
              </Form.Group>
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label>Corpo email</Form.Label>
                <Form.Control as="textarea" rows={3} name="body" value={body} onChange={onChange}/>
              </Form.Group>
  
              <Button variant="primary" type="submit" style={{width:"100%"}}>
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </>
  )
}

export default NotifyMe