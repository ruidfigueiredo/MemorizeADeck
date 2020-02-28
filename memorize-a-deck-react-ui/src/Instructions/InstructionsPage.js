import React from 'react';
import './InstructionsPage.scss'
import { useHistory } from 'react-router-dom';

export function InstructionsPage() {
    const history = useHistory();
    return <div className="instructions-page">
        <h1>Instructions</h1>
        <div className="instructions">
            <p>This game will teach you how to memorize a full deck of cards. The goal is to do it in the least amount of time.</p>
            <p>If you just randomly try to memorize a set of cards, chances are that you won't be able to remember more than ten.</p>
            <p>There are memory techniques that make this task much easier, one of the most popular involves the use of <em>peg words</em>. If each card has a word associated with it (the peg word), when you want to remember a sequence of cards, instead of the cards themselves you can remember the words. Because these words have meaning to you it is easy to create links in your memory between them, and that makes remembering the sequence immensely easier than just remembering the cards.</p>
            <p>Let's look at an example:</p>
            <div className="card-and-name-list">
                <CardAndShortName cardPath="Clubs/2C" shortName="2C" />
                <CardAndShortName cardPath="Hearts/AH" shortName="HA" />
                <CardAndShortName cardPath="Clubs/10C" shortName="C10" />
                <CardAndShortName cardPath="Clubs/6C" shortName="C6" />
            </div>
            <p>                    If C2 &#x2194; <em>Can</em>, HA &#x2194; <em>Hat</em>, C10 &#2193; <em>Case</em> and C6 &#2193; <em>Cash</em> you could imagine the following story in your mind:
            </p>
            <p>
                "You find a can (C2), with a hat inside (HA). You look into that had and find a small case inside (C10). You open it and it's full of cash (C6)".
            </p>
            <p>
                This is easier to remember, and it also opens other possibilities in terms of recall that are almost impossible to achieve if you just try to memorize the cards.
            </p>
            <p>
                For example, if I ask you what was inside the hat?
            </p>
            <p>
                A case.
            </p>
            <p>
                You've just answered what card was after the 10 of Clubs without breaking a sweat.
            </p>
            <p>
                Where was the hat?
            </p>
            <p>
                Inside a can.
            </p>
            <p>
                You just answered which card was before the 10 of Clubs.
            </p>
            <p>
                The difficulty of this technique is to remember what word is related to which card. In order to help you train I've added the option to show the word next to the card while you are memorizing it. And there is also an option to bring up the full list of card-word associations (you can bring up the full card-word associations from this screen if you wish, try it, just right-click or swipe from the bottom).
            </p>
            <p>
                From the start screen you can also select an option to edit which word is associated with each card, so if the words that come as default don't mean anything to you, don't hesitate to change them. For example, some people prefer to associate people they know to each card.
            </p>
        </div>
        <div className="bottom-button" onClick={() => history.push('/')}>Main Menu</div>
    </div>
}

function CardAndShortName({ cardPath, shortName }) {
    return <div>
        <div><img src={`/PlayingCards/${cardPath}.png`} alt={cardPath} width="70px" /></div>
        <div>{shortName}</div>
    </div>
}
