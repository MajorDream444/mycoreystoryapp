"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingBasketIcon as Basketball,
  Clock,
  FileAudio,
  FileVideo,
  ImageIcon,
  MessageSquare,
  CheckCircle2,
} from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { ToastAction } from "@/components/ui/toast"
import { useToast } from "@/components/ui/use-toast"

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [formData, setFormData] = useState({ text: "", audio: null, image: null, video: null })
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [activeTab, setActiveTab] = useState("text")
  const { toast } = useToast()

  useEffect(() => {
    const targetDate = new Date("2025-05-10T00:00:00Z")

    const timer = setInterval(() => {
      const now = new Date()
      const difference = targetDate.getTime() - now.getTime()

      if (difference <= 0) {
        clearInterval(timer)
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        return
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24))
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
      const seconds = Math.floor((difference % (1000 * 60)) / 1000)

      setTimeLeft({ days, hours, minutes, seconds })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  const handleTextChange = (e) => {
    setFormData({ ...formData, text: e.target.value })
  }

  const handleFileChange = (e) => {
    const { name, files } = e.target
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] })
    }
  }

  const simulateUpload = () => {
    setIsSubmitting(true)
    setUploadProgress(0)

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSubmitting(false)

          toast({
            title: "Story submitted successfully!",
            description: "Your Corey Story has been received. You'll receive your animated NFT soon.",
            action: <ToastAction altText="View Status">View Status</ToastAction>,
          })

          return 0
        }
        return prev + 5
      })
    }, 150)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if at least one field has content
    const hasContent = formData.text || formData.audio || formData.image || formData.video

    if (!hasContent) {
      toast({
        title: "Missing content",
        description: "Please share your story through text, audio, image, or video.",
        variant: "destructive",
      })
      return
    }

    simulateUpload()
    console.log("Submitted Data:", formData)
  }

  return (
    <div className="min-h-screen bg-[#0a3b2c] text-cream flex flex-col">
      <header className="py-6 px-4 md:px-8 flex justify-between items-center border-b border-cream/20">
        <div className="flex items-center gap-2">
          <Basketball className="h-8 w-8 text-[#e8d8b7]" />
          <h1 className="text-2xl font-bold text-[#e8d8b7]">Corey Story</h1>
        </div>
        <nav className="hidden md:flex gap-6">
          <a href="#about" className="text-[#e8d8b7] hover:text-[#e8d8b7]/80 transition">
            About
          </a>
          <a href="#how-it-works" className="text-[#e8d8b7] hover:text-[#e8d8b7]/80 transition">
            How It Works
          </a>
          <a href="#nyc-first" className="text-[#e8d8b7] hover:text-[#e8d8b7]/80 transition">
            NYC First
          </a>
          <a href="#colon-cancer" className="text-[#e8d8b7] hover:text-[#e8d8b7]/80 transition">
            Health Awareness
          </a>
        </nav>
      </header>

      <main className="flex-1">
        <section className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-[#e8d8b7]">From Concrete to Global</h1>
          <h2 className="text-xl md:text-3xl mb-8 text-[#e8d8b7]/90">
            Launching May 10th – Corey "Homicide" Williams' Legacy Lives On
          </h2>

          <div className="grid grid-cols-4 gap-2 md:gap-6 max-w-2xl mx-auto mb-12 bg-[#0a3b2c]/50 p-6 rounded-xl border border-[#e8d8b7]/20">
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-mono font-bold text-[#e8d8b7]">{timeLeft.days}</div>
              <div className="text-sm md:text-base text-[#e8d8b7]/70">Days</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-mono font-bold text-[#e8d8b7]">{timeLeft.hours}</div>
              <div className="text-sm md:text-base text-[#e8d8b7]/70">Hours</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-mono font-bold text-[#e8d8b7]">{timeLeft.minutes}</div>
              <div className="text-sm md:text-base text-[#e8d8b7]/70">Minutes</div>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl md:text-5xl font-mono font-bold text-[#e8d8b7]">{timeLeft.seconds}</div>
              <div className="text-sm md:text-base text-[#e8d8b7]/70">Seconds</div>
            </div>
          </div>

          <p className="max-w-2xl mx-auto text-center text-[#e8d8b7]/80 text-lg mb-12">
            Submit your Corey Story with text, audio, image, or video. Everyone gets a free animated NFT tribute. NYC
            gets early access.
          </p>
        </section>

        <section id="how-it-works" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-[#e8d8b7]">HOW IT WORKS</h2>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#e8d8b7]/10 flex items-center justify-center mb-4 border border-[#e8d8b7]/30">
                <span className="text-2xl font-bold text-[#e8d8b7]">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#e8d8b7]">Submit your story</h3>
              <p className="text-[#e8d8b7]/70">Share your memory through text, voice recording, image, or video</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#e8d8b7]/10 flex items-center justify-center mb-4 border border-[#e8d8b7]/30">
                <span className="text-2xl font-bold text-[#e8d8b7]">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#e8d8b7]">We animate it</h3>
              <p className="text-[#e8d8b7]/70">Our AI transforms your story into a beautiful animated tribute</p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-[#e8d8b7]/10 flex items-center justify-center mb-4 border border-[#e8d8b7]/30">
                <span className="text-2xl font-bold text-[#e8d8b7]">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2 text-[#e8d8b7]">You get a digital keepsake</h3>
              <p className="text-[#e8d8b7]/70">Receive your personalized animated NFT to keep and share</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/CB568E3E-E08E-49C1-82E4-09AF352DCB31-Hee7t6eSOwL24MvQM3V1oEFKvjYlpp.png"
                alt="Corey Story App Animated NFT"
                width={500}
                height={500}
                className="rounded-lg mx-auto"
              />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-4 text-[#e8d8b7]">What's the Corey Story App?</h3>
              <p className="text-[#e8d8b7]/80 mb-6">
                It's an app that transforms your memory of Corey 'Homicide' Williams into an animated NFT. Your stories
                help build a living digital archive and contribute to a community-built Book of Corey.
              </p>
              <div className="flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#e8d8b7] mt-1" />
                  <div>
                    <h4 className="font-bold text-[#e8d8b7]">Preserve memories</h4>
                    <p className="text-[#e8d8b7]/70">
                      Your stories help document his influence on basketball and culture
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#e8d8b7] mt-1" />
                  <div>
                    <h4 className="font-bold text-[#e8d8b7]">Raise awareness</h4>
                    <p className="text-[#e8d8b7]/70">Support colon cancer awareness and early screening</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#e8d8b7] mt-1" />
                  <div>
                    <h4 className="font-bold text-[#e8d8b7]">Get a keepsake</h4>
                    <p className="text-[#e8d8b7]/70">Receive a unique animated NFT tribute to keep and share</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="submit-story" className="py-16 px-4 md:px-8 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 text-[#e8d8b7]">SUBMIT. REMEMBER. INSPIRE.</h2>
            <p className="text-[#e8d8b7]/80">Share your Corey Story and be part of his lasting legacy</p>
          </div>

          <Card className="bg-[#0a3b2c] border border-[#e8d8b7]/30">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit}>
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="grid grid-cols-4 mb-6 bg-[#0a3b2c] border border-[#e8d8b7]/20">
                    <TabsTrigger
                      value="text"
                      className={cn(
                        "data-[state=active]:bg-[#e8d8b7]/10 data-[state=active]:text-[#e8d8b7]",
                        "text-[#e8d8b7]/70",
                      )}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Text</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="audio"
                      className={cn(
                        "data-[state=active]:bg-[#e8d8b7]/10 data-[state=active]:text-[#e8d8b7]",
                        "text-[#e8d8b7]/70",
                      )}
                    >
                      <FileAudio className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Audio</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="image"
                      className={cn(
                        "data-[state=active]:bg-[#e8d8b7]/10 data-[state=active]:text-[#e8d8b7]",
                        "text-[#e8d8b7]/70",
                      )}
                    >
                      <ImageIcon className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Image</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="video"
                      className={cn(
                        "data-[state=active]:bg-[#e8d8b7]/10 data-[state=active]:text-[#e8d8b7]",
                        "text-[#e8d8b7]/70",
                      )}
                    >
                      <FileVideo className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Video</span>
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="text" className="mt-0">
                    <div className="mb-6">
                      <label className="block text-[#e8d8b7] font-medium mb-2">Your Story</label>
                      <Textarea
                        placeholder="Share your memory of Corey 'Homicide' Williams..."
                        className="min-h-[150px] bg-[#0a3b2c] border-[#e8d8b7]/30 text-[#e8d8b7] placeholder:text-[#e8d8b7]/50"
                        value={formData.text}
                        onChange={handleTextChange}
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="audio" className="mt-0">
                    <div className="mb-6">
                      <label className="block text-[#e8d8b7] font-medium mb-2">Upload Audio</label>
                      <div className="border-2 border-dashed border-[#e8d8b7]/30 rounded-lg p-8 text-center">
                        {formData.audio ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileAudio className="h-6 w-6 text-[#e8d8b7]" />
                            <span className="text-[#e8d8b7]">{formData.audio.name}</span>
                          </div>
                        ) : (
                          <>
                            <FileAudio className="h-12 w-12 text-[#e8d8b7]/50 mx-auto mb-2" />
                            <p className="text-[#e8d8b7]/70 mb-4">Drag and drop an audio file or click to browse</p>
                          </>
                        )}
                        <input
                          type="file"
                          name="audio"
                          accept="audio/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="audio-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("audio-upload").click()}
                          className="border-[#e8d8b7]/50 text-[#e8d8b7] hover:bg-[#e8d8b7]/10"
                        >
                          Select Audio File
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="image" className="mt-0">
                    <div className="mb-6">
                      <label className="block text-[#e8d8b7] font-medium mb-2">Upload Image</label>
                      <div className="border-2 border-dashed border-[#e8d8b7]/30 rounded-lg p-8 text-center">
                        {formData.image ? (
                          <div className="flex items-center justify-center gap-2">
                            <ImageIcon className="h-6 w-6 text-[#e8d8b7]" />
                            <span className="text-[#e8d8b7]">{formData.image.name}</span>
                          </div>
                        ) : (
                          <>
                            <ImageIcon className="h-12 w-12 text-[#e8d8b7]/50 mx-auto mb-2" />
                            <p className="text-[#e8d8b7]/70 mb-4">Drag and drop an image or click to browse</p>
                          </>
                        )}
                        <input
                          type="file"
                          name="image"
                          accept="image/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="image-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("image-upload").click()}
                          className="border-[#e8d8b7]/50 text-[#e8d8b7] hover:bg-[#e8d8b7]/10"
                        >
                          Select Image
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="video" className="mt-0">
                    <div className="mb-6">
                      <label className="block text-[#e8d8b7] font-medium mb-2">Upload Video</label>
                      <div className="border-2 border-dashed border-[#e8d8b7]/30 rounded-lg p-8 text-center">
                        {formData.video ? (
                          <div className="flex items-center justify-center gap-2">
                            <FileVideo className="h-6 w-6 text-[#e8d8b7]" />
                            <span className="text-[#e8d8b7]">{formData.video.name}</span>
                          </div>
                        ) : (
                          <>
                            <FileVideo className="h-12 w-12 text-[#e8d8b7]/50 mx-auto mb-2" />
                            <p className="text-[#e8d8b7]/70 mb-4">Drag and drop a video file or click to browse</p>
                          </>
                        )}
                        <input
                          type="file"
                          name="video"
                          accept="video/*"
                          onChange={handleFileChange}
                          className="hidden"
                          id="video-upload"
                        />
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => document.getElementById("video-upload").click()}
                          className="border-[#e8d8b7]/50 text-[#e8d8b7] hover:bg-[#e8d8b7]/10"
                        >
                          Select Video
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>

                {isSubmitting && (
                  <div className="mb-6">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-[#e8d8b7]/70">Uploading...</span>
                      <span className="text-[#e8d8b7]/70">{uploadProgress}%</span>
                    </div>
                    <Progress
                      value={uploadProgress}
                      className="h-2 bg-[#e8d8b7]/20"
                      indicatorClassName="bg-[#e8d8b7]"
                    />
                  </div>
                )}

                <div className="flex justify-end">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-[#e8d8b7] text-[#0a3b2c] hover:bg-[#e8d8b7]/90"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Your Story"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </section>

        <section id="nyc-first" className="py-16 px-4 md:px-8 relative">
          <div className="absolute inset-0 bg-black/40 z-0"></div>
          <div className="relative z-10 max-w-7xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-[#e8d8b7]">NYC GOES FIRST</h2>
            <p className="text-xl md:text-2xl mb-8 text-[#e8d8b7]/90 max-w-2xl mx-auto">
              NYC GETS EARLY ACCESS. BE PART OF THE FIRST WAVE THAT BUILDS THIS LEGACY.
            </p>

            <div className="w-48 h-48 mx-auto mb-8 bg-[#e8d8b7] rounded-full flex items-center justify-center">
              <div className="w-40 h-40 bg-[#0a3b2c] rounded-full flex items-center justify-center">
                <Basketball className="h-24 w-24 text-[#e8d8b7]" />
              </div>
            </div>

            <Button className="bg-[#e8d8b7] text-[#0a3b2c] hover:bg-[#e8d8b7]/90 text-lg px-8 py-6 h-auto">
              Join NYC Early Access
            </Button>
          </div>
        </section>

        <section id="legacy" className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AAC679B9-A25C-48BF-84E6-B48249B6DD75-Eh4kraTyKZZznKpk7dsTdyaHWZCNNU.png"
                alt="Corey Williams teaching life"
                width={600}
                height={600}
                className="rounded-lg"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-[#e8d8b7]">
                Some taught the game... He taught life.
              </h2>
              <p className="text-[#e8d8b7]/80 mb-6">
                Corey "Homicide" Williams wasn't just a basketball legend. He was a mentor, a friend, and an inspiration
                to countless people around the world.
              </p>
              <p className="text-[#e8d8b7]/80 mb-6">
                Through the Corey Story App, we're preserving his legacy and the impact he had on basketball culture,
                especially in New York City where his journey began.
              </p>
              <p className="text-[#e8d8b7]/80 mb-6">
                Your stories, memories, and tributes will help build a living digital archive that celebrates his life
                and continues his mission of inspiring others.
              </p>
              <div className="flex gap-4">
                <Button variant="outline" className="border-[#e8d8b7]/50 text-[#e8d8b7] hover:bg-[#e8d8b7]/10">
                  Learn More About Corey
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section id="colon-cancer" className="py-16 px-4 md:px-8 bg-[#0a3b2c]/80 border-t border-[#e8d8b7]/20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-[#e8d8b7]">Raising Awareness for Colon Cancer</h2>
            <p className="text-[#e8d8b7]/80 mb-8">
              Part of Corey's legacy is raising awareness about colon cancer and the importance of early screening. The
              Corey Story App includes resources and information to help educate our community.
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="bg-[#0a3b2c] border border-[#e8d8b7]/30">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#e8d8b7]/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="h-6 w-6 text-[#e8d8b7]" />
                  </div>
                  <h3 className="font-bold mb-2 text-[#e8d8b7]">Early Detection</h3>
                  <p className="text-sm text-[#e8d8b7]/70">
                    Learn about the importance of regular screenings and early detection
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0a3b2c] border border-[#e8d8b7]/30">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#e8d8b7]/10 flex items-center justify-center mx-auto mb-4">
                    <MessageSquare className="h-6 w-6 text-[#e8d8b7]" />
                  </div>
                  <h3 className="font-bold mb-2 text-[#e8d8b7]">Education</h3>
                  <p className="text-sm text-[#e8d8b7]/70">
                    Access resources and information about colon cancer prevention
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-[#0a3b2c] border border-[#e8d8b7]/30">
                <CardContent className="p-6 text-center">
                  <div className="w-12 h-12 rounded-full bg-[#e8d8b7]/10 flex items-center justify-center mx-auto mb-4">
                    <Basketball className="h-6 w-6 text-[#e8d8b7]" />
                  </div>
                  <h3 className="font-bold mb-2 text-[#e8d8b7]">Support</h3>
                  <p className="text-sm text-[#e8d8b7]/70">
                    Connect with support groups and resources for those affected by colon cancer
                  </p>
                </CardContent>
              </Card>
            </div>
            <Button className="mt-8 bg-[#e8d8b7] text-[#0a3b2c] hover:bg-[#e8d8b7]/90">
              Learn More About Prevention
            </Button>
          </div>
        </section>
      </main>

      <footer className="bg-[#072a1f] border-t border-[#e8d8b7]/20 py-12 px-4 md:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Basketball className="h-6 w-6 text-[#e8d8b7]" />
                <h3 className="text-xl font-bold text-[#e8d8b7]">Corey Story</h3>
              </div>
              <p className="text-sm text-[#e8d8b7]/70 mb-4">
                Preserving the legacy of Corey "Homicide" Williams through community stories and digital tributes.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                  <span className="sr-only">Instagram</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
                  </svg>
                </a>
                <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                  <span className="sr-only">Twitter</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </a>
                <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                  <span className="sr-only">YouTube</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"></path>
                    <path d="m10 15 5-3-5-3z"></path>
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-[#e8d8b7] mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    About Corey
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    How It Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    NYC First Access
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    Health Awareness
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#e8d8b7] mb-4">Resources</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    Colon Cancer Awareness
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    NFT FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-[#e8d8b7] mb-4">Subscribe</h4>
              <p className="text-sm text-[#e8d8b7]/70 mb-4">
                Get updates on the Corey Story App launch and early access opportunities.
              </p>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Your email"
                  className="px-3 py-2 bg-[#0a3b2c] border border-[#e8d8b7]/30 rounded-md text-[#e8d8b7] placeholder:text-[#e8d8b7]/50 text-sm flex-1"
                />
                <Button size="sm" className="bg-[#e8d8b7] text-[#0a3b2c] hover:bg-[#e8d8b7]/90">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
          <Separator className="my-8 bg-[#e8d8b7]/20" />
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#e8d8b7]/50">
              &copy; {new Date().getFullYear()} Corey Story App. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                Privacy
              </a>
              <a href="#" className="text-xs text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                Terms
              </a>
              <a href="#" className="text-xs text-[#e8d8b7]/70 hover:text-[#e8d8b7]">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
