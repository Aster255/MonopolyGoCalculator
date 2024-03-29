import React, { useState, useEffect } from "react";
export const LowRoller = () => {
  const [multipliers, setMultipliers] = useState({
    x1: [99, 99, 99],
    x2: [99, 99, 99],
    x3: [99, 99, 99],
    x5: [99, 99, 99],
    x100: [99, 99, 99, 99],
  });

  const [x100, setX100] = useState([9, 9, 9, 9]);
  const [targets, setTargets] = useState([10, 20, 30, 40]);
  const [results, setResults] = useState([]);
  const [offset, setOffset] = useState(0);

  const handleMultiplierChange = (multiplier, index, value) => {
    const updatedMultipliers = { ...multipliers };
    updatedMultipliers[multiplier][index] = parseInt(value, 10) || 0;
    setMultipliers(updatedMultipliers);
  };

  const handleTargetsChange = (e) => {
    const newTargets = e.target.value
      .split(",")
      .map((target) => parseInt(target.trim(), 10) || 0);
    setTargets(newTargets);
  };

  const setTargetChange = (a = []) => {
    setTargets([...a]);
  };

  const runMainFunction = () => {
    const firstmove = {
      x1: multipliers.x1[0],
      x2: multipliers.x2[0],
      x3: multipliers.x3[0],
      x5: multipliers.x5[0],
      x100: multipliers.x100[0],
    };
    const secondmove = {
      x1: multipliers.x1[1],
      x2: multipliers.x2[1],
      x3: multipliers.x3[1],
      x5: multipliers.x5[1],
      x100: multipliers.x100[1],
    };
    const thirdmove = {
      x1: multipliers.x1[2],
      x2: multipliers.x2[2],
      x3: multipliers.x3[2],
      x5: multipliers.x5[2],
      x100: multipliers.x100[2],
    };

    const newResults = [];

    for (let target of targets) {
      for (let a in firstmove) {
        if (firstmove[a] + multipliers.x100[1] === target) {
          newResults.push(
            `${target} can be done on the second move with ${a}-x100`
          );
        }
        for (let b in secondmove) {
          if (
            firstmove[a] + secondmove[b] + multipliers["x100"][2] ===
            target
          ) {
            newResults.push(
              `${target} can be done on the third move with ${a}-${b}-x100`
            );
          }
          for (let c in thirdmove) {
            if (
              firstmove[a] +
                secondmove[b] +
                thirdmove[c] +
                multipliers["x100"][3] ===
              target
            ) {
              newResults.push(
                `${target} can be done on the fourth move with ${a}-${b}-${c}-x100`
              );
            }
          }
        }
      }
    }

    setResults(newResults);
  };

  const useOffset = () => {
    setTargetChange(
      targets
        .map((e) => e - offset)
        .map((e) => (e <= 0 ? 40 + e : e))
        .sort((a, b) => a - b)
    );
    setOffset(0);
  };

  const usePopandOffset = () => {
    const obj = [...targets]
      .map((e) => e - offset)
      .map((e) => (e <= 0 ? 40 + e : e))
      .sort((a, b) => a - b);
    obj.pop();
    setTargetChange(obj);
  };

  useEffect(() => {
    runMainFunction();
  }, [multipliers, x100, targets]);

  return (
    <>
      <h2>Low Roller</h2>
      <div className="grid grid-cols-2">
        <div>
          <div>
            <h2>x100</h2>
            <div className="grid grid-cols-4">
              <th>Move 1</th>
              <th>Move 2</th>
              <th>Move 3</th>
              <th>Move 4</th>

              {multipliers["x100"].map((value, index) => (
                <input
                  key={index}
                  type="number"
                  value={value}
                  onChange={(e) =>
                    handleMultiplierChange("x100", index, e.target.value)
                  }
                />
              ))}
            </div>
          </div>
          <div>
            <th>SMALL MULTIPLIERS</th>
          </div>
          <div className="grid grid-cols-4">
            <div>x1</div>
            {multipliers["x1"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x1", index, e.target.value)
                }
              />
            ))}
            <div>x2</div>
            {multipliers["x2"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x2", index, e.target.value)
                }
              />
            ))}
            <div>x3</div>
            {multipliers["x3"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x3", index, e.target.value)
                }
              />
            ))}

            <div>x5</div>
            {multipliers["x5"].map((value, index) => (
              <input
                key={index}
                type="number"
                value={value}
                onChange={(e) =>
                  handleMultiplierChange("x5", index, e.target.value)
                }
              />
            ))}
          </div>
          <div>
            <h2>Targets</h2>
            <input
              type="text"
              value={targets.join(", ")}
              onChange={handleTargetsChange}
            />
          </div>
          <div>
            <div>
              <button onClick={() => setTargetChange([16, 26, 32, 40])}>
                Electric Company
              </button>
            </div>
            <div>
              <button onClick={() => setTargetChange([10, 16, 24, 40])}>
                Water Works
              </button>
            </div>
            <div>
              <button onClick={() => setTargetChange([6, 14, 30, 40])}>
                Luxury Tax
              </button>
            </div>
            <div>
              <button onClick={() => setTargetChange([8, 24, 34, 40])}>
                Income Tax
              </button>
            </div>
          </div>

          <div>
            <input
              type="number"
              value={offset}
              onChange={(e) => setOffset(e.target.value)}
            />
            <button onClick={useOffset}>USE OFFSET</button>
            <br />
            <button onClick={usePopandOffset}>USE POP</button>
          </div>
        </div>

        <div>
          <h2>Results</h2>
          <ul>
            {results.map((result, index) => (
              <li key={index}>{result}</li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
