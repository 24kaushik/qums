import { LoginForm } from "@/components/login-form"

// Importing images
import ThinkingEmoji from "@/assets/thinking-emoji.png"
import CryingFaceEmoji from "@/assets/crying-face-emoji.png"
import BrokenHeartEmoji from "@/assets/broken-heart-emoji.png"
import WinkEmoji from "@/assets/wink-emoji.png"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex justify-center gap-2 font-bold font-josefins text-lg">
            <div className="flex h-6 w-6 items-center justify-center rounded-md  text-primary-foreground">
              <img src="/QGCico.ico" alt="QUMS Logo" />
            </div>
            QUMS*
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="relative px-20 hidden text-just bg-muted lg:flex flex-col justify-center">
        <div className="font-noto text-5xl font-bold mb-6 flex items-center">Trust issues?&nbsp;<img className="h-12" src={ThinkingEmoji} alt="Thinking Emoji" /></div>
        <div className=" text-gray-600 font-noto font-semibold">
          Must be that last relationship, huh? <img className="inline-block h-6 align-middle relative bottom-px" src={CryingFaceEmoji} alt="Crying Face Emoji" />
          <br />
          Don’t worry, this ERP is 100% secure—unlike your dating history. <img className="inline-block h-6 align-middle relative bottom-px" src={BrokenHeartEmoji} alt="Broken Heart Emoji" />
          <br /> <br />
          No betrayal, no ghosting, just proxying your data directly to the official college server. The code’s open-source on <a href="https://github.com/24kaushik/qums" className="text-blue-600 underline">Github</a>, so you can read it line by line, just like those old texts you still obsess over. But hey, maybe this time something will actually work out for you. Log in and see. <img className="inline-block h-6 align-middle relative bottom-px" src={WinkEmoji} alt="Wink Emoji" />
        </div>
      </div>
    </div>
  )
}
