// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const like =
  'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'

const liked =
  'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'

const deleteButton =
  'https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png '

const CommentItem = props => {
  const {addComment, onActiveLike, onClickDelete} = props
  const {id, name, comment, date, isLiked, backgroundColor} = addComment
  const initial = name ? name[0].toUpperCase() : ''
  const isLikedClassName = isLiked ? 'button active' : 'button'
  const activeImg = isLiked ? liked : like

  const postedTime = formatDistanceToNow(date)

  const hitLikeButton = () => {
    onActiveLike(id)
  }
  const onDeleteButton = () => {
    onClickDelete(id)
  }
  return (
    <li>
      <div className="initial-container">
        <h1 className={`initial ${backgroundColor}`}>{initial}</h1>
        <h1 className="name">{name}</h1>
        <p>{postedTime} ago</p>
      </div>
      <p>{comment}</p>
      <div className="like-delete-buttons">
        <div className="like-container">
          <img className="like-image" src={activeImg} alt="like" />
          <button
            className={isLikedClassName}
            onClick={hitLikeButton}
            type="button"
          >
            Like
          </button>
        </div>
        <button
          data-testid="delete"
          className="button"
          onClick={onDeleteButton}
          type="button"
        >
          <img src={deleteButton} alt="delete" />
        </button>
      </div>
      <hr />
    </li>
  )
}

export default CommentItem
