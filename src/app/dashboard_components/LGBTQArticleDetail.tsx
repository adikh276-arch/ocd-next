import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Sidebar } from "./Sidebar";
import { MobileNav } from "./MobileNav";
import { ChevronLeft, Clock, Heart, Share2 } from "lucide-react";

interface ArticleDetail {
  id: string;
  category: string;
  categoryColor: string;
  title: string;
  readTime: string;
  author: string;
  date: string;
  content: {
    type: "heading" | "paragraph" | "quote";
    text: string;
  }[];
}

const articlesData: ArticleDetail[] = [
  {
    id: "come-into-identity",
    category: "IDENTITY",
    categoryColor: "text-[#8B5CF6] bg-[#F5F3FF]",
    title: 'What Does It Actually Mean to "Come Into" Your Identity?',
    readTime: "6 min read",
    author: "Alex Rivera",
    date: "March 15, 2026",
    content: [
      {
        type: "paragraph",
        text: "Identity isn't a destination — it's a living, shifting thing. This piece explores why so many LGBTQ+ people feel pressure to have it all figured out, and why that pressure is worth letting go.",
      },
      {
        type: "heading",
        text: "The Myth of the Single Moment",
      },
      {
        type: "paragraph",
        text: "We're often told that coming into your identity happens in one dramatic moment — a revelation, a declaration, a complete certainty. But for most LGBTQ+ people, it's more like slowly turning up the volume on a song that's been playing quietly in the background your whole life.",
      },
      {
        type: "paragraph",
        text: "Some people experience their identity as something they've always known. Others discover it gradually, through relationships, experiences, or simply having the language to name what they feel. Neither path is more valid than the other.",
      },
      {
        type: "quote",
        text: "Your identity doesn't need to be fixed to be real. Evolution is not the same as confusion.",
      },
      {
        type: "heading",
        text: "The Pressure to Be 'Sure'",
      },
      {
        type: "paragraph",
        text: "Many LGBTQ+ people describe feeling like they need to be 100% certain before they're 'allowed' to claim their identity. This pressure often comes from outside — from people who question, doubt, or demand proof. But it can also come from within, especially when we've internalized the idea that queerness needs to justify itself.",
      },
      {
        type: "paragraph",
        text: "The truth is, most people — regardless of orientation or gender — don't question their identity this intensely. Straight and cisgender people aren't asked to prove their certainty. They're simply believed.",
      },
      {
        type: "heading",
        text: "Exploration Is Not Confusion",
      },
      {
        type: "paragraph",
        text: "Trying on different labels, changing how you describe yourself, or taking time to explore doesn't mean you're confused. It means you're listening to yourself. Identity can be fluid. It can shift. And that's okay.",
      },
      {
        type: "paragraph",
        text: "Coming into your identity isn't about finding the perfect box to fit into. It's about giving yourself permission to exist as you are — even if 'as you are' looks different tomorrow than it does today.",
      },
    ],
  },
  {
    id: "anxiety-rates",
    category: "MENTAL",
    categoryColor: "text-[#10B981] bg-[#ECFDF5]",
    title: "Why LGBTQ+ People Experience Higher Rates of Anxiety",
    readTime: "5 min read",
    author: "Dr. Jamie Chen",
    date: "March 12, 2026",
    content: [
      {
        type: "paragraph",
        text: "Minority stress, social rejection, and hiding — how chronic pressure shapes LGBTQ+ mental health and what helps.",
      },
      {
        type: "heading",
        text: "Understanding Minority Stress",
      },
      {
        type: "paragraph",
        text: "Research consistently shows that LGBTQ+ individuals experience anxiety disorders at significantly higher rates than their heterosexual and cisgender peers. This isn't because being LGBTQ+ inherently causes anxiety — it's because living in a world that often rejects, invalidates, or erases your identity creates chronic stress.",
      },
      {
        type: "paragraph",
        text: "Minority stress refers to the unique, chronic stressors that members of marginalized groups face. For LGBTQ+ people, this includes experiences of discrimination, the stress of concealing one's identity, internalized homophobia or transphobia, and anticipating rejection.",
      },
      {
        type: "quote",
        text: "The anxiety isn't about who you are. It's about living in a world that hasn't fully accepted who you are.",
      },
      {
        type: "heading",
        text: "The Hidden Toll",
      },
      {
        type: "paragraph",
        text: "Many LGBTQ+ people spend significant mental energy monitoring their environment for safety — scanning for hostile reactions, code-switching in different spaces, or deciding moment-by-moment whether it's safe to be themselves. This constant vigilance is exhausting and feeds anxiety.",
      },
      {
        type: "paragraph",
        text: "Even in accepting environments, the anticipation of rejection — learned through past experiences — can persist. This is why some LGBTQ+ individuals experience anxiety even when they're currently safe.",
      },
      {
        type: "heading",
        text: "What Actually Helps",
      },
      {
        type: "paragraph",
        text: "Connection with other LGBTQ+ people can be profoundly healing. Finding community reduces isolation and provides spaces where you don't have to explain or defend yourself. Therapy with LGBTQ+-affirming providers who understand minority stress can also make a real difference.",
      },
      {
        type: "paragraph",
        text: "Remember: your anxiety is a response to real experiences. Healing doesn't mean pretending those experiences didn't happen — it means building resilience and finding spaces where you can truly breathe.",
      },
    ],
  },
  {
    id: "coming-out-later",
    category: "COMING OUT",
    categoryColor: "text-[#F59E0B] bg-[#FFFBEB]",
    title: "Coming Out Later in Life: You're Not Behind",
    readTime: "7 min read",
    author: "Marcus Thompson",
    date: "March 10, 2026",
    content: [
      {
        type: "paragraph",
        text: "Many LGBTQ+ people discover or accept their identity in their 30s, 40s, or beyond. This is their story.",
      },
      {
        type: "heading",
        text: "There's No Timeline",
      },
      {
        type: "paragraph",
        text: "Coming out later in life often comes with a specific kind of grief — the feeling that you've 'lost time' or that you're somehow behind. But identity isn't a race, and there's no deadline for self-discovery.",
      },
      {
        type: "paragraph",
        text: "People come out later for countless reasons: lack of language or representation growing up, cultural or religious pressure, survival in unsafe environments, genuine evolution of identity, or simply not having the space to question earlier.",
      },
      {
        type: "quote",
        text: "You didn't lose time. You were surviving, learning, and becoming. And you're here now.",
      },
      {
        type: "heading",
        text: "Common Experiences",
      },
      {
        type: "paragraph",
        text: "Many people who come out later describe feeling like they have to 'catch up' — to experiences, to community, to a version of themselves they imagine they should have been. This pressure is real, but it's also worth questioning.",
      },
      {
        type: "paragraph",
        text: "Your path is your own. You don't need to have all the same experiences as people who came out young to be 'really' LGBTQ+. Your identity is valid regardless of when you claimed it.",
      },
      {
        type: "heading",
        text: "Moving Forward",
      },
      {
        type: "paragraph",
        text: "Coming out later often means navigating established lives — marriages, children, careers built on different assumptions. This is complex, and it's okay to take your time figuring out what you want your life to look like now.",
      },
      {
        type: "paragraph",
        text: "Find community with other people who came out later. Their experiences can remind you that you're not alone — and that there's joy, freedom, and belonging waiting on the other side of fear.",
      },
    ],
  },
  {
    id: "before-stonewall",
    category: "HISTORY",
    categoryColor: "text-[#EF4444] bg-[#FEF2F2]",
    title: "Before Stonewall: LGBTQ+ Resistance Through the Ages",
    readTime: "8 min read",
    author: "Dr. Samantha Lee",
    date: "March 8, 2026",
    content: [
      {
        type: "paragraph",
        text: "Queer people have always existed, resisted, and thrived — long before modern movements gave it a name.",
      },
      {
        type: "heading",
        text: "The Long Arc of History",
      },
      {
        type: "paragraph",
        text: "The Stonewall Riots of 1969 are often cited as the birth of the modern LGBTQ+ rights movement. But queer resistance didn't start in 1969 — it's been happening for as long as there have been people trying to control or erase LGBTQ+ identities.",
      },
      {
        type: "paragraph",
        text: "Throughout history, LGBTQ+ people have built communities, fought back against persecution, and created art, culture, and resistance movements — often under conditions far more dangerous than what most of us face today.",
      },
      {
        type: "quote",
        text: "We are not a new phenomenon. We are an ancient persistence.",
      },
      {
        type: "heading",
        text: "Hidden Histories",
      },
      {
        type: "paragraph",
        text: "Before Stonewall, there were other uprisings: the Compton's Cafeteria Riot (1966), the Cooper Do-nuts Riot (1959), and countless acts of resistance that went unrecorded. There were also thriving underground communities — ballroom culture, pulp fiction networks, bars and speakeasies where LGBTQ+ people gathered despite the risk.",
      },
      {
        type: "paragraph",
        text: "Many of these stories have been deliberately erased from mainstream history. Recovering them is an act of resistance in itself — a reminder that we've always been here, and we've always fought back.",
      },
      {
        type: "heading",
        text: "Why History Matters",
      },
      {
        type: "paragraph",
        text: "Knowing this history connects us to something larger than ourselves. It reminds us that the rights we have now were won through struggle, and that the work isn't finished.",
      },
      {
        type: "paragraph",
        text: "It also challenges the narrative that LGBTQ+ identities are a modern 'trend.' We are part of a long, continuous lineage of people who refused to hide, who built community, and who insisted on living authentically despite enormous pressure not to.",
      },
    ],
  },
  {
    id: "chosen-family",
    category: "FAMILY",
    categoryColor: "text-[#3B82F6] bg-[#EFF6FF]",
    title: "Chosen Family: How Queer People Build Belonging",
    readTime: "6 min read",
    author: "Taylor James",
    date: "March 5, 2026",
    content: [
      {
        type: "paragraph",
        text: "When biological families fall short, LGBTQ+ people have long built their own. A look at what chosen family really means.",
      },
      {
        type: "heading",
        text: "Redefining Family",
      },
      {
        type: "paragraph",
        text: "For many LGBTQ+ people, 'family' isn't just the people you're related to by blood or law. It's the people who show up, who see you, who celebrate you as you are. Chosen family is a term that honors these relationships — the friends who become siblings, the mentors who become parents, the community that becomes home.",
      },
      {
        type: "paragraph",
        text: "Chosen family isn't a replacement for biological family — though for some, it is. For others, it's an expansion. It's the recognition that love and belonging can come from many sources, and that we get to decide what family means to us.",
      },
      {
        type: "quote",
        text: "Family isn't who you're born to. It's who would stay up all night with you in the emergency room.",
      },
      {
        type: "heading",
        text: "How Chosen Families Form",
      },
      {
        type: "paragraph",
        text: "Chosen families often form through shared experience — meeting in LGBTQ+ spaces, connecting through activism, or simply finding each other in moments of need. They're built through consistency: showing up, offering support, choosing each other again and again.",
      },
      {
        type: "paragraph",
        text: "Unlike biological families, chosen families are opt-in. This means they're based on mutual care and respect rather than obligation. It also means they require active maintenance — communication, boundaries, and effort.",
      },
      {
        type: "heading",
        text: "The Importance of Chosen Family",
      },
      {
        type: "paragraph",
        text: "Research shows that LGBTQ+ people with strong chosen families experience better mental health, greater resilience, and lower rates of substance use and suicidality. Chosen family provides what all families should: unconditional acceptance, emotional support, and a sense of belonging.",
      },
      {
        type: "paragraph",
        text: "If you haven't found your chosen family yet, know that it's possible. Start by showing up in LGBTQ+ spaces, being open to connection, and offering the kind of support you wish you had. Chosen family isn't found — it's built, slowly, with intention and care.",
      },
    ],
  },
  {
    id: "affirming-healthcare",
    category: "HEALTH",
    categoryColor: "text-[#06B6D4] bg-[#ECFEFF]",
    title: "Finding Affirming Healthcare: A Practical Guide",
    readTime: "5 min read",
    author: "Dr. Priya Sharma",
    date: "March 3, 2026",
    content: [
      {
        type: "paragraph",
        text: "What to look for in a provider, questions to ask, and how to advocate for yourself in medical settings.",
      },
      {
        type: "heading",
        text: "Why Affirming Care Matters",
      },
      {
        type: "paragraph",
        text: "LGBTQ+-affirming healthcare isn't just about providers who won't discriminate — it's about providers who actively understand and support your identity. This means using correct names and pronouns, understanding LGBTQ+-specific health concerns, and creating an environment where you feel safe being honest.",
      },
      {
        type: "paragraph",
        text: "Studies show that LGBTQ+ people who have affirming providers are more likely to seek preventive care, disclose important health information, and follow through with treatment. Affirming care isn't a luxury — it's a necessity.",
      },
      {
        type: "quote",
        text: "You deserve healthcare providers who see you, not just your medical chart.",
      },
      {
        type: "heading",
        text: "What to Look For",
      },
      {
        type: "paragraph",
        text: "Start by checking if providers or practices explicitly state they're LGBTQ+-affirming. Look for rainbow flags, non-discrimination statements, or mentions of LGBTQ+ competency on their website. You can also check databases like OutCare or GLMA's provider directory.",
      },
      {
        type: "paragraph",
        text: "During your first visit, notice: Do intake forms ask for chosen name and pronouns? Does staff use the name and pronouns you provide? Does the provider make assumptions based on your appearance or who you're dating?",
      },
      {
        type: "heading",
        text: "Questions to Ask",
      },
      {
        type: "paragraph",
        text: "It's okay to interview providers. Ask: 'How many LGBTQ+ patients do you work with?' 'What training have you received in LGBTQ+ health?' 'Are you comfortable prescribing PrEP/HRT?' Their answers — and their comfort with the questions — will tell you a lot.",
      },
      {
        type: "paragraph",
        text: "If a provider isn't affirming, you don't owe them your continued business. Finding affirming care can be challenging, especially in rural areas or with limited insurance options. But you deserve to be treated with dignity, and it's worth advocating for yourself.",
      },
    ],
  },
  {
    id: "non-binary-beyond",
    category: "IDENTITY",
    categoryColor: "text-[#8B5CF6] bg-[#F5F3FF]",
    title: "Non-Binary & Beyond: Understanding Gender Outside the Binary",
    readTime: "6 min read",
    author: "River Song",
    date: "March 1, 2026",
    content: [
      {
        type: "paragraph",
        text: "An accessible guide to gender identity, expression, and why the binary doesn't capture the full picture.",
      },
      {
        type: "heading",
        text: "Beyond Male and Female",
      },
      {
        type: "paragraph",
        text: "The gender binary — the idea that there are only two genders, male and female — is so deeply embedded in most cultures that questioning it can feel radical. But gender has always been more complex and varied than the binary allows.",
      },
      {
        type: "paragraph",
        text: "Non-binary is an umbrella term for gender identities that don't fit neatly into 'man' or 'woman.' This includes people who identify as both, neither, somewhere in between, or something entirely outside the framework. Identities under this umbrella include genderqueer, genderfluid, agender, bigender, and many more.",
      },
      {
        type: "quote",
        text: "Gender isn't a line between two points. It's a landscape.",
      },
      {
        type: "heading",
        text: "Common Questions",
      },
      {
        type: "paragraph",
        text: "People often ask: 'But what does it mean to be non-binary?' The answer is that it means different things to different people. For some, it's about rejecting the constraints of binary gender roles. For others, it's about claiming space that reflects their internal experience of gender.",
      },
      {
        type: "paragraph",
        text: "Gender identity (who you are) is different from gender expression (how you present) and from pronouns (what people call you). Not all non-binary people are androgynous. Not all use they/them pronouns. There's no one way to be non-binary.",
      },
      {
        type: "heading",
        text: "Why It Matters",
      },
      {
        type: "paragraph",
        text: "Understanding non-binary identities isn't just important for non-binary people — it's liberating for everyone. The binary is restrictive. It limits how we're allowed to look, behave, and express ourselves. Expanding our understanding of gender creates space for everyone to exist more authentically.",
      },
      {
        type: "paragraph",
        text: "If you're exploring your own gender identity, know that you don't have to have all the answers. Gender can be a journey, not a destination. Take your time, try on different labels, and trust that you know yourself better than anyone else does.",
      },
    ],
  },
  {
    id: "internalized-homophobia",
    category: "MENTAL",
    categoryColor: "text-[#10B981] bg-[#ECFDF5]",
    title: "Internalized Homophobia: What It Is and How to Heal",
    readTime: "7 min read",
    author: "Dr. Michael Park",
    date: "February 28, 2026",
    content: [
      {
        type: "paragraph",
        text: "Growing up with negative messages about LGBTQ+ people leaves marks. Understanding them is the first step to healing.",
      },
      {
        type: "heading",
        text: "What Is Internalized Homophobia?",
      },
      {
        type: "paragraph",
        text: "Internalized homophobia refers to the negative beliefs about LGBTQ+ people that we absorb from the culture around us — and then direct at ourselves. It's what happens when you grow up in a world that tells you, in countless subtle and overt ways, that being LGBTQ+ is wrong, sinful, or shameful.",
      },
      {
        type: "paragraph",
        text: "Even people who intellectually reject these messages often carry them at a deeper level. Internalized homophobia can manifest as shame about your identity, discomfort with other LGBTQ+ people, self-sabotage in relationships, or persistent feelings that you're somehow 'less than.'",
      },
      {
        type: "quote",
        text: "The voice in your head that says you're not enough? That's not yours. It's the world's, and you don't have to keep it.",
      },
      {
        type: "heading",
        text: "How It Shows Up",
      },
      {
        type: "paragraph",
        text: "Internalized homophobia can look like avoiding LGBTQ+ spaces or people, feeling embarrassed about your identity, policing your own behavior to seem 'less gay,' or believing negative stereotypes about your community. It can also show up as difficulty forming relationships or accepting love from others.",
      },
      {
        type: "paragraph",
        text: "Many people don't realize they're experiencing internalized homophobia because it feels like truth. But just because a belief is familiar doesn't mean it's accurate. These messages were taught to you, and they can be unlearned.",
      },
      {
        type: "heading",
        text: "The Path to Healing",
      },
      {
        type: "paragraph",
        text: "Healing internalized homophobia is a process, not a one-time event. It involves identifying the negative messages you've absorbed, questioning their validity, and actively replacing them with affirming beliefs. Therapy with an LGBTQ+-affirming provider can be invaluable for this work.",
      },
      {
        type: "paragraph",
        text: "Connection with other LGBTQ+ people — especially those who are further along in their healing — can also help. Seeing others live openly and joyfully can challenge the belief that being LGBTQ+ means a life of suffering. You deserve to be proud of who you are, not in spite of being LGBTQ+, but as your full, authentic self.",
      },
    ],
  },
  {
    id: "family-rejection",
    category: "COMING OUT",
    categoryColor: "text-[#F59E0B] bg-[#FFFBEB]",
    title: "When Family Doesn't Accept You: What to Do Next",
    readTime: "8 min read",
    author: "Jordan Martinez",
    date: "February 25, 2026",
    content: [
      {
        type: "paragraph",
        text: "Rejection from family is one of the hardest experiences. Here's how to navigate it with safety and self-compassion.",
      },
      {
        type: "heading",
        text: "The Weight of Rejection",
      },
      {
        type: "paragraph",
        text: "Family rejection of your LGBTQ+ identity is profoundly painful. It's not just about disagreement — it's about the people who are supposed to love you unconditionally withdrawing that love based on who you are. That pain is real, and it's valid.",
      },
      {
        type: "paragraph",
        text: "Many LGBTQ+ people describe feeling like they're in mourning after family rejection — not because anyone died, but because the relationship they hoped for is no longer possible. This grief deserves to be acknowledged and honored.",
      },
      {
        type: "quote",
        text: "Their inability to accept you is not a reflection of your worth. It's a reflection of their limitations.",
      },
      {
        type: "heading",
        text: "Prioritize Your Safety",
      },
      {
        type: "paragraph",
        text: "If you're financially dependent on family or still living at home, your immediate priority is safety — physical, emotional, and financial. It's okay to set aside your authenticity temporarily if sharing your identity would put you at risk. Your survival matters more than their acceptance.",
      },
      {
        type: "paragraph",
        text: "If you're already out and facing rejection, assess what level of contact feels safe and sustainable for you. You don't owe them unlimited access to you, especially if they're actively harming you.",
      },
      {
        type: "heading",
        text: "Setting Boundaries",
      },
      {
        type: "paragraph",
        text: "Boundaries are about protecting yourself while staying connected to what matters to you. This might mean limiting contact, redirecting conversations when they become harmful, or taking a break from the relationship entirely. You get to decide what you're willing to tolerate.",
      },
      {
        type: "paragraph",
        text: "Remember: setting boundaries doesn't mean you don't love them. It means you also love yourself.",
      },
      {
        type: "heading",
        text: "Finding Support",
      },
      {
        type: "paragraph",
        text: "When biological family falls short, chosen family becomes essential. Seek out LGBTQ+ community spaces, connect with others who've navigated similar experiences, and consider therapy with a provider who understands family rejection.",
      },
      {
        type: "paragraph",
        text: "Some families do come around — it takes time, education, and sometimes a catalyst like a health scare or major life event. But you don't have to wait for them to heal. Build your life now, with people who see and celebrate you. You deserve that.",
      },
    ],
  },
];

