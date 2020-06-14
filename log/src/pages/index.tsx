// Gatsby supports TypeScript natively!
import React from "react"
import { PageProps, Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

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
      <SEO title="All posts" />
      <Bio />
      {posts.map(({ node }) => {
        const title = node.body.childMarkdownRemark.frontmatter.title || node.slug
        return (
          <article key={node.slug}>
            <header>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <Link style={{ boxShadow: `none` }} to={node.slug}>
                  {title}
                </Link>
              </h3>
              <small>{node.body.childMarkdownRemark.frontmatter.date}</small>
            </header>
            <section>
              <p
                dangerouslySetInnerHTML={{
                  __html: node.body.childMarkdownRemark.frontmatter.description,
                }}
              />
            </section>
          </article>
        )
      })}
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
        }
      }
    }
  }
`
