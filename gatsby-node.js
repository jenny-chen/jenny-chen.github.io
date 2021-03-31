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
  const essayLayout = path.resolve(`src/components/layouts/essay-layout.jsx`)
  const experienceLayout = path.resolve(`src/components/layouts/experience-layout.jsx`)
  const projectLayout = path.resolve(`src/components/layouts/project-layout.jsx`)

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

    if (node.fileAbsolutePath.includes("src/essays")) {
      createPage({
        path: node.frontmatter.path,
        component: essayLayout,
        context: {},
      })
    }

    if (node.fileAbsolutePath.includes("src/experiences")) {
      createPage({
        path: node.frontmatter.path,
        component: experienceLayout,
        context: {},
      })
    }

    if (node.fileAbsolutePath.includes("src/projects")) {
      createPage({
        path: node.frontmatter.path,
        component: projectLayout,
        context: {},
      })
    }

    if (node.fileAbsolutePath.includes("src/drafts")) {
      var component = essayLayout
      console.log(node.frontmatter.component)
      switch(node.frontmatter.component) {
        case "essayLayout":
          component = essayLayout
          break;
        case "readingLayout":
          component = readingLayout
          break;
        case "poemLayout":
          component = poemLayout
          break;
      }
      createPage({
        path: node.frontmatter.path,
        component: component,
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
