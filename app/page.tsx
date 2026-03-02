"use client";

import { useState, useEffect, ReactNode, useRef } from "react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { motion, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Github, Linkedin, Mail, ExternalLink, Cpu, Gamepad2, Music,
  Home as HomeIcon, Globe, Code2, Bitcoin, Wallet, Utensils,
  Heart, Users, Server, Sun, Moon, Languages
} from "lucide-react";

import { contentData } from "@/lib/data";
import { LightningTip } from "@/components/lightning-tip";

const iconMap: Record<string, ReactNode> = {
  gaming: <Gamepad2 className="w-4 h-4" />,
  music: <Music className="w-4 h-4" />,
  server: <Server className="w-4 h-4" />,
  home: <HomeIcon className="w-4 h-4" />,
  cpu: <Cpu className="w-4 h-4" />,
  globe: <Globe className="w-4 h-4" />,
  bitcoin: <Bitcoin className="w-4 h-4" />,
  code: <Code2 className="w-4 h-4" />,
  wallet: <Wallet className="w-4 h-4" />,
  utensils: <Utensils className="w-4 h-4" />,
  heart: <Heart className="w-4 h-4" />,
  users: <Users className="w-4 h-4" />,
};

function ParallaxBackground() {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 45]);

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
      {/* Primary Gradient Blobs */}
      <motion.div
        style={{ y: y1, rotate }}
        className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-purple-500/10 dark:bg-purple-600/20 rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: y2 }}
        className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] bg-teal-500/10 dark:bg-teal-400/20 rounded-full blur-[100px]"
      />
      <motion.div
        style={{ y: y3 }}
        className="absolute bottom-[10%] left-[20%] w-[30%] h-[30%] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[80px]"
      />

      {/* Wireframe Circles */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.07]">
        <svg width="100%" height="100%" className="w-full h-full">
          <pattern id="grid" width="100" height="100" patternUnits="userSpaceOnUse">
            <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
    </div>
  );
}

function SectionReveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      {children}
    </motion.div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"en" | "es">("en");
  const { theme, setTheme } = useTheme();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const content = contentData[lang];

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen bg-background text-foreground selection:bg-purple-500/30 transition-colors duration-500 overflow-x-hidden pt-1">
      <ParallaxBackground />

      {/* Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 to-teal-400 z-[100] origin-left"
        style={{ scaleX }}
      />

      {/* Navigation Toggles */}
      <nav className="fixed top-6 left-1/2 -translate-x-1/2 flex gap-4 z-50 p-2 rounded-full bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="rounded-full hover:bg-purple-500/10 text-xs font-medium px-4 transition-all"
        >
          <Languages className="h-3.5 w-3.5 mr-2 opacity-70" />
          {lang === "en" ? "English" : "Español"}
        </Button>
        <div className="w-px h-4 bg-white/20 dark:bg-white/10 self-center" />
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="rounded-full hover:bg-teal-500/10 h-8 w-8 transition-all"
        >
          {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
          <span className="sr-only">Toggle Theme</span>
        </Button>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 md:pt-48 md:pb-32 max-w-5xl mx-auto">
        <SectionReveal>
          <div className="space-y-8 text-center md:text-left relative">
            <Badge variant="outline" className="px-4 py-1.5 border-purple-500/30 bg-purple-500/5 text-purple-600 dark:text-purple-300 backdrop-blur-sm">
              {content.role}
            </Badge>

            <div className="space-y-2">
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9]">
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-900 via-purple-800 to-teal-600 dark:from-white dark:via-purple-200 dark:to-teal-400">
                  Yves Roulin
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed font-light">
                {content.desc}
              </p>
            </div>

            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-4">
              <Button asChild size="lg" className="rounded-full bg-slate-900 dark:bg-white text-white dark:text-black hover:scale-105 transition-transform duration-300 px-8 shadow-xl">
                <a href="https://www.linkedin.com/in/yvesroulin/" target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" /> {content.connect}
                </a>
              </Button>
              {/* <Button variant="outline" size="lg" className="rounded-full border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/5 backdrop-blur-sm px-8">
                <Mail className="mr-2 h-4 w-4" /> {content.contactBtn}
              </Button> */}
              {/* <LightningTip
                address={content.lightningAddress}
                title={content.tipTitle}
                description={content.tipDesc}
              /> */}
            </div>
          </div>
        </SectionReveal>
      </section>

      <div className="max-w-5xl mx-auto px-6 pb-24 space-y-32">
        <SectionReveal delay={0.2}>
          <Separator className="bg-gradient-to-r from-transparent via-purple-500/20 to-transparent mb-24 h-[1px]" />
        </SectionReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
          {/* About Me & Interests */}
          <div className="md:col-span-2 space-y-16">
            <SectionReveal>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 bg-gradient-to-b from-purple-500 to-teal-500 rounded-full" />
                  <h2 className="text-4xl font-bold tracking-tight">{content.about}</h2>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xl leading-relaxed font-light">
                  {content.aboutDesc}
                </p>
              </div>
            </SectionReveal>

            <SectionReveal delay={0.1}>
              <div className="space-y-8">
                <h3 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                  <Heart className="w-6 h-6 text-purple-500" /> {content.interests}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {content.interestList.map((interest, i) => (
                    <motion.div
                      key={interest.name}
                      whileHover={{ scale: 1.05, y: -2 }}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                    >
                      <Badge
                        variant="secondary"
                        className="bg-white dark:bg-white/5 hover:bg-purple-50 dark:hover:bg-purple-500/10 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-white/10 px-4 py-2 flex items-center gap-2.5 transition-all cursor-default shadow-sm"
                      >
                        <span className="text-purple-500 dark:text-purple-400">{iconMap[interest.icon]}</span>
                        {interest.name}
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </div>
            </SectionReveal>
          </div>

          {/* Contact Card */}
          <div className="space-y-12">
            <SectionReveal>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-1 bg-gradient-to-b from-teal-500 to-purple-500 rounded-full" />
                  <h2 className="text-4xl font-bold tracking-tight">{content.contactTitle}</h2>
                </div>

                <Card className="bg-white/50 dark:bg-white/[0.02] border-slate-200 dark:border-white/10 backdrop-blur-2xl overflow-hidden shadow-2xl relative group">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <CardHeader className="pb-4 relative">
                    <CardTitle className="text-xl font-bold">{content.talkTitle}</CardTitle>
                    <CardDescription className="text-slate-500 dark:text-slate-400 text-base leading-relaxed">
                      {content.talkDesc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4 relative">
                    <div className="space-y-3">
                      <a
                        href="https://www.linkedin.com/in/yvesroulin/"
                        className="flex items-center gap-4 p-4 rounded-xl hover:bg-purple-500/5 dark:hover:bg-purple-500/10 transition-all border border-transparent hover:border-purple-500/20 group/item"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-600 dark:text-purple-400 group-hover/item:scale-110 transition-transform">
                          <Linkedin className="w-6 h-6" />
                        </div>
                        <div>
                          <p className="text-sm font-bold">LinkedIn</p>
                          <p className="text-xs text-slate-500 font-medium">in/yvesroulin</p>
                        </div>
                        <ExternalLink className="w-4 h-4 ml-auto opacity-0 group-hover/item:opacity-100 transition-all" />
                      </a>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </SectionReveal>
          </div>
        </div>

        {/* Technologies Section */}
        {/* <section id="technologies" className="space-y-12">
          <SectionReveal>
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="h-10 w-1 bg-gradient-to-b from-blue-500 to-purple-500 rounded-full" />
                <h2 className="text-4xl font-bold tracking-tight">{content.techTitle}</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl font-light">
                {lang === "en" ? "A showcase of the tools and languages I use to bring ideas to life." : "Una muestra de las herramientas y lenguajes que utilizo para dar vida a las ideas."}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {content.techList.map((tech, i) => (
              <SectionReveal key={tech.name} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="p-6 rounded-2xl bg-white/40 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-sm flex flex-col items-center justify-center text-center gap-3 group transition-colors hover:border-purple-500/30 dark:hover:border-purple-500/30"
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white group-hover:text-purple-500 transition-colors">{tech.name}</span>
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 dark:text-slate-500 font-bold">{tech.category}</span>
                </motion.div>
              </SectionReveal>
            ))}
          </div>
        </section> */}

        {/* Projects Section */}
        {/* <section id="projects" className="space-y-12 pb-12">
          <SectionReveal>
            <div className="space-y-4 text-center md:text-left">
              <div className="flex items-center gap-4 justify-center md:justify-start">
                <div className="h-10 w-1 bg-gradient-to-b from-teal-500 to-blue-500 rounded-full" />
                <h2 className="text-4xl font-bold tracking-tight">{content.projectsTitle}</h2>
              </div>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-2xl font-light">
                {lang === "en" ? "Selected works that highlight my expertise in AEM and modern web development." : "Trabajos seleccionados que destacan mi experiencia en AEM y desarrollo web moderno."}
              </p>
            </div>
          </SectionReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {content.projectsList.map((project, i) => (
              <SectionReveal key={project.title} delay={i * 0.1}>
                <Card className="h-full bg-white/40 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 backdrop-blur-md overflow-hidden flex flex-col group hover:border-purple-500/20 transition-all hover:shadow-2xl hover:shadow-purple-500/5">
                  <CardHeader className="space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
                        <Code2 className="w-6 h-6" />
                      </div>
                      <Link href={project.link} className="text-slate-400 hover:text-purple-500 transition-colors">
                        <ExternalLink className="w-5 h-5" />
                      </Link>
                    </div>
                    <CardTitle className="text-2xl font-bold tracking-tight group-hover:text-purple-500 transition-colors">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-600 dark:text-slate-400 text-base leading-relaxed line-clamp-3">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="mt-auto space-y-6">
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <Badge key={tag} variant="outline" className="text-[10px] font-bold uppercase tracking-tighter bg-slate-50 dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <Button variant="link" className="p-0 h-auto text-purple-600 dark:text-purple-400 font-bold items-center group/btn" asChild>
                      <Link href={project.link}>
                        {content.viewProject} <ExternalLink className="ml-2 w-3 h-3 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </SectionReveal>
            ))}
          </div>
        </section> */}
      </div>

      <footer className="max-w-5xl mx-auto px-6 py-12 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-500 text-sm font-medium">
        <p>© {new Date().getFullYear()} Yves Roulin. {content.footer}</p>
        <div className="flex gap-8">
          {/* <Link href="#" className="hover:text-purple-500 transition-colors uppercase tracking-widest text-xs">GitHub</Link> */}
          <a href="https://www.linkedin.com/in/yvesroulin/" className="hover:text-purple-500 transition-colors uppercase tracking-widest text-xs">LinkedIn</a>
        </div>
      </footer>
    </main>
  );
}

