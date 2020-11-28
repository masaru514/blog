// Gatsby supports TypeScript natively!
import React from 'react'
import { PageProps, Link, graphql } from 'gatsby'
import Bio from '../components/bio'
import Layout from "../components/layout"
import SEO from "../components/seo"
import style from "../styles/container.module.css"

// graphql 型
type Data = {
  site: {
    siteMetadata: {
      title: String
    }
  }
  allContentfulCmstest: {
    edges: {
      node: {
        title: String
        slug: String
        tags: Array<String>
        updatedAt: String
        id: String
        body: {
          childMarkdownRemark: {
            html: String
          }
        }
        childContentfulCmstestBodyTextNode: {
          childMarkdownRemark: {
            id: String
          }
        }
      }
    }
  }
}


const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulCmstest.edges
  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="投稿一覧" />
      <div className={style.content}>
        <div className={style.profile}>
          <Bio />
        </div>
        <div className="template">
          {posts.map(({ node }) => {
            const title = node.title || node.slug
            return (
              <article key={node.id}>
                <Link to={node.slug} className={style.list}>
                  <header>
                    <h3 style={{ margin: 0, fontFamily: "meiryo", paddingBottom: 5 }}>
                      {title}
                    </h3>
                    <p className={style.date}>{node.updatedAt}</p>
                  </header>
                  <section>
                    <p
                      dangerouslySetInnerHTML={{
                        __html: node.childContentfulCmstestBodyTextNode.childMarkdownRemark.excerpt,
                      }}
                      className={style.indexDescription}
                    />
                    {
                      node.tags ? (<ul className={style.tagsList}> {node.tags.map(tag => <li key={node.id} className={style.tag}>{tag}</li>)} </ul>) : (null)
                    }
                  </section>
                </Link>
              </article>
            )
          })}
        </div>
      </div>
    </Layout>
  )
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulCmstest(sort: {order: DESC, fields: body___childMarkdownRemark___frontmatter___date}) {
      edges {
        node {
          title
          slug
          tags
          updatedAt(formatString: "YYYY-MM-DD")
          body {
            childMarkdownRemark {
              html
            }
          }

          childContentfulCmstestBodyTextNode {
            childMarkdownRemark {
              id
              excerpt(format: PLAIN, pruneLength: 100, truncate: true)
            }
          }
        }
      }
    }
  }
`
