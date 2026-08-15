import { useState } from "react";

const ANXIOUS_URL = "https://deeplyus.gumroad.com/l/Anxiouspartner";
const AVOIDANT_URL = "https://deeplyus.gumroad.com/l/avoidentpartner";
const BUNDLE_URL = "https://deeplyus.gumroad.com/l/attachmentstyles";

// ── COLORS (high contrast — readable on all backgrounds) ──────────────────
const C = {
  bg: "#FAF7F2",
  dark: "#1A1008",
  mid: "#3D2E1A",
  light: "#6B5744",
  muted: "#9C8472",
  rule: "#DDD0BC",
  cream: "#F3EDE3",
  white: "#FFFFFF",
  accent: "#B85C2A", // burnt orange — all CTAs
  secure: { text: "#1A4A2A", bg: "#D6EEE0", border: "#4A8A5C" },
  anxious: { text: "#4A1A6A", bg: "#EAD6F5", border: "#7A3A9A" },
  avoidant: { text: "#0A3A4A", bg: "#C8E6F0", border: "#2A7A9A" },
  fearful: { text: "#5A2A0A", bg: "#F5DEC8", border: "#A05A2A" },
};

const questions = [
  {
    id: 1,
    type: "S",
    text: "I feel comfortable depending on my partner and having them depend on me.",
  },
  {
    id: 2,
    type: "S",
    text: "I can express my needs directly without worrying too much about how they'll land.",
  },
  {
    id: 3,
    type: "S",
    text: "When conflict happens, I believe we can work through it and we'll be okay.",
  },
  {
    id: 4,
    type: "S",
    text: "I don't need constant reassurance to feel secure in my relationship.",
  },
  {
    id: 5,
    type: "S",
    text: "I can tolerate my partner needing space without feeling like something is wrong.",
  },
  {
    id: 6,
    type: "S",
    text: "I recover relatively quickly after arguments — I don't carry them for days.",
  },
  {
    id: 7,
    type: "S",
    text: "I find it fairly easy to trust my partner unless given a clear reason not to.",
  },
  {
    id: 8,
    type: "S",
    text: "I feel comfortable with both closeness and independence in relationships.",
  },
  {
    id: 9,
    type: "S",
    text: "I generally believe my partner has good intentions, even during conflict.",
  },
  {
    id: 10,
    type: "S",
    text: "When something bothers me, I can usually bring it up calmly.",
  },
  {
    id: 11,
    type: "A",
    text: "I worry that my partner doesn't love me as much as I love them.",
  },
  {
    id: 12,
    type: "A",
    text: "A slower reply or a quieter evening makes me wonder if something is wrong.",
  },
  {
    id: 13,
    type: "A",
    text: "When my partner needs space, I struggle not to read it as rejection.",
  },
  {
    id: 14,
    type: "A",
    text: "I replay conversations afterwards, looking for what went wrong.",
  },
  {
    id: 15,
    type: "A",
    text: "I need reassurance that the relationship is okay — more than most people seem to.",
  },
  {
    id: 16,
    type: "A",
    text: "I sometimes apologise first just to end the tension, even when it wasn't my fault.",
  },
  {
    id: 17,
    type: "A",
    text: "I fear being abandoned, even when there's no real reason to.",
  },
  {
    id: 18,
    type: "A",
    text: "I often feel like I care more or need more than my partner.",
  },
  {
    id: 19,
    type: "A",
    text: "When conflict happens, I find it hard to let it rest until it's resolved.",
  },
  {
    id: 20,
    type: "A",
    text: "I sometimes pursue harder when my partner pulls away, even knowing it might push them further.",
  },
  {
    id: 21,
    type: "V",
    text: "I value my independence highly and can feel suffocated by too much closeness.",
  },
  {
    id: 22,
    type: "V",
    text: "When conversations get emotionally intense, I tend to shut down or withdraw.",
  },
  {
    id: 23,
    type: "V",
    text: "I prefer to handle difficult feelings on my own rather than sharing them.",
  },
  {
    id: 24,
    type: "V",
    text: "I find it hard to know what I'm feeling in the middle of a difficult conversation.",
  },
  {
    id: 25,
    type: "V",
    text: "I've been told I seem distant or hard to read emotionally.",
  },
  {
    id: 26,
    type: "V",
    text: "When my partner expresses a lot of emotion or need, I tend to feel overwhelmed.",
  },
  {
    id: 27,
    type: "V",
    text: "I sometimes avoid conflict by going quiet or changing the subject.",
  },
  {
    id: 28,
    type: "V",
    text: "I feel more comfortable processing things alone than talking through them in the moment.",
  },
  {
    id: 29,
    type: "V",
    text: "I often need time and space before I can articulate what I feel.",
  },
  {
    id: 30,
    type: "V",
    text: "Close relationships sometimes feel like they're asking more of me than I can give.",
  },
  {
    id: 31,
    type: "F",
    text: "I want closeness in relationships but I'm also afraid of it at the same time.",
  },
  {
    id: 32,
    type: "F",
    text: "My feelings about my relationship can shift quickly — from wanting more to wanting distance.",
  },
  {
    id: 33,
    type: "F",
    text: "I sometimes push people away even when I desperately want them close.",
  },
  {
    id: 34,
    type: "F",
    text: "I find it hard to trust that someone won't eventually hurt or leave me.",
  },
  {
    id: 35,
    type: "F",
    text: "I've had patterns of being drawn to people who are emotionally unavailable.",
  },
  {
    id: 36,
    type: "F",
    text: "I sometimes feel like I sabotage good things before they can hurt me.",
  },
  {
    id: 37,
    type: "F",
    text: "My emotions in relationships feel intense and hard to manage.",
  },
  {
    id: 38,
    type: "F",
    text: "I can be both clingy and distant in the same relationship, sometimes within the same week.",
  },
  {
    id: 39,
    type: "F",
    text: "I feel confused about what I actually want from a relationship.",
  },
  {
    id: 40,
    type: "F",
    text: "Even when someone clearly cares about me, I struggle to fully trust it.",
  },
];

