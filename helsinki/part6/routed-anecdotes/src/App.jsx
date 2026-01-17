import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useParams, useNavigate
} from 'react-router-dom'
import { useField } from './hooks'
import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'

 // --- Sub-Components ---

const Menu = () => {
  const padding = { paddingRight: 5 }
  return (
    <Navbar collapseOnSelect expand="lg" bg="light" variant="light" className="mb-3">
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link as="span">
            <Link style={padding} to="/">anecdotes</Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link style={padding} to="/create">create new</Link>
          </Nav.Link>
          <Nav.Link as="span">
            <Link style={padding} to="/about">about</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const Anecdote = ({ anecdotes }) => {
  const id = useParams().id
  const anecdote = anecdotes.find(a => a.id === Number(id))
  
  if (!anecdote) return <Alert variant="danger">Anecdote not found</Alert>

  return (
    <div className="mb-4">
      <h2>{anecdote.content} by {anecdote.author}</h2>
      <p>has <strong>{anecdote.votes}</strong> votes</p>
      <p>for more info see <a href={anecdote.info} target="_blank" rel="noreferrer">{anecdote.info}</a></p>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
  <div>
    <h2>Anecdotes</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Content</th>
          <th>Author</th>
        </tr>
      </thead>
      <tbody>
        {anecdotes.map(anecdote => (
          <tr key={anecdote.id}>
            <td>
              <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
            </td>
            <td>{anecdote.author}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  </div>
)

const About = () => (
  <div className="row">
    <div className="col-md-8">
      <h2>About anecdote app</h2>
      <p>According to Wikipedia:</p>
      <em>An anecdote is a brief, revealing account of an individual person or an incident...</em>
      <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
    </div>
    <div className="col-md-4">
      <img 
        className="img-fluid rounded" 
        src="https://upload.wikimedia.org/wikipedia/commons/a/a1/Alan_Turing_Aged_16.jpg" 
        alt="Alan Turing" 
      />
    </div>
  </div>
)

const Footer = () => (
  <footer className="mt-5 py-3 border-top text-muted">
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.
    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes'>source code</a>.
  </footer>
)

const CreateNew = (props) => {
  const content = useField('text')
  const author = useField('text')
  const info = useField('text')
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content: content.value,
      author: author.value,
      info: info.value,
      votes: 0
    })
    navigate('/')
  }

  const handleReset = () => {
    content.reset()
    author.reset()
    info.reset()
  }

  // Destructure to remove 'reset' so it doesn't go into the <input>
  const { reset: resetContent, ...contentInput } = content
  const { reset: resetAuthor, ...authorInput } = author
  const { reset: resetInfo, ...infoInput } = info
  
  return (
    <div className="mb-4">
      <h2>create a new anecdote</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Content</Form.Label>
          <Form.Control {...contentInput} />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author</Form.Label>
          <Form.Control {...authorInput} />
        </Form.Group>
        
        <Form.Group className="mb-3">
          <Form.Label>URL for more info</Form.Label>
          <Form.Control {...infoInput} />
        </Form.Group>
        
        <Button variant="primary" type="submit" className="me-2">create</Button>
        <Button variant="outline-secondary" type="button" onClick={handleReset}>reset</Button>
      </Form>
    </div>
  )
}

// --- Main App Component ---

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created!`)
    setTimeout(() => setNotification(''), 5000)
  }

  return (
    <div className="container mt-3">
      <Router>
        <h1>Software anecdotes</h1>
        <Menu />
        
        {notification && (
          <Alert variant="success" className="animate__animated animate__fadeIn">
            {notification}
          </Alert>
        )}

        <Routes>
          <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/create" element={<CreateNew addNew={addNew} />} />
          <Route path="/about" element={<About />} />
          <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        </Routes>

        <Footer />
      </Router>
    </div>
  )
}

export default App