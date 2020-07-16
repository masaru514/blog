// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import style from "../styles/container.module.css"

//graphql 型
// type Data = {
//   site: {
//     siteMetadata: {
//       title: string
//     }
//   }
//   allMarkdownRemark: {
//     edges: {
//       node: {
//         excerpt: string
//         frontmatter: {
//           title: string
//           date: string
//           description: string
//         }
//         fields: {
//           slug: string
//         }
//       }
//     }
//   }
//   allContentfulCmstest: {
//     edges: {
//       node: {
//         title: string
//         slug: string
//         body: {
//           childMarkdownRemark: {
//             frontmatter: {
//               title: string
//               date: string
//               description: string
//             }
//             html: string
//           }
//         }
//       }
//     }[]
//   }
// }



const BlogIndex = ({ data, location }: PageProps<Data>) => {
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allContentfulCmstest.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="投稿一覧" />
      <Bio />
      <div>
        {posts.map(({ node }) => {
          const title = node.body.childMarkdownRemark.frontmatter.title || node.slug
          return (
            <article key={node.slug}>
              <Link to={node.slug} className={style.list}>
                <header>
                  <h3 style={{margin: 0,fontFamily: "meiryo",paddingBottom: 5}}>
                      {title}
                  </h3>
                  <p className={style.date}>{node.body.childMarkdownRemark.frontmatter.date}</p>
                </header>

                <section>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: node.childContentfulCmstestBodyTextNode.childMarkdownRemark.excerpt,
                    }}
                    className={style.indexDescription}
                  />
                </section>
              </Link>
            </article>
          )
        })}
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
          body {
            childMarkdownRemark {
              frontmatter {
                title
                date
                description
              }
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
