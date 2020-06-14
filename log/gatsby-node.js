const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  // blogpostという変数にテンプレートファイル格納
  const blogPost = path.resolve(`./src/templates/blog-post.js`)

  // 非同期grasphQL呼び出し
  const result = await graphql(
    `
      query {
        allContentfulCmstest {
          edges {
            node {
              id
              slug
              body {
                childMarkdownRemark {
                  html
                  frontmatter {
                    date
                    description
                    title
                  }
                }
              }
            }
          }
        }
      }
    `
  )


  if (result.errors) {
    throw result.errors
  }

  // Create blog posts pages.　graphQLを使う
  const posts = result.data.allContentfulCmstest.edges

  //配列を処理 edges以降、配列ということ　一つ一つ呼び出す
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node
    const next = index === 0 ? null : posts[index - 1].node

    //createPage APIを使って個別のページを作成する　component=blog-post.jsで処理をさせる 表面だけ
    createPage({
      path: post.node.slug,
      component: blogPost,
      context: {
        slug: post.node.slug,
        previous,
        next,
      },
    })
  })
}


