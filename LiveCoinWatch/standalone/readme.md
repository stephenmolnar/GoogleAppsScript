How to implement Code.gs in Google Sheets with <a href="https://www.livecoinwatch.com/tools/api">Live Coin Watch API</a>


1. Open a <a href="https://docs.google.com/spreadsheets/u/0/create?usp=sheets_home&ths=true">new</a> or existing spreadsheet project
2. From the main menu navigate to Tools > Script Editor
3. Paste the provided file in Code.gs
4. Input your Live Coin Watch API key @ line 197, coin or token code @ line 191 and your country's fiat @ line 194
5. Save and Run Code.gs using the top menu in Apps Script editor
6. Navigate back to your spreadsheet and refresh the page
7. A new menu item "Live Coin Watch" should appear. Click the submenu item "Get Coin Info" to execute addCoinRow function and add coin data row with timestamp to the current sheet
