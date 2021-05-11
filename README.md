# Experimental Analysis of Rumour Systems

Protests are a key mechanism for collective action and are increasingly reliant on online communication. Large, offline protests are also events with tremendous amounts of ambiguity. Those on the ground are the first to know of new developments, which happen in real time, but it is difficult to verify information in a timely manner. Instead of relying on traditional media outlets, activists often turn to platforms like Twitter, Facebook or WhatsApp to organize and alert others to changes – like threats or acts of violence – quickly. Conversely, if a rumour ends up being false it has the potential to increase tensions in a setting that is often already quite charged. Thus, there are benefits for platforms to manage ambiguous and timely information in a transparent and community-oriented manner. This thesis implements an experimental analysis of rumour and misinformation sharing on social media during ambiguous, temporally constrained contexts, called rumour systems. To provide empirical focus, the study concentrates its attention on the case of large, offline protest demonstrations. This study complements and extends the relevant human-computer interaction literature on misinformation in two ways. First, it goes beyond the general misinformation stimuli, i.e. false news articles, that are frequently used – and instead, fine-tunes stimuli and interventions to the case of activists during protests. Second, rather than deterministically viewing information as true or false, the study accounts for the intrinsic uncertainty of information in rumour systems through a Bayesian “rumour proportions” framework. The experimental analysis implements credibility indicators as an intervention to encourage evidence-based sharing of information during a mock-protest scenario. 

## &#9745; Managing Online Rumours During Offline Protest

- Context: information shared during protests.
- Data: Threads discussing the two rumours below.
- Rumours: Two rumours, one that is more plausible than the other. Derived from fact-checking news sites after the fact.
  - Were Portland Protesters ‘Kidnapped’ by Federal Officers in Unmarked Vans? [Snopes](https://www.snopes.com/fact-check/feds-unmarked-vans-portland/), [Politifact](https://www.politifact.com/factchecks/2020/aug/04/bob-casey/sen-bob-casey-said-federal-agents-kidnapped-protes/)
    - Twitter Threads / articles: [thread](https://twitter.com/matcha_chai/status/1283328232033411072), [denying rumour](https://twitter.com/honeybearius/status/1283951101486731264), [denying rumour](https://twitter.com/BootsyMagnums/status/1284014453621772288), [affirming rumour](https://twitter.com/bitsandsnatches/status/1283520381249191936)
  - [Minnesota law enforcement isn’t “contact tracing” protesters, despite an official’s comment](https://www.vox.com/recode/2020/6/1/21277393/minnesota-protesters-contact-tracing-covid-19)
    - Twitter Threads/ articles: [thread](https://twitter.com/mikarv/status/1266855229557014531), [article](https://www.verdict.co.uk/brittany-kaiser-contact-tracing-police/), [article](https://www.coindesk.com/minnesota-official-alarms-privacy-advocates-with-contact-tracing-comments)
- Intervention(s):
  - &#9744; Salience content intervention  (Be aware that not everything online is true.)
  - &#9745; Contrastive content warning (others disagree with this statement)
  - &#9744; Birdwatch warning (see: [birdwatch homepage](https://twitter.github.io/birdwatch/))

## Hypotheses

### System level hypotheses

The presence of credibility indicators in the system will:

- **H_1**: *decrease* the *affirmation rate* for rumours with lower evidence levels.
- **H_2**: *increase* the *denial rate* for rumours with lower evidence levels.
- **H_3**: *increase* the *affirmation rate* for rumours with higher evidence levels.
- **H_4**: *decrease* the *denial rate* for rumours with higher evidence levels.

### Post level hypotheses

- **H_5**: No credibility indicator will moderate the effect of evidence in resharing
- **H_6**: The effect of credibility indicators will be impacted by post meta-data, such as the poster's gender and the temporal proximity of the information.

## Branches

- `/main`: information regarding the project
- [`/website`](https://github.com/cameron-raymond/SDS-Thesis/tree/website): the study website
- [`/analysis`](https://github.com/cameron-raymond/SDS-Thesis/tree/analysis): code used to study the results of the experiment
- [`/twitter-scraper`](https://github.com/cameron-raymond/SDS-Thesis/tree/twitter-scraper): code used to collect relevant rumour discussion to use in the experimental environment.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

This research is being conducted by Cameron Raymond, an MSc student at the University of Oxford, under the supervision of Dr. Peaks Krafft and Dr. Joss Wright, faculty members at the the University of the Arts London and the University of Oxford respectively - and in collaboration with Dr. Emma Spiro a faculty member at the University of Washington.

If you have any questions about this research, do not hesitate to contact Cameron Raymond at [cameron.raymond@oii.ox.ac.uk](mailto:cameron.raymond@oii.ox.ac.uk).
