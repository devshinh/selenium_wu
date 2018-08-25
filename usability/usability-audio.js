var webdriver = require('selenium-webdriver');
var By = require('selenium-webdriver').By;
var until = require('selenium-webdriver').until;

// Input capabilities
var capabilities = {
 'browserName' : 'Chrome',
 'browser_version' : '66.0',
 'os' : 'Windows',
 'os_version' : '10',
 'resolution' : '1366x768',
 'browserstack.user' : 'charmonylai1',
 'browserstack.key' : 'UFfuJqkwMxHsUDYzz8nM',
 'browserstack.debug' : 'true',
 'build': 'version 0.2',
 'project': 'WUBS - Usability (Media - Audio)'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

var countEls = 0;

driver.get('https://www.html5rocks.com/en/tutorials/audio/basics/').then(function(){

	driver.findElements(webdriver.By.css('audio')).then(function(audios){
		console.log('Found ', audios.length , ' Audio (s)');
		
		audios.forEach(function (audio) {
			console.log(" in the for each of Audio " );
			countEls = countEls + 1;
			audio.findElement(webdriver.By.css('track')).then(function(track){
				track.getAttribute('src').then(function(tracksrc){
					track.getAttribute('label').then(function(tracklabel){
						console.log('Source is ' + tracksrc + " and " + tracklabel);
				});
					});					
				
			}).catch((e) => {
				//console.log(' Some issue @ 2 ' + e.name + ' is ' + e.message);									
				if(e.name === 'NoSuchElementError') {
					console.log('No audio track found');						
				}
				driver.quit();	
			});
									
		});
			
		
	}).catch((e) => {	
		if(e.name === 'NoSuchElementError') {
			console.log('No button for Submit found');						
		}
		driver.quit();	
	});

});
	