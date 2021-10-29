import './App.css';
import Card from 'react-bootstrap/Card'
import  CardGroup  from 'react-bootstrap/CardGroup';
import  Row  from 'react-bootstrap/Row';
import  CardColumns from 'react-bootstrap/CardColumns';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Columns from 'react-columns'
import Form from 'react-bootstrap/Form'
function App() {
  const [latest,setLatest] = useState("")
  const [results, setResults]= useState([])
  const [searchCountries, setSearchCountries] = useState("")
  useEffect(() => {
    axios.all([
      axios.get('https://disease.sh/v3/covid-19/all'),
      axios.get('https://corona.lmao.ninja/v2/countries')
    ])
    .then(responseArr => {
      setLatest(responseArr[0].data);
      setResults(responseArr[1].data);
    })
    .catch(err => {
      console.log(err);
    })
  },[])
  const date = new Date(parseInt(latest.updated))
  const lastUpdated = date.toString()
  
  const filterCountry = results.filter(item => {
    return searchCountries.toLowerCase() !== "" ? item.country.includes(searchCountries) : item
  })

  const Countries = filterCountry.map((data,index) => {
    return (
      <Card 
      key={index}
        bg="light"
        text="dark"
        className="text-center"
        style={{margin:"11px" , borderRadius:"45px"}}
      >
        <Card.Img src={data.countryInfo.flag}  /> 
      <Card.Body>
        <Card.Title >{data.country}</Card.Title>
        <Card.Text>Cases{data.cases}</Card.Text>
        <Card.Text>Deaths{data.deaths}</Card.Text>
        <Card.Text>Recovered{data.recovered}</Card.Text>
        <Card.Text>Today Recovered{data.todayRecovered}</Card.Text>
        <Card.Text>Active{data.active}</Card.Text>
        <Card.Text>Tests{data.tests}</Card.Text>
      </Card.Body>
      </Card>
    )
  })

  return (
    <div>
      <br />
      <h1 style={{textAlign:"center"}}>Covid - 19 Live Stats</h1>
      <CardGroup>
      <Card 
          bg="secondary" 
          text="white" 
          className="text-center"
          style={{margin:"13px"}}
        >
        <Card.Body>
          <Card.Title>Cases</Card.Title>
          <Card.Text>
            {latest.cases}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small >Last Updated {lastUpdated}</small>
        </Card.Footer>
      </Card>
      <Card 
        bg="danger" 
        text="white" 
        className="text-center" 
        style={{margin:"13px"}}
        >
        <Card.Body>
          <Card.Title>Deaths</Card.Title>
          <Card.Text>
          {latest.deaths}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small>Last Updated {lastUpdated}</small>
        </Card.Footer>
      </Card>
      <Card 
        bg="success" 
        className="text-center" 
        text="white"
        style={{margin:"13px"}}
        >
        <Card.Body>
          <Card.Title>Recovered</Card.Title>
          <Card.Text>
          {latest.recovered}
          </Card.Text>
        </Card.Body>
        <Card.Footer>
          <small >Last Updated {lastUpdated}</small>
        </Card.Footer>
      </Card>
</CardGroup>
<Form>
  <Form.Group className="mb-3" controlId="formGroupSearch">
    <Form.Control 
      type="text"    
      placeholder="Search a country"
      onChange={e => setSearchCountries(e.target.value)}  
     />
    
  </Form.Group>

  
  </Form>
  {/* <Row xs={1} md={6} className="g-8" text="white" 
          className="text-center"
          style={{marginLeft: "71px"
          }}>
    {Countries}
    </Row> */}
    <Columns>
      {Countries}
    </Columns>
    </div>
  );
}

export default App;