const SCALE = ["Never", "Rarely", "Sometimes", "Often", "Always"];

const resultData = {
  secure: {
    emoji: "🌿",
    headline: "Secure Attachment Style",
    tagline: "You feel safe in love — and you know how to give it back.",
    col: C.secure,
    description:
      "People with a secure attachment style generally feel comfortable with both closeness and independence. You trust fairly easily, communicate needs directly, and recover from conflict without it defining the relationship. This doesn't mean you never struggle — it means you have a baseline of safety that most people are still working toward. If your partner has anxious or avoidant attachment, understanding their style will help you support them more effectively.",
    strengths: [
      "You stay present in difficult conversations without flooding or shutting down",
      "You trust your partner unless given a clear reason not to",
      "You repair conflict relatively quickly and genuinely",
      "You can express needs without excessive guilt or fear",
    ],
    watchOuts: [
      "Your stability can sometimes read as indifference to an anxious partner",
      "You may underestimate how hard certain moments are for less securely attached partners",
    ],
    cta: null,
  },
  anxious: {
    emoji: "🌊",
    headline: "Anxious Attachment Style",
    tagline:
      "You love deeply. Your nervous system just never got the memo that it's safe.",
    col: C.anxious,
    description:
      "People with an anxious attachment style experience relationships with real intensity — the good feels very good, and any sign of disconnection feels threatening. This is not neediness. It is a nervous system that learned, early on, that love was not guaranteed. The monitoring, the reassurance loop, the pursuit when they pull away — these were adaptations once. They are patterns now. And patterns can be changed with the right tools.",
    strengths: [
      "You are deeply attuned to emotional shifts in your relationship",
      "You invest fully and genuinely in the people you love",
      "You raise hard things rather than letting them sit",
      "You want repair, closeness, and resolution — all the right instincts",
    ],
    watchOuts: [
      "The pursuit behaviour pushes avoidant partners further away",
      "The reassurance loop does not self-correct without the right tools",
      "Suppressing needs until they come out badly is costing you",
    ],
    cta: {
      headline: "You just identified your pattern. Here's what changes it.",
      body: "The Anxious Attachment Complete Guide gives you 20 word-for-word scripts for every anxious moment, the Reassurance Request Framework to ask without the guilt or the loop, the Spiral Interruption Method to catch it before it drives your behaviour, and a 30-day daily practice that rewires your nervous system from the inside out.\n\nPart 2 of the guide is built for the anxious partner who loves someone avoidant — 15 scripts for reaching them without losing them.",
      label: "Get the Anxious Attachment Complete Guide",
      price: "$27",
      sub: "Instant access · 30-day money back guarantee · Start tonight",
      url: ANXIOUS_URL,
      color: C.anxious.border,
    },
  },
  avoidant: {
    emoji: "🌲",
    headline: "Avoidant Attachment Style",
    tagline:
      "You care deeply. You just learned that the safest way to love is from a distance.",
    col: C.avoidant,
    description:
      "People with an avoidant attachment style value independence and find emotional intensity overwhelming. When things get heavy, the nervous system's answer is to withdraw — not because you don't care, but because closeness was associated, early on, with burden and pressure. The protection made complete sense once. It is now costing you the intimacy you actually want. The good news: avoidant attachment changes with the right tools and consistent new experience.",
    strengths: [
      "You are self-sufficient and capable under pressure",
      "You give your partner space naturally",
      "Once you open up, it tends to be genuine rather than performed",
      "You handle difficult situations without falling apart",
    ],
    watchOuts: [
      "Withdrawal without communication reads as abandonment — however temporary",
      "Your partner cannot distinguish between needing space and not caring",
      "The independence strategy is a barrier to the real intimacy you want",
    ],
    cta: {
      headline: "You just named the pattern. Here's how to change it.",
      body: "The Avoidant Attachment Complete Guide gives you 20 word-for-word scripts for every moment you go blank, the Space Request Framework so you can take space without your partner falling apart, the Presence Method to stay in hard conversations longer, and a 30-day opening practice that builds emotional availability gradually.\n\nPart 2 is built for the avoidant partner who loves someone anxious — 15 scripts for reaching them without losing yourself.",
      label: "Get the Avoidant Attachment Complete Guide",
      price: "$27",
      sub: "Instant access · 30-day money back guarantee · Start tonight",
      url: AVOIDANT_URL,
      color: C.avoidant.border,
    },
  },
  fearful: {
    emoji: "🌀",
    headline: "Fearful-Avoidant Attachment Style",
    tagline: "You want the closeness you're afraid of. Both things are true.",
    col: C.fearful,
    description:
      "People with a fearful-avoidant attachment style experience the push and pull of wanting love and fearing it simultaneously. This is often the most painful attachment style to live with — because neither closeness nor distance feels fully safe. It typically develops from early experiences where the source of comfort was also a source of fear. You want intimacy and are terrified of it at the same time. Both of those things are understandable. And both can be worked with.",
    strengths: [
      "You have deep emotional awareness, even when it is overwhelming",
      "You understand complexity in relationships better than most",
      "The fact that you are here taking this quiz means you are ready for something different",
    ],
    watchOuts: [
      "The push-pull can exhaust partners who don't understand the pattern",
      "Sabotaging good things before they can hurt you is a real risk",
      "Professional support alongside self-work is especially valuable for this style",
    ],
    cta: {
      headline:
        "The fearful-avoidant experience lives on both sides. So do the tools.",
      body: "The Anxious + Avoidant Complete Bundle gives you both guides in one — the Anxious Guide for the hypervigilance and pursuit patterns, and the Avoidant Guide for the withdrawal and overwhelm patterns.\n\nTogether they cover every dimension of the fearful-avoidant experience with 35 word-for-word scripts and two 30-day daily practices.",
      label: "Get Both Complete Guides — The Bundle",
      price: "$47",
      sub: "Both guides · Instant access · 30-day money back guarantee",
      url: BUNDLE_URL,
      color: C.fearful.border,
    },
  },
};

