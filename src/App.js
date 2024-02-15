import React, { useState } from "react";

const App = () => {
  const [multipliers, setMultipliers] = useState({
    x1: [10, 8, 12],
    x2: [9, 8, 4],
    x3: [9, 8, 6],
    x5: [7, 3, 5],
  });

  const [x100, setX100] = useState([6, 6, 9]);
  const [targets, setTargets] = useState([10, 17, 20, 30, 31]);
  const [results, setResults] = useState([]);

  const handleMultiplierChange = (multiplier, index, value) => {
    const updatedMultipliers = { ...multipliers };
    updatedMultipliers[multiplier][index] = parseInt(value, 10) || 0;
    setMultipliers(updatedMultipliers);
  };

  const handleX100Change = (index, value) => {
    const updatedX100 = [...x100];
    updatedX100[index] = parseInt(value, 10) || 0;
    setX100(updatedX100);
  };

  const handleTargetsChange = (e) => {
    const newTargets = e.target.value
      .split(",")
      .map((target) => parseInt(target.trim(), 10) || 0);
    setTargets(newTargets);
  };

  const runMainFunction = () => {
    const firstmove = {
      x1: multipliers.x1[0],
      x2: multipliers.x2[0],
      x3: multipliers.x3[0],
      x5: multipliers.x5[0],
    };
    const secondmove = {
      x1: multipliers.x1[1],
      x2: multipliers.x2[1],
      x3: multipliers.x3[1],
      x5: multipliers.x5[1],
    };
    const thirdmove = {
      x1: multipliers.x1[2],
      x3: multipliers.x3[2],
      x5: multipliers.x5[2],
    };

    const newResults = [];

    for (let target of targets) {
      for (let a in firstmove) {
        if (firstmove[a] + x100[0] === target) {
          newResults.push(`${target} can be done on the second move with ${a}`);
        }
        for (let b in secondmove) {
          if (firstmove[a] + secondmove[b] + x100[1] === target) {
            newResults.push(
              `${target} can be done on the third move with ${a}-${b}`
            );
          }
          for (let c in thirdmove) {
            if (
              firstmove[a] + secondmove[b] + thirdmove[c] + x100[2] ===
              target
            ) {
              newResults.push(
                `${target} can be done on the fourth move with ${a}-${b}-${c}`
              );
            }
          }
        }
      }
    }

    setResults(newResults);
  };

  return (
    <div>
      <h1>Code Snippet App</h1>
      <div>
        <h2>x100</h2>
        <table>
          <thead>
            <tr>
              <th>Value 1</th>
              <th>Value 2</th>
              <th>Value 3</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {x100.map((value, index) => (
                <td key={index}>
                  <input
                    type="number"
                    value={value}
                    onChange={(e) => handleX100Change(index, e.target.value)}
                  />
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2>Multipliers</h2>
        <table>
          <thead>
            <tr>
              <th>Multiplier</th>
              <th>Values</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(multipliers).map((multiplier) => (
              <tr key={multiplier}>
                <td>{multiplier}</td>
                <td>
                  <table>
                    <thead>
                      <tr>
                        <th>Move 1</th>
                        <th>Move 2</th>
                        <th>Move 3</th>
                      </tr>
                    </thead>
                    <tbody>
                      {multipliers[multiplier].map((value, index) => (
                        <tr key={index}>
                          <td>
                            <input
                              type="number"
                              value={value}
                              onChange={(e) =>
                                handleMultiplierChange(
                                  multiplier,
                                  index,
                                  e.target.value
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div>
        <h2>Targets</h2>
        <input
          type="text"
          value={targets.join(", ")}
          onChange={handleTargetsChange}
        />
      </div>
      <button onClick={runMainFunction}>Run Main Function</button>
      <div>
        <h2>Results</h2>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
