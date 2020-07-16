import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm, scale } from "../utils/typography"
import  "../styles/post.css"


//graphQLのでーた
const BlogPostTemplate = ({ data, pageContext, location }) => {

  const post = data.contentfulCmstest.body.childMarkdownRemark

  // metaデータ
  const siteTitle = data.site.siteMetadata.title

  const { previous, next } = pageContext

  //ここでトップページの目次の処理をする。
  //記事が増えるとトップページでも自動的に記事が追加される仕組み
  return (
    <Layout location={location} title={siteTitle}>
      <SEO
        title={post.frontmatter.title}
        description={post.frontmatter.description}
      />
      <article>
        <header>
          <h1
            style={{
              marginTop: rhythm(1),
              marginBottom: 0,
            }}
          >
            {post.frontmatter.title}
          </h1>
          <p
            style={{
              ...scale(-1 / 5),
              display: `block`,
              marginBottom: rhythm(1),
            }}
          >
            {post.frontmatter.date}
          </p>
        </header>
        <section dangerouslySetInnerHTML={{ __html: post.html }} />
        <hr
          style={{
            marginBottom: rhythm(1),
          }}
        />
        <footer>
          <Bio />
        </footer>
      </article>

      <nav>
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          {/* <li>
            {previous && (
              <Link to={previous.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li> */}
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

//自動的に増やすためにはGraphQLから記事を確認出来るように定義する？
export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulCmstest(slug: { eq: $slug}) {
      body {
        childMarkdownRemark {
          html
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            description
            title
          }
        }
      }
    }
  }
`
