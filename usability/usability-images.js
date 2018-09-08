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
 'project': 'WUBS - Usability (Images)'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

var imgAlt = "";
var imgSrc = "";
var countEls = 0;
driver.get('https://business.westernunion.com/').then(function(){

	//driver.findElements(webdriver.By.xpath('/html/body/div[8][img]')).then(function(imgs){  .jumbotron2.carousel-container
	driver.findElements(webdriver.By.css('body img')).then(function(imgs){
		//console.log('Found ', imgs.length , ' image(s)');
		
		imgs.forEach(function (img) {
			countEls = countEls + 1;
			
			//console.log(" On Top count is " + countEls);
			img.getAttribute('alt').then(function(imgalt){
				if(imgalt.length){
					console.log(" + text for Img is " + imgalt);
				} else {
					console.log(" - alttext is empty ");					
				}				
				if(countEls >= imgs.length){
					//console.log(" Quit Happens at  " + countEls);
					driver.quit();
				}	
			}).catch((e) => {			
				console.log(' Image does not have ALT attribute so: ' + e.message);	
				
				if(countEls >= imgs.length){
					console.log(" Quit due to error  " + countEls);				
				}	
				driver.quit();				
				
			});			
						
		});
			
		
	}).catch((e) => {
		console.log(' Some issue @ 2 ' + e.name + ' is ' + e.message);									
		if(e.name === 'NoSuchElementError') {
			console.log('No image found on page');						
		}
		driver.quit();	
	});


});
	