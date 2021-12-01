import React from 'react'
import LikeButton from './LikeButton';

export default function SearchByTweets(props) {
    const { storage, searchInput, emptyHeart, handleUnlike, handleLike, whiteHeart, likedTweets } = props
    return (
        <div className="search-wrapper">
          <div className="header-profile">Search by tweet...</div>
          <div className="searched-tweets-wrapper">
            {storage.map((item, index) => {
              //case insensitive search
              if (
                item.content.toLowerCase().indexOf(searchInput) != -1
              ) {
                const parts = item.content.split(
                  new RegExp(`(${searchInput})`, "gi")
                );

                return (
                  <div key={item.id} className="tweet-wrapper">
                    <div className="user-name-and-date">
                      <div className="user-name">{item.userName}</div>
                      <div className="date">{item.date}</div>
                    </div>
                    <div className="tweet">
                      {parts.map((part, index) =>
                        part.toLowerCase() ===
                        searchInput.toLowerCase() ? (
                          <mark key={1 + index}>{part}</mark>
                        ) : (
                          part
                        )
                      )}
                    </div>
                    <LikeButton item={item} emptyHeart={emptyHeart} handleUnlike={handleUnlike} handleLike={handleLike} whiteHeart={whiteHeart} likedTweets={likedTweets}/>
                  </div>
                );
              }
            })}
          </div>
        </div>
    )
}
