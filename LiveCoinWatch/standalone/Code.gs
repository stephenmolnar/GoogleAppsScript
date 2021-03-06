//https://www.livecoinwatch.com/tools/api Code.gs simple implementation to add row with coin info
//Please input API key @ line 197, then input coin or token code @ line 191 and your country's fiat @ line 194
//The setFiatSymbols() function is optional, you can remove and hardcode your own fiat symbol at line 237

function setFiatSymbols() {
var scriptProperties = PropertiesService.getScriptProperties();
scriptProperties.setProperties({
AED : ' د.إ',
AFN : '؋',
ALL : 'Lek',
AMD : '֏',
ANG : 'ƒ',
AOA : 'Kz ',
ARS : '$',
AUD : '$',
AWG : 'ƒ',
AZN : '₼',
BAM : ' .د.ب ',
BBD : '$',
BDT : '৳',
BGN : 'лв',
BHD : '.د.ب',
BIF : 'FBu',
BMD : '$',
BND : '$',
BOB : '$b',
BRL : 'R$',
BSD : '$',
BTN : 'Nu.',
BWP : 'P',
BYN : 'Br',
BYR : 'p',
BZD : 'BZ$',
CAD : '$',
CDF : 'FC',
CHF : 'Fr',
CLF : 'UF',
CLP : '$',
CNY : '¥',
COP : '$',
CRC : '₡',
CUC : 'CUC$',
CUP : '₱',
CVE : '$',
CZK : 'Kč',
DJF : 'فرنك‎',
DKK : 'kr',
DOP : 'RD$',
DZD : 'دج',
EGP : '£',
ERN : 'ናቕፋ',
ETB : 'ብር',
EUR : '€',
FJD : '$',
FKP : '£',
GBP : '£',
GEL : '₾',
GGP : '£',
GHS : '¢',
GIP : '£',
GMD : 'D',
GNF : 'FG',
GTQ : 'Q',
GYD : '$',
HKD : '$',
HNL : 'L',
HRK : 'kn',
HTG : 'G',
HUF : 'Ft',
IDR : 'Rp',
ILS : '₪',
IMP : '£',
INR : '₹',
IQD : 'ع.د',
IRR : '﷼',
ISK : 'kr',
JEP : '£',
JMD : 'J$',
JOD : 'د.ا',
JPY : '¥',
KES : 'KSh',
KGS : 'лв',
KHR : '៛',
KMF : 'CF',
KPW : '₩',
KRW : '₩',
KWD : 'د.ك',
KZT : 'лв',
LAK : '₭',
LBP : '£',
LKR : '₨',
LRD : '$', 
LSL : 'M',
LTL : 'Lt',
LVL : 'Ls',
LYD : 'ل.د',
MAD : 'DH',
MDL : 'L',
MGA : 'Ar',
MKD : 'ден',
MMK : 'K',
MNT : '₮',
MOP : 'MOP$',
MRO : 'أوقية‎',
MUR : '₨',
MVR : '.ރ',
MWK : 'MK',
MXN : '$',
MYR : 'RM',
MZN : 'MT',
NAD : '$',
NGN : '₦',
NIO : 'C$',
NOK : 'kr',
NPR : '₨',
NZD : '$',
OMR : '﷼',
PAB : 'B/.',
PEN : 'S/.',
PGK : 'K',
PHP : '₱',
PKR : '₨',
PLN : 'zł',
PYG : 'Gs',
QAR : '﷼',
RON : 'lei',
RSD : 'Дин.',
RUB : '₽',
RWF : 'FRw',
SAR : '﷼',
SBD : '$',
SCR : '₨',
SDG : 'ج.س.',
SEK : 'kr',
SGD : '$',
SHP : '£',
SLL : 'Le',
SOS : 'S',
SRD : '$',
STD : 'Db',
SVC : '$',
SYP : '£',
SZL : 'E',
THB : '฿',
TJS : 'ЅM',
TMT : 'T',
TND : 'د.ت',
TOP : 'T$',
TRY : '₺',
TTD : 'TT$',
TWD : 'NT$',
TZS : 'TSh',
UAH : '₴',
UGX : 'USh',
USD : '$',
UYU : '$U',
UZS : 'лв',
VEF : 'Bs.S ',
VND : '₫',
VUV : 'VT',
WST : 'WS$',
XAF : 'FCFA',
XAG : 'ozt',
XAU : 'AU$‎',
XCD : '$',
XDR : 'ozt',
XOF : 'CFA',
XPF : 'F',
YER : '﷼',
ZAR : 'R',
ZMK : 'ZK',
ZMW : 'ZK',
ZWL : 'Z$'
});
}

function onInstall(e) {
  onOpen(e);
}

function onOpen(e) {
  setFiatSymbols();
  SpreadsheetApp.getUi() 
  .createMenu('Live Coin Watch') //creates custom menu onOpen
  .addItem('Get Coin Info ', 'addCoinRow') //can name this whatever you want
  .addToUi();
}

function addCoinRow() {

  var code = "cAkE"; //enter your coin or token's code
  code = code.toUpperCase();

  var fiat = "uSd"; //enter your country's currency code
  fiat = fiat.toUpperCase();

  var key = "MYAPIKEY"; //enter API key here

//build http request
  var data = {
    "currency" : fiat,
    "code" : code,
    "meta" : true
  }

  var payload = JSON.stringify(data);
  var headers = {
    'Content-type': 'application/json; charset=UTF-8',
    'x-api-key' : key 
  };

  var url = 'https://api.livecoinwatch.com/coins/single';
  var options = {
      'method': 'post',
      'headers': headers,
      'payload': payload
  };

  //request to API stored as response
  var response = UrlFetchApp.fetch(url, options);
  //success

  //convert response to JSON object
  var json = response.getContentText();
  var coinjson = JSON.parse(json);

  //store name and rate from coinjson object
  name = coinjson.name;
  rate = coinjson.rate;

  var timestamp = new Date().toLocaleString().replace(',','');

  PropertiesService.getScriptProperties()
  .setProperty("timestamp", timestamp);

  var scriptProperties = PropertiesService.getScriptProperties();
  var sheet = SpreadsheetApp.getActiveSheet();
  var coinJson = JSON.parse(scriptProperties.getProperty('thisCoin'));
  sheet.appendRow([timestamp, name, code, ScriptProperties.getProperty(fiat) + coinjson.rate]);
}
