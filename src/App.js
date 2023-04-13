import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [diceval, setdiceval] = React.useState(dicevalues());
  const [wongame, checkgamewin] = React.useState(false);

  React.useEffect(() => {
    const allFrozen = diceval.every((die) => die.isFrozen);
    const firstdicevalue = diceval[0].value;
    const alldicevalue = diceval.every((die) => die.value === firstdicevalue);
    if (allFrozen && alldicevalue) {
      checkgamewin(true);
      console.log("You win!");
    }
  }, [diceval]);

  function dicevalues() {
    const dicearr = [];
    for (let i = 0; i < 10; i++) {
      dicearr.push({
        value: Math.ceil(Math.random() * 6),
        isFrozen: false,
        id: nanoid(),
      });
    }
    // console.log(dicearr);

    return dicearr;
  }

  function handleRoll() {
    if (!wongame) {
      //const newdiceval = dicevalues();
      // setdiceval(newdiceval);
      setdiceval((olddice) =>
        olddice.map((die) => {
          return die.isFrozen
            ? die
            : {
                value: Math.ceil(Math.random() * 6),
                isFrozen: false,
                id: nanoid(),
              };
        })
      );
    } else {
      // checkgamewin(false);
      window.location.reload();
    }
  }

  function freezeDice(id) {
    // console.log(id);
    setdiceval((olddice) =>
      olddice.map((die) => {
        return die.id === id ? { ...die, isFrozen: !die.isFrozen } : die;
      })
    );
  }

  const diceelements = diceval.map((die) => (
    <Die
      value={die.value}
      key={die.id}
      isFrozen={die.isFrozen}
      freezeDice={() => freezeDice(die.id)}
    />
  ));

  return (
    <div className="black--container">
      <main>
        {wongame && <Confetti />}
        <h1>Dice Game</h1>
        <h3>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls
        </h3>
        <h3 className="wongame">{wongame ? "You Win!" : ""}</h3>
        <div className="die">
          {/* <Die value="2" />
          <Die value="1" />
          <Die value="3" />
          <Die value="6" />
          <Die value="5" />
          <Die value="4" />
          <Die value="1" />
          <Die value="1" />
          <Die value="2" />
          <Die value="6" /> */}
          {diceelements}
        </div>
        <button className="roll--button" onClick={handleRoll}>
          {wongame ? "New Game" : "Roll Again"}
        </button>
      </main>
    </div>
  );
}
