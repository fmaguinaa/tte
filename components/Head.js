import React, {Fragment} from 'react';
import NextHead from 'next/head';
import {string} from 'prop-types';

const defaultTitle = 'EduExpress';
const defaultDescription = 'EduExpress Online - Compra online de boletos';
const defaultOGURL = 'https://eduexpress.pe/';
const defaultOGImage = 'https://s3.amazonaws.com/cdn-eduexpress/name.png';
const twitterHash = '@EduExpress';
const iconUrl = 'https://s3.amazonaws.com/cdn-eduexpress/logo-square.png'

const Head = props => (
    <NextHead>
      <title>{props.title || defaultTitle}</title>
      <link rel="shortcut icon" href={iconUrl} />
      <meta
          name="description"
          content={props.description || defaultDescription}
      />
      {
        props.isHome && (
            <Fragment>
              <link rel="stylesheet" type="text/css" charSet="UTF-8"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"/>
              <link rel="stylesheet" type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"/>
            </Fragment>
        )
      }
      <link rel="icon" sizes="192x192" href={iconUrl} />
      <link rel="apple-touch-icon" href={iconUrl} />
      <link rel="mask-icon" href={iconUrl} color="#000000" />
      <link rel="shortcut icon" href={iconUrl} />
      <meta property="og:url" content={props.url || defaultOGURL} />
      <meta property="og:title" content={props.title || defaultTitle} />
      <meta
          property="og:description"
          content={props.description || defaultDescription}
      />
      <meta name="twitter:site" content={ props.url || defaultOGURL} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={defaultOGImage} />
      <meta property="og:image" content={defaultOGImage} />
      <meta property="og:image:width" content="265" />
      <meta property="og:image:height" content="96" />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={props.title || defaultTitle} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHash} />
      <meta name="twitter:creator" content={twitterHash} />
      <meta name="twitter:title" content={props.title || defaultTitle} />
      <meta name="twitter:description"
            content={props.description || defaultDescription} />
      <meta name="twitter:url" content={props.url || defaultOGURL} />
      <meta name="twitter:domain" content={props.url || defaultOGURL} />
      <meta name="twitter:image:src"
            content={defaultOGImage} />
      <meta name="theme-color" content="#000000" />
    </NextHead>
);

Head.propTypes = {
  title: string,
  description: string,
  url: string,
  ogImage: string,
};

export default Head;
