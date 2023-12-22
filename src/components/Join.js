import { SocialIcons } from "./FormSignIn";
import './signin.scss'
import './join.scss'
import { SignUp } from "./SignUp";

export function Join() {
    return (
        <div>
            <h4>Sign Up with ...</h4>
            <SocialIcons/>

            <p><small>
                Signing up with social is super quick. No extra passwords to remember - no brain fail. Don't worry, we'd never share any of your data or post anything on your behalf #NotEvil.</small>
            </p>

            <p>or Sign Up With EMail</p>

            <SignUp/>

        </div>
    )
}