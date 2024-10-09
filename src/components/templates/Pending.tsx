import { motion } from 'framer-motion';
import { ImSpinner } from 'react-icons/im';

interface Props {
    pending?: boolean;
}

const Pending = ({ pending }: Props) => {
    return (
        <div
            className={`fixed top-0 left-0 w-screen h-screen bg-[#0008] flex items-center justify-center text-black  ${
                pending ? 'z-[9999] opacity-100' : 'z-[-100] opacity-0'
            } `}
        >
            <motion.div>
                <ImSpinner fontSize={80} className=' animate-spin text-[#673Ab7] block' />
            </motion.div>
        </div>
    );
};

export default Pending;