// ── SHARED UI COMPONENTS ───────────────────────────────────────────────────
const Divider = () => (
  <div
    style={{
      width: 44,
      height: 2,
      background: C.accent,
      margin: "0 auto 24px",
    }}
  />
);

const Tag = ({ children, color = C.muted }) => (
  <div
    style={{
      fontSize: 10,
      letterSpacing: 3,
      fontFamily: "system-ui,sans-serif",
      color,
      textTransform: "uppercase",
      marginBottom: 12,
      fontWeight: 700,
    }}
  >
    {children}
  </div>
);

export default function AttachmentQuiz() {
  const [screen, setScreen] = useState("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [scores, setScores] = useState(null);
  const [primaryType, setPrimaryType] = useState(null);
  const [animating, setAnimating] = useState(false);

  const progress = (currentQ / questions.length) * 100;

  function handleAnswer(value) {
    if (animating) return;
    setAnimating(true);
    const newAnswers = { ...answers, [questions[currentQ].id]: value };
    setAnswers(newAnswers);
    setTimeout(() => {
      if (currentQ < questions.length - 1) {
        setCurrentQ(currentQ + 1);
        setAnimating(false);
      } else {
        finish(newAnswers);
      }
    }, 280);
  }

  function finish(ans) {
    const s = { S: 0, A: 0, V: 0, F: 0 };
    questions.forEach((q) => {
      s[q.type] += ans[q.id] || 0;
    });
    setScores(s);
    const max = Math.max(s.S, s.A, s.V, s.F);
    let t = "secure";
    if (s.A === max) t = "anxious";
    else if (s.V === max) t = "avoidant";
    else if (s.F === max) t = "fearful";
    setPrimaryType(t);
    setScreen("results");
    window.scrollTo(0, 0);
  }

  function restart() {
    setScreen("intro");
    setCurrentQ(0);
    setAnswers({});
    setScores(null);
    setPrimaryType(null);
    setAnimating(false);
  }

  const q = questions[currentQ];
  const res = primaryType ? resultData[primaryType] : null;

  // ── BASE WRAPPER ──────────────────────────────────────────────────────────
  return (
    <div
      style={{
        minHeight: "100vh",
        background: C.bg,
        fontFamily: "Georgia,serif",
        color: C.dark,
      }}
    >
      {/* ════════════════════════════════════════════════════════════════════
          INTRO — SEO-rich page with quiz + explanatory content
      ════════════════════════════════════════════════════════════════════ */}
      {screen === "intro" && (
        <div
          style={{ maxWidth: 700, margin: "0 auto", padding: "40px 20px 60px" }}
        >
          {/* Hero */}
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <Tag>Free Attachment Style Quiz · Deeplove.Advice</Tag>
            <h1
              style={{
                fontSize: "clamp(28px,6vw,46px)",
                lineHeight: 1.12,
                fontWeight: "normal",
                marginBottom: 16,
                color: C.dark,
              }}
            >
              What Is Your
              <br />
              <em>Attachment Style?</em>
            </h1>
            <Divider />
            <p
              style={{
                fontSize: 17,
                lineHeight: 1.75,
                color: C.mid,
                fontFamily: "system-ui,sans-serif",
                maxWidth: 540,
                margin: "0 auto 8px",
              }}
            >
              Most attachment style quizzes only test anxious and avoidant. But
              there are actually{" "}
              <strong style={{ color: C.dark }}>
                four distinct attachment styles
              </strong>{" "}
              — and knowing exactly which one you have changes everything about
              how you relate in relationships.
            </p>
            <p
              style={{
                fontSize: 15,
                color: C.light,
                fontFamily: "system-ui,sans-serif",
                lineHeight: 1.7,
              }}
            >
              This free quiz measures all four accurately — with 40 questions,
              scored results, and a personalised breakdown of what your
              attachment style means for your relationship right now.
            </p>
          </div>

          {/* 4 styles grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 10,
              marginBottom: 32,
            }}
          >
            {[
              {
                key: "secure",
                emoji: "🌿",
                name: "Secure Attachment",
                desc: "Comfortable with closeness and independence. Trusts easily. Repairs quickly.",
              },
              {
                key: "anxious",
                emoji: "🌊",
                name: "Anxious Attachment",
                desc: "Craves closeness, fears abandonment. Monitoring, reassurance-seeking patterns.",
              },
              {
                key: "avoidant",
                emoji: "🌲",
                name: "Avoidant Attachment",
                desc: "Values independence. Withdraws under emotional pressure. Handles things alone.",
              },
              {
                key: "fearful",
                emoji: "🌀",
                name: "Fearful-Avoidant Attachment",
                desc: "Wants closeness and fears it simultaneously. The push-pull pattern.",
              },
            ].map((s) => (
              <div
                key={s.key}
                style={{
                  background: C.white,
                  border: `1.5px solid ${C.rule}`,
                  padding: "16px 14px",
                }}
              >
                <div style={{ fontSize: 24, marginBottom: 6 }}>{s.emoji}</div>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    fontFamily: "system-ui,sans-serif",
                    color: C.dark,
                    marginBottom: 5,
                  }}
                >
                  {s.name}
                </div>
                <div
                  style={{
                    fontSize: 12,
                    color: C.light,
                    fontFamily: "system-ui,sans-serif",
                    lineHeight: 1.55,
                  }}
                >
                  {s.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Stats bar */}
          <div
            style={{
              background: C.cream,
              padding: "16px 20px",
              marginBottom: 28,
              display: "flex",
              gap: 28,
              flexWrap: "wrap",
            }}
          >
            {[
              ["40 questions", "One per style — 10 each"],
              ["~10 minutes", "Be honest, not fast"],
              ["Free", "No email required"],
            ].map(([a, b]) => (
              <div key={a} style={{ fontFamily: "system-ui,sans-serif" }}>
                <div style={{ fontSize: 15, fontWeight: 700, color: C.dark }}>
                  {a}
                </div>
                <div style={{ fontSize: 12, color: C.light }}>{b}</div>
              </div>
            ))}
          </div>

          {/* START BUTTON */}
          <button
            onClick={() => setScreen("quiz")}
            style={{
              width: "100%",
              padding: "20px 0",
              background: C.accent,
              color: C.white,
              border: "none",
              fontSize: 17,
              fontFamily: "system-ui,sans-serif",
              fontWeight: 700,
              cursor: "pointer",
              letterSpacing: 0.5,
              marginBottom: 12,
            }}
          >
            Start the Free Quiz →
          </button>
          <p
            style={{
              textAlign: "center",
              fontSize: 12,
              color: C.muted,
              fontFamily: "system-ui,sans-serif",
            }}
          >
            Answer honestly — not how you wish you were, but how you actually
            are.
          </p>

          {/* ── SEO CONTENT BLOCK ── */}
          <div
            style={{
              marginTop: 56,
              borderTop: `1px solid ${C.rule}`,
              paddingTop: 40,
            }}
          >
            <h2
              style={{
                fontSize: 22,
                fontWeight: "normal",
                color: C.dark,
                marginBottom: 8,
              }}
            >
              What is an attachment style?
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: C.mid,
                fontFamily: "system-ui,sans-serif",
                marginBottom: 24,
              }}
            >
              Your attachment style is the pattern your nervous system developed
              for relating to the people closest to you. It shapes how you
              handle conflict, how much closeness you need, how you respond when
              your partner pulls away, and how safe love feels. Attachment
              theory, developed by John Bowlby and Mary Ainsworth, identifies
              these patterns as developing in early childhood — but their
              effects show up most clearly in your adult romantic relationships.
            </p>

            <h2
              style={{
                fontSize: 22,
                fontWeight: "normal",
                color: C.dark,
                marginBottom: 8,
              }}
            >
              The four attachment styles explained
            </h2>

            {[
              {
                title: "Secure Attachment Style",
                body: "People with secure attachment feel comfortable with both closeness and independence. They trust fairly easily, communicate needs directly, and recover from conflict without it permanently damaging the relationship. Secure attachment is not the absence of difficulty — it is the ability to move through difficulty while staying connected. Research suggests approximately 50-55% of adults have a secure attachment style.",
              },
              {
                title: "Anxious Attachment Style",
                body: "People with an anxious attachment style experience a high need for closeness combined with a persistent fear that it will be taken away. They tend to be hypervigilant to signs of disconnection, need more reassurance than their partner may naturally provide, and can pursue harder when their partner pulls away. Anxious attachment typically develops when early caregiving was loving but inconsistent or emotionally unpredictable.",
              },
              {
                title: "Avoidant Attachment Style",
                body: "People with an avoidant attachment style value independence highly and find emotional intensity overwhelming. They tend to withdraw when conversations get heavy, prefer to process things alone, and may struggle to access and articulate their feelings in the moment. Avoidant attachment typically develops when emotional needs were dismissed or independence was heavily rewarded in early life.",
              },
              {
                title: "Fearful-Avoidant Attachment Style",
                body: "Also called disorganised attachment, the fearful-avoidant attachment style involves wanting closeness and fearing it at the same time. People with this style can oscillate between pursuit and withdrawal, and often feel confused about what they actually want in a relationship. It frequently develops from early experiences where the caregiver was both a source of comfort and a source of fear or inconsistency.",
              },
            ].map(({ title, body }) => (
              <div key={title} style={{ marginBottom: 24 }}>
                <h3
                  style={{
                    fontSize: 17,
                    fontWeight: "bold",
                    color: C.dark,
                    marginBottom: 6,
                    fontFamily: "system-ui,sans-serif",
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontSize: 14,
                    lineHeight: 1.8,
                    color: C.mid,
                    fontFamily: "system-ui,sans-serif",
                  }}
                >
                  {body}
                </p>
              </div>
            ))}

            <h2
              style={{
                fontSize: 22,
                fontWeight: "normal",
                color: C.dark,
                marginBottom: 8,
              }}
            >
              Can your attachment style change?
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: C.mid,
                fontFamily: "system-ui,sans-serif",
                marginBottom: 24,
              }}
            >
              Yes — attachment style is not fixed. It is a learned pattern, and
              learned patterns can be updated. Research on "earned security"
              shows that people can move toward more secure functioning through
              consistent new relational experiences, self-awareness, and the
              right tools. This quiz is a starting point. The real work is
              understanding how your specific attachment pattern shows up in
              your relationship — and what to do about it.
            </p>

            <h2
              style={{
                fontSize: 22,
                fontWeight: "normal",
                color: C.dark,
                marginBottom: 8,
              }}
            >
              Why take an attachment style quiz?
            </h2>
            <p
              style={{
                fontSize: 15,
                lineHeight: 1.8,
                color: C.mid,
                fontFamily: "system-ui,sans-serif",
                marginBottom: 32,
              }}
            >
              Understanding your attachment style gives you language for
              patterns that have been controlling your relationships without a
              name. Why you pursue harder when they pull away. Why closeness
              feels threatening. Why you need more reassurance than you feel you
              should. Why the same argument keeps repeating. This free
              attachment style quiz scores all four styles accurately — so you
              get a real picture, not a forced choice between two options.
            </p>

            {/* FAQ */}
            <h2
              style={{
                fontSize: 22,
                fontWeight: "normal",
                color: C.dark,
                marginBottom: 16,
              }}
            >
              Frequently asked questions
            </h2>
            {[
              {
                q: "How accurate is this attachment style quiz?",
                a: "This quiz uses 40 questions across all four attachment styles — 10 per style — and scores each one independently. That means you get a full picture of your attachment profile, including secondary patterns, rather than a forced binary result.",
              },
              {
                q: "What's the most common attachment style?",
                a: "Research suggests secure attachment is the most common at around 50-55% of adults. Anxious attachment accounts for approximately 20%, avoidant for 25%, and fearful-avoidant for around 5%. However, people exist on a spectrum and many carry traits of more than one style.",
              },
              {
                q: "How do attachment styles affect relationships?",
                a: "Attachment styles shape almost every dimension of how you relate — how you handle conflict, how much closeness you need, how you respond to your partner's emotions, how you ask for things, and how you repair after arguments. The most common relationship pattern is anxious-avoidant, where one partner pursues and the other withdraws.",
              },
              {
                q: "Can I have more than one attachment style?",
                a: "Yes. Most people carry a primary attachment style with secondary traits from another. This quiz shows you your full score breakdown across all four styles, so you can see where your primary and secondary patterns sit.",
              },
              {
                q: "What do I do after I find out my attachment style?",
                a: "Knowing your attachment style is the beginning. The next step is having the specific tools — the exact words, scripts, and frameworks — for the moments your attachment pattern shows up most powerfully in your relationship. Our guides are built specifically for this.",
              },
            ].map(({ q, a }) => (
              <div
                key={q}
                style={{
                  marginBottom: 20,
                  paddingBottom: 20,
                  borderBottom: `1px solid ${C.rule}`,
                }}
              >
                <div
                  style={{
                    fontSize: 15,
                    fontWeight: 700,
                    color: C.dark,
                    fontFamily: "system-ui,sans-serif",
                    marginBottom: 6,
                  }}
                >
                  {q}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    color: C.mid,
                    fontFamily: "system-ui,sans-serif",
                    lineHeight: 1.75,
                  }}
                >
                  {a}
                </div>
              </div>
            ))}

            {/* Repeat CTA at bottom */}
            <button
              onClick={() => {
                setScreen("quiz");
                window.scrollTo(0, 0);
              }}
              style={{
                width: "100%",
                padding: "18px 0",
                marginTop: 16,
                background: C.accent,
                color: C.white,
                border: "none",
                fontSize: 16,
                fontFamily: "system-ui,sans-serif",
                fontWeight: 700,
                cursor: "pointer",
              }}
            >
              Take the Free Attachment Style Quiz →
            </button>
            <p
              style={{
                textAlign: "center",
                marginTop: 10,
                fontSize: 12,
                color: C.muted,
                fontFamily: "system-ui,sans-serif",
              }}
            >
              deeplyus.org · @Deeplove.Advice
            </p>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          QUIZ SCREEN
      ════════════════════════════════════════════════════════════════════ */}
      {screen === "quiz" && (
        <div style={{ maxWidth: 640, margin: "0 auto", padding: "32px 20px" }}>
          {/* Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span
              style={{
                fontSize: 10,
                letterSpacing: 2.5,
                color: C.muted,
                fontFamily: "system-ui,sans-serif",
                textTransform: "uppercase",
                fontWeight: 700,
              }}
            >
              Attachment Style Quiz
            </span>
            <span
              style={{
                fontSize: 13,
                color: C.muted,
                fontFamily: "system-ui,sans-serif",
              }}
            >
              {currentQ + 1} / {questions.length}
            </span>
          </div>

          {/* Progress bar */}
          <div style={{ height: 3, background: C.rule, marginBottom: 36 }}>
            <div
              style={{
                height: "100%",
                background: C.accent,
                width: `${progress}%`,
                transition: "width 0.4s ease",
              }}
            />
          </div>

          {/* Question */}
          <div
            style={{
              opacity: animating ? 0 : 1,
              transform: animating ? "translateY(6px)" : "none",
              transition: "all 0.22s ease",
            }}
          >
            <p
              style={{
                fontSize: "clamp(16px,4vw,22px)",
                lineHeight: 1.6,
                marginBottom: 36,
                color: C.dark,
                fontStyle: "italic",
              }}
            >
              "{q.text}"
            </p>

            {/* Answer buttons */}
            <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
              {SCALE.map((label, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(i)}
                  style={{
                    flex: 1,
                    padding: "14px 4px",
                    background: C.white,
                    border: `1.5px solid ${C.rule}`,
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 8,
                    transition: "all 0.15s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = C.accent;
                    e.currentTarget.style.background = "#FDF0E8";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = C.rule;
                    e.currentTarget.style.background = C.white;
                  }}
                >
                  <span
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: "50%",
                      border: `2px solid ${C.rule}`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 13,
                      fontWeight: 700,
                      color: C.mid,
                      fontFamily: "system-ui,sans-serif",
                    }}
                  >
                    {i + 1}
                  </span>
                  <span
                    style={{
                      fontSize: 10,
                      color: C.muted,
                      fontFamily: "system-ui,sans-serif",
                      textAlign: "center",
                      lineHeight: 1.3,
                    }}
                  >
                    {label}
                  </span>
                </button>
              ))}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 11,
                color: C.rule,
                fontFamily: "system-ui,sans-serif",
              }}
            >
              <span>Not me at all</span>
              <span>Completely me</span>
            </div>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════════════
          RESULTS SCREEN
      ════════════════════════════════════════════════════════════════════ */}
      {screen === "results" && res && scores && (
        <div
          style={{ maxWidth: 680, margin: "0 auto", padding: "40px 20px 64px" }}
        >
          <Tag style={{ textAlign: "center" }}>
            Your Results · Attachment Style Quiz · Deeplove.Advice
          </Tag>

          {/* Primary result */}
          <div
            style={{
              background: res.col.bg,
              borderLeft: `5px solid ${res.col.border}`,
              padding: "28px 24px",
              marginBottom: 24,
            }}
          >
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2,
                fontFamily: "system-ui,sans-serif",
                color: res.col.border,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 8,
              }}
            >
              Your primary attachment style
            </div>
            <h1
              style={{
                fontSize: "clamp(24px,5vw,36px)",
                fontWeight: "normal",
                color: C.dark,
                marginBottom: 10,
                lineHeight: 1.15,
              }}
            >
              {res.emoji} {res.headline}
            </h1>
            <p
              style={{
                fontSize: 17,
                fontStyle: "italic",
                color: res.col.border,
                marginBottom: 16,
                lineHeight: 1.5,
              }}
            >
              {res.tagline}
            </p>
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: C.mid,
                fontFamily: "system-ui,sans-serif",
              }}
            >
              {res.description}
            </p>
          </div>

          {/* Score breakdown */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2.5,
                fontFamily: "system-ui,sans-serif",
                color: C.muted,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              Your full score breakdown
            </div>
            {[
              {
                key: "secure",
                label: "🌿 Secure",
                score: scores.S,
                col: C.secure,
              },
              {
                key: "anxious",
                label: "🌊 Anxious",
                score: scores.A,
                col: C.anxious,
              },
              {
                key: "avoidant",
                label: "🌲 Avoidant",
                score: scores.V,
                col: C.avoidant,
              },
              {
                key: "fearful",
                label: "🌀 Fearful-Avoidant",
                score: scores.F,
                col: C.fearful,
              },
            ]
              .sort((a, b) => b.score - a.score)
              .map(({ key, label, score, col }) => (
                <div key={key} style={{ marginBottom: 12 }}>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      fontFamily: "system-ui,sans-serif",
                      fontSize: 13,
                      marginBottom: 5,
                    }}
                  >
                    <span
                      style={{
                        fontWeight: key === primaryType ? 700 : 400,
                        color: key === primaryType ? col.border : C.mid,
                      }}
                    >
                      {label} {key === primaryType && "← You"}
                    </span>
                    <span style={{ color: C.muted }}>{score} / 40</span>
                  </div>
                  <div style={{ height: 8, background: C.cream }}>
                    <div
                      style={{
                        height: "100%",
                        background: col.border,
                        width: `${(score / 40) * 100}%`,
                        opacity: key === primaryType ? 1 : 0.35,
                        transition: "width 1s ease",
                      }}
                    />
                  </div>
                </div>
              ))}
            <p
              style={{
                fontSize: 12,
                color: C.muted,
                fontFamily: "system-ui,sans-serif",
                marginTop: 10,
                lineHeight: 1.6,
              }}
            >
              If two scores are close together you likely carry traits of both.
              Read both result sections for the complete picture.
            </p>
          </div>

          {/* Strengths */}
          <div style={{ marginBottom: 20 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "system-ui,sans-serif",
                color: C.dark,
                marginBottom: 12,
              }}
            >
              What this means for you
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {res.strengths.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    background: C.white,
                    padding: "11px 14px",
                    border: `1px solid ${C.rule}`,
                  }}
                >
                  <span
                    style={{
                      color: res.col.border,
                      fontWeight: 700,
                      marginTop: 1,
                    }}
                  >
                    ✓
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: C.mid,
                      fontFamily: "system-ui,sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Watch-outs */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 14,
                fontWeight: 700,
                fontFamily: "system-ui,sans-serif",
                color: C.dark,
                marginBottom: 12,
              }}
            >
              What to watch for
            </div>
            <div style={{ display: "grid", gap: 8 }}>
              {res.watchOuts.map((s, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-start",
                    background: "#FDF0E8",
                    padding: "11px 14px",
                    border: `1px solid #F0DDD0`,
                  }}
                >
                  <span
                    style={{ color: C.accent, fontWeight: 700, marginTop: 1 }}
                  >
                    →
                  </span>
                  <span
                    style={{
                      fontSize: 14,
                      color: C.mid,
                      fontFamily: "system-ui,sans-serif",
                      lineHeight: 1.6,
                    }}
                  >
                    {s}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* PRODUCT CTA — only for non-secure */}
          {res.cta && (
            <div
              style={{
                background: C.dark,
                padding: "28px 24px",
                marginBottom: 24,
                position: "relative",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: 4,
                  background: res.cta.color,
                }}
              />
              <div
                style={{
                  fontSize: 10,
                  letterSpacing: 2.5,
                  color: C.muted,
                  fontFamily: "system-ui,sans-serif",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  marginBottom: 10,
                }}
              >
                Built for your exact attachment style
              </div>
              <div
                style={{
                  fontSize: 18,
                  fontWeight: "normal",
                  color: "#FAF7F2",
                  marginBottom: 14,
                  lineHeight: 1.4,
                }}
              >
                {res.cta.headline}
              </div>
              {res.cta.body.split("\n\n").map((para, i) => (
                <p
                  key={i}
                  style={{
                    fontSize: 14,
                    color: "#C8B89A",
                    lineHeight: 1.75,
                    fontFamily: "system-ui,sans-serif",
                    marginBottom: 12,
                  }}
                >
                  {para}
                </p>
              ))}
              <a
                href={res.cta.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: res.cta.color,
                  color: C.white,
                  padding: "16px 20px",
                  fontFamily: "system-ui,sans-serif",
                  fontSize: 15,
                  fontWeight: 700,
                  textDecoration: "none",
                  letterSpacing: 0.3,
                  marginTop: 8,
                }}
              >
                {res.cta.label} — {res.cta.price} →
              </a>
              <p
                style={{
                  textAlign: "center",
                  fontSize: 11,
                  color: C.muted,
                  fontFamily: "system-ui,sans-serif",
                  marginTop: 10,
                }}
              >
                {res.cta.sub}
              </p>
            </div>
          )}

          {/* All 4 styles reference */}
          <div style={{ marginBottom: 28 }}>
            <div
              style={{
                fontSize: 11,
                letterSpacing: 2.5,
                fontFamily: "system-ui,sans-serif",
                color: C.muted,
                textTransform: "uppercase",
                fontWeight: 700,
                marginBottom: 14,
              }}
            >
              All 4 attachment styles
            </div>
            {[
              {
                key: "secure",
                col: C.secure,
                emoji: "🌿",
                name: "Secure Attachment Style",
                desc: "Comfortable with closeness and independence. Trusts easily. Repairs conflict quickly.",
              },
              {
                key: "anxious",
                col: C.anxious,
                emoji: "🌊",
                name: "Anxious Attachment Style",
                desc: "Craves closeness, fears abandonment. Monitoring, reassurance loop, pursuit behaviour.",
              },
              {
                key: "avoidant",
                col: C.avoidant,
                emoji: "🌲",
                name: "Avoidant Attachment Style",
                desc: "Values independence, withdraws under emotional pressure. Handles things alone.",
              },
              {
                key: "fearful",
                col: C.fearful,
                emoji: "🌀",
                name: "Fearful-Avoidant Attachment Style",
                desc: "Wants closeness and fears it simultaneously. Push-pull between intimacy and distance.",
              },
            ].map(({ key, col, emoji, name, desc }) => (
              <div
                key={key}
                style={{
                  display: "flex",
                  gap: 12,
                  padding: "12px 14px",
                  marginBottom: 8,
                  background: key === primaryType ? col.bg : C.white,
                  border: `1.5px solid ${
                    key === primaryType ? col.border : C.rule
                  }`,
                }}
              >
                <span style={{ fontSize: 18 }}>{emoji}</span>
                <div>
                  <div
                    style={{
                      fontSize: 13,
                      fontWeight: 700,
                      color: col.border,
                      fontFamily: "system-ui,sans-serif",
                      marginBottom: 3,
                    }}
                  >
                    {name} {key === primaryType && "← You"}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: C.mid,
                      fontFamily: "system-ui,sans-serif",
                      lineHeight: 1.55,
                    }}
                  >
                    {desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Closing note */}
          <div
            style={{
              background: C.cream,
              padding: "18px 20px",
              marginBottom: 24,
            }}
          >
            <p
              style={{
                fontSize: 14,
                lineHeight: 1.8,
                color: C.mid,
                fontFamily: "system-ui,sans-serif",
              }}
            >
              <strong style={{ color: C.dark }}>
                Attachment style is not fixed.
              </strong>{" "}
              It is the strategy your nervous system learned — and strategies
              can be updated with the right tools, the right words, and enough
              new experience over time.
            </p>
          </div>

          {/* Footer actions */}
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <button
              onClick={restart}
              style={{
                padding: "12px 22px",
                background: "transparent",
                border: `1.5px solid ${C.dark}`,
                color: C.dark,
                fontFamily: "system-ui,sans-serif",
                fontSize: 13,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Retake Quiz
            </button>
            <a
              href="https://www.instagram.com/deeplove.advice"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                padding: "12px 22px",
                background: "transparent",
                border: `1.5px solid ${C.muted}`,
                color: C.muted,
                fontFamily: "system-ui,sans-serif",
                fontSize: 13,
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              @Deeplove.Advice
            </a>
          </div>
          <p
            style={{
              marginTop: 20,
              fontSize: 12,
              color: C.muted,
              fontFamily: "system-ui,sans-serif",
              lineHeight: 1.6,
            }}
          >
            Questions about your result? DM me on Instagram @Deeplove.Advice — I
            read every message personally. 🤍
          </p>
        </div>
      )}
    </div>
  );
}
