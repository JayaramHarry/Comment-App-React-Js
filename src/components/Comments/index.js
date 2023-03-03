import {v4} from 'uuid'

import {Component} from 'react'
import CommentItem from '../CommentItem'

// import {formatDistanceToNow} from 'date-fns'

import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]
const COMMENT_IMG =
  'https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png '

// Write your code here
class Comments extends Component {
  state = {commentsList: [], inputName: '', inputComment: ''}

  addComment = event => {
    event.preventDefault()

    const {inputName, inputComment} = this.state
    const initialBackgroundColor = `initial ${
      initialContainerBackgroundClassNames[
        Math.ceil(
          Math.random() * initialContainerBackgroundClassNames.length - 1,
        )
      ]
    }`

    const newComment = {
      id: v4(),
      name: inputName,
      comment: inputComment,
      date: new Date(),
      isLiked: false,
      backgroundColor: initialBackgroundColor,
    }

    this.setState(prevState => ({
      commentsList: [...prevState.commentsList, newComment],
      inputName: '',
      inputComment: '',
    }))
  }

  onInputName = event => {
    this.setState({inputName: event.target.value})
  }

  onInputComment = event => {
    this.setState({inputComment: event.target.value})
  }

  onActiveLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (eachComment.id === id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onClickDelete = id => {
    const {commentsList} = this.state
    this.setState({
      commentsList: commentsList.filter(comment => comment.id !== id),
    })
  }

  render() {
    const {inputName, inputComment, commentsList} = this.state
    return (
      <div className="bg-container">
        <div className="comment-page-container">
          <h1 className="heading">Comments</h1>
          <div className="comment-container">
            <form onSubmit={this.addComment} className="input-boxes">
              <p className="description">
                Say something about 4.0 technologies
              </p>
              <input
                value={inputName}
                onChange={this.onInputName}
                className="name-input"
                type="text"
                placeholder="Your Name"
              />
              <textarea
                value={inputComment}
                onChange={this.onInputComment}
                className="comment-input"
                type="text"
                placeholder="Your Comment"
              />
              <button className="add-comment-button" type="submit">
                Add Comment
              </button>
            </form>
            <img className="comment-img" src={COMMENT_IMG} alt="comments" />
          </div>
          <hr className="line" />
          <p className="comment-count">
            <span className="count">{commentsList.length}</span> Comments
          </p>
          <ul className="order-list">
            {commentsList.map(eachComment => (
              <CommentItem
                onActiveLike={this.onActiveLike}
                onClickDelete={this.onClickDelete}
                addComment={eachComment}
                key={eachComment.id}
              />
            ))}
          </ul>
        </div>
      </div>
    )
  }
}
export default Comments
