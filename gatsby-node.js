/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require("path")

exports.createPages = async ({ actions, graphql }) => {
  const { createPage } = actions

  const readingLayout = path.resolve(`src/components/layouts/reading-layout.jsx`)
  const poemLayout = path.resolve(`src/components/layouts/poem-layout.jsx`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
            fileAbsolutePath
          }
        }
      }
    }
  `)
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if (node.fileAbsolutePath.includes("src/reviews")) {
      createPage({
        path: node.frontmatter.path,
        component: readingLayout,
        context: {}, // additional data can be passed via context
      })
    }

    if (node.fileAbsolutePath.includes("src/poems")) {
      createPage({
        path: node.frontmatter.path,
        component: poemLayout,
        context: {}, 
      })  
    }
  })
}

exports.onCreateBabelConfig = function onCreateBabelConfig({ actions }) {
  actions.setBabelPlugin({
    name: `@babel/plugin-proposal-export-default-from`
  })
}