export function LGBTQArticleDetail() {
  const router = useRouter();
  const { articleId } = useParams<{ articleId: string }>();

  const article = articlesData.find((a) => a.id === articleId);

  if (!article) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <p>Article not found</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-[#F9F6FE] via-[#FBF8FF] to-[#F5F3FF]">
      <Sidebar />
      <MobileNav />

      <div className="flex-1 flex flex-col min-w-0">
        <main className="max-w-[800px] w-full mx-auto px-4 md:px-6 py-4 md:py-8 pt-[72px] md:pt-8">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            whileHover={{ x: -4 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => router.push(-1)}
            className="flex items-center justify-center w-10 h-10 rounded-xl bg-white/80 backdrop-blur-sm text-[#64748B] hover:text-[#020817] hover:bg-white transition-all shadow-sm hover:shadow-md border border-gray-100 mb-8"
          >
            <ChevronLeft size={20} strokeWidth={2.5} />
          </motion.button>

          {/* Article Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            {/* Category Badge */}
            <span className={`inline-flex items-center px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider border ${article.categoryColor} border-current/20 shadow-sm mb-6`}>
              {article.category}
            </span>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-[#020817] mb-6 leading-tight">
              {article.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center gap-6 text-[#64748B] text-sm">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#EC4899] flex items-center justify-center text-white font-bold text-sm">
                  {article.author.split(' ').map(n => n[0]).join('')}
                </div>
                <span className="font-medium text-[#020817]">{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#94A3B8]" />
                <span>{article.readTime}</span>
              </div>
              <span className="text-[#94A3B8]">{article.date}</span>
            </div>
          </motion.div>

          {/* Divider */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            transition={{ delay: 0.2 }}
            className="h-1 bg-gradient-to-r from-[#8B5CF6] via-[#EC4899] to-[#F59E0B] rounded-full mb-10 shadow-lg"
          ></motion.div>

          {/* Engagement Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-3 mb-10"
          >
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-gradient-to-r hover:from-[#EF4444] hover:to-[#DC2626] text-[#64748B] hover:text-white transition-all shadow-sm hover:shadow-lg border border-gray-100 hover:border-transparent group">
              <Heart size={18} className="group-hover:fill-current" strokeWidth={2.5} />
              <span className="text-sm font-medium">Save</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/80 backdrop-blur-sm hover:bg-[#8B5CF6] text-[#64748B] hover:text-white transition-all shadow-sm hover:shadow-lg border border-gray-100 hover:border-transparent">
              <Share2 size={18} strokeWidth={2.5} />
              <span className="text-sm font-medium">Share</span>
            </button>
          </motion.div>

          {/* Article Content */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="prose prose-lg max-w-none"
          >
            {article.content.map((block, index) => {
              if (block.type === "heading") {
                return (
                  <motion.h2
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="text-3xl font-bold text-[#020817] mt-12 mb-6 pb-3 border-b-2 border-[#8B5CF6]/20"
                  >
                    {block.text}
                  </motion.h2>
                );
              }
              if (block.type === "quote") {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="relative my-10 p-8 rounded-2xl bg-gradient-to-br from-[#F5F3FF] via-[#FBF8FF] to-[#FEF2F8] border-l-4 border-[#8B5CF6] shadow-lg"
                  >
                    {/* Quote Mark */}
                    <div className="absolute top-4 left-4 text-6xl text-[#8B5CF6]/20 font-serif leading-none">"</div>
                    
                    <p className="relative text-[#5B21B6] text-xl md:text-2xl italic leading-relaxed font-medium pl-8">
                      {block.text}
                    </p>
                  </motion.div>
                );
              }
              return (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="text-[#475569] text-lg leading-relaxed mb-6 tracking-wide"
                >
                  {block.text}
                </motion.p>
              );
            })}
          </motion.article>

          {/* Article Footer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-16 pt-8 border-t-2 border-gray-200"
          >
            {/* Tags */}
            <div className="flex flex-wrap items-center gap-2 mb-8">
              <span className="text-sm text-[#64748B] font-medium">Topics:</span>
              <span className="px-3 py-1.5 rounded-full bg-[#F5F3FF] text-[#8B5CF6] text-xs font-medium border border-[#8B5CF6]/20">
                {article.category}
              </span>
              <span className="px-3 py-1.5 rounded-full bg-[#F5F3FF] text-[#8B5CF6] text-xs font-medium border border-[#8B5CF6]/20">
                LGBTQ+ Wellness
              </span>
            </div>

            {/* Back to Articles CTA */}
            <div className="bg-gradient-to-br from-white/80 to-white/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="text-[#64748B] mb-4">
                Want to read more stories and insights from the community?
              </p>
              <button
                onClick={() => router.push("/lgbtq-articles")}
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white font-medium shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 hover:scale-[1.02] transition-all inline-flex items-center gap-2"
              >
                <ChevronLeft size={18} strokeWidth={2.5} />
                Back to All Articles
              </button>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Decorative background elements */}
      <div className="fixed top-20 right-10 w-96 h-96 bg-gradient-to-br from-[#BE51F5]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
      <div className="fixed bottom-20 left-10 w-96 h-96 bg-gradient-to-tr from-[#EE4F84]/10 to-transparent rounded-full blur-3xl pointer-events-none -z-10"></div>
    </div>
  );
}
