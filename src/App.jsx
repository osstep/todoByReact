import { useState } from 'react'
import './App.css'
import PostItem from './components/PostItem'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyInput from './components/UI/input/MyInput'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'JavaScript', body: 'Description' },
    { id: 2, title: 'JavaScript 2', body: 'Description' },
    { id: 3, title: 'JavaScript 3', body: 'Description' },
  ])

  const [post, setPost] = useState({
    title: '',
    body: ''
  })

  
  function addNewPost(e) {
    e.preventDefault()
    
    setPosts([...posts, {...post, id: Date.now()}])
    setPost({
      title: '',
      body: ''
    })

  }

  return (
    <div className="App">
      <form>
        <MyInput
          value={post.title}
          onChange={e => setPost({...post, title: e.target.value})}
          type="text"
          placeholder="название поста"
        ></MyInput>
        <MyInput
          value={post.body}
          onChange={e => setPost({...post, body: e.target.value})}
          type="text"
          placeholder="описание поста"
        ></MyInput>
        <MyButton onClick={addNewPost}>Создать пост</MyButton>
      </form>
      <PostList
        posts={posts}
        title={'Список постов 1'}
      />
    </div>
  )
}

export default App
