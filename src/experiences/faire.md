---
path: "/faire"
title: "Faire"
time: "Sept 2021 - Dec 2021"
location: "Waterloo, ON - hybrid"
technologies: "TypeScript, React, Kotlin"
---

### summary

I worked as a Frontend Engineering at Faire for my 3rd co-op from Sept 2021 to Dec 2021. I was a part of the Apparel Brand Pod — one of the sub-teams that worked on furthering Faire's reach in the apparel industry.

During my first two months, I focused mainly on optimizing and speeding up Faire's bulk uploader, their tool that allows brands to bulk upload products to be listed for sale. Given that some brands could have product lists that stretched into the hundreds of thousands, speeding up this process was vital to maintain customer satisfaction. Aside from that, I also aided in migrating Faire's E2E tests for their repos. While it had no external visible change, it was a move that all the developers welcomed, and gave me a chance to look into how important maintaining developer tools is.

For my last two months, I moved into working on a larger project, implementing swatches on both the brand and retailer side. On the brand side, this involved creating a swatches uploader that would allow brands to select swatch images, and the retailer side consisted of properly displaying swatches with the associated products.

### swatches

Prior to the swatches feature, colours at Faire were displayed in 3 ways: swatches if and only if all the colours were a subset of css colours, boxes labeled with the colour name, or a dropdown with the colours when their names were too long for boxes. But through analyzing the data we found that showing the css colours actually fared the worst out of all the options, probably due to the colours not matching up well with the actual product. None of the options provided the customer with a accurate and satisfying way to visualize the options available to them so we wanted to refresh the experience.

Though the swatches project technically consisted of two parts, I split it into three. Since we wanted to focus primarily on getting the retailer experience out for customers to see, designs for the retailer were completed first. However, this raised a problem, we had no way for swatches to actually be created on the brand side. Thus, I was given free reign to both design and implement a backfiller swatch editor so that we had swatches to display in the time period before we properly rolled out the feature to brands. Shortly after finishing, I was able to implement the retailer side designs, and eventually, with the support of some of my team members, put together a rough version of the final brand portal swatch editor right before the holidays.

Overall, the swatches project was a great experience for me to gain more experience in scoping and planning larger projects, as well as a chance for me to undertake some iterative design and analysis in the form of the backfiller. It was incredibly gratifying to see everything come together and see real users experience what I had built.
