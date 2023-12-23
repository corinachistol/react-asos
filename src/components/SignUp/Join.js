import { SocialIcons } from "../SignIn/FormSignIn";
import '../SignIn/signin.scss'
import { FormSignUp } from "./FormSignUp";

export function Join() {
    return (
        <div className="signup">
            <h3>Sign Up with Email</h3>
            <SocialIcons/>

            <p><small>
                Signing up with social is super quick. No extra passwords to remember - no brain fail. Don't worry, we'd never share any of your data or post anything on your behalf #NotEvil.</small>
            </p>

            <h3>or Sign Up With Email</h3>
            <FormSignUp/>


        </div>
    )
}