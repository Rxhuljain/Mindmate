'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

// Quiz questions included directly in the component file
const quizQuestions = [
  {
    question: "What is one thing you're grateful for today?",
    options: ["My family", "My health", "A friend", "A good meal"],
    positiveThought: "Gratitude boosts your mood and reduces stress."
  },
  {
    question: "What describes your mood today?",
    options: ["Happy", "Calm", "Anxious", "Sad"],
    positiveThought: "Acknowledging your mood is the first step to emotional clarity."
  },
  {
    question: "What would make today feel meaningful?",
    options: ["Helping someone", "Finishing a task", "Taking a walk", "Calling a friend"],
    positiveThought: "Small intentions lead to big shifts in mindset."
  },
  {
    question: "What's one small win you had recently?",
    options: ["Completed a task", "Learned something new", "Helped someone", "Took care of myself"],
    positiveThought: "Celebrating small victories builds momentum for bigger accomplishments."
  },
  {
    question: "How did you take care of yourself today?",
    options: ["Got enough sleep", "Ate healthy food", "Exercised", "Took breaks"],
    positiveThought: "Self-care isn't selfish—it's necessary for sustainable wellbeing."
  },
  {
    question: "What's a challenge you're facing right now?",
    options: ["Work stress", "Relationship issue", "Health concern", "Financial worry"],
    positiveThought: "Challenges are opportunities for growth and resilience."
  },
  {
    question: "What's something you're looking forward to?",
    options: ["A special event", "Weekend plans", "A personal goal", "Quality time with others"],
    positiveThought: "Anticipation creates positive energy and hopeful perspective."
  },
  {
    question: "What's one step you could take toward a goal today?",
    options: ["Research", "Practice for 10 minutes", "Make a plan", "Ask for help"],
    positiveThought: "Progress comes from consistent small actions, not perfect big leaps."
  },
  {
    question: "Who has positively influenced you recently?",
    options: ["A family member", "A friend", "A colleague", "A public figure"],
    positiveThought: "We grow through our connections with others."
  },
  {
    question: "What's something that made you smile today?",
    options: ["A funny moment", "A kind gesture", "A beautiful sight", "A memory"],
    positiveThought: "Finding joy in small moments creates a happier overall outlook."
  },
  {
    question: "How well did you sleep last night?",
    options: ["Very well", "Okay", "Not great", "Poorly"],
    positiveThought: "Quality rest is the foundation of mental and physical wellbeing."
  },
  {
    question: "What's one boundary you need to set or maintain?",
    options: ["With work", "With a relationship", "With technology", "With yourself"],
    positiveThought: "Healthy boundaries protect your energy and values."
  },
  {
    question: "What would help you feel more grounded right now?",
    options: ["Deep breathing", "Going outside", "Physical movement", "Connecting with someone"],
    positiveThought: "Grounding practices bring you back to the present moment."
  },
  {
    question: "What strength have you used today?",
    options: ["Patience", "Creativity", "Courage", "Kindness"],
    positiveThought: "Recognizing your strengths builds confidence and resilience."
  },
  {
    question: "How can you show kindness to someone today?",
    options: ["Send an encouraging message", "Offer help", "Give a compliment", "Listen attentively"],
    positiveThought: "Acts of kindness benefit both the giver and receiver."
  },
  {
    question: "What's a limiting belief you'd like to challenge?",
    options: ["I'm not good enough", "I don't deserve success", "I can't change", "Things won't get better"],
    positiveThought: "Your thoughts shape your reality—choose empowering ones."
  },
  {
    question: "What's one area where you've grown recently?",
    options: ["Self-awareness", "Patience", "Communication", "Resilience"],
    positiveThought: "Growth happens gradually, often without us noticing right away."
  },
  {
    question: "How connected do you feel to others today?",
    options: ["Very connected", "Somewhat connected", "A little isolated", "Very isolated"],
    positiveThought: "Social connection is a fundamental human need and source of strength."
  },
  {
    question: "What's a simple pleasure you could enjoy today?",
    options: ["A favorite beverage", "Time in nature", "A creative activity", "Music you love"],
    positiveThought: "Finding joy in simple pleasures enhances everyday happiness."
  },
  {
    question: "What's something you appreciate about yourself?",
    options: ["My resilience", "My compassion", "My creativity", "My determination"],
    positiveThought: "Self-appreciation builds inner strength and authentic confidence."
  },
  {
    question: "How can you reduce stress today?",
    options: ["Take a break", "Get outside", "Talk with someone", "Practice mindfulness"],
    positiveThought: "Managing stress proactively prevents burnout and promotes wellbeing."
  },
  {
    question: "What's a healthy habit you'd like to build?",
    options: ["Regular exercise", "Better sleep routine", "Mindfulness practice", "Balanced nutrition"],
    positiveThought: "Small, consistent habits create meaningful long-term change."
  },
  {
    question: "What would help you feel more creative?",
    options: ["Changing environments", "Trying something new", "Getting inspired by others", "Taking pressure off"],
    positiveThought: "Creativity flourishes when we make space for play and experimentation."
  },
  {
    question: "What's a worry you can let go of today?",
    options: ["Something out of my control", "A past mistake", "Others' opinions", "Future uncertainty"],
    positiveThought: "Releasing what you can't control creates space for what you can."
  },
  {
    question: "What makes you feel most like yourself?",
    options: ["Being in nature", "Creating something", "Deep conversations", "Physical activity"],
    positiveThought: "Honoring your authentic self leads to deeper fulfillment."
  },
  {
    question: "What would create more balance in your life?",
    options: ["Setting boundaries", "Prioritizing self-care", "Scheduling downtime", "Connecting with others"],
    positiveThought: "Balance isn't static—it's an ongoing practice of adjustment and attention."
  },
  {
    question: "How have you practiced patience recently?",
    options: ["With myself", "With others", "With a process", "With circumstances"],
    positiveThought: "Patience transforms waiting time into growth time."
  },
  {
    question: "What's something you're learning right now?",
    options: ["A new skill", "Something about myself", "A life lesson", "A subject of interest"],
    positiveThought: "Lifelong learning keeps our minds flexible and engaged."
  },
  {
    question: "What energizes you?",
    options: ["Time alone", "Social connection", "Creative activities", "Physical movement"],
    positiveThought: "Knowing your energy sources helps you recharge intentionally."
  },
  {
    question: "How can you bring more play into your day?",
    options: ["Try something without expectation", "Be spontaneous", "Engage with others", "Use imagination"],
    positiveThought: "Play isn't just for children—it's essential for innovation and joy."
  },
  {
    question: "What relationship would you like to nurture?",
    options: ["Family member", "Friend", "Colleague", "Community connection"],
    positiveThought: "Investing in relationships creates a support network for life's challenges."
  },
  {
    question: "What's a decision you need to make?",
    options: ["Personal priority", "Professional direction", "Relationship boundary", "Self-care choice"],
    positiveThought: "Each decision is an opportunity to align with your values."
  },
  {
    question: "What makes you feel accomplished?",
    options: ["Helping others", "Creating something", "Learning something new", "Overcoming a challenge"],
    positiveThought: "True accomplishment comes from alignment with personal values, not external validation."
  },
  {
    question: "What would help you feel more present today?",
    options: ["Mindful breathing", "Sensory awareness", "Single-tasking", "Digital detox"],
    positiveThought: "The present moment is where life actually happens—and it's always available."
  },
  {
    question: "What's a fear you'd like to face?",
    options: ["Speaking up", "Trying something new", "Being vulnerable", "Making a change"],
    positiveThought: "Courage isn't the absence of fear, but moving forward despite it."
  },
  {
    question: "How could you make someone's day better?",
    options: ["Express appreciation", "Offer assistance", "Share a resource", "Simply listen"],
    positiveThought: "The positive impact you have on others ripples outward in ways you may never see."
  },
  {
    question: "What's one truth you need to remember today?",
    options: ["This moment will pass", "I am enough", "I can handle this", "I'm not alone"],
    positiveThought: "Our inner dialogue shapes our experience more than external circumstances."
  },
  {
    question: "How connected do you feel to your purpose?",
    options: ["Very connected", "Somewhat connected", "Searching", "Disconnected"],
    positiveThought: "Purpose evolves throughout life—it's a journey, not a destination."
  },
  {
    question: "What nourishes your spirit?",
    options: ["Nature", "Creativity", "Connection", "Quiet reflection"],
    positiveThought: "Spiritual nourishment provides resilience through life's challenges."
  },
  {
    question: "What's one thing that's better in your life now than a year ago?",
    options: ["A relationship", "A skill", "Self-knowledge", "A circumstance"],
    positiveThought: "Recognizing progress, however small, builds hope for continued growth."
  },
  {
    question: "What would help you feel more at peace?",
    options: ["Acceptance", "Letting go", "Setting boundaries", "Finding closure"],
    positiveThought: "Peace comes from within, not from controlling external circumstances."
  },
  {
    question: "How could you move your body today?",
    options: ["Walking", "Stretching", "Dancing", "Strength exercise"],
    positiveThought: "Movement is medicine for both body and mind."
  },
  {
    question: "What's a quality you appreciate in others?",
    options: ["Authenticity", "Kindness", "Wisdom", "Humor"],
    positiveThought: "The qualities we admire in others often reflect values important to us."
  },
  {
    question: "What's one way you've changed your mind recently?",
    options: ["About a person", "About a belief", "About a goal", "About a habit"],
    positiveThought: "The ability to change your mind is a sign of growth and wisdom."
  },
  {
    question: "What helps you feel safe?",
    options: ["Trusted people", "Familiar places", "Daily routines", "Inner resources"],
    positiveThought: "Creating safety for yourself builds a foundation for growth and exploration."
  },
  {
    question: "What's something you're curious about?",
    options: ["A topic to learn", "A place to visit", "A skill to try", "A perspective to understand"],
    positiveThought: "Curiosity keeps us engaged, learning, and open to new possibilities."
  },
  {
    question: "What brings you a sense of meaning?",
    options: ["Making a difference", "Learning and growing", "Creating something", "Deep connection"],
    positiveThought: "Meaning often comes from contributing to something larger than ourselves."
  },
  {
    question: "How do you want to feel at the end of today?",
    options: ["Accomplished", "Connected", "Peaceful", "Energized"],
    positiveThought: "Setting an intention for how you want to feel guides your choices throughout the day."
  },
  {
    question: "What habit would you like to release?",
    options: ["Negative self-talk", "Procrastination", "People-pleasing", "Perfectionism"],
    positiveThought: "Letting go of what doesn't serve you creates space for what does."
  },
  {
    question: "What's a boundary you're proud of maintaining?",
    options: ["With work", "In a relationship", "With technology", "With my own expectations"],
    positiveThought: "Honoring your boundaries shows respect for yourself and your wellbeing."
  },
  {
    question: "What's a compliment you've received that meant a lot?",
    options: ["About my character", "About my abilities", "About my impact on others", "About my growth"],
    positiveThought: "Receiving positive feedback helps us see ourselves more clearly."
  },
  {
    question: "What's something you've been avoiding?",
    options: ["A difficult conversation", "A decision", "A task", "A feeling"],
    positiveThought: "Facing what we avoid often brings relief and new possibilities."
  },
  {
    question: "What's one area where you'd like to grow?",
    options: ["Self-compassion", "Setting boundaries", "Communication", "Mindfulness"],
    positiveThought: "Desiring growth shows a commitment to becoming your best self."
  },
  {
    question: "What would bring more joy into your life?",
    options: ["Creative expression", "Meaningful connection", "Physical movement", "Learning something new"],
    positiveThought: "Joy isn't frivolous—it's essential fuel for a fulfilling life."
  },
  {
    question: "How can you be kinder to yourself today?",
    options: ["Speak to myself compassionately", "Take a break when needed", "Celebrate small wins", "Ask for help"],
    positiveThought: "Self-compassion isn't self-indulgence—it's wise self-care."
  },
  {
    question: "What's a value that's important to you?",
    options: ["Honesty", "Compassion", "Growth", "Connection"],
    positiveThought: "Living aligned with your values creates authentic fulfillment."
  },
  {
    question: "What helps you recover from stress?",
    options: ["Time in nature", "Creative activities", "Physical movement", "Connecting with others"],
    positiveThought: "Effective recovery practices prevent burnout and build resilience."
  },
  {
    question: "What's a recent insight you've had?",
    options: ["About myself", "About a relationship", "About work", "About life"],
    positiveThought: "Insights transform our perception and create new possibilities."
  },
  {
    question: "What conversation would be meaningful to have?",
    options: ["Expressing appreciation", "Seeking understanding", "Asking for help", "Offering support"],
    positiveThought: "Meaningful conversations deepen connection and mutual growth."
  },
  {
    question: "What's a mistake you've learned from?",
    options: ["A communication error", "A missed opportunity", "A poor decision", "A relationship misstep"],
    positiveThought: "Mistakes are not failures—they're valuable feedback for growth."
  },
  {
    question: "What grounds you when you feel overwhelmed?",
    options: ["Deep breathing", "Physical movement", "Connection with others", "Time in nature"],
    positiveThought: "Having grounding practices prepares you to handle life's challenges."
  },
  {
    question: "What would help you feel more authentic?",
    options: ["Speaking my truth", "Setting better boundaries", "Following my interests", "Expressing my feelings"],
    positiveThought: "Authenticity requires courage but creates deeper connections and fulfillment."
  },
  {
    question: "What's one thing you're doing well as a person?",
    options: ["Being kind", "Growing and learning", "Persevering", "Supporting others"],
    positiveThought: "Acknowledging your strengths builds confidence and resilience."
  },
  {
    question: "What's something you need to forgive yourself for?",
    options: ["A past mistake", "Not meeting expectations", "Taking too long", "Needing help"],
    positiveThought: "Self-forgiveness releases energy for moving forward purposefully."
  },
  {
    question: "What dream or goal excites you?",
    options: ["A creative project", "Personal growth", "A new experience", "Making a difference"],
    positiveThought: "Following what genuinely excites you leads to fulfillment and contribution."
  },
  {
    question: "What's a recent change you're adapting to?",
    options: ["Work situation", "Relationship dynamic", "Personal habit", "External circumstance"],
    positiveThought: "Adaptability is a key strength in an ever-changing world."
  },
  {
    question: "What's something you've been putting off?",
    options: ["A difficult conversation", "A decision", "A task", "Taking care of myself"],
    positiveThought: "Taking action creates momentum and often relieves the weight of procrastination."
  },
  {
    question: "What was the best part of your day so far?",
    options: ["A moment of connection", "An accomplishment", "A moment of beauty", "A moment of peace"],
    positiveThought: "Noticing positive moments trains your brain to find more of them."
  },
  {
    question: "What's a simple pleasure you enjoy?",
    options: ["A warm drink", "Time in nature", "Music you love", "A favorite activity"],
    positiveThought: "Finding joy in simple pleasures creates sustainable happiness."
  },
  {
    question: "What's one way you can take care of your future self?",
    options: ["Eat well today", "Rest adequately", "Save resources", "Learn something useful"],
    positiveThought: "Small actions today create wellbeing for your future self."
  },
  {
    question: "What helps you feel more confident?",
    options: ["Preparation", "Positive self-talk", "Past successes", "Support from others"],
    positiveThought: "Confidence grows through action, not waiting until you feel ready."
  },
  {
    question: "What are you learning about yourself lately?",
    options: ["A strength", "A need", "A value", "A pattern"],
    positiveThought: "Self-knowledge is the foundation of authentic growth."
  },
  {
    question: "What would feel like an act of courage today?",
    options: ["Speaking up", "Setting a boundary", "Trying something new", "Being vulnerable"],
    positiveThought: "Courage isn't fearlessness—it's feeling fear and taking action anyway."
  },
  {
    question: "What helps you feel more hopeful?",
    options: ["Connecting with others", "Taking positive action", "Focusing on what's working", "Remembering past challenges overcome"],
    positiveThought: "Hope isn't just a feeling—it's a practice of focusing on possibilities."
  },
  {
    question: "What's a difficult emotion you're experiencing?",
    options: ["Anxiety", "Sadness", "Frustration", "Disappointment"],
    positiveThought: "All emotions provide valuable information and deserve compassionate attention."
  },
  {
    question: "What's a challenge you've overcome?",
    options: ["A personal obstacle", "A relationship difficulty", "A work challenge", "A health issue"],
    positiveThought: "Your history of overcoming challenges is evidence of your resilience."
  },
  {
    question: "What's something you're proud of?",
    options: ["A personal quality", "Something you created", "How you handled a situation", "Growth you've experienced"],
    positiveThought: "Taking time to acknowledge achievements builds confidence and motivation."
  },
  {
    question: "What helps you feel more secure?",
    options: ["Clear communication", "Consistent routines", "Supportive relationships", "Inner resources"],
    positiveThought: "True security comes from both external supports and internal strengths."
  },
  {
    question: "What's a helpful perspective shift you could make?",
    options: ["Seeing a challenge as opportunity", "Focusing on what I can control", "Considering another viewpoint", "Taking a longer view"],
    positiveThought: "How we frame situations dramatically impacts our experience of them."
  },
  {
    question: "What's a way you've grown through difficulty?",
    options: ["Increased resilience", "Greater compassion", "Clearer priorities", "New skills"],
    positiveThought: "Challenges often become catalysts for our most important growth."
  },
  {
    question: "What's a boundary you need to strengthen?",
    options: ["With my time", "With others' expectations", "With work demands", "With my own perfectionism"],
    positiveThought: "Healthy boundaries protect what matters most to you."
  },
  {
    question: "What would help you feel more connected to others?",
    options: ["Reaching out first", "Being more vulnerable", "Asking meaningful questions", "Offering support"],
    positiveThought: "Connection often requires courage but rewards us with belonging."
  },
  {
    question: "What's a small step toward a goal you could take today?",
    options: ["Research", "Preparation", "Practice", "Asking for help"],
    positiveThought: "Progress comes from consistent small actions, not occasional heroic efforts."
  },
  {
    question: "What makes you lose track of time in a good way?",
    options: ["Creative activities", "Learning something interesting", "Being in nature", "Meaningful conversation"],
    positiveThought: "Flow states increase happiness and indicate alignment with your interests."
  },
  {
    question: "What would bring more ease to your day?",
    options: ["Simplifying expectations", "Asking for help", "Taking breaks", "Being present"],
    positiveThought: "Ease isn't laziness—it's removing unnecessary struggle and friction."
  },
  {
    question: "What's a strength you've developed through challenge?",
    options: ["Adaptability", "Patience", "Self-compassion", "Perseverance"],
    positiveThought: "Our greatest strengths often emerge from our greatest challenges."
  },
  {
    question: "What helps you return to center when upset?",
    options: ["Deep breathing", "Physical movement", "Talking it through", "Time in nature"],
    positiveThought: "Having reset practices helps you respond thoughtfully rather than react impulsively."
  },
  {
    question: "What would make you feel more alive today?",
    options: ["Physical movement", "Creative expression", "Meaningful connection", "New experiences"],
    positiveThought: "Vitality comes from engaging fully with life rather than just getting through it."
  },
  {
    question: "What's a belief that's holding you back?",
    options: ["I'm not capable", "It's too late", "I don't deserve it", "It's too hard"],
    positiveThought: "Beliefs are just thoughts we've thought repeatedly—they can be changed."
  },
  {
    question: "What's something that felt impossible but you did anyway?",
    options: ["A personal challenge", "A difficult conversation", "A big change", "Learning something new"],
    positiveThought: "Your past successes are evidence of your capacity to overcome obstacles."
  },
  {
    question: "What gives your life meaning right now?",
    options: ["Relationships", "Personal growth", "Creative expression", "Making a difference"],
    positiveThought: "Meaning evolves throughout life and can be found in both big and small ways."
  },
  {
    question: "What's something true that you need to accept?",
    options: ["A limitation", "A loss", "A reality about someone", "A circumstance"],
    positiveThought: "Acceptance isn't resignation—it's the foundation for effective action."
  },
  {
    question: "What nourishes you intellectually?",
    options: ["Learning new things", "Thoughtful conversations", "Reading", "Problem-solving"],
    positiveThought: "Intellectual engagement keeps our minds flexible and growing throughout life."
  },
  {
    question: "What would help you feel more optimistic?",
    options: ["Focusing on what's going well", "Taking positive action", "Connecting with supportive people", "Remembering past challenges overcome"],
    positiveThought: "Optimism isn't naivety—it's a practical strategy for finding solutions."
  },
  {
    question: "What's a feeling you'd like to experience more?",
    options: ["Joy", "Peace", "Confidence", "Connection"],
    positiveThought: "Emotions aren't just reactions—they can be cultivated through intention."
  },
  {
    question: "What's something you're overthinking?",
    options: ["A decision", "A social interaction", "A mistake", "A future event"],
    positiveThought: "Sometimes the wisest action is to trust yourself and move forward."
  },
  {
    question: "What's a recent moment of beauty you noticed?",
    options: ["In nature", "In human connection", "In art or music", "In everyday life"],
    positiveThought: "Beauty is always available when we train ourselves to notice it."
  },
  {
    question: "What's a habit that consistently helps you?",
    options: ["A morning routine", "Regular exercise", "Mindfulness practice", "Connecting with others"],
    positiveThought: "Small, consistent habits create the foundation for wellbeing."
  },
  {
    question: "What would help you feel more peaceful today?",
    options: ["Time in nature", "Mindfulness practice", "Creative expression", "Meaningful connection"],
    positiveThought: "Peace is available in this moment through conscious attention and presence."
  },
  {
    question: "What's something you need to let go of?",
    options: ["A grudge", "An expectation", "A past mistake", "Something outside my control"],
    positiveThought: "Letting go creates space for what truly matters now."
  },
  {
    question: "What's something you're excited to learn more about?",
    options: ["A skill", "A subject", "A person", "Myself"],
    positiveThought: "Curiosity keeps us engaged, growing, and mentally flexible."
  },
  {
    question: "What's a relationship that nurtures you?",
    options: ["Family member", "Friend", "Mentor", "Community"],
    positiveThought: "Nurturing relationships provide both roots of support and wings for growth."
  }
];

