# Experimental Analysis of Rumour Systems

Rumours are a common and important feature of online discussion, but can spiral out of hand. Ambiguous information systems are especially important when traditional outlets are unable to verify information within the relevant timeframe. An example of such an event are natural disasters [cite], crises like terrorist acts [cite] and protest demonstrations [cite]. In each of these cases those "on the ground" often turn to social media to access critical, real-time information that traditional outlets are unable to provide. This study asks how design interventions can help facilitate the sharing of higher quality information in ambiguous environments. To provide empirical focus to this analysis, we focus on rumours shared during recent protest demonstrations.

## &#9745; Managing Online Rumours During Offline Protest

- Context: information shared during protests.
- Data: tweets from previous protests that later turned out to be True or False (e.g. notifications of violence/police crackdowns/counter protests)
- Rumours: Two rumours, one that is more plausible than the other. Derived from fact-checking news sites after the fact.
  - Were Portland Protesters ‘Kidnapped’ by Federal Officers in Unmarked Vans? [Snopes](https://www.snopes.com/fact-check/feds-unmarked-vans-portland/), [Politifact](https://www.politifact.com/factchecks/2020/aug/04/bob-casey/sen-bob-casey-said-federal-agents-kidnapped-protes/)
    - Twitter Threads / articles: [thread](https://twitter.com/matcha_chai/status/1283328232033411072), [denying rumour](https://twitter.com/honeybearius/status/1283951101486731264), [denying rumour](https://twitter.com/BootsyMagnums/status/1284014453621772288), [affirming rumour](https://twitter.com/bitsandsnatches/status/1283520381249191936)
  - [Minnesota law enforcement isn’t “contact tracing” protesters, despite an official’s comment](https://www.vox.com/recode/2020/6/1/21277393/minnesota-protesters-contact-tracing-covid-19)
    - Twitter Threads/ articles: [thread](https://twitter.com/mikarv/status/1266855229557014531), [article](https://www.verdict.co.uk/brittany-kaiser-contact-tracing-police/)), [article](https://www.coindesk.com/minnesota-official-alarms-privacy-advocates-with-contact-tracing-comments)
- Intervention(s):
  - &#9744; Salience content intervention  (Be aware that not everything online is true.)
  - &#9745; Contrastive content warning (others disagree with this statement)
  - &#9745; Birdwatch warning (see: [birdwatch homepage](https://twitter.github.io/birdwatch/))

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

- `/main`: information regarding the project
- [`/website`](https://github.com/cameron-raymond/SDS-Thesis/tree/website): the study website
- [`/analysis`](https://github.com/cameron-raymond/SDS-Thesis/tree/analysis): code used to study the results of the experiment

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

This research is being conducted by Cameron Raymond, an MSc student at the University of Oxford, under the supervision of Dr. Peaks Krafft and Dr. Joss Wright, faculty members at the the University of the Arts London and the University of Oxford respectively - and in collaboration with Dr. Emma Spiro a faculty member at the University of Washington.

If you have any questions about this research, do not hesitate to contact Cameron Raymond at [cameron.raymond@oii.ox.ac.uk](mailto:cameron.raymond@oii.ox.ac.uk).
