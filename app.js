// CORE MODULES //
var fs = require('fs');

// TWITTER MODULES // 
var Twitter = require("twitter");
var config = require("./config");
var twitterClient = new Twitter(config);


// TEXT MODULES
var accountSid = 'ACa7789b43bd662f94701a92bac7eb8bbc'; // Your Account SID from www.twilio.com/console
var authToken = 'c394377a09b559ed89d562631695d9a4';   // Your Auth Token from www.twilio.com/console
var twilio = require('twilio');
var client = new twilio(accountSid, authToken);

// SERVER MODULES //
const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path')

const app = express();

// DATA MODULES //
const stringify = require('csv-stringify')
var json2csv = require('json2csv')

//View engine setup
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Static folder
app.use('/public', express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());

app.get('/', (req,res) => { res.render('contact'); })
app.listen(3000, () => console.log('Server started...'))

// TWITTER API

var param =  {follow: '21111098,958191744683782144,18061669,21111098,18061669,2891210047,1869975300,19394188,4107251,16056306,259459455,21111098,18061669,2891210047,1869975300,19394188,4107251,16056306,259459455,968650362,343041182,5558312,111671288,476256944,378631423,803694179079458816,30354991,224285242,45645232,235217558,20879626,150078976,278124059,102477372,249787913,381577682,15324851,435500714,823302838524739584,20597460,555355209,15745368,229966028,3001665106,2863210809,1397501864,78403308,253252536,47747074,1262099252,1284467173,92186819,169198625,600463589,413160266,1096059529,1095504170,1058520120,328679423,247334603,308794407,216503958,234128524,59969802,10615232,118740781,1383059977,2856787757,75364211,586730005,18632666,18632809,1249982359,339822881,365530059,216881337,3229124078,55677432,816683274076614656,26594419,1068481578,1068540380,19726613,13529632,18137749,3067974778,109071031,278094476,21406834,1129029661,970207298,357606935,236511574,145292853,76456274,456137574,33537967,941000686275387392,555474658,264219447,11650762,16160352,57065141,753693622692970497,21269970,238177562,389554914,11651202,214767677,515822213,16473577,1071402577,323490669,1480852568,2962923040,2987970190,811313565760163844,3145735852,266133081,41363507,109287731,14125897,946549322,361569788,15808765,1603426344,18695134,407039290,1099199839,183062944,60828944,325231436,14140370,17494010,1872999342,72198806,709389393811927041,21157904,213339899,2964174789,22195441,1061029050,460376288,382791093,106733567,43910797,24768753,18915145,240790556,2612307559,7270292,20546536,225921757,27044466,250188760,292495654,122124607,29201047,223166587,171598736,94154021,221162525,26062385,486694111,242555999,770121222,14845376,432895323,3219708271,217543151,81191343,2955485182,978029858,296361085,26533227,76649729,21669223,283130017,73303753,13218102,1648117711,1074480192,23022687,262756641,18170310,88784440,242836537,946946130,172858784,7429102,409719505,293131808,158470209,117501995,35567751,193794406,158890005,234374703,113355380,1074518754,87510313,233737858,291756142,1848942470,202206694,499268312'} // this could be passed in as the second parameter.
var followIds = ['21111098','958191744683782144','18061669','21111098','18061669','2891210047','1869975300','19394188','4107251','16056306','259459455','21111098','18061669','2891210047','1869975300','19394188','4107251','16056306','259459455','968650362','343041182','5558312','111671288','476256944','378631423','803694179079458816','30354991','224285242','45645232','235217558','20879626','150078976','278124059','102477372','249787913','381577682','15324851','435500714','823302838524739584','20597460','555355209','15745368','229966028','3001665106','2863210809','1397501864','78403308','253252536','47747074','1262099252','1284467173','92186819','169198625','600463589','413160266','1096059529','1095504170','1058520120','328679423','247334603','308794407','216503958','234128524','59969802','10615232','118740781','1383059977','2856787757','75364211','586730005','18632666','18632809','1249982359','339822881','365530059','216881337','3229124078','55677432','816683274076614656','26594419','1068481578','1068540380','19726613','13529632','18137749','3067974778','109071031','278094476','21406834','1129029661','970207298','357606935','236511574','145292853','76456274','456137574','33537967','941000686275387392','555474658','264219447','11650762','16160352','57065141','753693622692970497','21269970','238177562','389554914','11651202','214767677','515822213','16473577','1071402577','323490669','1480852568','2962923040','2987970190','811313565760163844','3145735852','266133081','41363507','109287731','14125897','946549322','361569788','15808765','1603426344','18695134','407039290','1099199839','183062944','60828944','325231436','14140370','17494010','1872999342','72198806','709389393811927041','21157904','213339899','2964174789','22195441','1061029050','460376288','382791093','106733567','43910797','24768753','18915145','240790556','2612307559','7270292','20546536','225921757','27044466','250188760','292495654','122124607','29201047','223166587','171598736','94154021','221162525','26062385','486694111','242555999','770121222','14845376','432895323','3219708271','217543151','81191343','2955485182','978029858','296361085','26533227','76649729','21669223','283130017','73303753','13218102','1648117711','1074480192','23022687','262756641','18170310','88784440','242836537','946946130','172858784','7429102','409719505','293131808','158470209','117501995','35567751','193794406','158890005','234374703','113355380','1074518754','87510313','233737858','291756142','1848942470','202206694','499268312']
var whoWereTracking = ['SenShelby','harrycramer14','lisamurkowski','SenDanSullivan','DanSullivan2014','SenJohnMcCain','TeamMcCain','JeffFlake','FlakeforSenate','SenTomCotton','TomCottonAR','JohnBoozman','Boozman4AR','SenFeinstein','DianneFeinstein','SenKamalaHarris','KamalaHarris','SenBennetCO','BennetForCO','SenCoryGardner','CoryGardner','ChrisMurphyCT','SenBlumenthal','DickBlumenthal','SenatorCarper','TomCarperforDE','ChrisCoons','SenCoonsOffice','ChrisCoonsforDE','SenBillNelson','NelsonForSenate','marcorubio','SenRubioPress','TeamMarco','SenDavidPerdue','Perduesenate','SenatorIsakson','JohnnyIsakson','brianschatz','SenBrianSchatz','SchatzforHawaii','maziehirono','mazieforhawaii','MikeCrapo','crapo4senate','SenatorRisch','JimRisch','SenDuckworth','SenatorDurbin','DickDurbin','SenDonnelly','SenToddYoung','ToddYoungIN','ChuckGrassley','GrassleyWorks','joniernst','SenJoniErnst','SenPatRoberts','PatRoberts','JerryMoran','moranforkansas','SenateMajLdr','McConnellPress','Team_Mitch','RandPaul','Team_Rand','BillCassidy','SenJohnKennedy','JohnKennedyLA','SenAngusKing','AngusKing2018','SenatorCollins','collins4senator','ChrisVanHollen','VanHollenForMD','SenatorCardin','BenCardinforMD','senmarkey','EdMarkey','SenWarren','elizabethforma','SenGaryPeters','Peters4Michigan','SenStabenow','TeamStabenow','amyklobuchar','SenTinaSmith','SenThadCochran','SenatorWicker','RogerWicker','clairecmc','McCaskillOffice','McCaskill2018','RoyBlunt','RoyBluntPress','RoyBluntMO','SteveDaines','DainesforMT','SenatorTester','jontester','SenatorFischer','DebFischerNE','BenSasse','SenSasse','Sasse4Senate','SenCortezMasto','CatherineForNV','SenDeanHeller','DeanHeller','SenatorShaheen','JeanneShaheen','SenatorHassan','Maggie_Hassan','CoryBooker','Booker4Senate','SenatorMenendez','Menendez4NJ','MartinHeinrich','Heinrich4NM','SenatorTomUdall','TomUdallPress','tomudall','SenSchumer','chuckschumer','SenGillibrand','kgillibrand2016','SenatorBurr','Burrforsenate','SenThomTillis','ThomTillis','SenatorHeitkamp','HeidiHeitkamp','SenJohnHoeven','hoeven4senate','SenSherrodBrown','SherrodBrown','SenRobPortman','PortmanPress','robportman','jiminhofe','InhofePress','SenatorLankford','jameslankford','RonWyden','WydenPress','WydenForOregon','SenJeffMerkley','JeffMerkley','SenBobCasey','Bob_Casey','SenToomey','PatToomey','SenJackReed','SenWhitehouse','SheldonforRI','GrahamBlog','LindseyGrahamSC','sengraham2016','SenatorTimScott','votetimscott','SenatorRounds','RoundsforSenate','SenJohnThune','johnthune','SenAlexander','LamarAlexander','BobCorker','SenBobCorker','JohnCornyn','TeamCornyn','SenTedCruz','tedcruz','SenOrrinHatch','OrrinHatch','SenMikeLee','SenatorLeahy','SenatorSanders','timkaine','MarkWarner','MarkWarnerVA','PattyMurray','MurrayCampaign','SenatorCantwell','MariaCantwell','SenCapito','CapitoforWV','Sen_JoeManchin','JoeManchinWV','SenatorBaldwin','tammybaldwin','SenRonJohnson','SenatorEnzi','EnziforWyo','SenJohnBarrasso','barrassoforwyo']
const fields = ["name","text","URL","time"]
const newLine = "\r\n";
var update = [];

twitterClient.stream('statuses/filter',param,function(stream) {
  stream.on('data', function(tweet) {

  for(i = 0; i <followIds.length; i++){
    if(followIds[i] == tweet.user.id_str){ // if so, get contents

    console.log(tweet)
  	// WRITE TO CSV HERE:
    let name = tweet.user.name;
    let text = tweet.text;
    let URL = `https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`
    let time = tweet.created_at;

	update = [{name,text,URL,time}]

	var toCsv = { 
		data: update, 
		fields: fields, 
		hasCSVColumnTitle: false
	};
		
	var csv = json2csv(toCsv) + newLine;

	fs.appendFile('public/data/twitterData.csv',csv,function(err){
		if (err) throw err;
		console.log('File Saved')
	})
}
}
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});