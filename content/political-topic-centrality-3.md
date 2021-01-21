---
title: "Analyzing Political Polarization: Topic Centrality"
slug: "political-topic-centrality-3"
emoji: "🏛"
blurb: "Extending graph centrality to show how different political messages affect the flow of information. The final part in a series posted on the popular blog Towards Data Science."
type: "bp"
tags: ["gt"]
link: "<a aria-label='Blog' href='https://towardsdatascience.com/analyzing-political-polarization-topic-centrality-dfc402b9fb1d'>Blog</a>"
date: "05-28-2020"
prod: true
---

Alex Pentland, director of MIT’s [Connection Science](http://connection.mit.edu/) initiative and former director of the MIT [Media Lab,](https://www.media.mit.edu/) argues that information flows across networks in a way very similar to the flu. Those who weren’t previously sick, but are repeatedly exposed to those who are, become increasingly likely to ‘catch it’ and go on to spread it to others. The same goes for ideas. As we are exposed to different viewpoints and perspectives, we have a propensity towards ‘catching’ them, which influences are friends and family (our little part of the larger network). This can go on in a cascading affect that disperses information across the entire network. **In this article we will look at political polarization as a function of the flow of ideas in a network.** Specifically, we will see that depending on what a tweet is about, it can ‘spread’ very differently.