export function DailyQuizCard() {
  const [currentQuestion, setCurrentQuestion] = useState<typeof quizQuestions[0] | null>(null)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showThought, setShowThought] = useState(false)

  useEffect(() => {
    // Get a random question when component mounts
    const randomIndex = Math.floor(Math.random() * quizQuestions.length)
    setCurrentQuestion(quizQuestions[randomIndex])
  }, [])

  const handleAnswer = (option: string) => {
    setSelectedOption(option)
    setShowThought(true)
  }

  const handleNextQuestion = () => {
    // Get a different random question
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * quizQuestions.length)
    } while (currentQuestion && quizQuestions[randomIndex].question === currentQuestion.question)
    
    setCurrentQuestion(quizQuestions[randomIndex])
    setSelectedOption(null)
    setShowThought(false)
  }

  if (!currentQuestion) return null

  return (
    <Card className="overflow-hidden border-0 shadow-lg">
      <div className="bg-gradient-to-r from-secondary to-primary p-6 text-white">
        <h3 className="text-xl font-bold">Daily Reflection</h3>
        <p className="mt-2 opacity-90">
          Reflect on today and discover a positive thought
        </p>
      </div>

      {!showThought ? (
        <CardContent className="p-6">
          <div className="space-y-4">
            <p className="font-medium">🧠 {currentQuestion.question}</p>
            <div className="space-y-2">
              {currentQuestion.options.map((option, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full text-left justify-start"
                  onClick={() => handleAnswer(option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      ) : (
        <CardContent className="p-6">
          <div className="space-y-4 text-center">
            <h4 className="text-lg font-semibold text-primary">Your reflection</h4>
            <p className="font-medium">{currentQuestion.question}</p>
            <div className="inline-block bg-muted px-4 py-2 rounded-full">
              {selectedOption}
            </div>
            <div className="mt-6 pt-4 border-t">
              <p className="text-muted-foreground italic">"{currentQuestion.positiveThought}"</p>
            </div>
          </div>
        </CardContent>
      )}

      <CardFooter className="bg-muted/50 px-6 py-4 flex justify-between items-center">
        {showThought ? (
          <Button 
            variant="secondary" 
            onClick={handleNextQuestion}
          >
            Try another reflection
          </Button>
        ) : (
          <p className="text-sm text-muted-foreground">
            Choose the option that resonates with you
          </p>
        )}
      </CardFooter>
    </Card>
  )
}