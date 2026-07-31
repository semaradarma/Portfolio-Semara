import { skills } from "@/data/skills";
import SkillCard from "@/components/Cards/SkillCard";
import MotionWrapper from "@/components/UI/MotionWrapper";
import useLanguage from "@/hooks/useLanguage";
import { translations } from "@/data/translations";

export default function Skills() {
  const { language } = useLanguage();
  const langData = translations[language] || translations.id;
  const t = langData.skills;

  const androidSkills = skills.filter((s) => s.category === "android");
  const webSkills = skills.filter((s) => s.category === "web");
  const toolSkills = skills.filter((s) => s.category === "tools");

  return (
    <section id="skills" className="py-24 px-4 sm:px-8 relative overflow-hidden section-glass">
      <div className="max-w-[1360px] mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <MotionWrapper direction="up">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              {t.title}
            </h2>
            <div className="mt-3 w-20 h-1.5 bg-purple-700 dark:bg-purple-400 mx-auto rounded-full" />
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm md:text-base font-semibold">
              {t.subtitle}
            </p>
          </MotionWrapper>
        </div>

        {/* Skill Groups */}
        <div className="space-y-14">
          
          {/* Android Mobile Skills */}
          <MotionWrapper direction="up">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-700/50 flex items-center justify-center text-purple-800 dark:text-purple-300 text-xl font-bold">
                  <i className="bi bi-android2"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {t.catAndroid || "Android Mobile Development"}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {androidSkills.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
                ))}
              </div>
            </div>
          </MotionWrapper>

          {/* Web Skills */}
          <MotionWrapper direction="up" delay={0.2}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 border border-indigo-300 dark:border-indigo-700/50 flex items-center justify-center text-indigo-800 dark:text-indigo-300 text-xl font-bold">
                  <i className="bi bi-code-slash"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {t.catWeb || "Web Development & Frontend"}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {webSkills.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
                ))}
              </div>
            </div>
          </MotionWrapper>

          {/* Tools & Workflow */}
          <MotionWrapper direction="up" delay={0.3}>
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-xl bg-purple-100 dark:bg-purple-950/80 border border-purple-300 dark:border-purple-700/50 flex items-center justify-center text-purple-800 dark:text-purple-300 text-xl font-bold">
                  <i className="bi bi-tools"></i>
                </div>
                <h3 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white">
                  {t.catTools || "Database, Cloud & Tools"}
                </h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {toolSkills.map((skill, index) => (
                  <SkillCard key={index} {...skill} />
                ))}
              </div>
            </div>
          </MotionWrapper>

        </div>

      </div>
    </section>
  );
}
