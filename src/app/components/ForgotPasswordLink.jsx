import Link from "next/link";


const ForgotPasswordLink = () => {

     return (
          <>
               <div className="text-center mt-6">
                    <Link
                         href="/user/reset"
                         className="text-blue-600 hover:text-blue-700 text-sm font-medium transition-colors duration-200"
                    >
                         Forgotten Password?
                    </Link>
               </div>
          </>
     );
}

export default ForgotPasswordLink;

