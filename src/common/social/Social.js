import React from 'react'

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFacebook, faInstagram, faYoutube, faTwitter } from "@fortawesome/free-brands-svg-icons"

export default function Social() {
  return (
    <div className='social'>
      <a href='https://www.facebook.com/' target='_blank' rel='noopener noreferrer'>
        <FontAwesomeIcon icon={faFacebook} />
      </a>
      <a href='https://www.instagram.com/' target='_blank' rel='noopener noreferrer'>
        <FontAwesomeIcon icon={faInstagram} />
      </a>
      <a href='https://www.twitter.com/' target='_blank' rel='noopener noreferrer'>
        <FontAwesomeIcon icon={faTwitter} />
      </a>
      <a href='https://www.youtube.com/' target='_blank' rel='noopener noreferrer'>
        <FontAwesomeIcon icon={faYoutube} />
      </a>
    </div>
  )
}