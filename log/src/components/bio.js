/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Image from "gatsby-image"

import { rhythm } from "../utils/typography"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      avatar: file(absolutePath: { regex: "/assets/profile-pic.jpg/" }) {
        childImageSharp {
          fixed(width: 50, height: 50) {
            ...GatsbyImageSharpFixed
          }
        }
      }
      site {
        siteMetadata {
          author {
            name
            summary
          }
          social {
            twitter
          }
        }
      }
    }
  `)

  const { author, social } = data.site.siteMetadata
  return (
    <div
      style={{
        marginBottom: rhythm(2.5),
        textAlign: 'center',
      }}
    >
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author.name}
        style={{
          margin: '0 auto 20px',
          minWidth: 50,
          borderRadius: `100%`,
          display: 'block', 
          textAlign: 'center',
        }}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <h5 style={{margin: '5px 0 10px 0',}}><strong>{author.name}</strong></h5>
      <p>{author.summary}</p>
      <p>
        <a href={`https://twitter.com/${social.twitter}`}>
          My Twitter Page
        </a>
      </p>
    </div>
  )
}

export default Bio
