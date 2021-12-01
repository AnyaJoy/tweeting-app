import React from 'react'
import LikeButton from './LikeButton';

export default function SearchByUser(props) {
    const { storage, searchInput, emptyHeart, handleUnLike, handleLike, whiteHeart, likedTweets } = props
    return (
        <div className="search-wrapper">
          <div className="header-profile">Search by user...</div>
          <div className="searched-tweets-wrapper">
            {storage.map((item, index) => {
              if (
                item.userName.toLowerCase().indexOf(searchInput) !=
                -1
              ) {
                const parts = item.userName.split(
                  new RegExp(`(${searchInput})`, "gi")
                );

                return (
                  <div key={item.id} className="tweet-wrapper">
                    <div className="user-name-and-date">
                      <div className="user-name">
                        {parts.map((part, index) =>
                          part.toLowerCase() ===
                          searchInput.toLowerCase() ? (
                            <mark key={1 + index}>{part}</mark>
                          ) : (
                            part
                          )
                        )}
                      </div>
                      <div className="date">{item.date}</div>
                    </div>
                    <div className="tweet">{item.content}</div>
                    <LikeButton item={item} emptyHeart={emptyHeart} handleUnLike={handleUnLike} handleLike={handleLike} whiteHeart={whiteHeart} likedTweets={likedTweets}/>
                  </div>
                );
              }
            })}
          </div>
        </div>
    )
}
