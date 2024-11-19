import { Link } from "react-router-dom";
import logo from '../assets/logo.png';

function Navbar (){
    return(
        <div className="flex h-[10vh] border-b-black border-b-[1px] px-20 justify-between">
            <div className='flex gap-2 my-auto'>
                <img src={logo} alt="logo" className='w-[20px] h-[40px]' />
                <p className=' font-semibold text-3xl'>LiftCo</p>
            </div>
            <div className='Rethink flex gap-7 font-normal text-lg my-auto'>
                <p className='my-auto'>About</p>
                <p className='my-auto'>Plans</p>
                <p className='my-auto'>Learn More ?</p>
                <Link to='/login' className=' hover:no-underline'>
                    <button className='bg-[#ff847c] text-white px-4 py-[4px] rounded-full font-bold'>Sign in</button>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;