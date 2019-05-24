import React from 'react';
import axios from '../../../axios';
import { Route } from 'react-router-dom';

import Post from '../../../components/Post/Post';
import FullPost from '../FullPost/FullPost';
import './Posts.css';

class Posts extends React.Component {
  state = {
    posts: []
  };

  componentDidMount() {
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
    this.props.history.push(`/posts/${id}`);
    // this.props.history.push({pathname: `/posts/${id}`});
  };

  render() {
    let posts = <p style={{textAlign: 'center'}}>Oops, something went wrong :(</p>
    if (!this.state.error) {
      posts = this.state.posts.map(post => (
        // <Link to={`/${post.id}`} >
        <Post
          key={post.id}
          title={post.title}
          author={post.author}
          clicked={() => this.postSelectedHandler(post.id)}/>
        // </Link>
        )
      );
    }

    return(
      <div>
        <section className='Posts'>
          {posts}
        </section>
        <Route path={this.props.match.url + '/:id'} exact component={FullPost} />
      </div>
    )
  }
}

export default Posts;