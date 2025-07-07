import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="w-full border-t bg-background mt-16">
      <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex-1 flex flex-col gap-2">
          <span className="text-sm text-muted-foreground">© 2025 Imagify AI. All rights reserved.</span>
        </div>
        <div className="flex-1 flex justify-center gap-5 text-xl text-muted-foreground">
          <a href="#" aria-label="Facebook" className="hover:text-primary"><FaFacebookF /></a>
          <a href="#" aria-label="Twitter" className="hover:text-primary"><FaTwitter /></a>
          <a href="#" aria-label="Instagram" className="hover:text-primary"><FaInstagram /></a>
          <a href="#" aria-label="LinkedIn" className="hover:text-primary"><FaLinkedinIn /></a>
          <a href="https://github.com/DavisNoah02" aria-label="GitHub" className="hover:text-primary"><FaGithub /></a>
        </div>
        <div className="flex-1 flex flex-col md:items-end gap-2">
          <span className="text-sm text-muted-foreground">
            Built with <span className="text-red-500">♥</span> by <a href="https://noa-dave.vercel.app/" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">noa.dave</a>
          </span>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-t pt-4">
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#" className="hover:underline">Privacy Policy</a>
          <a href="#" className="hover:underline">Terms of Service</a>
          <a href="#" className="hover:underline">Support</a>
          <a href="#" className="hover:underline">About</a>
        </div>
        <div className="text-sm text-muted-foreground md:text-right">
          Powered by OpenAI DALL·E
        </div>
      </div>
    </footer>
  )
} 