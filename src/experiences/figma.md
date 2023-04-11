---
path: "/figma-S2022"
title: "Figma S2022"
time: "May 2022 - Aug 2022"
location: "San Francisco, CA"
technologies: "C++, TypeScript, React"
---

### summary

I interned at Figma during the Summer of 2022. Specifically, I worked on FigJam’s MeEx (meetings experience) team to create the voting feature alongside 3 other fulltime engineers. 

It was a great experience, one in which I got to witness the entirety of the engineering process come together: from ideation, to experimentation and implementation, and eventually, testing and polishing. And compared to my previous internships, this time I was collaborating really closely with other fulltime engineers instead of working on my own "intern project". It was great to get to communicate and share work together.

### high-level plan

FigJam, as a tool, is already inherently open-ended. It's an infinite canvas and you can do pretty much whatever you want on it. So planning a feature is sometimes just as open-ended. There are so many different ways one can vote and that was one of our early decisions we had to make: whether we wanted to use stamp-based voting (which was already people's default, just +1 or hearting whatever their hearts desired), or to create some new voting specific primitive. Our designer considered both concepts and we would go back and forth on this decision for a while.

On the engineering side, we mainly wanted to explore different implementations to try to understand the trade-offs and also difficulty of each approach. Stamps were easier to since they already existed so that's what we considered at first. For example, counting the number of stamps on the canvas, and then on certain objects, etc. We eventually did decide to go with stamps so it ended up paying off!

### counting votes

Though we all collaborated on pretty much every part of the voting feature, I did still want to feel like I had ownership over a piece, and so one of the parts I focused on was the logic behind how we counted votes. There were lots of ways to go about them so of course, there were lots of iterations.

First, I wanted to keep things simple: I tried a generic for loop that would just iterate over every node on the canvas, counting only the voting stamps. Next, I made a listener specific to our voting feature. This listener would count every time a voting stamp was added or removed. But there was a problem with this approach, since we had an existing listener for all generic stamps, there was a potential that we could count things twice and eventually get nullptr issues. We never actually ran into the problem in practice, but better safe than sorry. 

Our final iteration was to move that listener functionality into the same file, using the delegation pattern. This way, we just had the one listener and it would be able to delegate actions on what to do with it depending on if it was generic of a voting stamp.

### final thoughts

This was a great internship! I thought the voting feature was really great to work on, and it released soon after I finished my internship. I was able to meet my goal of getting better at C++ and Figma's frontend work is definitely some of the most interesting that I've been able to write.