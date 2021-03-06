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
 'project': 'WUBS - Usability (Links)'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

var countEls = 0;

driver.get('https://business.westernunion.com/').then(function(){

	driver.findElements(webdriver.By.css('body a')).then(function(links){
		console.log('Found ', links.length , ' link(s)');
		
		links.forEach(function (alink) {
			console.log(" in the for each of Links " );
			countEls = countEls + 1;
			alink.getAttribute('title').then(function(linkTitle){
				if(linkTitle.length){
					console.log(" Title for link is " + linkTitle);
				} else {
					console.log(" Title is empty ");
				}				
				if(countEls >= links.length){
					console.log(" Quit Happens at  " + countEls);
					driver.quit();
				}	
			}).catch((e) => {			
				console.log(' Link does not have Title attribute so: ' + e.message);				
				if(countEls >= links.length){
					console.log(" Quit Happens at  " + countEls);				
				}
				driver.quit();
				
			});
						
		});
			
		
	}).catch((e) => {
		console.log(' Some issue @ 2 ' + e.name + ' is ' + e.message);									
		if(e.name === 'NoSuchElementError') {
			console.log('No button for Submit found');						
		}
		driver.quit();	
	});


});
	