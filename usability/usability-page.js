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
 'project': 'WUBS - Usability (Page)'
}

var driver = new webdriver.Builder().
  usingServer('http://hub-cloud.browserstack.com/wd/hub').
  withCapabilities(capabilities).
  build();

var countEls = 0;


driver.get('https://business.westernunion.com/').then(function(){

	driver.findElement(webdriver.By.css('body')).then(function(body){
		body.sendKeys(webdriver.Key.TAB);
		body.sendKeys(webdriver.Key.ENTER);
			
	}).catch((e) => {
		console.log(" Just inside catch " + e.name);
		if(e.name === 'NoSuchElementError') {
			console.log(" No such element " );
		}
		driver.quit();	
	});


});
	

function checkSkip() {
	driver.findElement(webdriver.By.css('body')).then(function(body){
		body.sendKeys(webdriver.Key.TAB);
		body.sendKeys(webdriver.Key.ENTER);
			
	}).catch((e) => {
		console.log(" Just inside catch " + e.name);
		if(e.name === 'NoSuchElementError') {
			console.log(" No such element " );
		}
			
	});
}
 
function handleFailure(err) {
     console.error('Something went wrong!\n', err.stack, '\n');
     quitDriver();
} 
function quitDriver() {
    console.log("WebDriver is about to close.");
    driver.close();
} 
driver.get('http://crossbrowsertesting.github.io/selenium_example_page.html'); 
driver.wait(checkSkip, 2000).then(quitDriver, handleFailure);
