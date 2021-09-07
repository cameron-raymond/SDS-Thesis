# Experimental Analysis of Rumour Systems

Protests are a key mechanism for collective action and are increasingly reliant on on- line communication. In addition, large, offline protests are also events with tremen- dous amounts of ambiguity. Those on the ground are the first to know of new developments, but it is difficult to verify information in a timely manner. Further- more, little experimental research has been done to understand how design factors online affect the information that activists have access to. This preregistered study investigates this gap by implementing an experimental analysis of rumour and mis- information sharing during a mock-protest demonstration. Through a Bayesian, “rumour proportions” framework, this study observes how adding credibility indi- cators (i.e., warnings) to misleading content affects the belief in, and rate at which participants share, rumours. Additional exploratory analyses examine the role of post attributes in sharing and the possibility of an “implied truth effect.” The re- sults show that the treatment made participants share in greater alignment with what they perceived as accurate, but did not alter those perceptions themselves. Thus, those with biased accuracy estimates continued to share misleading informa- tion. By moving beyond general misinformation stimuli and focusing on a specific application of credibility indicators, this study calls into question the notion that individuals spread misleading information simply because their attention is focused on factors other than accuracy.

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

### Confirmatory hypotheses

The presence of credibility indicators in the system will:

- **H1**: *decrease* the *affirmation rate* for rumours with lower evidence levels.
- **H2**: *increase* the *denial rate* for rumours with lower evidence levels.
- **H3**: *increase* the *affirmation rate* for rumours with higher evidence levels.
- **H4**: *decrease* the *denial rate* for rumours with higher evidence levels.

### Exploratory Research Questions

- **RQ1**: How does the post-source affect sharing behaviour during protest demonstrations?
- **RQ2**: How does the temporal proximity of online content affect sharing behaviour during protest demonstrations?
- **RQ3**: Is there any evidence of an implied truth effect, whereby attaching credibility indicators to a subset of false posts is considered to imply truthfulness in the posts without a credibility indicator.

## Branches

- `/main`: information regarding the project
- [`/website`](https://github.com/cameron-raymond/SDS-Thesis/tree/website): the study website
- [`/analysis`](https://github.com/cameron-raymond/SDS-Thesis/tree/analysis): code used to study the results of the experiment
- [`/twitter-scraper`](https://github.com/cameron-raymond/SDS-Thesis/tree/twitter-scraper): code used to collect relevant rumour discussion to use in the experimental environment.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

This research is being conducted by Cameron Raymond, an MSc student at the University of Oxford, under the supervision of Dr. Peaks Krafft and Dr. Joss Wright, faculty members at the the University of the Arts London and the University of Oxford respectively - and in collaboration with Dr. Emma Spiro a faculty member at the University of Washington.

If you have any questions about this research, do not hesitate to contact Cameron Raymond at [cameron.raymond@oii.ox.ac.uk](mailto:cameron.raymond@oii.ox.ac.uk).
