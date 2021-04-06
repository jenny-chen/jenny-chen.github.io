---
path: "/writing/visualizing-japan"
date: 2021-04-04
title: "Visualizing Japan"
description: "using D3 to map my 2019 trip to Japan"
---

- exploration + research
- displaying map
- connecting map component back to main page and showing photos
- click photo for modal
- connecting back concepts that i learned maybe with stuff from work; passing props from child to parent? functional language at work, kinda similar mindset to only having data flow in one direction in order to minimize complexity

Ever since quarantine started March 2020, I’ve been looking for ways to keep myself occupied. I had been meaning to work on my personal website for a while, and being stuck at home for a few months was the perfect time for it. With my project at work also revolving around data visualization, I decided I would spend some time trying to visualize my 2019 trip to Japan. 

Gathering information;
	The first step for me was to research and explore further how I wanted to approach the problem. I knew I wanted an interactive map to showcase my memories through the medium of pictures and words at each of the locations I visited. I had some experience working with D3 in the form of simple area charts, but I wanted to increase my proficiency with the language, so I decided to stick with it for the trip visualization. 
	Through my reading, I learned about GeoJSON, TopoJSON, and D3’s capabilities. EXPLORE MORE WHAT GEOJSON AND TOPOJSON DO EXACTLY 
  I also use Gatsby to generate and host my website as a static site so I used the plugin `Gatsby-Plugin-Image` to streamline the process, but this project is perfectly doable without the plugin as well.

 ## Displaying map

  Through my previous stint with D3 creating graphs, I knew that D3 could be a little finnicky when trying to merge in conjunction with React. I create a separate component for all the D3 computing and then export it back to the main page. As mentioned before, D3 works with both GeoJSON and TopoJSON and I wasn't sure at first what to go with. 
 
 GeoJSON seemed to be more widely supported and was the predecessor. It worked by plotting coordinates of points and connecting lines between them. On the other hand, TopoJSON seemed to make a number of improvements over GeoJSON, the biggest of which was its size. GeoJSON is essentially a JSON with a list of features, and the for each feature, latitudes and longitudes describing what the shape should be. As you can image, for complex geographies or maps, the list of features can get quite large. TopoJSON works similarly, but it doesn't store the coordinates exactly, instead it describes the topology as a bunch of shared lines which it calls **arcs**. The sharing of the arcs is the primary reason TopoJSON files are smaller, redundancy of things like country borders are erased (no longer described from both sides like with GeoJSON). However, it comes at the cost of a more complex file type that adds another step to processing the map. 

  I deicded to go with TopoJSON for my project. I made this decision after looking at both types and weighing the pros and cons of each one considering the project I was trying to undertake. Though I didn't have any need for the topography (I only wanted to visualize location), I was trying to render a map of Japan and its prefectures, which will all fit neatly next to each other, as designed. Thus, I could make full use of the arcs from TopoJSON in limiting redundancy and minimizing the filesize.

  Once I had my map displayed, I wanted to be able to interact with it. This meant adding `onClick` and `onHover` events to the map and then also adding a state to the component to track what the user selects. Setting this up is fairly straightforward. However, we also need to propagate this information back to the main page since that's where we will be displaying photos based on what the user has selected on the map.

  Part of React's philosophy is to have data flow in only one direction. This means props should only be passed down from parents to children and never the other way around. So to stay true to this rule, we pass down a setter function from the main page to the child component that allows it to change the state of the main page. Taking this information back to the main page, we can now use a GraphQL query to get our photos. GRAPHQL CODE SNIPPET AND EXPLANATION

```javascript
export const pageQuery = graphql`
  query JapanPhotos {
    // this targets all the jpg|jpeg|png in the folder ./images/japan
    allFile(filter: {extension: {regex: "/(jpg)|(jpeg)|(png)/"}, dir: {regex: "/images/japan/"}}) {
      edges {
        node {
          id
          name
          childImageSharp {
            gatsbyImageData(
              placeholder: BLURRED
              formats: [AUTO, WEBP, AVIF]
            )
          }
        }
      }
    }
  }
`
```

  I prefixed the names of each of my photos with the location they were taken in. 
