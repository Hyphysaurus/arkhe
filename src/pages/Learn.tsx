import { useState } from 'react';
import { BookOpen, Sparkles, Box, Layers, Zap, Rocket, ChevronRight, Search } from 'lucide-react';
import LessonCard from '../components/LessonCard';
import { learningModules, glossary, quickTips } from '../data/learningPath';

const iconMap = {
  Sparkles,
  Box,
  Layers,
  Zap,
  Rocket
};

export default function Learn() {
  const [activeModule, setActiveModule] = useState(learningModules[0].id);
  const [expandedLesson, setExpandedLesson] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showGlossary, setShowGlossary] = useState(false);

  const currentModule = learningModules.find(m => m.id === activeModule);

  const filteredGlossary = glossary.filter(item =>
    item.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.greek.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.definition.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen p-8 space-y-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <BookOpen className="w-8 h-8 text-white" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-white/90 to-white/70 bg-clip-text text-transparent">
              Learn to Vibe Code
            </h1>
          </div>
          <p className="text-xl text-white/60">
            Μάθησις Ῥυθμοῦ Κώδικος - Master the art of AI-assisted development using ARKHE as your guide
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Learning Path</h2>
                <button
                  onClick={() => setShowGlossary(!showGlossary)}
                  className="px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg text-sm transition-colors"
                >
                  {showGlossary ? 'Hide' : 'Show'} Glossary
                </button>
              </div>

              {showGlossary && (
                <div className="mb-6 p-4 bg-black/20 border border-white/10 rounded-xl space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Search glossary..."
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-white/40 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="max-h-96 overflow-y-auto space-y-3">
                    {filteredGlossary.map((item) => (
                      <div key={item.term} className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-baseline gap-2 mb-1">
                          <h4 className="font-semibold text-white">{item.term}</h4>
                          <span className="text-sm text-white/50">{item.greek}</span>
                        </div>
                        <p className="text-sm text-white/70 mb-2">{item.definition}</p>
                        <div className="text-xs text-white/50 font-mono bg-black/30 p-2 rounded border border-white/10">
                          {item.example}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                {learningModules.map((module) => {
                  const Icon = iconMap[module.icon as keyof typeof iconMap];
                  return (
                    <button
                      key={module.id}
                      onClick={() => {
                        setActiveModule(module.id);
                        setExpandedLesson(null);
                      }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                        activeModule === module.id
                          ? 'bg-white/10 border-white/30 text-white'
                          : 'bg-white/5 border-white/10 text-white/60 hover:bg-white/10 hover:text-white'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      {module.title}
                    </button>
                  );
                })}
              </div>

              {currentModule && (
                <div className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-white mb-1">{currentModule.title}</h3>
                    <p className="text-white/50 mb-2">{currentModule.greekConcept}</p>
                    <p className="text-white/70">{currentModule.description}</p>
                  </div>

                  <div className="space-y-3">
                    {currentModule.lessons.map((lesson) => (
                      <LessonCard
                        key={lesson.id}
                        lesson={lesson}
                        isExpanded={expandedLesson === lesson.id}
                        onToggle={() => setExpandedLesson(expandedLesson === lesson.id ? null : lesson.id)}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                The Meta Journey
              </h3>
              <div className="space-y-3 text-sm text-white/70">
                <p>
                  This entire learning system was vibe-coded! We asked AI to create a Greek-themed tutorial
                  that teaches vibe coding by deconstructing ARKHE itself.
                </p>
                <p>
                  Every component you see, every glass effect, every integration - all created through
                  natural language prompts. No manual CSS wrestling, no boilerplate copying.
                </p>
                <p className="text-white/90 font-medium">
                  You're learning the method by experiencing its output. That's Ἀρχή - the beginning
                  contains the whole.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-4">Quick Tips</h3>
              <div className="space-y-4">
                {quickTips.map((section) => (
                  <div key={section.category}>
                    <h4 className="text-sm font-semibold text-white/80 mb-2">{section.category}</h4>
                    <ul className="space-y-2">
                      {section.tips.map((tip, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm text-white/60">
                          <ChevronRight className="w-4 h-4 mt-0.5 flex-shrink-0 text-white/40" />
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 backdrop-blur-xl border border-emerald-500/20 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-white mb-3">Your Progress</h3>
              <div className="space-y-3">
                {learningModules.map((module, index) => (
                  <div key={module.id} className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0
                        ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300'
                        : 'bg-white/5 border border-white/10 text-white/40'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-white/70">{module.title}</div>
                      <div className="text-xs text-white/40">{module.lessons.length} lessons</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
