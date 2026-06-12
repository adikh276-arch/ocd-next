export interface ContentItem {
  id: string;
  title: string;
  preview?: string;
  content: string[];
  source?: string;
}

export interface OCDCategory {
  tips: ContentItem[];
  myths: ContentItem[];
  articles: ContentItem[];
  stories: ContentItem[];
}

export const wellnessData: Record<string, OCDCategory> = {
  'health-ocd': {
    tips: [
      {
        id: '1',
        title: 'Practice Exposure and Response Prevention (ERP)',
        content: [
          'ERP is the gold standard treatment for Health OCD and one of the most powerful tools available. The idea behind it is straightforward but challenging — you gradually expose yourself to the thoughts or situations that trigger your health anxiety, and then resist the urge to perform compulsions like Googling, body-checking, or seeking reassurance.',
          'For example, if noticing a headache triggers a spiral of fear, ERP would involve sitting with the discomfort of that headache without checking symptoms or seeking reassurance — and allowing the anxiety to naturally rise and fall on its own. Over time, the brain learns that the feared outcome is unlikely and that the anxiety is manageable without rituals.',
          'ERP is best done with a trained therapist, but even small daily steps — like delaying a compulsion by 10 minutes — can begin to break the cycle. The key is consistency. Each time you resist a compulsion, you weaken the OCD loop a little more.'
        ]
      },
      {
        id: '2',
        title: 'Practice Mindfulness Without Engaging the Thought',
        content: [
          'Mindfulness is a powerful tool for Health OCD — but it needs to be used in the right way. The goal is not to eliminate anxious thoughts, but to observe them without engaging or reacting to them. When a scary health thought pops up, instead of fighting it or giving in to it, you simply notice it: "There is a thought telling me I might be sick. I don\'t need to act on it."',
          'This approach is rooted in Acceptance and Commitment Therapy (ACT), which teaches that thoughts are not facts — they are mental events that come and go. The more you try to suppress or argue with a health-related intrusive thought, the stronger it becomes. Mindfulness helps you create distance between yourself and the thought, reducing its power over your behavior.',
          'Start with just 5–10 minutes of mindfulness meditation daily. Apps like Headspace or Insight Timer can be helpful. Over time, this practice rewires the brain\'s response to intrusive thoughts, making them feel less urgent and threatening.'
        ]
      },
      {
        id: '3',
        title: 'Stop Seeking Reassurance — Online and From Others',
        content: [
          'One of the most important — and hardest — tips for recovering from Health OCD is to stop seeking reassurance. This includes Googling symptoms, repeatedly visiting doctors for the same concern, asking friends or family "do you think I\'m okay?", rereading old test results, or checking your body repeatedly throughout the day.',
          'Reassurance-seeking feels like it helps in the moment, but it is actually a compulsion that feeds the OCD cycle. Every time you seek and receive reassurance, your brain gets a short burst of relief — but it also learns that reassurance is the only way to cope with uncertainty. This makes the anxiety return stronger the next time.',
          'A practical strategy is to set clear "no reassurance" rules for yourself. Limit doctor visits to medically necessary appointments only. Tell trusted loved ones about your OCD so they can kindly decline to reassure you. And when the urge to Google strikes, delay it — even by 15 minutes — and see if the anxiety passes on its own. It usually does.'
        ]
      },
      {
        id: '4',
        title: 'Keep a Thought Journal to Track Your OCD Patterns',
        content: [
          'A thought journal is a simple but incredibly effective tool for understanding and managing Health OCD. The idea is to write down your intrusive health thoughts as they happen — what triggered them, how intense the anxiety felt (on a scale of 1–10), what compulsion you felt the urge to perform, and whether you resisted it or gave in.',
          'Over time, this journal reveals patterns that are hard to see in the middle of an anxiety spiral. You might notice that your health fears spike during stressful periods, late at night, or after reading certain types of content. This awareness is powerful — it helps you see the OCD for what it is, rather than believing every thought as a genuine health warning.',
          'A journal also helps you track your progress in recovery. Seeing that you resisted a compulsion yesterday, or that an anxiety spike that once rated a 9 now rates a 5, is deeply motivating. It reminds you that healing is happening, even when it doesn\'t feel that way. You don\'t need a fancy app — a simple notebook works perfectly.'
        ]
      },
      {
        id: '5',
        title: 'Seek Professional Help From an OCD Specialist',
        content: [
          'While self-help strategies are valuable, Health OCD often requires professional guidance — especially when it significantly impacts daily life, relationships, or work. The most important step you can take is finding a therapist who specializes in OCD, not just general anxiety, as the treatment approach is quite different.',
          'Look for a therapist trained in ERP and CBT for OCD. Organizations like the International OCD Foundation (IOCDF) have directories to help you find qualified specialists in your area. In some cases, a psychiatrist may also recommend SSRIs (such as fluoxetine or sertraline), which have strong evidence for reducing OCD symptoms and work well alongside therapy.',
          'Don\'t be discouraged if the first therapist isn\'t the right fit — finding the right match matters. Also, remember that recovery is not linear. There will be good days and setbacks, but with the right professional support and consistent effort, most people with Health OCD experience significant improvement. Asking for help is not weakness — it is the most courageous and effective thing you can do.'
        ]
      }
    ],
    myths: [
      {
        id: '1',
        title: '"Health OCD is just being a hypochondriac"',
        content: [
          'Many people confuse Health OCD with hypochondria, but these are very different experiences. Hypochondria (now clinically called Illness Anxiety Disorder) involves a persistent worry about being sick, but the person can often be reassured — at least temporarily — and may not feel compelled to perform repetitive rituals.',
          'Health OCD, on the other hand, is rooted in the OCD cycle: an intrusive thought triggers extreme anxiety, which then drives compulsive behaviors to neutralize that anxiety. For example, a person might feel a slight headache and immediately spiral into the thought, "What if this is a brain tumor?" They then spend hours checking their symptoms online, pressing on their head repeatedly, or calling loved ones for reassurance — not because they want to, but because the anxiety feels unbearable without doing so.',
          'The key difference is that people with Health OCD often know their fears are irrational, yet they cannot stop the cycle. The thoughts feel intrusive and unwanted — like a broken alarm that won\'t switch off. This is what separates it from general worry or hypochondria. Labeling it as "just being dramatic" dismisses the very real neurological processes at work and prevents people from seeking proper, targeted treatment.'
        ]
      },
      {
        id: '2',
        title: '"If you just stop worrying, it will go away"',
        content: [
          'This is one of the most damaging myths because it places the entire burden of recovery on the person suffering — as if they simply haven\'t tried hard enough. In reality, Health OCD is not a habit of thinking that can be broken through positive mindset alone. It is a clinical disorder rooted in how the brain processes threat and uncertainty.',
          'Research shows that people with OCD have differences in how certain brain regions — particularly the orbitofrontal cortex and the basal ganglia — communicate with each other. This creates a loop where the brain sends repeated "danger" signals even when there is no real threat. No amount of logic or willpower can simply override this loop without proper intervention.',
          'The most effective treatment is Exposure and Response Prevention (ERP) therapy, a specific form of Cognitive Behavioral Therapy (CBT). ERP works by gradually exposing the person to their fears without allowing them to engage in compulsions, which over time teaches the brain that the feared outcome is unlikely and that the anxiety will pass on its own. In some cases, medication such as SSRIs is also used alongside therapy.',
          'Telling someone to "just stop worrying" not only doesn\'t help — it can make things worse by increasing feelings of shame, isolation, and hopelessness, which in turn feed the anxiety cycle even further.'
        ]
      },
      {
        id: '3',
        title: '"Googling symptoms is helpful and responsible"',
        content: [
          'In today\'s world, looking up health information online seems like a perfectly reasonable thing to do. For most people, it is. But for someone with Health OCD, Googling symptoms is not a form of self-care — it is a compulsion that makes the condition significantly worse over time.',
          'Here is how the cycle works: the person experiences an intrusive thought ("What if this mole is cancerous?"), feels an intense spike of anxiety, and turns to Google to find reassurance. For a brief moment, reading "this is probably nothing" brings relief. But OCD is never satisfied for long. The doubt quickly returns — "But what if my case is different? What if I missed something?" — and the person goes back to search again. Each search reinforces the idea that the anxiety is justified and that checking is necessary to feel safe.',
          'Over time, this creates a deeply ingrained pattern. The brain learns that the only way to cope with health-related uncertainty is to seek more information. The person may spend hours a day reading medical websites, looking up worst-case scenarios, or jumping from one health forum to another. The result is not reassurance — it is escalating fear, because the internet always provides some alarming information.',
          'Breaking the Googling habit is one of the hardest but most important steps in recovering from Health OCD. ERP therapy specifically trains people to sit with uncertainty without turning to compulsions like online searching, gradually reducing the power these rituals hold.'
        ]
      },
      {
        id: '4',
        title: '"If doctors give you a clean bill of health, you should feel better"',
        content: [
          'For people without OCD, a doctor saying "you\'re fine" brings lasting relief. For someone with Health OCD, that relief typically lasts only a few minutes, hours, or days before the doubts return in full force. This leaves many people confused and frustrated — "I\'ve been told I\'m healthy, so why am I still terrified?"',
          'The answer lies in how OCD exploits uncertainty. No doctor can guarantee with 100% certainty that a person is disease-free — there is always a slim possibility that something was missed, that symptoms will develop in the future, or that test results were inaccurate. For most people, this level of uncertainty is tolerable. For someone with Health OCD, even a 0.1% chance of illness feels unbearable, and they will continue seeking reassurance until they feel "certain enough" — a feeling that never truly arrives.',
          'This leads to what is called reassurance-seeking, one of the most common compulsions in Health OCD. The person repeatedly visits doctors, asks friends and family for opinions, rereads their test results, or seeks second and third medical opinions. Each time they receive reassurance, it provides brief relief but ultimately strengthens the OCD cycle — because the brain learns that the only way to feel safe is to keep checking.',
          'In fact, many therapists treating OCD will specifically advise loved ones and even medical professionals not to provide excessive reassurance, because doing so — no matter how well-intentioned — inadvertently maintains the disorder. True recovery involves learning to tolerate uncertainty, not eliminate it.'
        ]
      },
      {
        id: '5',
        title: '"Health OCD means you\'re weak or mentally fragile"',
        content: [
          'There is a significant stigma around OCD and mental health in general, leading many people to believe that struggling with Health OCD is a sign of personal weakness, low resilience, or an inability to "handle life." This could not be further from the truth.',
          'Health OCD does not discriminate. It affects people across all ages, backgrounds, professions, and personality types. Many high-achieving individuals — doctors, lawyers, athletes, teachers, and caregivers — live with Health OCD. In fact, people with OCD are often described as conscientious, detail-oriented, and deeply caring — traits that, when combined with a misfiring threat-detection system in the brain, can result in intense health-related anxiety.',
          'It is also worth noting that having Health OCD does not mean a person is "going crazy" or losing their grip on reality. Most people with the condition have full insight — they know their fears are likely irrational, which actually adds another layer of suffering. They feel trapped between knowing their thoughts are excessive and being completely unable to dismiss them.',
          'Struggling with Health OCD is not a character flaw — it is a medical condition, just like diabetes or asthma. It requires proper diagnosis, compassionate support, and evidence-based treatment. Recognizing this is the first step toward reducing the shame that so often stops people from seeking the help they need and deserve.'
        ]
      }
    ],
    articles: [],
    stories: []
  },
  'hoarding-ocd': {
    tips: [],
    myths: [],
    articles: [
      {
        id: '1',
        title: 'What is Compulsive Hoarding?',
        source: 'International OCD Foundation (IOCDF)',
        content: [
          'This is one of the most beginner-friendly and widely referenced articles on Hoarding OCD, written by leading researchers from Boston University and Smith College. It explains the condition in a clear, compassionate, and non-judgmental way.',
          'The article clarifies that compulsive hoarding was commonly considered a type of OCD, with estimates suggesting that as many as 1 in 4 people with OCD also have compulsive hoarding, and nearly 1 in 5 compulsive hoarders have non-hoarding OCD symptoms.',
          'It also addresses a very common mistake people make — thinking you can solve hoarding by simply cleaning out the home. The article explains that attempts to "clean out" the homes of people who hoard without treating the underlying problem usually fail, and hoarders whose homes are cleared without their consent often experience extreme distress and may become further attached to their possessions.',
          'It also covers what people most commonly hoard, how hoarding differs from collecting, how to have a sensitive conversation with a loved one who hoards, and what treatment strategies actually work.'
        ]
      },
      {
        id: '2',
        title: 'Hoarding Disorder — Symptoms, Causes, Diagnosis and Treatment',
        source: 'Anxiety & Depression Association of America (ADAA)',
        content: [
          'This article from the ADAA provides a well-rounded, clinically informed overview of Hoarding Disorder — covering everything from its causes to its treatment options in a highly readable format.',
          'What makes this article particularly valuable is its explanation of why people develop hoarding tendencies. Hoarding Disorder can develop due to a combination of genetic factors, brain-based differences, stressful life experiences, learned behaviors, and co-occurring mental health conditions such as anxiety, depression, ADHD, or OCD.',
          'It also firmly challenges the harmful stereotype that hoarding is simply a lifestyle choice, stating clearly that Hoarding Disorder is not related to laziness or lack of willpower — it is a legitimate and treatable mental health condition.',
          'The article also discusses how symptoms often begin in the teenage years and gradually worsen into adulthood, making early recognition and professional intervention critically important.'
        ]
      },
      {
        id: '3',
        title: 'Compulsive Hoarding — OCD Symptom, Distinct Syndrome, or Both?',
        source: 'PubMed (National Library of Medicine)',
        content: [
          'This is a deeper, research-based article that explores one of the most debated questions in the field — is hoarding truly a part of OCD, or is it its own separate condition altogether? It is ideal for readers who want a more scientific and clinical perspective.',
          'The study compared patients with hoarding who also had OCD against those who hoarded without any other OCD symptoms. It found that approximately one-fourth of participants in the compulsive hoarding with OCD group showed a different psychopathological profile, characterized by the hoarding of bizarre items and the presence of other obsessions and compulsions related to their hoarding, such as fear of catastrophic consequences, the need to perform checking rituals, and the need to perform mental compulsions before discarding any item — and these patients had a more severe and disabling form of the disorder.',
          'The article ultimately concludes that in most individuals, compulsive hoarding appears to be a syndrome separate from OCD, associated with substantial levels of disability and social isolation.'
        ]
      },
      {
        id: '4',
        title: 'Characterizing the Hoarding Phenotype in Individuals with OCD',
        source: 'PMC — National Institutes of Health (NIH)',
        content: [
          'This research article dives deep into what makes Hoarding OCD uniquely different from OCD without hoarding — looking at symptom severity, gender differences, and co-occurring conditions. It is one of the most detailed scientific studies on the subject.',
          'The study, which examined 473 OCD patients, found that hoarders suffered from significantly more severe OCD symptoms — especially compulsions — and had greater impairment and dysphoria, as well as more comorbid psychiatric disorders.',
          'It also revealed important gender-based differences, finding that compared to female non-hoarders, female hoarders were more likely to suffer from bipolar disorder, substance abuse, panic disorder, and binge-eating disorder, and had greater OCD severity.'
        ]
      },
      {
        id: '5',
        title: 'Compulsive Hoarding — Current Controversies and New Directions',
        source: 'PMC — National Institutes of Health (NIH)',
        content: [
          'This article is a comprehensive review of the evolving scientific understanding of hoarding — exploring debates around its classification, prevalence, brain differences, and treatment. It is a great read for anyone wanting to understand where the science currently stands and where it is heading.',
          'The article highlights that patients who hoard, compared with other OCD patients, had different functional neuroimaging findings, response to treatment, and clinical profiles — suggesting that the brain of someone with hoarding disorder may actually work differently from that of a person with typical OCD.',
          'On the topic of how widespread hoarding is, the article notes that data from the Baltimore Epidemiologic Catchment Area Follow-up survey suggest that 5% of the general population experiences clinically significant hoarding, while data from the National Comorbidity Survey Replication indicate that the lifetime prevalence of compulsive hoarding may be as high as 14%.'
        ]
      }
    ],
    stories: [
      {
        id: '1',
        title: '"I Wanted a Life Beyond Piles" — A Retired Woman\'s Journey',
        content: [
          'One of the most moving and honest accounts of hoarding OCD ever written. This story follows a retired woman who spent decades struggling with the urge to collect and keep items, and her courageous journey through ERP therapy to reclaim her home and her life.',
          'She describes the "physical pain" of letting go of even a single piece of junk mail, and how she eventually learned to separate her identity and her memories from the physical objects in her house.'
        ]
      },
      {
        id: '2',
        title: 'Joan — A Retired Teacher Who Couldn\'t Let Go',
        content: [
          'Joan, a 58-year-old retired teacher, had always been "a bit of a collector," but her behavior escalated dramatically after her children moved out. Her story highlights how life transitions and the feeling of an "empty nest" can sometimes trigger or worsen hoarding symptoms.',
          'Through therapy, Joan learned to manage the overwhelming anxiety of discarding items and slowly transformed her "storage rooms" back into living spaces where she could host her grandchildren.'
        ]
      },
      {
        id: '3',
        title: 'Jeanne Leier — When Grief Triggered Hoarding',
        content: [
          'Jeanne\'s story is a powerful example of the link between grief, trauma, and hoarding. Her compulsive accumulation began after her fiancé was deployed to Iraq. She started keeping everything — receipts, newspapers, food packaging — as a way to "hold onto time" and feel a sense of control in an uncertain world.',
          'Her journey toward recovery involved addressing both her grief and her hoarding behaviors, showing that healing often requires a holistic approach.'
        ]
      },
      {
        id: '4',
        title: '"That Hoarder" — An Anonymous Audio Diary',
        content: [
          'This is the story of a person who started an anonymous podcast called "That Hoarder" to document their struggle in real-time. It provides a rare, unfiltered look into the daily internal battle of someone with hoarding disorder — the shame, the small wins, and the setbacks.',
          'It has since grown into a large community where people from all over the world share their experiences and support each other in their decluttering journeys.'
        ]
      },
      {
        id: '5',
        title: 'The Brain Behind the Hoarding — Three Clinical Cases',
        content: [
          'A neuroscientist shares three real cases that offer a window into what hoarding looks like from the inside. These cases illustrate that hoarding is not about being "lazy" or "messy" — it is a complex cognitive issue involving difficulties with decision-making, categorization, and emotional regulation.',
          'By understanding the science behind the behavior, these individuals were able to find more effective, non-judgmental ways to manage their symptoms.'
        ]
      }
    ]
  },
  'trichotillomania': {
    tips: [
      {
        id: '1',
        title: 'Practice Awareness Training',
        content: [
          'Many pulling episodes happen "automatically" while watching TV, reading, or driving. Awareness training involves identifying the "high-risk" times and the physical sensations (like an itch or tension) that precede pulling.',
          'Keep a log of when you pull. Notice the environment, your emotional state, and what your hands were doing right before.',
          'Once you are aware of the early warning signs, you can use "competing responses" to interrupt the urge before the pulling starts.'
        ]
      },
      {
        id: '2',
        title: 'Use Competing Responses',
        content: [
          'When you feel an urge to pull, immediately engage in a physical action that makes pulling impossible. This is the "Response" part of Habit Reversal Training (HRT).',
          'Examples include clenching your fists for 60 seconds, sitting on your hands, or using a fidget tool like a stress ball or a spinner.',
          'The goal is to "ride out" the urge until it passes without giving in to the pulling behavior.'
        ]
      },
      {
        id: '3',
        title: 'Create Physical Barriers',
        content: [
          'Make it harder for your fingers to find and pull hair. This provides a "speed bump" that moves the behavior from automatic to conscious.',
          'Try wearing thin cotton gloves, putting band-aids on your "pulling fingers," or wearing a hat or bandana over your hair.',
          'These barriers give you the extra second you need to recognize the urge and choose a competing response instead.'
        ]
      },
      {
        id: '4',
        title: 'Use Fidget Tools',
        content: [
          'Keep your hands busy with stress balls, spinners, or putty, especially during high-risk times like sitting at a computer or watching a movie.',
          'These tools satisfy the tactile urge that often leads to pulling without causing any damage.',
          'Place these tools in your "danger zones" so they are always within reach when an urge strikes.'
        ]
      },
      {
        id: '5',
        title: 'Practice Self-Compassion',
        content: [
          'Setbacks and slips are a normal part of the journey. Beating yourself up only increases stress, which can lead to more pulling.',
          'Instead of falling into shame, acknowledge the slip and refocus on your next awareness moment.',
          'Healing is not a straight line, and every moment you choose not to pull is a victory.'
        ]
      }
    ],
    myths: [
      {
        id: '1',
        title: '"It\'s just a bad habit"',
        content: [
          'Trichotillomania is a complex neurobiological condition, not a sign of weakness or a lack of willpower.',
          'Simply telling someone to "just stop" is ineffective because the urges can be as strong as a physical reflex.',
          'Recovery requires evidence-based strategies like Habit Reversal Training (HRT) and often professional support.'
        ]
      },
      {
        id: '2',
        title: '"It\'s a form of self-harm"',
        content: [
          'While pulling causes physical damage, the intent is usually not to cause pain. For many, pulling is a way to self-soothe, manage stress, or satisfy a sensory urge.',
          'Understanding that TTM is a Body-Focused Repetitive Behavior (BFRB) rather than self-harm helps in choosing the right therapeutic approach.',
          'Removing the "self-harm" label can also help reduce the shame and stigma associated with the condition.'
        ]
      },
      {
        id: '3',
        title: '"Only women suffer from hair pulling"',
        content: [
          'It affects all genders. While it is more commonly diagnosed in women, in childhood the rates are nearly equal between boys and girls.',
          'Stigma and shame often prevent men from seeking help, but support is available for everyone.',
          'Acknowledging that this is a universal human struggle helps build a more inclusive recovery community.'
        ]
      },
      {
        id: '4',
        title: '"It\'s always caused by trauma"',
        content: [
          'While stress and trauma can be triggers, many people develop Trichotillomania without a history of significant trauma.',
          'It is often driven by sensory processing, boredom, or anxiety rather than a specific past event.',
          'Focusing on current habit reversal techniques is effective regardless of whether a trauma history is present.'
        ]
      },
      {
        id: '5',
        title: '"You can just stop if you try hard enough"',
        content: [
          'Urges can be overwhelming and often automatic, happening without the person even realizing it.',
          'Willpower alone is rarely enough; structured treatment like HRT provides the specific cognitive and behavioral tools needed to break the loop.',
          'Recovery is about training the brain, not just "trying harder."'
        ]
      }
    ],
    articles: [
      {
        id: '1',
        title: 'What are BFRBs?',
        source: 'The TLC Foundation for BFRBs',
        content: [
          'Understanding Body-Focused Repetitive Behaviors and their treatment is the first step toward recovery.',
          'BFRBs are a group of related disorders including hair pulling, skin picking, and nail biting that are not considered self-harm but rather sensory-driven behaviors.',
          'Treatment often involves a combination of Habit Reversal Training (HRT) and Comprehensive Behavioral (ComB) treatment.'
        ]
      },
      {
        id: '2',
        title: 'The Urge to Pull',
        source: 'Mental Health America',
        content: [
          'Exploring the sensory and emotional drivers behind hair pulling can help identify specific triggers.',
          'Many people describe a "tension-release" cycle where pulling provides temporary relief from a physical or emotional itch.',
          'Learning to "ride the wave" of the urge without acting on it is a core skill in BFRB management.'
        ]
      }
    ],
    stories: [
      {
        id: '1',
        title: 'Breaking the Cycle',
        content: [
          'How Mike used habit reversal training to stop pulling for good. His journey involved identifying high-risk situations like late-night studying and using physical barriers like hats.',
          'After 15 years of pulling, Mike has now been "pull-free" for two years, showing that long-term recovery is possible with the right tools.'
        ]
      }
    ]
  },
  'pure-o-ocd': {
    tips: [
      {
        id: '1',
        title: 'Identify Mental Rituals',
        content: [
          'In Pure O, compulsions are often mental rather than physical. Common mental rituals include mental reviewing (replaying past events to check for mistakes), neutralizing (canceling out a "bad" thought with a "good" one), and mental reassurance (silently repeating comforting phrases).',
          'The first step in recovery is becoming aware of these hidden compulsions. When you feel a spike of anxiety, notice if you start "figuring it out" or "checking" your thoughts. That activity is the compulsion.',
          'Once identified, you can practice Response Prevention — choosing not to engage in the mental ritual, even if the anxiety remains high.'
        ]
      },
      {
        id: '2',
        title: 'Practice "Maybe, Maybe Not"',
        content: [
          'OCD thrives on the need for 100% certainty. When an intrusive thought asks "What if I did something terrible?", the urge is to prove it wrong. Instead, try responding with "Maybe, maybe not."',
          'This technique is a core part of ERP. It involves accepting the possibility of the feared outcome without trying to resolve it. By sitting with the "maybe," you teach your brain that you can handle uncertainty.',
          'Over time, the brain\'s alarm system recalibrates, and the thoughts lose their power to trigger intense anxiety.'
        ]
      },
      {
        id: '3',
        title: 'Stop Seeking Mental Reassurance',
        content: [
          'Trying to "prove" to yourself that you are a good person or wouldn\'t act on your intrusive thoughts is a compulsion. It provides temporary relief but keeps the OCD cycle alive.',
          'Mental reassurance can look like scanning your memory for "proof" of your character or debating with the OCD voice in your head. Recognize this as a ritual and practice letting the thought be there without answering it.',
          'It is helpful to remember that having a thought is not the same as having an intention or a desire. Your values are defined by your actions, not your intrusive thoughts.'
        ]
      },
      {
        id: '4',
        title: 'Externalize the OCD Voice',
        content: [
          'Give your OCD a name or visualize it as a separate, glitchy entity. This helps you distance yourself from the intrusive thoughts.',
          'When an obsession strikes, instead of saying "I am having a terrible thought," say "My OCD is playing that old tape again."',
          'This "defusion" technique makes it easier to observe the thought without feeling an urgent need to react or perform a ritual.'
        ]
      },
      {
        id: '5',
        title: 'Focus on Values, Not Thoughts',
        content: [
          'OCD wants to keep you stuck in your head. Counter this by identifying what truly matters to you — your values — and taking small actions toward them.',
          'Even if you are feeling 10/10 anxiety about an intrusive thought, you can still choose to be kind to a friend, finish a work task, or engage in a hobby.',
          'Living a value-driven life, rather than a fear-driven one, is the ultimate goal of recovery.'
        ]
      }
    ],
    myths: [
      {
        id: '1',
        title: '"Pure O means there are no compulsions"',
        content: [
          'This is the most common myth about this subtype. While there may be no visible behaviors like hand-washing, the compulsions are simply internal.',
          'Mental rituals are just as real, time-consuming, and distressing as physical ones. Effective treatment involves identifying these mental acts and learning to resist them.',
          'Understanding that Pure O still follows the Obsession-Compulsion cycle is crucial for applying the right treatment strategies.'
        ]
      },
      {
        id: '2',
        title: '"Thinking it means you want to do it"',
        content: [
          'OCD thoughts are "ego-dystonic," which means they are the opposite of what the person actually values or wants. A person who values safety may have thoughts of harm; a person who values their faith may have its blasphemous thoughts.',
          'The fact that the thoughts are so distressing is actually evidence that they are contrary to your character. People who actually want to do harm do not spend hours agonized by the possibility that they might.',
          'Recovery involves learning that thoughts are just electrical signals in the brain and do not reflect your true self or your future actions.'
        ]
      },
      {
        id: '3',
        title: '"Pure O is just overthinking"',
        content: [
          'While it might look like overthinking from the outside, Pure O is a clinical disorder driven by a misfiring threat-detection system in the brain.',
          'Normal "overthinking" usually has a logical goal or resolution. OCD thoughts are repetitive, intrusive, and do not lead to productive solutions.',
          'Treating it like simple stress or worry often fails because it doesn\'t address the underlying neurological cycle.'
        ]
      },
      {
        id: '4',
        title: '"You need to figure out the meaning of the thoughts"',
        content: [
          'This is a major trap. OCD thoughts are "brain junk" and have no deeper meaning about your secret desires or future.',
          'Searching for "why" you had a thought is actually a compulsion that keeps the cycle going.',
          'Healing comes from accepting that the thoughts exist without needing to analyze or understand them.'
        ]
      },
      {
        id: '5',
        title: '"It is impossible to treat mental rituals"',
        content: [
          'Many people fear that because their rituals are invisible, they cannot be stopped. This is false.',
          'ERP is highly effective for mental compulsions. By identifying the mental acts and choosing not to engage in them, you can rewire your brain.',
          'Working with a specialist who understands "Pure O" is often the key to successfully tackling these internal rituals.'
        ]
      }
    ],
    articles: [
      {
        id: '1',
        title: 'Understanding Mental Compulsions',
        source: 'Psychology Today',
        content: [
          'A deep dive into the hidden rituals of Pure O OCD and how to break them. Mental compulsions can be just as disabling as physical ones.',
          'Common mental rituals include checking your feelings, replaying conversations, and trying to "solve" intrusive thoughts.',
          'Recovery involves recognizing these mental acts as compulsions and practicing non-engagement.'
        ]
      },
      {
        id: '2',
        title: 'The Myth of "Pure" Obsessions',
        source: 'OCD Action',
        content: [
          'Why researchers now believe all OCD involves compulsions, even if they are invisible to an observer.',
          'The term "Pure O" can be misleading because it suggests there is no behavior involved, when in fact the behavior is simply happening in the mind.',
          'Treating mental compulsions with ERP is the most effective way to manage this subtype.'
        ]
      }
    ],
    stories: [
      {
        id: '1',
        title: 'From Mental Loops to Mental Clarity',
        content: [
          'How David used ERP to reclaim his life from intrusive thoughts. He shares how learning to live with the "maybe" allowed him to stop the constant mental checking.',
          'David now uses his experience to advocate for better understanding of mental-only compulsions in the OCD community.'
        ]
      }
    ]
  },
  'contamination-ocd': {
    tips: [
      {
        id: '1',
        title: 'Gradual Exposure',
        content: [
          'Start by creating an "exposure ladder" of objects or situations you consider "mildly dirty." Touch one of these items and resist the urge to wash your hands immediately.',
          'Stay with the discomfort until the anxiety naturally decreases by at least half. This is called habituation. Your brain needs to learn that the "contamination" doesn\'t lead to the feared catastrophe.',
          'Gradually move up your ladder to more challenging exposures. Each success builds your "bravery muscle" and reduces the power of the OCD.'
        ]
      },
      {
        id: '2',
        title: 'Delay the Wash',
        content: [
          'If you aren\'t ready to stop washing entirely, start by delaying it. When the urge to wash hits, set a timer for 5 minutes. During those 5 minutes, do another activity.',
          'As you get better at delaying, increase the time to 10, 20, or 60 minutes. Eventually, you may find that the urge has passed or feels manageable enough to skip the wash altogether.',
          'Delaying breaks the automatic link between the trigger and the ritual, giving you back a sense of control.'
        ]
      }
    ],
    myths: [
      {
        id: '1',
        title: '"OCD is just about being a clean freak"',
        content: [
          'For people with Contamination OCD, cleaning is not a preference or a personality trait — it is a desperate attempt to escape overwhelming terror.',
          'Unlike a "clean freak" who might enjoy the result of a tidy house, someone with OCD often feels exhausted and trapped by their cleaning rituals.',
          'It\'s important to distinguish between healthy hygiene and compulsive cleaning driven by irrational fear.'
        ]
      },
      {
        id: '2',
        title: '"Avoiding triggers is the best way to manage it"',
        content: [
          'Avoidance is a "safety behavior" that actually makes OCD stronger. When you avoid a "contaminated" place, you confirm to your brain that it is dangerous.',
          'The world becomes smaller and smaller as you avoid more things. Recovery involves reclaiming your life by slowly and safely re-engaging with the world.',
          'ERP (Exposure and Response Prevention) is the clinical gold standard for breaking the cycle of avoidance.'
        ]
      }
    ],
    articles: [
      {
        id: '1',
        title: 'The Science of Contamination Fear',
        source: 'Harvard Health',
        content: [
          'How the brain\'s disgust response gets hijacked by OCD. Contamination fear is often driven by a "better safe than sorry" mechanism that has gone into overdrive.',
          'Neuroimaging shows that the regions of the brain associated with disgust are more active in individuals with this subtype.',
          'Understanding the biological basis of the fear can help reduce shame and improve treatment outcomes.'
        ]
      },
      {
        id: '2',
        title: 'Living in a "Dirty" World',
        source: 'Verywell Mind',
        content: [
          'Strategies for navigating public spaces without giving in to rituals. This article provides practical tips for managing fear in everyday situations.',
          'Learning to differentiate between actual health risks and OCD-driven "rules" is key to reclaiming public life.',
          'Small exposures, like touching a doorknob without washing immediately, can build up to significant recovery.'
        ]
      }
    ],
    stories: [
      {
        id: '1',
        title: 'Reclaiming My Home',
        content: [
          'Sarah\'s journey from 6-hour cleaning rituals to a balanced life. She describes the turning point when she realized her "safe haven" had become a prison.',
          'Through ERP, Sarah learned that her family could stay healthy even without her extreme cleaning protocols, restoring peace to her household.'
        ]
      }
    ]
  }
};
