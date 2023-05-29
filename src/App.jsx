import { useMemo, useState } from 'react'
import './App.css'
import PostItem from './components/PostItem'
import PostList from './components/PostList'
import MyButton from './components/UI/button/MyButton'
import MyInput from './components/UI/input/MyInput'
import PostForm from './components/PostForm'
import MySelect from './components/UI/select/MySelect'
import PostFilter from './components/PostFilter'

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: 'aa', body: 'ee' },
    { id: 2, title: 'bb 2', body: 'ff' },
    { id: 3, title: 'cc 3', body: 'aa' },
  ])
  const [filter, setFilter] = useState({
    sort: '',
    query: '',
  })

  const sortedPosts = useMemo(() => {
    console.log('вызов')
    if (filter.sort) {
      return [...posts].sort((a, b) =>
        a[filter.sort].localeCompare(b[filter.sort])
      )
    }
    return posts
  }, [filter.sort, posts])

  const sortedAndSearchedPosts = useMemo(() => {
    return sortedPosts.filter((post) =>
      post.title.toLowerCase().includes(filter.query.toLowerCase())
    )
  }, [filter.query, sortedPosts])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  return (
    <div className="App">
      <PostForm create={createPost} />
      <hr style={{ margin: '15px 0' }}></hr>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />

      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={'Список постов 1'}
      />
    </div>
  )
}

export default App
