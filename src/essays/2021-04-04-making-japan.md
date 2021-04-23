---
path: "/writing/visualizing-japan"
date: 2021-04-04
title: "Visualizing Japan"
description: "using D3 to map my 2019 trip to Japan"
contents: ["background", "planning", "map rendering", "images"]
---

- exploration + research
- displaying map
- connecting map component back to main page and showing photos
- click photo for modal
- connecting back concepts that i learned maybe with stuff from work; passing props from child to parent? functional language at work, kinda similar mindset to only having data flow in one direction in order to minimize complexity

links: 
https://www.d3indepth.com/geographic/
https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2co
https://gist.github.com/osoken/b8e5859295757bb2ec5b#file-japan-topojson
https://bl.ocks.org/d3indepth/f7ece0ab9a3df06a8cecd2c0e33e54ef

## background <a name="background"></a>

Ever since quarantine started back in March 2020, I’ve been looking for ways to keep myself occupied. I had been meaning to work on my personal website for a while, and being stuck at home for a few months was the perfect time for it. Even my project at work at the time revolved around data visualization. I took it as a sign to finally dive a little further into [D3](https://d3js.org/).


## planning <a name="planning"></a>

The first step was to figure out exactly what I wanted. I started off with a fairly minimal list:
- a interactive map to show where I visited
- a way to display memories/photos from my time in each location
- another layer to display extra information relating to each photo

Next step was to familiarize myself with D3 and it's geographic rendering capabilities. To do this, I consulted a number of online articles ([d3indepth](https://www.d3indepth.com/geographic/) and Mike Bostock's [Command Line Cartography](https://medium.com/@mbostock/command-line-cartography-part-1-897aa8f8ca2c) are two good ones) and read through pages and pages of documentation.


### GeoJSON vs TopoJSON

Through reading, I found that there are two main ways of encoding the geographic data, GeoJSON and TopoJSON, both extensions of the JSON file format. GeoJSON is generally more widely supported and works by encoding the geographic data as a series of `features` through coordinates (pairs of longitudes and latitudes). TopoJSON emerged as an extension of GeoJSON, capable of encoding the topography as well as the shape. Geometries in TopoJSON are represented through line segments that they call "arcs", essentially just series of points. The difference here is that arcs are can be shared and referenced by multiple shapes, thus reducing redundancy and decreasing file sizes. For example, given a country-country border, that border would be created twice in the GeoJSON file, while a single shared arc would take care of it in TopoJSON. The downside is that TopoJSON is a slightly more complex file to handle and requires an extra step to be taken later when rendering.

For my map, I decided to go with TopoJSON. Though I didn't have any need for the topography function of it, Japan is a country dense with lines; there are lots of prefectures in Japan and TopoJSON is instrumental in reducing the overlap and keeping the filesize relatively small. D3 works well with both GeoJSON and TopoJSON so there isn't anything to worry about on that end.

A snippet of the TopoJSON file looks something like this:

```JSON
{
  "type": "Topology",
  "objects": {
    "japan": {
      "type": "GeometryCollection",
      "geometries": [
        {
          "type": "MultiPolygon",
          "properties": {
            "nam": "Kyoto Fu",
            "nam_ja": "京都府",
            "id": 26
          },
          "arcs": [
            [ [ 0, 1, 2, 3, 4, 5, 6 ] ],
            [ [ 7 ] ],
            [ [ 8 ] ],
            [ [ 9 ] ]
          ]
        },
        {
          "type": "MultiPolygon",
          "properties": {
            "nam": "Saga Ken",
            "nam_ja": "佐賀県",
            "id": 41
          },
          "arcs": [
            [ [ 10 ] ],
            [ [ 11 ] ],
            [ [ 12 ] ],
            [ [ 13 ] ],
            [ [ 14 ] ],
            [ [ 15, 16, 17, 18 ] ],
            [ [ 19 ] ],
            [ [ 20 ] ],
            [ [ -22 ] ],
            [ [ 22 ] ],
            [ [ 23 ] ]
          ]
        },
```

I also use Gatsby to generate and host my website as a static site so I used the plugin [Gatsby-Plugin-Image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) to streamline the process, but this project is perfectly doable without the plugin as well.


## map rendering <a name="map rendering"></a>

To use D3 with React, I created a separate component to be used back on the main page. 

As for the actual rendering, D3 takes care of most of the nitty-gritty details. The basic ideas to grasp are projections and path generators. There are lots of [good tools online](https://bl.ocks.org/d3indepth/f7ece0ab9a3df06a8cecd2c0e33e54ef) to get a better visual understanding of how each type of projection works. I chose the Mercator projection which is the one that people will usually be most familiar with. Even though it's not the most accurate when looking at the entire earth all at once, it's fairly accurate when targeted closely at one country alone like Japan.

```jsx
var projection = d3.geoMercator()
  .scale(1200)
  .center([137,37])
  .translate([width/2,250])

var path = d3.geoPath().projection(projection);

d3.json("/json/topojapan.json").then(data => {
  var features = topojson.feature(data, data.objects.japan).features
```

D3's `json` function reads in the TopoJSON information and using the projection that we created before, we can draw in paths for each of the geometries listed in the JSON file.

```jsx
d3.json("/json/topojapan.json").then(data => {
  var features = topojson.feature(data, data.objects.japan).features

  svg.selectAll("path")
    .data(features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("stroke", "black")
    .style("stroke-width", "0.6")
    .style("fill", "white")
});
```

 
This would display the bare minimum of my map, but I also wanted to be able to interact with it, so I would need to add `onClick` and `onHover` events. This can be done fairly easily by building on D3's generated path.

At this point, it was also time to think about how I wanted to store and move data around between components. I didn't have a large amount of data; I had only visited a handful of prefectures and for each location, only another handful of pictures to display. I decided to stick to the basics and just create an array to hold the names of the each location I had been to.

```jsx
const visited = ["Tokyo To", "Kyoto Fu", "Osaka Fu", "Fukuoka Ken", "Nara Ken", "Aichi Ken"]
```

```jsx
svg.selectAll("path")
  .data(features)
  .enter()
  .append("path")
  ...
  .on("mouseover", function(e) {
    if (visited.includes(e.properties.nam)) {
      d3.select(this).style("fill", "#d9bbb2")
    } else {
      d3.select(this).style("fill", "lightgrey")
    }
  })
  .on("mouseout", function(e) {
    if (e.properties.nam === selected) {
      d3.select(this).style("fill", "#334e70")
    } else if (visited.includes(e.properties.nam)) {
      d3.select(this).style("fill", visitedColor)
    } else {
      d3.select(this).style("fill", nonVisitedColor)
    }
  })
  .on("click", function(e) {
    if (visited.includes(e.properties.nam)) {
      svg.selectAll("path")
        .style("fill", function(e) {
          if (visited.includes(e.properties.nam)) {
            return visitedColor
          } else {
            return nonVisitedColor
          }
        })
      d3.select(this).style("fill", selectedColor)
    }
  })
```

The next part was to have what the user selected on the map match up to which pictures would be shown. This would mean needing to pass data back to the main page/component.


## passing props <a name="passing props"></a>

A big part of React's philosophy is to have data flow in only one direction. This means props should only be passed down from parents to children and never the other way around. There are really two ways around this problem. One is to use a global state manager like Redux, and the other is "lift the state up".

Again, the amount of data I was dealing with was not large. I wanted to keep this as simple as possible so I went with the latter option. To "lift the state up" means to have the child's state actually reside in the parent component. The parent then provides the child a function to change the state value as another prop.

```jsx
<JapanMap setLoc={(newLoc) => setLoc(newLoc)}  />
```

The `setLoc` function could then be used in the `onClick` function from the map component.


## images <a name="images"></a>

Though I had initially intended this to be a stand-alone web app, I decided to stick with Gatsby to start it. There isn't any dynamic parts to the site, so Gatsby's static site would suit it perfectly.

As well, Gatsby's integration with GraphQL and its [Gatsby-Plugin-Image](https://www.gatsbyjs.com/plugins/gatsby-plugin-image/) aid greatly in making the workflow streamlined.

With GraphQL, I can make a query that will return all the files with a filetype of jpeg or png in a specific folder. Using GraphQL with a query like this allows the app to be scalable, which comes in handy and I was often unsure of how many and which photos I wanted exactly to put in.

```jsx
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

This returns an object like this:

```jsx
Object
  allFile:
    edges: Array(20)
      0:
        node:
          childImageSharp: {gatsbyImageData: {…}}
          id: "f4605657-c0cc-5617-968c-473f01e8f9e2"
          name: "tokyo_mtfuji_1
      ...
```

With the data retrieved from the query, I can then sort the images by their location into an object (the image names are all prefixed with the location where they were taken).

```jsx
var photos = {}
var allPhotos = data.allFile.edges

for (var i = 0; i < allPhotos.length; i++) {
  var name = allPhotos[i].node.name
  var place = name.split("_")[0]
  if (place in photos) {
    photos[place].push({name: name,
                        image: getImage(allPhotos[i].node.childImageSharp)})
  } else {
    photos[place] = [{name: name,
                      image: getImage(allPhotos[i].node.childImageSharp)}]
  }
}
```

And display them depending on what location is selected:

```jsx
// note: Flex and Box are my own components styled with "styled-components"
<Flex boxWidth="49.5%" photos>
  // "Japan" is the starting default for the location
  {loc !== "Japan" &&
    photos[loc.split(" ")[0].toLowerCase()].map((photo, index) => {
      return (
        <Box key={photo.name} photo>
          <GatsbyImage
            alt={photo.name}
            key={photo.name}
            image={photo.image}
          />
        </Box>
      )
    })
  }
</Flex>
```

### extra information - data storage

Still I wanted to show more information past just the visual memories. I wanted the ability to get little blurbs relating to each picture and location.

Unfortunately, I knew that this section would never be able to be truly scalable. I wanted to personalize each and every picture with its own blurb, and that meant I had to write out a separate description for each one and match them up with the picture using some sort of id or name. It was likely going to tedious writing everything out so I wanted something simple that would do the job.

I ended up just going with just a JS object storing the matching photo name, location, date, and a short description. I stored everything as a string except for the description. For some of the photos I wanted slightly longer blurbs that included newlines. In order to incorporate newlines, I stored each separate "paragraph" of the description into a array, which would allow me later to iterate over them, generating html components for each one. An alternative would have been to insert newline symbols and then parse the string later when generating content. That would make things harder to edit later on though, if descriptions became very long, symbols could easily get lost or missed.

This is still far from the best solution for associating information with the images however. The only way to check for which description matches with which image is to do a check on their names. This requires a lot of manual work in naming them and then later on if any bugs come up. It's fine for now considering the scope is relatively small, but a better solution for the general case would be to hold all the data together, the description along with the images. Parsing of the image names could also be done in order to reduce the number of extra fields we have.



### modals

This feature was the one that came with the most choices. There are a lot of different ways to display information visually and also lots of ways to store that information. Though not a designer, I nevertheless had to come up with a few different designs.

The first one was to simulate a rotation of the image and show the information on its backside. 
I decided against this one as I wanted to keep the image on screen while showing the description so as to give the user context while they read.

The second idea was to have the description come up next to the image, shifting the other images into a different alignment.
I decided against this one as well. The shifting of the elements simply seemed too messy; I wanted to keep the gallery feeling of the images.

The third (and final) idea was to use a modal. Modals are typically used to draw the user's full attention to a specific element or component. Usually I dislike modals for this reason, it interrupts whatever else was current happening, forcing the user to contend with whatever the modal is presenting. However, in this scenario, that's exactly what I wanted. I would be able to keep the photo up to provide context, not disrupt the alignment of the other photos and keep the user's full attention.

Another component was made, a general one that would be hidden and filled depending on the photo clicked.

```jsx
<Modal hidden={props.hidden} onClick={e => props.setModalHidden(true)}>
  <ModalContent onClick={e => e.stopPropagation()}>
    <Flex boxWidth="48%">
      <Box>
        <GatsbyImage
          alt={props.photo.name}
          key={props.photo.name}
          image={props.photo.image}
        />
      </Box>
      <Box>
        <Flex boxWidth="50%">
          <Box>
            <Heading>location</Heading>
            <Text>{props.info.location}</Text>
          </Box>
          <Box>
            <Heading>date</Heading>
            <Text>{props.info.date}</Text>
          </Box>
        </Flex>
        <div>
          <Heading>description</Heading>
          {props.info.description.map((line, index) => {
            return <Text key={index}>{line}</Text>
          })}
        </div>
      </Box>
      </Flex>
  </ModalContent>
</Modal>
```

```jsx
<PhotoModal
  text="" 
  hidden={modalHidden}
  photo={openPhoto}
  setModalHidden={(newModalHidden) => setModalHidden(newModalHidden)}
  info={japanPhotoInformation[openPhoto.name] || {date: "", location: "", description: [""]}}
/>
```

Similar methods as before were employed to allow the state to track when the model should be visible depending on whether a picture was clicked and whether or not the user had just closed the active modal. 


## final thoughts

In the end, I think there are a number of things I'd like to change up for the next trip I decide to document. For one, the choice to use a library to handle the images did indeed streamline the processs a little bit, but it also took away some of the agency I had in manipulating the images however I wanted. I waould probably want to do it from scratch the next time around.

As well, 
