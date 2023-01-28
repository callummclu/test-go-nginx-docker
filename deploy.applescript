tell application "Terminal"
	set currentTab to do script ("ssh root@134.122.105.245;")
	delay 2
	
	do script (system attribute "SERVER_PASS") in currentTab
	
	delay 2
	
	do script ("bash deploy.sh") in currentTab
	
	delay 120
	
	do script("docker ps") in currentTab
	
end tell
