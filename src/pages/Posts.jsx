import { useEffect, useMemo, useState } from 'react'
import './../App.css'
import PostList from './../components/PostList'
import MyButton from './../components/UI/button/MyButton'
import PostForm from './../components/PostForm'
import PostFilter from './../components/PostFilter'
import MyModal from './../components/UI/MyModal/MyModal'
import {usePosts} from './../hooks/usePosts'
import PostService from './../API/PostService'
import Loader from './../components/UI/Loader/Loader'
import { useFetching } from './../hooks/useFetching'
import { getPageCount, getPagesArray } from './../utils/pages'
import Pagination from './../components/UI/pagination/Pagination'

function Posts() {
  const [posts, setPosts] = useState([])
  const [filter, setFilter] = useState({
    sort: '',
    query: '',
  })
  const [modal, setModal] = useState(false)
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
  const [totalPages, setTotalPages] = useState(0)
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const responce = await PostService.getAll(limit, page)
    setPosts(responce.data)
    const totalCount = responce.headers['x-total-count']
    setTotalPages(getPageCount(totalCount, limit))
    console.log(totalPages)
  })

  useEffect(() => {
    fetchPosts()
  }, [page])

  const createPost = (newPost) => {
    setPosts([...posts, newPost])
    setModal(false)
  }

  const removePost = (post) => {
    setPosts(posts.filter((p) => p.id !== post.id))
  }

  const changePage = (page) => {
    setPage(page)
  }
  return (
    <div className="App">
      <MyButton
        style={{ marginTop: '30px' }}
        onClick={() => setModal(true)}
      >
        Создать пост
      </MyButton>
      <MyModal
        visible={modal}
        setVisible={setModal}
      >
        <PostForm create={createPost} />
      </MyModal>

      <hr style={{ margin: '15px 0' }}></hr>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError && <h1>Произошла ошибка {postError}</h1>}
      {isPostsLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '25px',
          }}
        >
          <Loader />
        </div>
      ) : (
        <PostList
          remove={removePost}
          posts={sortedAndSearchedPosts}
          title={'Список постов'}
        />
      )}
      <Pagination page={page} changePage={changePage} totalPages={totalPages}/>
    </div>
  )
}

export default Posts
