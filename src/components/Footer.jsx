import { LucideFacebook, LucideGithub, LucideInstagram, LucideTwitter } from "lucide-react";
import logo from '../assets/logo.png';

function Footer ({className}) {
  return (
    <footer>
        <div className={'grid grid-cols-3 p-24 bg-white '+ className}>
            <div className=' text-lg'>
                <div className='flex gap-2 my-auto'>
                    <img src={logo} alt="logo" className='w-[20px] h-[40px]' />
                    <p className=' font-semibold text-3xl'>LiftCo</p>
                </div>
                <p className=' text-lg'>The Influencer kit, Trusted since 2018</p>
                <div className=' flex gap-4 mt-20'>
                    <div className=' p-2 border-[#D4D4D8] border-2 rounded-full w-fit text-black hover:text-white hover:border-transparent hover:bg-[#ff847c]'>
                        <LucideTwitter className='' />
                    </div>
                    <div className=' p-2 border-[#D4D4D8] border-2 rounded-full w-fit text-black hover:text-white hover:border-transparent hover:bg-[#ff847c]'>
                        <LucideFacebook className='' />
                    </div>
                    <div className=' p-2 border-[#D4D4D8] border-2 rounded-full w-fit  hover:text-white hover:border-transparent hover:bg-[#ff847c]'>
                        <LucideInstagram className='' />
                    </div>
                    <div className=' p-2 border-[#D4D4D8] border-2 rounded-full w-fit text-black hover:text-white hover:border-transparent hover:bg-[#ff847c]'>
                        <LucideGithub className='' />
                    </div>
                </div>
            </div>
            <div className=' grid grid-cols-2'>
                <div className=' flex flex-col gap-3'>
                    <p className='text-[#ff847c] text-xl font-semibold'>Link</p>
                    <p>About Us</p>
                    <p>Career</p>
                    <p>Contact</p>
                    <p>Blog</p>
                </div>
                <div className=' flex flex-col gap-3'>
                    <p className='text-[#ff847c] text-xl font-semibold'>Community</p>
                    <p>Help Center</p>
                    <p>Be Pro</p>
                </div>
            </div>
            <div className=' text-sm mt-auto text-[#71717A] ml-auto text-left'>
                © 2024 All Rights Reserved by LIFTCO SOLUTIONS LTD
            </div>
        </div>
    </footer>
  )
}

export default Footer;