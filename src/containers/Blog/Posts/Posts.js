import React from 'react';
import axios from '../../../axios';
import { Link } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
    console.log(this.props)
    axios.get('/posts')
      .then(response => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Juan'
          }
        });
        this.setState({posts: updatedPosts})
      })
      .catch(err => {
        // this.setState({error: true});
        console.log(err);
      });
  }

  postSelectedHandler = (id) => {
    this.setState({selectedPostId: id})
  };

  render() {
    let posts = <p style={{textAlign: 'center'}}>Oops, something went wrong :(</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        <Link to={`/${post.id}`} key={post.id}>
          <Post
            title={post.title}
            author={post.author}
            clicked={() => this.postSelectedHandler(post.id)}/>
        </Link>
        )
      );
    }

    return(
      <section className='Posts'>
        {posts}
      </section>
    )
  }
}

export default Posts;