import { useState } from "react";
import {Outlet} from "react-router-dom";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function WomenLayout() {
    return (
        <div className="women-layout">
            <section className="women-layout__description">
                <h2>Women Dresses</h2>
                <TextExpander clasName="women-layout__description_text_expander">
                    Welcome to THE dress-tination! Our women’s dresses edit is here to up your style game. Dive into the world of ASOS DESIGN for an incredible selection of black dresses in a range of cuts and fabrics – who can resist the power of the LBD? And the party doesn't truly start until you make an entrance in an ASOS EDITION dress. Turn heads in our range of mini, midi and maxi dresses in every colour, from minimalist white dresses to bold red dresses. And for those days when casual-cool is just the vibe, Topshop is our undisputed style hero. Think versatile casual dresses and tea dresses paired with your fave high-tops. It’s not a competition, but if it was, this dress edit would win...
                </TextExpander>
              
            </section>

            <Outlet/>

        
        </div>
    )
}

export function TextExpander({
    children,
    clasName="",
    collapsedNumwords = 15,
    expandButtonText = "v",
    collapseButtonText = "^",
    expanded}) {

    const [isExpanded,setIsExpanded] = useState(expanded)
    const displayText = isExpanded ? children : 
        children.split('').slice(0, collapsedNumwords).join(" ") + "..."
        
    return (
        <div className={clasName}>
            <p>{displayText}</p>
            <button onClick={()=>setIsExpanded(exp => !exp)}>
                {isExpanded ? collapseButtonText : expandButtonText}
            </button>
        </div>
    )
}