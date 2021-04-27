# Experimental Analysis of Rumour Systems

## Scraping

Code used to collect relevant rumour discussion to use in the experimental environment.
Collect replies to the initial rumour tweet.

* Thread showing original video of protestor being detained by [federal agents](https://twitter.com/matcha_chai/status/1283328232033411072)
* Thread showing video of police saying they're using [contact tracing](https://twitter.com/NBCNews/status/1266758240018276352)

## Hypotheses

### System level hypotheses

The presence of credibility indicators in the system will:

- $H_1$: *decrease* the *affirmation rate* for rumours with lower evidence levels.
- $H_2$: *increase* the *denial rate* for rumours with lower evidence levels.
- $H_3$: *increase* the *affirmation rate* for rumours with higher evidence levels.
- $H_4$: *decrease* the *denial rate* for rumours with higher evidence levels.

### Post level hypotheses

- $H_5$: No credibility indicator will moderate the effect of evidence in resharing
- $H_6$: The effect of credibility indicators will be impacted by post meta-data, such as the poster's gender and the temporal proximity of the information.

## Branches

* [`/main`](https://github.com/cameron-raymond/SDS-Thesis/tree/main): information regarding the project
* [`/website`](https://github.com/cameron-raymond/SDS-Thesis/tree/website): the study website
* [`/analysis`](https://github.com/cameron-raymond/SDS-Thesis/tree/analysis): code used to study the results of the experiment
* `/twitter-scraping`: code used to collect twitter discussion for the experimental environment
  
## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/cameron-raymond/SDS-Thesis/blob/main/LICENSE.md) file for details.

This research is being conducted by Cameron Raymond, an MSc student at the University of Oxford, under the supervision of Dr. Peaks Krafft and Dr. Joss Wright, faculty members at the the University of the Arts London and the University of Oxford respectively - and in collaboration with Dr. Emma Spiro a faculty member at the University of Washington.

If you have any questions about this research, do not hesitate to contact Cameron Raymond at [cameron.raymond@oii.ox.ac.uk](mailto:cameron.raymond@oii.ox.ac.uk.
