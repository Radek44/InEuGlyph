function loadSymbols() {
  const alphabetContainer = document.getElementById("alphabet-container");

  fetch('json/symbols_data.json')
    .then(response => response.json())
    .then(symbolsData => {
      Object.keys(symbolsData).forEach(key => {
        const symbol = symbolsData[key];
        const symbolContainer = document.createElement("div");
        symbolContainer.className = "symbol-container";

        // Load the SVG from the file
        fetch(`svg/${key}.svg`)
          .then(response => response.text())
          .then(svgData => {
            const svgContainer = document.createElement("div");
            svgContainer.className = "svg-container";
            svgContainer.innerHTML = svgData.trim();
            symbolContainer.appendChild(svgContainer);

            const symbolInfo = document.createElement("div");
            symbolInfo.className = "symbol-info";

            symbolInfo.innerHTML = `<strong>${symbol.name}</strong> - ${symbol.description}<br>IPA: ${symbol.IPA}<br>Writing: ${symbol.writing}<br>`;

            // Add this code to create a table for examples
            const examplesTable = document.createElement("table");
            const headerRow = document.createElement("tr");

            const languageHeader = document.createElement("th");
            languageHeader.innerText = "Language";
            headerRow.appendChild(languageHeader);

            const soundHeader = document.createElement("th");
            soundHeader.innerText = "Sound";
            headerRow.appendChild(soundHeader);

            const wordHeader = document.createElement("th");
            wordHeader.innerText = "Word";
            headerRow.appendChild(wordHeader);

            examplesTable.appendChild(headerRow);

            Object.keys(symbol.examples).forEach(language => {
              const exampleRow = document.createElement("tr");

              const languageCell = document.createElement("td");
              languageCell.innerText = language;
              exampleRow.appendChild(languageCell);

              const soundCell = document.createElement("td");
              soundCell.innerText = symbol.examples[language].split(" ")[0];
              exampleRow.appendChild(soundCell);

              const wordCell = document.createElement("td");
              wordCell.innerText = symbol.examples[language].split(" ")[2];
              exampleRow.appendChild(wordCell);

              examplesTable.appendChild(exampleRow);
            });

            symbolInfo.appendChild(examplesTable);

            symbolContainer.appendChild(symbolInfo);
            alphabetContainer.appendChild(symbolContainer);
          });
      });
    });
}

loadSymbols();
